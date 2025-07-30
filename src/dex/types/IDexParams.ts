import { INetworkConfig } from "../../types/network";

export interface IDexContract {
    address: string,
    abi: Record<string, any>[],
}

export enum DexType {
    UniswapV2 = "UniswapV2",
    UniswapV3 = "UniswapV3",
    UniswapV4 = "UniswapV4",
    AerodromeV2 = "AerodromeV2",
    IXSwap = "IXSwap",
}


export interface IDexParams {
    network: INetworkConfig,
    type: DexType,
    name: string,
    factory: IDexContract,
    router: IDexContract,
}