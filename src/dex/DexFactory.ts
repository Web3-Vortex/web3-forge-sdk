
import { DexBase } from "./DexBase";
import { 
    AlienBaseV2,
    AlienBaseArea51V2,
    BaseSwapV2,
    DeltaSwapV2,
    DackieSwapV2,
    RingSwapV2,
    RocketSwapV2,
    RaiFinanceV2,
    UniswapV2,
    PancakeSwapV2,
    SushiSwapV2,
    SharkSwapV2,
    SwapBasedAmmV2,
    LeetSwapV2,
    IcecreamSwapV2,
    ElkV2,
} from "../../src/dex/UniswapV2Kind";
import { 
    UniswapV3,
    PancakeSwapV3,
    SushiSwapV3,
    DerpDexV3,
    ThroneV3,
    HorizonDexV3,
    SwapBasedAmmV3,
    BaseSwapV3,
    KinetixV3,
    DackieSwapV3,
    WagmiV3,
    AlienBaseV3,
} from "../../src/dex/UniswapV3Kind";
import { IxSwapV2 } from "./IxSwapV2";
import { AerodromeV2 } from "./AerodromeV2";
import { DexInterfaceName } from "./types/IDexParams";
import { INetworkConfig } from "../types/network";

export type TCreateDex = (network: INetworkConfig) => DexBase;

export class DexFactory {
    private static readonly _dexes: Record<DexInterfaceName, TCreateDex> = {
        // Uniswap V2 Forks
        [DexInterfaceName.UniswapV2]: (network: INetworkConfig) => new UniswapV2(network),
        [DexInterfaceName.PancakeSwapV2]: (network: INetworkConfig) => new PancakeSwapV2(network),
        [DexInterfaceName.SushiSwapV2]: (network: INetworkConfig) => new SushiSwapV2(network),
        [DexInterfaceName.SharkSwapV2]: (network: INetworkConfig) => new SharkSwapV2(network),
        [DexInterfaceName.SwapBasedAmmV2]: (network: INetworkConfig) => new SwapBasedAmmV2(network),
        [DexInterfaceName.LeetSwapV2]: (network: INetworkConfig) => new LeetSwapV2(network),
        [DexInterfaceName.IcecreamSwapV2]: (network: INetworkConfig) => new IcecreamSwapV2(network),
        [DexInterfaceName.ElkV2]: (network: INetworkConfig) => new ElkV2(network),
        [DexInterfaceName.RocketSwapV2]: (network: INetworkConfig) => new RocketSwapV2(network),
        [DexInterfaceName.BaseSwapV2]: (network: INetworkConfig) => new BaseSwapV2(network),
        [DexInterfaceName.DeltaSwapV2]: (network: INetworkConfig) => new DeltaSwapV2(network),
        [DexInterfaceName.RingSwapV2]: (network: INetworkConfig) => new RingSwapV2(network),
        [DexInterfaceName.AlienBaseV2]: (network: INetworkConfig) => new AlienBaseV2(network),
        [DexInterfaceName.AlienBaseArea51V2]: (network: INetworkConfig) => new AlienBaseArea51V2(network),
        [DexInterfaceName.DackieSwapV2]: (network: INetworkConfig) => new DackieSwapV2(network),
        [DexInterfaceName.RaiFinanceV2]: (network: INetworkConfig) => new RaiFinanceV2(network),
        
        // Uniswap V3 Forks
        [DexInterfaceName.UniswapV3]: (network: INetworkConfig) => new UniswapV3(network),
        [DexInterfaceName.PancakeSwapV3]: (network: INetworkConfig) => new PancakeSwapV3(network),
        [DexInterfaceName.SushiSwapV3]: (network: INetworkConfig) => new SushiSwapV3(network),
        [DexInterfaceName.DerpDexV3]: (network: INetworkConfig) => new DerpDexV3(network),
        [DexInterfaceName.ThroneV3]: (network: INetworkConfig) => new ThroneV3(network),
        [DexInterfaceName.HorizonDexV3]: (network: INetworkConfig) => new HorizonDexV3(network),
        [DexInterfaceName.SwapBasedAmmV3]: (network: INetworkConfig) => new SwapBasedAmmV3(network),
        [DexInterfaceName.BaseSwapV3]: (network: INetworkConfig) => new BaseSwapV3(network),
        [DexInterfaceName.KinetixV3]: (network: INetworkConfig) => new KinetixV3(network),
        [DexInterfaceName.DackieSwapV3]: (network: INetworkConfig) => new DackieSwapV3(network),
        [DexInterfaceName.WagmiV3]: (network: INetworkConfig) => new WagmiV3(network),
        [DexInterfaceName.AlienBaseV3]: (network: INetworkConfig) => new AlienBaseV3(network),
        
        // Uniswap Forks with changes
        [DexInterfaceName.AerodromeV2]: (network: INetworkConfig) => new AerodromeV2(network),
        [DexInterfaceName.IXSwap]: (network: INetworkConfig) => new IxSwapV2(network),
        
    }

    public static create(
        network: INetworkConfig,
        dexInterfaceName: DexInterfaceName
    ): DexBase {
        if(!this._dexes[dexInterfaceName]) {
            throw new Error(`Dex type ${dexInterfaceName} not found`);
        }

        return this._dexes[dexInterfaceName](network);
    }
}