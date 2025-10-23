import { PoolScraper } from "../../src/dex/utils/PoolScraper";
import { Network } from "../../src/types/network";
import { DexInterfaceName } from "../../src/dex/types/IDexParams";
import { OVER_ADDRESS_BASE, USDC_ADDRESS_BASE, VIRTUAL_ADDRESS_BASE, WETH_ADDRESS_BASE } from "../dex/constants/tokens";
import { BASE_NETWORK } from "../dex/constants/network";

describe("PoolScraper", function () {
    it("Should make paths for dexes", async function () {
        const settings = {
            chunkSize: 1000,
            chunkTimeout: 0,
        };

        const paths = await PoolScraper.getDexPaths(
            {
                tokenIn: USDC_ADDRESS_BASE,
                tokenOut: "0xff45161474c39cb00699070dd49582e417b57a7e",
                network: BASE_NETWORK,
                dexIncluded: [
                    DexInterfaceName.AerodromeV2,

                    DexInterfaceName.UniswapV3,
                    // DexInterfaceName.PancakeSwapV3,
                    // DexInterfaceName.SushiSwapV3,
                    // DexInterfaceName.DerpDexV3,
                    // DexInterfaceName.ThroneV3,
                    // DexInterfaceName.HorizonDexV3,
                    // DexInterfaceName.SwapBasedAmmV3,
                    // DexInterfaceName.BaseSwapV3,
                    // DexInterfaceName.KinetixV3,
                    // DexInterfaceName.DackieSwapV3,
                    // DexInterfaceName.WagmiV3,
                    // DexInterfaceName.AlienBaseV3,

                    // DexInterfaceName.AlienBaseArea51V2,
                    // DexInterfaceName.BaseSwapV2,
                    // DexInterfaceName.DeltaSwapV2,
                    // DexInterfaceName.DackieSwapV2,
                    // DexInterfaceName.RingSwapV2,
                    // DexInterfaceName.RocketSwapV2,
                    // DexInterfaceName.RaiFinanceV2,
                    // DexInterfaceName.UniswapV2,
                    // DexInterfaceName.PancakeSwapV2,
                    // DexInterfaceName.SushiSwapV2,
                    // DexInterfaceName.SharkSwapV2,
                    // DexInterfaceName.SwapBasedAmmV2,
                    // DexInterfaceName.LeetSwapV2,
                    // DexInterfaceName.IcecreamSwapV2,
                    // DexInterfaceName.ElkV2,
                    // DexInterfaceName.IXSwap,
                ],
            },
            settings
        );

        console.log(paths)
    });
});