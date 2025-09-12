import { PathMaker } from "../../src/dex/utils/PathMaker";
import { Network } from "../../src/types/network";
import { DexInterfaceName } from "../../src/dex/types/IDexParams";
import { USDC_ADDRESS_BASE, WETH_ADDRESS_BASE } from "../dex/constants/tokens";

describe("PathMaker", function () {
    it("Should make paths for dexes", async function () {
        const pathMakerSetting = {
            chunkSize: 1000,
            chunkTimeout: 0,
        };

        const paths = await PathMaker.getDexPaths(
            {
                tokenIn: USDC_ADDRESS_BASE,
                tokenOut: "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b",
                network: {
                    id: Network.Base,
                    rpcUrl: "http://localhost:8545",
                    wssUrl: "http://localhost:8545",
                },
                dexIncluded: [
                    DexInterfaceName.AerodromeV2,

                    DexInterfaceName.UniswapV3,
                    DexInterfaceName.PancakeSwapV3,
                    DexInterfaceName.SushiSwapV3,
                    DexInterfaceName.DerpDexV3,
                    DexInterfaceName.ThroneV3,
                    DexInterfaceName.HorizonDexV3,
                    DexInterfaceName.SwapBasedAmmV3,
                    DexInterfaceName.BaseSwapV3,
                    DexInterfaceName.KinetixV3,
                    DexInterfaceName.DackieSwapV3,
                    DexInterfaceName.WagmiV3,
                    DexInterfaceName.AlienBaseV3,

                    DexInterfaceName.AlienBaseArea51V2,
                    DexInterfaceName.BaseSwapV2,
                    DexInterfaceName.DeltaSwapV2,
                    DexInterfaceName.DackieSwapV2,
                    DexInterfaceName.RingSwapV2,
                    DexInterfaceName.RocketSwapV2,
                    DexInterfaceName.RaiFinanceV2,
                    DexInterfaceName.UniswapV2,
                    DexInterfaceName.PancakeSwapV2,
                    DexInterfaceName.SushiSwapV2,
                    DexInterfaceName.SharkSwapV2,
                    DexInterfaceName.SwapBasedAmmV2,
                    DexInterfaceName.LeetSwapV2,
                    DexInterfaceName.IcecreamSwapV2,
                    DexInterfaceName.ElkV2,
                    DexInterfaceName.IXSwap,
                ],
            },
            pathMakerSetting
        );

        console.log(paths[0])
    });
});