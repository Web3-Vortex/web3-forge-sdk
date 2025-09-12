import { Contract, id, isAddress, MaxUint256, parseUnits, ZeroAddress } from "ethers";

import { INetworkConfig, Network } from "../types/network";
import { DexBase } from "./DexBase";
import { DexType } from "./types/IDexParams";
import { routerAbi, factoryAbi, pairAbi } from "./abi/uniswap-v2";
import { erc20Abi } from "../erc20/abi/erc20-abi";
import { cutEncodedDataParams } from "../utils/cut-encoded-data-params";
import { uniswapV2Addresses } from "./addresses/uniswap-v2-kind/uniswap-v2";
import { pancakeswapV2Addresses } from "./addresses/uniswap-v2-kind/pancakeswap-v2";
import { sushiswapV2Addresses } from "./addresses/uniswap-v2-kind/sushiswap-v2";
import { alienbaseArea51V2Addresses, alienbaseV2Addresses } from "./addresses/uniswap-v2-kind/alienbase-v2";
import { dackieswapV2Addresses } from "./addresses/uniswap-v2-kind/dackieswap-v2";
import { raifinanceV2Addresses } from "./addresses/uniswap-v2-kind/rai-finance-v2";
import { sharkswapV2Addresses } from "./addresses/uniswap-v2-kind/sharkswap-v2";
import { swapbasedammV2Addresses } from "./addresses/uniswap-v2-kind/swapbased-amm-v2";
import { leetswapV2Addresses } from "./addresses/uniswap-v2-kind/leetswap-v2";
import { icecreamswapV2Addresses } from "./addresses/uniswap-v2-kind/icecreamswap-v2";
import { elkswapV2Addresses } from "./addresses/uniswap-v2-kind/elkswap-v2";
import { rocketswapV2Addresses } from "./addresses/uniswap-v2-kind/rocketswap-v2";
import { baseswapV2Addresses } from "./addresses/uniswap-v2-kind/baseswap-v2";
import { deltaswapV2Addresses } from "./addresses/uniswap-v2-kind/deltaswap-v2";
import { ringswapV2Addresses } from "./addresses/uniswap-v2-kind/ringswap-v2";
import { ERC20 } from "../erc20/contracts/ERC20";
import { reverseCopy } from "../utils/reverse-copy";

export class DexBaseKindUniswapV2 extends DexBase {
    constructor(
        routerAddress_: string,
        factoryAddress_: string,
        network: INetworkConfig,
        name?: string,
        routerAbi_?: any,
        factoryAbi_?: any,
    ) {
        super({
            network,
            type: DexType.UniswapV2,
            name: name ?? 'Uniswap V2',
            router: {
                address: routerAddress_,
                abi: routerAbi_ ?? routerAbi,
            },
            factory: {
                address: factoryAddress_,
                abi: factoryAbi_ ?? factoryAbi,
            },
        });
    }

    public async getPoolData(path: string[]): Promise<{
        poolAddress: string;
        token0: string;
        token1: string;
        reserves0: bigint;
        reserves1: bigint;
    }[]> {
        const splitedPaths = this.splitPath(path);

        if(splitedPaths.length === 0) {
            throw new Error('No allowed paths provided');
        }

        const poolData: {
            poolAddress: string;
            token0: string;
            token1: string;
            reserves0: bigint;
            reserves1: bigint;
        }[] = [];
        for(const path of splitedPaths) {
            const pair = await this.getPoolAddress(path);
            
            if(pair === ZeroAddress) {
                continue;
            }
            
            const pairContract = new Contract(pair, pairAbi, this._provider);

            const [
                token0,
                token1,
                reserves,
            ] = await Promise.all([
                pairContract.token0(),
                pairContract.token1(),
                pairContract.getReserves(),
            ]);

            poolData.push({
                poolAddress: pair,
                token0,
                token1,
                reserves0: reserves[0],
                reserves1: reserves[1],
            })
        }

        return poolData;
    }


    public async getTokenPrice(path: string[]): Promise<number> {
        const token = new Contract(path[0], erc20Abi, this._provider);
        const tokenQuote = new Contract(path[path.length - 1], erc20Abi, this._provider);

        const [decimals, decimalsQuote] = await Promise.all([
            token.decimals(),
            tokenQuote.decimals()
        ]);

        const amountsOut = await this._routerContract.getAmountsOut(parseUnits('1', decimals), path);
        return Number(amountsOut[amountsOut.length - 1]) / 10**Number(decimalsQuote);
    }

    public async getPoolAddress(path: string[]): Promise<string> {
        return await this._factoryContract.getPair(path[0], path[1]);
    }

    
    public async getPoolAddresses(path: string[]): Promise<string[]> {
        const poolPairs = this.splitPath(path);
        const pairsArray: string[] = []

        for(const poolPair of poolPairs) {
            pairsArray.push(await this.getPoolAddress(poolPair));
        }

        return pairsArray;
    }

    public async getPoolCount(): Promise<number> {
        return Number(await this._factoryContract.allPairsLength());
    }

    public async getPoolAddressByIndex(index: number): Promise<string> {
        return await this._factoryContract.allPairs(index);
    }

