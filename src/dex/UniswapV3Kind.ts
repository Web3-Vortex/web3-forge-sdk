import { Contract, formatUnits, id, MaxUint256, parseUnits, solidityPacked, ZeroAddress } from "ethers";

import { INetworkConfig } from "../types/network";
import { DexBase } from "./DexBase";
import { DexType } from "./types/IDexParams";
import { erc20Abi } from "../erc20/abi/erc20-abi";
import { cutEncodedDataParams } from "../utils/cut-encoded-data-params";
import { quoterAbi, routerAbi, factoryAbi, poolAbi } from "./abi/uniswap-v3";
import { reverseCopy } from "../utils/reverse-copy";
import { ERC20 } from "../erc20/contracts/ERC20";
import { uniswapV3Addresses } from "./addresses/uniswap-v3-kind/uniswap-v3";
import { sushiswapV3Addresses } from "./addresses/uniswap-v3-kind/sushiswap-v3";
import { pancakeswapV3Addresses } from "./addresses/uniswap-v3-kind/pancakeswap-v3";
import { derpdexV3Addresses } from "./addresses/uniswap-v3-kind/derpdex-v3";
import { throneV3Addresses } from "./addresses/uniswap-v3-kind/throne-v3";
import { dackieswapV3Addresses } from "./addresses/uniswap-v3-kind/dackieswap-v3";
import { horizonDexV3Addresses } from "./addresses/uniswap-v3-kind/horizondex-v3";
import { swapBasedAmmV3Addresses } from "./addresses/uniswap-v3-kind/swapbasedamm-v3";
import { baseswapV3Addresses } from "./addresses/uniswap-v3-kind/baseswap-v3";
import { kinetixV3Addresses } from "./addresses/uniswap-v3-kind/kinetix-v3";
import { wagmiV3Addresses } from "./addresses/uniswap-v3-kind/wagmi-v3";
import { alienbaseV3Addresses } from "./addresses/uniswap-v3-kind/alienbase-v3";

export class DexBaseKindUniswapV3 extends DexBase {
    private readonly _quoterContract: Contract | null = null;

    constructor(
        routerAddress_: string,
        factoryAddress_: string,
        quoterAddress_: string,
        network: INetworkConfig,
        name?: string,
        overrides?: {
            routerAbi: any,
            factoryAbi: any,
            quoterAbi: any,
        }
    ) {
        super({
            network,
            type: DexType.UniswapV3,
            name: name ?? 'Uniswap V3',
            router: {
                address: routerAddress_,
                abi: overrides?.routerAbi ?? routerAbi,
            },
            factory: {
                address: factoryAddress_,
                abi: overrides?.factoryAbi ?? factoryAbi,
            },
        });

        if (quoterAddress_ !== ZeroAddress || quoterAddress_ !== '') {
            this._quoterContract = new Contract(
                quoterAddress_,
                overrides?.quoterAbi ?? quoterAbi,
                this._provider
            );
        }
    }


    public get quoterAddress(): string {
        if (this._quoterContract !== null) {
            return this._quoterContract.target as string;
        }
        return ZeroAddress;
    }

    public async getPoolData(path: string[]): Promise<{
        poolAddress: string;
        token0: string;
        token1: string;
        reserves0: bigint;
        reserves1: bigint;
    }[]> {
        const splitedPaths = this.splitPath(path);

        if (splitedPaths.length === 0) {
            throw new Error('No allowed paths provided');
        }

        const poolData: {
            poolAddress: string;
            token0: string;
            token1: string;
            reserves0: bigint;
            reserves1: bigint;
        }[] = [];
        for (const path of splitedPaths) {
            const pair = await this.getPoolAddress(path);
            const pairContract = new Contract(pair, poolAbi, this._provider);

            const [
                token0,
                token1,
            ] = await Promise.all([
                pairContract.token0(),
                pairContract.token1(),
            ]);

            const token0Contract = new Contract(token0, erc20Abi, this._provider);
            const token1Contract = new Contract(token1, erc20Abi, this._provider);

            const [
                balance0,
                balance1
            ] = await Promise.all([
                token0Contract.balanceOf(pair),
                token1Contract.balanceOf(pair),
            ]);

            poolData.push({
                poolAddress: pair,
                token0,
                token1,
                reserves0: balance0,
                reserves1: balance1,
            })
        }

        return poolData;
    }


    public async getTokenPrice(path: (string | number | bigint)[]): Promise<number> {
        if (this._quoterContract === null) {
            throw new Error('Quoter contract is not initialized');
        }

        const token = new Contract(path[0] as string, erc20Abi, this._provider);
        const tokenQuote = new Contract(path[path.length - 1] as string, erc20Abi, this._provider);

        const encodedPath = this._encodePath(path);

        const [decimals, decimalsQuote]: [bigint, bigint] = await Promise.all([
            token.decimals(),
            tokenQuote.decimals()
        ]);

        const amountsOut: bigint = (await this._quoterContract.quoteExactInput.staticCall(encodedPath, parseUnits('1', decimals)))[0];

        return +formatUnits(amountsOut, decimalsQuote);
    }

