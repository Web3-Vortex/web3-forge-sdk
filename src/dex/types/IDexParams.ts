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


export enum DexInterfaceName {
    // Uniswap V2 forks
    AlienBaseV2 = "AlienBaseV2",
    AlienBaseArea51V2 = "AlienBaseArea51V2",
    BaseSwapV2 = "BaseSwapV2",
    DeltaSwapV2 = "DeltaSwapV2",
    DackieSwapV2 = "DackieSwapV2",
    RingSwapV2 = "RingSwapV2",
    RocketSwapV2 = "RocketSwapV2",
    RaiFinanceV2 = "RaiFinanceV2",
    UniswapV2 = "UniswapV2",
    PancakeSwapV2 = "PancakeSwapV2",
    SushiSwapV2 = "SushiSwapV2",
    SharkSwapV2 = "SharkSwapV2",
    SwapBasedAmmV2 = "SwapBasedAmmV2",
    LeetSwapV2 = "LeetSwapV2",
    IcecreamSwapV2 = "IcecreamSwapV2",
    ElkV2 = "ElkV2",

    // Uniswap V3 forks
    UniswapV3 = "UniswapV3",
    PancakeSwapV3 = "PancakeSwapV3",
    SushiSwapV3 = "SushiSwapV3",
    DerpDexV3 = "DerpDexV3",
    ThroneV3 = "ThroneV3",
    HorizonDexV3 = "HorizonDexV3",
    SwapBasedAmmV3 = "SwapBasedAmmV3",
    BaseSwapV3 = "BaseSwapV3",
    KinetixV3 = "KinetixV3",
    DackieSwapV3 = "DackieSwapV3",
    WagmiV3 = "WagmiV3",
    AlienBaseV3 = "AlienBaseV3",

    // Uniswap Forks with changes
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