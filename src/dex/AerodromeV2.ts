import { Contract, parseUnits, formatUnits } from "ethers";
import { INetworkConfig } from "../types/network";
import { DexBaseKindUniswapV2 } from "./UniswapV2Kind";
import { erc20Abi } from "../erc20/abi/erc20-abi";
import { aerodromeV2RouterAbi, aerodromeV2FactoryAbi } from "./abi/aerodrome";
import { aerodromeV2Addresses } from "./addresses/uniswap-v2-kind/aerodrome-v2";


export class AerodromeV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = aerodromeV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'Aerodrome V2',
            aerodromeV2RouterAbi,
            aerodromeV2FactoryAbi,
        );
    }

    // в параметр path вставляем два токена для находа пары
    // цена будет возвращаться по первому токену из пары вставленному в path
    public async getTokenPrice(path: string[]): Promise<number> {
        // TODO: Implement 
    }

    public async simulateSwap<T>(
        from: string,
        amountsIn: bigint,
        path: T[],
        sendTo: string,
        overrides?: {
            gasLimit?: number,
            maxFeePerGas?: number,
            maxPriorityFeePerGas?: number,
        }
    ) {
        // TODO: Implement
    }


    public getEncodedSwap<T>(
        amountsIn: bigint,
        path: T[],
        sendTo: string,
        slippage?: number,
    ): {
        data: string,
        topHalf: string,
        bottomHalf: string,
    } {
        // TODO: Implement
    }
}