    public async getPoolAddress(path: (string | number | bigint)[]): Promise<string> {
        if (path.length !== 3) {
            throw new Error('Path must have at only two addresses and one fee.');
        }

        const token0 = path[0] as string;
        const token1 = path[path.length - 1] as string;
        const fee = path[1] as number;

        return await this._factoryContract.getPool(token0, token1, fee);
    }

    public async getPoolAddresses(path: (string | number | bigint)[]): Promise<string[]> {
        const poolPairs = this.splitPath(path);
        const pairsArray: string[] = []

        for (const poolPair of poolPairs) {
            pairsArray.push(await this.getPoolAddress(poolPair));
        }

        return pairsArray;
    }

    public async getPoolCount(): Promise<number> {
        throw new Error('Not implemented');
    }

    public async getPoolAddressByIndex(index: number): Promise<string> {
        throw new Error('Not implemented');
    }



    public async getPoolReserves(path: (string | number | bigint)[]): Promise<{
        reserve0: number,
        reserve1: number,
        sqrtPriceX96: string,
        liquidity: string,
    }> {
        const poolAddress = await this.getPoolAddress(path); // [token0, token1, fee]
        const poolContract = new Contract(poolAddress, poolAbi, this._provider);

        const [sqrtPriceX96Struct, liquidity, token0, token1] = await Promise.all([
            poolContract.slot0(),
            poolContract.liquidity(),
            poolContract.token0(),
            poolContract.token1(),
        ]);

        const sqrtPriceX96 = sqrtPriceX96Struct.sqrtPriceX96 ?? sqrtPriceX96Struct[0]; // совместимость

        const erc0 = new ERC20(token0, this._provider);
        const erc1 = new ERC20(token1, this._provider);

        const [dec0, dec1] = await Promise.all([
            erc0.getDecimals(),
            erc1.getDecimals(),
        ]);

        // вычисляем виртуальные резервы
        const Q96 = BigInt(2) ** BigInt(96);
        const sqrtX = BigInt(sqrtPriceX96);
        const L = BigInt(liquidity.toString());

        const reserve0 = Number(L * Q96 / sqrtX) / 10 ** Number(dec0);
        const reserve1 = Number(L * sqrtX / Q96) / 10 ** Number(dec1);

        return {
            reserve0,
            reserve1,
            sqrtPriceX96: sqrtX.toString(),
            liquidity: L.toString(),
        };
    }

    public async getFactoryAddress(): Promise<string> {
        return await this._routerContract.factory();
    }

    public splitPath(path: (string | number | bigint)[]): (string | number | bigint)[][] {
        if (path.length === 1) {
            return [];
        }
        if (path.length === 3) {
            return [path];
        }

        const pools: (string | bigint | number)[][] = [];

        for (let i = 0; i < path.length - 2; i += 2) {
            pools.push(path.slice(i, i + 3));
        }

        return pools;
    }

    public getEncodedSwap(
        amountsIn: bigint,
        path: (string | number | bigint)[],
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
            'exactInput',
            [
                {
                    path: this._encodePath(path),
                    recipient: sendTo,
                    deadline: MaxUint256,
                    amountIn: amountsIn,
                    amountOutMinimum: amountOutMin,
                },
            ]
        );

