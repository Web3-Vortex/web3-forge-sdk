import { Weth } from "../../erc20/tokens/weth";
import { INetworkConfig } from "../../types/network";
import { getEnumValuesArray } from "../../utils/get-enum-values-array";
import { reverseCopy } from "../../utils/reverse-copy";
import { DexFactory } from "../DexFactory";
import { AlienbaseV3Fees, HorizonDexV3Fees, SwapBasedAmmV3Fees, ThroneV3Fees, UniswapV3Fees, WagmiV3Fees } from "../types/fees";
import { DexInterfaceName, DexType } from "../types/IDexParams";

export interface IPathMakerParams {
    tokenIn: string;
    tokenOut: string;
    network: INetworkConfig;
    dexIncluded: DexInterfaceName[];
    isWethIncluded?: boolean;
}

export class PathMaker {
    public static makePathPair({
        tokenIn,
        tokenOut,
        network,
        isWethIncluded,
        dexIncluded,
    }: IPathMakerParams) {
        if(dexIncluded.length < 2) {
            throw new Error("Dex included must be at least 2");
        }

        // Create all possible paths for each dex and tokens
        const dexPaths = [];
        for(const dex of dexIncluded) {
            let wethPath: (string | any)[][] = [];
            const directPath = this.makePathsByDex(dex, tokenIn, tokenOut, network);
            
            if(isWethIncluded) {
                wethPath = this.makePathsByDex(dex, tokenIn, tokenOut, network, isWethIncluded);
            }
            const dexType = DexFactory.getDexTypeByInterfaceName(dex);
            dexPaths.push({
                dexType,
                dexInterfaceName: dex,
                paths: [...directPath, ...wethPath],
            });
        }

        const dexPairs = [];
        for (let i = 0; i < dexIncluded.length - 1; i++) {
            const dexIn = dexIncluded[i];
            for (let j = i + 1; j < dexIncluded.length; j++) {
                const dexOut = dexIncluded[j];

                const pathsIn = dexPaths.find(path => path.dexInterfaceName === dexIn);
                const pathsOut = dexPaths.find(path => path.dexInterfaceName === dexOut);

                for (const pathIn of pathsIn?.paths || []) {
                    for (const pathOut of pathsOut?.paths || []) {
                        dexPairs.push({
                            dexIn: {
                                type: pathsIn?.dexType,
                                interfaceName: dexIn,
                            },
                            dexOut: {
                                type: pathsOut?.dexType,
                                interfaceName: dexOut,
                            },
                            pathIn,
                            pathOut: reverseCopy(pathOut),
                        });
                    }
                }
            }
        }

        return dexPairs;
    }


    public static makePathsByDex(
        dexInterfaceName: DexInterfaceName,
        tokenIn: string,
        tokenOut: string,
        network: INetworkConfig,
        isWethIncluded?: boolean,
    ): (string | any)[][] {
        const dexType = DexFactory.getDexTypeByInterfaceName(dexInterfaceName);
        
        if(
            dexType === DexType.UniswapV2 ||
            dexType === DexType.IXSwap
        ) {
            if(isWethIncluded) {
                const weth = new Weth(network);
                return [[tokenIn, weth.address, tokenOut]];
            }
            return [[tokenIn, tokenOut]];
        } else if(dexType === DexType.UniswapV3) {
            const fees = getEnumValuesArray(
                dexInterfaceName === DexInterfaceName.AlienBaseV3 ? AlienbaseV3Fees :
                dexInterfaceName === DexInterfaceName.ThroneV3 ? ThroneV3Fees :
                dexInterfaceName === DexInterfaceName.WagmiV3 ? WagmiV3Fees :
                dexInterfaceName === DexInterfaceName.HorizonDexV3 ? HorizonDexV3Fees :
                dexInterfaceName === DexInterfaceName.SwapBasedAmmV3 ? SwapBasedAmmV3Fees :
                UniswapV3Fees
            );
            
            if(isWethIncluded) {
                const weth = new Weth(network);
                const paths = [];

                for (const fee0 of fees) {
                    for (const fee1 of fees) {
                        paths.push([tokenIn, fee0, weth.address, fee1, tokenOut]);
                    }
                }

                return paths;
            }

            return fees.map(fee => [tokenIn, fee, tokenOut]) as (string | any)[];
        } else if(dexType === DexType.AerodromeV2) {
            if(isWethIncluded) {
                const weth = new Weth(network);
                return [
                    [tokenIn, false, weth.address, false, tokenOut],
                    [tokenIn, false, weth.address, true, tokenOut],
                    [tokenIn, true, weth.address, false, tokenOut],
                    [tokenIn, true, weth.address, true, tokenOut],
                ];
            }

            return [[tokenIn, false, tokenOut], [tokenIn, true, tokenOut]];
        }

        return [];
    }
}
