import { expect } from "chai";
import { PathMaker } from "../../src/dex/utils/PathMaker";
import { Network } from "../../src/types/network";
import { DexInterfaceName } from "../../src/dex/types/IDexParams";
import { USDC_ADDRESS_BASE } from "../dex/constants/tokens";
import { DexFactory } from "../../src/dex/DexFactory";

describe.only("PathMaker", function () {
    it("Should make paths for Two dexes", function () {
        const paths0 = PathMaker.makePathPair({
            tokenIn: "0x1111111111111111111111111111111111111111",
            tokenOut: "0x2222222222222222222222222222222222222222",
            network: {
                id: Network.Base,
                rpcUrl: "https://base-mainnet.g.alchemy.com/v2/demo",
                wssUrl: "wss://base-mainnet.g.alchemy.com/v2/demo",
            },
            dexIncluded: [DexInterfaceName.UniswapV2, DexInterfaceName.BaseSwapV2],
        });


        const paths1 = PathMaker.makePathPair({
            tokenIn: "0x1111111111111111111111111111111111111111",
            tokenOut: "0x2222222222222222222222222222222222222222",
            network: {
                id: Network.Base,
                rpcUrl: "https://base-mainnet.g.alchemy.com/v2/demo",
                wssUrl: "wss://base-mainnet.g.alchemy.com/v2/demo",
            },
            dexIncluded: [DexInterfaceName.UniswapV2, DexInterfaceName.UniswapV3],
        });


        const paths2 = PathMaker.makePathPair({
            tokenIn: "0x1111111111111111111111111111111111111111",
            tokenOut: "0x2222222222222222222222222222222222222222",
            network: {
                id: Network.Base,
                rpcUrl: "https://base-mainnet.g.alchemy.com/v2/demo",
                wssUrl: "wss://base-mainnet.g.alchemy.com/v2/demo",
            },
            dexIncluded: [DexInterfaceName.UniswapV2, DexInterfaceName.AerodromeV2],
        });

        expect(paths0.length).to.equal(1);
        expect(paths1.length).to.equal(7);
        expect(paths2.length).to.equal(2);
    });


    it("Should make paths for Two dexes and WETH", function () {
        const paths0 = PathMaker.makePathPair({
            tokenIn: "0x1111111111111111111111111111111111111111",
            tokenOut: "0x2222222222222222222222222222222222222222",
            network: {
                id: Network.Base,
                rpcUrl: "https://base-mainnet.g.alchemy.com/v2/demo",
                wssUrl: "wss://base-mainnet.g.alchemy.com/v2/demo",
            },
            dexIncluded: [DexInterfaceName.UniswapV2, DexInterfaceName.BaseSwapV2],
            isWethIncluded: true,
        });


        const paths1 = PathMaker.makePathPair({
            tokenIn: "0x1111111111111111111111111111111111111111",
            tokenOut: "0x2222222222222222222222222222222222222222",
            network: {
                id: Network.Base,
                rpcUrl: "https://base-mainnet.g.alchemy.com/v2/demo",
                wssUrl: "wss://base-mainnet.g.alchemy.com/v2/demo",
            },
            dexIncluded: [DexInterfaceName.UniswapV2, DexInterfaceName.UniswapV3],
            isWethIncluded: true,
        });


        const paths2 = PathMaker.makePathPair({
            tokenIn: "0x1111111111111111111111111111111111111111",
            tokenOut: "0x2222222222222222222222222222222222222222",
            network: {
                id: Network.Base,
                rpcUrl: "https://base-mainnet.g.alchemy.com/v2/demo",
                wssUrl: "wss://base-mainnet.g.alchemy.com/v2/demo",
            },
            dexIncluded: [DexInterfaceName.UniswapV2, DexInterfaceName.AerodromeV2],
            isWethIncluded: true,
        });

        expect(paths0.length).to.gt(1);
        expect(paths1.length).to.gt(7);
        expect(paths2.length).to.gt(3);
    });


    it("Should make paths for 3+ dexes and WETH", function () {
        const paths = PathMaker.makePathPair({
            tokenIn: "0x1111111111111111111111111111111111111111",
            tokenOut: "0x2222222222222222222222222222222222222222",
            network: {
                id: Network.Base,
                rpcUrl: "https://base-mainnet.g.alchemy.com/v2/demo",
                wssUrl: "wss://base-mainnet.g.alchemy.com/v2/demo",
            },
            dexIncluded: [
                DexInterfaceName.AlienBaseV2,
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

                // Uniswap V3 forks
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

                // Uniswap Forks with changes
                DexInterfaceName.AerodromeV2,
                DexInterfaceName.IXSwap,
            ],
            isWethIncluded: true,
        });

        console.log(paths.length);
    });


    it.only("Should create auto path", async function () {
        const paths = await PathMaker.createAutoPath({
            tokenIn: USDC_ADDRESS_BASE,
            tokenOut: "0xFE550BfFb51EB645EA3b324D772A19AC449E92c5",
            network: {
                id: Network.Base,
                rpcUrl: "http://localhost:8545",
                wssUrl: "http://localhost:8545",
            },
            dexIncluded: [
                DexInterfaceName.AlienBaseV2,
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

                // Uniswap V3 forks
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

                // Uniswap Forks with changes
                DexInterfaceName.AerodromeV2,
                DexInterfaceName.IXSwap,
            ],
            isWethIncluded: true,
            isLiquidityRequired: true,
        });

        console.log(paths[0]);
    });


    it("Should throw error if dexIncluded is less than 2", function () {
        try {
            PathMaker.makePathPair({
                tokenIn: "0x1111111111111111111111111111111111111111",
                tokenOut: "0x2222222222222222222222222222222222222222",
                network: {
                    id: Network.Base,
                    rpcUrl: "https://base-mainnet.g.alchemy.com/v2/demo",
                    wssUrl: "wss://base-mainnet.g.alchemy.com/v2/demo",
                },
                dexIncluded: [DexInterfaceName.UniswapV2],
            });
        } catch (error: any) {
            expect(error.message).to.equal("Dex included must be at least 2");
        }

        try {
            PathMaker.makePathPair({
                tokenIn: "0x1111111111111111111111111111111111111111",
                tokenOut: "0x2222222222222222222222222222222222222222",
                network: {
                    id: Network.Base,
                    rpcUrl: "https://base-mainnet.g.alchemy.com/v2/demo",
                    wssUrl: "wss://base-mainnet.g.alchemy.com/v2/demo",
                },
                dexIncluded: [],
            });
        } catch (error: any) {
            expect(error.message).to.equal("Dex included must be at least 2");
        }
    });
});