        return {
            data,
            ...cutEncodedDataParams(data, 3),
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

    public getReversedPath(path: string[]): string[] {
        return reverseCopy<string>(path);
    }

    public getDecodedSwapData(token0: string, token1: string, data: string): { tokenFrom: string; tokenTo: string; amountsIn: bigint; amountsOut: bigint; } {
        const t0 = token0.toLowerCase();
        const t1 = token1.toLowerCase();

        // В data лежат только НЕиндексированные поля, в порядке ниже:
        const [amount0, amount1 /* sqrtPriceX96, liquidity, tick */] = this._coder.decode(
            ["int256", "int256", "uint160", "uint128", "int24"],
            data
        ) as unknown as [bigint, bigint, bigint, bigint, number];

        // В V3 знак означает направление потока относительно пула:
        // amountX > 0  => трейдер внёс X в пул (вход)
        // amountX < 0  => трейдер получил X из пула (выход)
        if (amount0 > 0n && amount1 < 0n) {
            // внёс token0, получил token1
            return {
                tokenFrom: t0,
                tokenTo: t1,
                amountsIn: amount0,
                amountsOut: -amount1
            };
        }
        if (amount1 > 0n && amount0 < 0n) {
            // внёс token1, получил token0
            return {
                tokenFrom: t1,
                tokenTo: t0,
                amountsIn: amount1,
                amountsOut: -amount0
            };
        }

        // редкие случаи (напр., нулевые суммы) считаем невалидными для свопа
        throw new Error("UniswapV3 swap decode: ambiguous or zero amounts");
    }

    public getSwapEventSignature(): {
        event: string,
        id: string,
    } {
        const rawEvent = 'Swap(address,address,int256,int256,uint160,uint128,int24)';
        return {
            event: rawEvent,
            id: id(rawEvent),
        };
    }


    // HELPERS
    private _encodePath<T>(path: T[]) {
        if (path.length < 2) {
            throw new Error('Path must have at least two addresses.');
        }
        if (path.length % 2 === 0) {
            throw new Error(
                'Path length must be odd (addresses and fees alternate).',
            );
        }

        const types = [];
        for (let i = 0; i < path.length; i++) {
            types.push(i % 2 === 0 ? 'address' : 'uint24'); // Чередуем address и uint24
        }

        return solidityPacked(types, path);
    }

    private async _getCreatedPools(): Promise<{
        token0: string;
        token1: string;
        fee: number;
        tickSpacing: number;
        pool: string;
        blockNumber: number;
        transactionHash: string;
    }[]> {
        // const filter = this._factoryContract.filters.PoolCreated();
        // const latestBlock = await this._provider.getBlockNumber();

        // const results: {
        //     token0: string;
        //     token1: string;
        //     fee: number;
        //     tickSpacing: number;
        //     pool: string;
        //     blockNumber: number;
        //     transactionHash: string;
        // }[] = [];

        // let fromBlock = 0;
        // let batchSize = 10000;
        // const minBatchSize = 100;

        // while (fromBlock <= latestBlock) {
        //     const toBlock = Math.min(fromBlock + batchSize - 1, latestBlock);

        //     try {
        //         const events = await this._factoryContract.queryFilter(filter, fromBlock, toBlock);

        //         for (const event of events) {
        //             if (event instanceof EventLog) {
        //                 const { token0, token1, fee, tickSpacing, pool } = event.args;
        //                 results.push({
        //                     token0,
        //                     token1,
        //                     fee,
        //                     tickSpacing,
        //                     pool,
        //                     blockNumber: event.blockNumber,
        //                     transactionHash: event.transactionHash,
        //                 });
        //             }
        //         }

        //         // Move to the next block range
        //         fromBlock = toBlock + 1;
        //         // Optional: reset batch size to default if it was reduced
        //         batchSize = 10000; 

        //     } catch (err: any) {
        //         const isRangeError = (e: any) => {
        //             const message = JSON.stringify(e).toLowerCase();
        //             return message.includes('block range') || 
        //                    message.includes('query returned more than') ||
        //                    message.includes('400 bad request') ||
        //                    e.error?.code === -32000;
        //         };

        //         if (isRangeError(err) && batchSize / 2 >= minBatchSize) {
        //             const newBatchSize = Math.floor(batchSize / 2);
        //             console.warn(
        //                 `Query for logs in [${fromBlock}, ${toBlock}] failed. Reducing batch size from ${batchSize} to ${newBatchSize}.`
        //             );
        //             batchSize = newBatchSize;
        //             await new Promise(res => setTimeout(res, 1000)); // Wait before retrying
        //         } else {
        //             console.error(`Unrecoverable error fetching logs in range [${fromBlock}, ${toBlock}] with batch size ${batchSize}:`, err);
        //             throw err;
        //         }
        //     }
        // }

        // return results;

        // TODO: Implement this
        return [];
    }
}


export class UniswapV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = uniswapV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'Uniswap V3'
        );
    }
}


export class PancakeSwapV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = pancakeswapV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'PancakeSwap V3'
        );
    }
}


export class SushiSwapV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = sushiswapV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'SushiSwap V3'
        );
    }
}


export class DerpDexV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = derpdexV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'DerpDex V3'
        );
    }
}

export class ThroneV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = throneV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'Throne V3'
        );
    }
}


export class HorizonDexV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = horizonDexV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'Horizon Dex V3'
        );
    }
}


export class SwapBasedAmmV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = swapBasedAmmV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'Swap Based Amm V3'
        );
    }
}


export class BaseSwapV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = baseswapV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'Base Swap V3'
        );
    }
}


export class KinetixV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = kinetixV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'Kinetix V3'
        );
    }
}


export class DackieSwapV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = dackieswapV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'DackieSwap V3'
        );
    }
}


export class WagmiV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = wagmiV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'Wagmi V3'
        );
    }
}


export class AlienBaseV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        quoterAddress: string,
        name?: string,
    }) {
        const addresses = alienbaseV3Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            overrides?.quoterAddress ?? addresses.quoter,
            network,
            overrides?.name ?? 'Alien Base V3'
        );
    }
}