import { Contract, parseUnits } from "ethers";

import { INetworkConfig, Network } from "../types/network";
import { DexBase } from "./DexBase";
import { DexType } from "./types/IDexParams";
import { routerAbi, factoryAbi } from "./abi/uniswap-v2";
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

export class DexBaseKindUniswapV2 extends DexBase {
    constructor(
        routerAddress_: string,
        factoryAddress_: string,
        network: INetworkConfig,
        name?: string,
    ) {
        super({
            network,
            type: DexType.UniswapV2,
            name: name ?? 'Uniswap V2',
            router: {
                address: routerAddress_,
                abi: routerAbi,
            },
            factory: {
                address: factoryAddress_,
                abi: factoryAbi,
            },
        });
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

    public async getFactoryAddress(): Promise<string> {
        return await this._routerContract.factory();
    }

    public splitPath(path: string[]): string[][] {
        if(path.length === 1) {
            return [];
        }
        if(path.length === 2) {
            return [path];
        }

        const pools: string[][] = [];
        for (let i = 0; i < path.length - 1; i++) {
            pools.push([path[i], path[i + 1]]);
        }
        return pools;
    }

    public getEncodedSwap(
        amountsIn: bigint,
        path: (string | any)[],
        sendTo: string
    ): {
        data: string,
        topHalf: string,
        bottomHalf: string,
    } {
        const deadline = Math.floor(Date.now() / 1000) + 10000;

        const data = this._routerContract.interface.encodeFunctionData(
            'swapExactTokensForTokens',
            [
                amountsIn,
                0,
                path,
                sendTo,
                deadline
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
        sendTo: string
    ) {
        const deadline = Math.floor(Date.now() / 1000) + 600;
        return await this._routerContract.swapExactTokensForTokens.staticCallResult(
            amountsIn,
            0,
            path,
            sendTo,
            deadline,
            {from}
        );
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