    public async getPoolReserves(path: string[]): Promise<{
        reserve0: number,
        reserve1: number,
        blockTimestampLast: number,
    }> {
        const pair = await this.getPoolAddress(path);
        const pairContract = new Contract(pair, pairAbi, this._provider);
        const [reserve0, reserve1, blockTimestampLast] = await pairContract.getReserves();

        const token0 = new ERC20(path[0], this._network);
        const token1 = new ERC20(path[path.length - 1], this._network);

        const [decimals0, decimals1] = await Promise.all([
            token0.getDecimals(),
            token1.getDecimals(),
            pairContract.getReserves()
        ]);

        return {
            reserve0: Number(reserve0) / 10**Number(decimals0),
            reserve1: Number(reserve1) / 10**Number(decimals1),
            blockTimestampLast: Number(blockTimestampLast),
        };
    }

    public async getFactoryAddress(): Promise<string> {
        return await this._routerContract.factory();
    }

    public splitPath(path: string[]): string[][] {
        for(const token of path) {
            if(isAddress(token)) {
                continue;
            } else {
                return [];
            }
        }
        if(path.length === 1) return [];
        if(path.length === 2) return [path];

        const pools: string[][] = [];
        for (let i = 0; i < path.length - 1; i++) {
            pools.push([path[i], path[i + 1]]);
        }
        return pools;
    }

    public getEncodedSwap(
        amountsIn: bigint,
        path: (string | any)[],
        sendTo: string,
        slippage?: number,
    ): {
        data: string,
        topHalf: string,
        bottomHalf: string,
    } {
        const deadline = Math.floor(Date.now() / 1000) + 10000;
        const amountOutMin = slippage ? amountsIn * BigInt(10000 - slippage) / BigInt(10000) : 0;

        const data = this._routerContract.interface.encodeFunctionData(
            'swapExactTokensForTokens',
            [
                amountsIn,
                amountOutMin,
                path,
                sendTo,
                MaxUint256
            ]
        );

        return {
            data,
            ...cutEncodedDataParams(data),
        }
    }


    public async simulateSwap(
        from: string,
        amountsIn: bigint,
        path: (string | any)[],
        sendTo?: string,
        overrides?: {
            gasLimit?: number,
            maxFeePerGas?: number,
            maxPriorityFeePerGas?: number,
        }
    ) {
        const deadline = Math.floor(Date.now() / 1000) + 600;
        return await this._routerContract.swapExactTokensForTokens.staticCallResult(
            amountsIn,
            0,
            path,
            sendTo ?? from,
            deadline,
            {
                ...overrides,
                from,
            }
        );
    }

    public getDecodedSwapData(token0: string, token1: string, data: string): { tokenFrom: string; tokenTo: string; amountsIn: bigint; amountsOut: bigint; } {
        const t0 = token0.toLowerCase();
        const t1 = token1.toLowerCase();

        const [amount0In, amount1In, amount0Out, amount1Out] = this._coder.decode(
            ["uint256", "uint256", "uint256", "uint256"],
            data
        ) as unknown as [bigint, bigint, bigint, bigint];

        if (amount0In > 0n) {
            // трейдер внёс token0 и получил token1
            return {
                tokenFrom: t0,
                tokenTo: t1,
                amountsIn: amount0In,
                amountsOut: amount1Out
            };
        }
        if (amount1In > 0n) {
            // трейдер внёс token1 и получил token0
            return {
                tokenFrom: t1,
                tokenTo: t0,
                amountsIn: amount1In,
                amountsOut: amount0Out
            };
        }

        // если все инпуты нулевые — странный кейс, считаем ошибкой
        throw new Error("UniswapV2 swap decode: both amount0In and amount1In are zero");
    }

    public getReversedPath(path: string[]): string[] {
        return reverseCopy<string>(path);
    }

    public getSwapEventSignature(): {
        event: string,
        id: string,
    } {
        const rawEvent = 'Swap(address,uint256,uint256,uint256,uint256,address)';
        return {
            event: rawEvent,
            id: id(rawEvent),
        };
    }
}


export class UniswapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = uniswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'Uniswap V2'
        );
    }
}

export class PancakeSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = pancakeswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'PancakeSwap V2'
        );
    }
}


export class SushiSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = sushiswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'SushiSwap V2'
        );
    }
}

export class AlienBaseV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = alienbaseV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'AlienBase V2'
        );
    }
}


export class AlienBaseArea51V2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = alienbaseArea51V2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'AlienBase Area51 V2'
        );
    }
}

export class DackieSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = dackieswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'DackieSwap V2'
        );
    }
}


export class RaiFinanceV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = raifinanceV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'Rai Finance V2'
        );
    }
}


export class SharkSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = sharkswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'SharkSwap V2'
        );
    }
}


export class SwapBasedAmmV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = swapbasedammV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'SwapBased Amm V2'
        );
    }
}


export class LeetSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = leetswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'LeetSwap V2'
        );
    }
}


export class IcecreamSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = icecreamswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'IcecreamSwap V2'
        );
    }
}


export class ElkV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = elkswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'Elk Swap V2'
        );
    }
}


export class RocketSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = rocketswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'Rocket Swap V2'
        );
    }
}


// export class DiamondSwapV2 extends DexBaseKindUniswapV2 {
//     constructor(network: INetworkConfig, overrides?: {
//         routerAddress: string,
//         factoryAddress: string,
//         name?: string,
//     }) {
//         const addresses = diamondswapV2Addresses.get(network.id)!;
//         super(
//             overrides?.routerAddress ?? addresses.router,
//             overrides?.factoryAddress ?? addresses.factory,
//             network,
//             overrides?.name ?? 'Diamond Swap V2'
//         );
//     }
// }


export class BaseSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = baseswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'Base Swap V2'
        );
    }
}


export class DeltaSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = deltaswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'Delta Swap V2'
        );
    }
}


export class RingSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = ringswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'Ring Swap V2'
        );
    }
}
