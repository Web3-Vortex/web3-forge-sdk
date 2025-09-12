
import chunk from "../../utils/chunk";
import { Weth, ERC20 } from "../../erc20";
import { INetworkConfig } from "../../types/network";
import { getEnumValuesArray } from "../../utils/get-enum-values-array";
import { DexBase } from "../DexBase";
import { DexFactory } from "../DexFactory";
import { AlienbaseV3Fees, HorizonDexV3Fees, SwapBasedAmmV3Fees, ThroneV3Fees, UniswapV3Fees, WagmiV3Fees } from "../types/fees";
import { DexInterfaceName, DexType } from "../types/IDexParams";
import { TPathSegment } from "../types/path";

export interface IPathMakerParams {
    tokenIn: string;
    tokenOut: string;
    network: INetworkConfig;
    dexIncluded: DexInterfaceName[];
    isDirectPathOnly?: boolean;
}

export class PathMaker {
    public static async getDexPaths(
        {
            tokenIn,
            tokenOut,
            network,
            dexIncluded,
            isDirectPathOnly,
        }: IPathMakerParams,
        settings?: {
            chunkSize: number;
            chunkTimeout?: number;
        }
    ) {
        const tokenInContract = new ERC20(tokenIn, network);
        const tokenOutContract = new ERC20(tokenIn, network);

        try {
            await Promise.all([
                tokenInContract.getDecimals(),
                tokenOutContract.getDecimals(),
            ]);
        } catch (e) {
            throw new Error(`Tokens are not supported. Token In: [#${tokenIn}]; Token Out: [#${tokenOut}]`);
        }

        const _settings = settings ?? {
            chunkSize: 50,
            chunkTimeout: 1000,
        };

        const dexes: DexBase[] = [...new Set(dexIncluded)].map(d => DexFactory.create(network, d));

        const dexPaths = [];
        for (const dex of dexes) {
            dexPaths.push(...this._makeDexPaths({
                tokenIn,
                tokenOut,
                dex,
                network,
                isDirectPathOnly,
            }));
        }

        const validatePathsTask = dexPaths.map(param => async () =>  await this._getValidPath(param));

        const validPaths = (await chunk.processInChunksAsync(
            validatePathsTask,
            _settings.chunkSize,
            async (item) => item(),
            _settings.chunkTimeout,
        )).filter(vp => vp !== undefined);

        return validPaths as {
            dex: string;
            path: TPathSegment[];
            reserves: {
                poolAddress: string;
                token0: string;
                token1: string;
                reserves0: bigint;
                reserves1: bigint;
            }[];
        }[];
    }

    private static _makeDexPaths(params: {
        tokenIn: string,
        tokenOut: string,
        dex: DexBase,
        network: INetworkConfig,
        isDirectPathOnly?: boolean,
    }) {
        const { type: dexType } = params.dex.dexParams;
        const weth = new Weth(params.network);
        const isWethIncluded =
            params.tokenIn.toLowerCase() === weth.address.toLowerCase() ||
            params.tokenOut.toLowerCase() === weth.address.toLowerCase();

        if (
            dexType === DexType.UniswapV2 ||
            dexType === DexType.IXSwap
        ) {
            if (params.isDirectPathOnly || isWethIncluded) {
                return [
                    {
                        dex: params.dex,
                        path: [params.tokenIn, params.tokenOut],
                    }
                ];
            }

            return [
                {
                    dex: params.dex,
                    path: [params.tokenIn, params.tokenOut],
                },
                {
                    dex: params.dex,
                    path: [params.tokenIn, weth.address, params.tokenOut],
                },
            ];
        } else if (dexType === DexType.UniswapV3) {
            const dexInterfaceName = params.dex.dexParams.name;
            const fees = getEnumValuesArray(
                dexInterfaceName === DexInterfaceName.AlienBaseV3 ? AlienbaseV3Fees :
                    dexInterfaceName === DexInterfaceName.ThroneV3 ? ThroneV3Fees :
                        dexInterfaceName === DexInterfaceName.WagmiV3 ? WagmiV3Fees :
                            dexInterfaceName === DexInterfaceName.HorizonDexV3 ? HorizonDexV3Fees :
                                dexInterfaceName === DexInterfaceName.SwapBasedAmmV3 ? SwapBasedAmmV3Fees :
                                    UniswapV3Fees
            );

            if (params.isDirectPathOnly || isWethIncluded) {
                return fees.map(fee => (
                    {
                        dex: params.dex,
                        path: [params.tokenIn, fee, params.tokenOut],
                    }
                ));
            }

            const paths = [];
            for (const fee0 of fees) {
                for (const fee1 of fees) {
                    paths.push((
                        {
                            dex: params.dex,
                            path: [params.tokenIn, fee0, weth.address, fee1, params.tokenOut]
                        }
                    ));
                }
            }
            return paths;
        } else if (dexType === DexType.AerodromeV2) {
            if (params.isDirectPathOnly || isWethIncluded) {
                return [
                    {
                        dex: params.dex,
                        path: [params.tokenIn, false, params.tokenOut],
                    },
                    {
                        dex: params.dex,
                        path: [params.tokenIn, true, params.tokenOut],
                    },
                ];
            }

            return [
                {
                    dex: params.dex,
                    path: [params.tokenIn, false, weth.address, false, params.tokenOut],
                },
                {
                    dex: params.dex,
                    path: [params.tokenIn, false, weth.address, true, params.tokenOut],
                },
                {
                    dex: params.dex,
                    path: [params.tokenIn, true, weth.address, false, params.tokenOut],
                },
                {
                    dex: params.dex,
                    path: [params.tokenIn, true, weth.address, true, params.tokenOut],
                },
            ];
        }

        return [];
    }

    private static async _getValidPath(param: { dex: DexBase, path: TPathSegment[] }) {
        const { dex, path } = param;
        const splitedPaths = dex.splitPath(path);
        const reserves = await dex.getPoolData(path);

        if (splitedPaths.length !== reserves.length) {
            return;
        }


        return {
            dex: dex.dexParams.name,
            path,
            reserves,
        };
    }
}
