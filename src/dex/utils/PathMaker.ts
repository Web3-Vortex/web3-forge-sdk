import { Weth } from "../../erc20/tokens/weth";
import { INetworkConfig } from "../../types/network";
import chunk from "../../utils/chunk";
import { getEnumValuesArray } from "../../utils/get-enum-values-array";
import { reverseCopy } from "../../utils/reverse-copy";
import { DexBase } from "../DexBase";
import { DexFactory } from "../DexFactory";
import { AlienbaseV3Fees, HorizonDexV3Fees, SwapBasedAmmV3Fees, ThroneV3Fees, UniswapV3Fees, WagmiV3Fees } from "../types/fees";
import { DexInterfaceName, DexType } from "../types/IDexParams";

export interface IPathMakerParams {
    tokenIn: string;
    tokenOut: string;
    network: INetworkConfig;
    dexIncluded: DexInterfaceName[];
    isWethIncluded?: boolean;
    isLiquidityRequired?: boolean;
}

export class PathMaker {
    public static makePathPair({
        tokenIn,
        tokenOut,
        network,
        isWethIncluded,
        dexIncluded,
    }: IPathMakerParams) {
        if (dexIncluded.length < 2) {
            throw new Error("Dex included must be at least 2");
        }

        // Create all possible paths for each dex and tokens
        const dexPaths = [];
        for (const dex of dexIncluded) {
            let wethPath: (string | any)[][] = [];
            const directPath = this.makePathsByDex(dex, tokenIn, tokenOut, network);

            if (isWethIncluded) {
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

        if (
            dexType === DexType.UniswapV2 ||
            dexType === DexType.IXSwap
        ) {
            if (isWethIncluded) {
                const weth = new Weth(network);
                return [[tokenIn, weth.address, tokenOut]];
            }
            return [[tokenIn, tokenOut]];
        } else if (dexType === DexType.UniswapV3) {
            const fees = getEnumValuesArray(
                dexInterfaceName === DexInterfaceName.AlienBaseV3 ? AlienbaseV3Fees :
                    dexInterfaceName === DexInterfaceName.ThroneV3 ? ThroneV3Fees :
                        dexInterfaceName === DexInterfaceName.WagmiV3 ? WagmiV3Fees :
                            dexInterfaceName === DexInterfaceName.HorizonDexV3 ? HorizonDexV3Fees :
                                dexInterfaceName === DexInterfaceName.SwapBasedAmmV3 ? SwapBasedAmmV3Fees :
                                    UniswapV3Fees
            );

            if (isWethIncluded) {
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
        } else if (dexType === DexType.AerodromeV2) {
            if (isWethIncluded) {
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


    public static async createAutoPath(
        {
            tokenIn,
            tokenOut,
            network,
            dexIncluded,
            isWethIncluded,
            isLiquidityRequired,
        }: IPathMakerParams,
        settings?: {
            chunkSize: number;
            chunkTimeout?: number;
        }
    ) {
        const _settings = settings ?? {
            chunkSize: 50,
            chunkTimeout: 0,
        };

        const dexes = new Map<DexInterfaceName, DexBase>();
        for (const dex of dexIncluded) {
            dexes.set(dex, DexFactory.create(network, dex));
        }

        const paths = this.makePathPair({
            tokenIn,
            tokenOut,
            network,
            dexIncluded,
            isWethIncluded,
        });

        // Get unique paths from created by dexes
        const uniquePaths = this._getUniquePaths(dexes, paths);

        const poolPairPaths = [];

        for (const path of uniquePaths) {
            const dexInterface = path.split('-')[0];
            const pathParts = path.split('-').slice(1);
            const pathSplitted = pathParts.map(part => this._parseValue(part));

            poolPairPaths.push({
                dexInterface,
                path: pathSplitted,
            });
        }

        // Delete paths that are not exists in dexes
        const poolPairsNonExists = (await chunk.processInChunksAsync(
            this._getPoolPairOnlyNonExistsTasks(dexes, poolPairPaths as any),
            _settings.chunkSize,
            async (item) => item(),
            _settings.chunkTimeout,
        )).filter(p => p !== undefined);


        // Save only valid paths
        // 1. Собираем невалидные ключи в Set
        const invalidPathSet = new Set<string>();


        for (const invalid of poolPairsNonExists) {
            const dexInterface = dexes.get(invalid.dexInterface);
            const key = invalid.dexInterface + '-' + invalid.path.join('-').toLowerCase();
            if (dexInterface) {
                const keyReversed = invalid.dexInterface + '-' + dexInterface.getReversedPath(invalid.path).join('-').toLowerCase();
                invalidPathSet.add(keyReversed);
            }

            invalidPathSet.add(key);
        }

        // 2. Фильтруем paths
        const filteredPaths = paths.filter(path => {
            const pathKeyIn = path.dexIn.interfaceName + '-' + path.pathIn.join('-').toLowerCase();
            const pathKeyOut = path.dexOut.interfaceName + '-' + path.pathOut.join('-').toLowerCase();

            return !invalidPathSet.has(pathKeyIn) && !invalidPathSet.has(pathKeyOut);
        });


        if (isLiquidityRequired) {
            // 3. Добавляем ликвидности в пути
            const liquidity = (await chunk.processInChunksAsync(
                this._getLiquidityTasks(dexes, filteredPaths),
                _settings.chunkSize,
                async (item) => item(),
                _settings.chunkTimeout,
            )).filter(p => p !== undefined);

            const liquidityMap = new Map<string, { liquidity: any }>();

            for (const item of liquidity) {
                if (!item) continue;

                const key = item.dexInterface + '-' + item.path.join('-').toLowerCase();
                liquidityMap.set(key, item);
            }

            const filteredPathsWithLiquidity = filteredPaths.map(path => {
                const keyIn = path.dexIn.interfaceName + '-' + path.pathIn.join('-').toLowerCase();
                const keyOut = path.dexOut.interfaceName + '-' + dexes.get(path.dexOut.interfaceName)?.getReversedPath(path.pathOut).join('-').toLowerCase();

                return {
                    ...path,
                    liquidity: {
                        in: liquidityMap.get(keyIn)?.liquidity,
                        out: liquidityMap.get(keyOut)?.liquidity,
                    },
                };
            });


            return filteredPathsWithLiquidity;
        }

        return filteredPaths;
    }


    public static async createPaths(
        params: {
            paths: {
                dexIn: DexInterfaceName;
                dexOut: DexInterfaceName;
                pathIn: (string | any)[];
                pathOut: (string | any)[];
            }[];
            network: INetworkConfig;
            isLiquidityRequired?: boolean;
        },
        settings?: {
            chunkSize: number;
            chunkTimeout?: number;
        }
    ) {
        const _settings = settings ?? {
            chunkSize: 50,
            chunkTimeout: 0,
        };
        const { network, paths, isLiquidityRequired } = params;
        const dexes = new Map<DexInterfaceName, DexBase>();

        const parsedPaths = this.removeDuplicates(paths.map(path => ({
            dexIn: {
                type: dexes.get(path.dexIn)?.dexParams.type,
                interfaceName: path.dexIn,
            },
            dexOut: {
                type: dexes.get(path.dexOut)?.dexParams.type,
                interfaceName: path.dexOut,
            },
            pathIn: path.pathIn,
            pathOut: path.pathOut,
        })));

        // Get unique paths from created by dexes
        const uniquePaths = this._getUniquePaths(dexes, parsedPaths);
        const poolPairPaths = [];

        for (const path of uniquePaths) {
            const dexInterface = path.split('-')[0];
            const pathParts = path.split('-').slice(1);
            const pathSplitted = pathParts.map(part => this._parseValue(part));

            poolPairPaths.push({
                dexInterface,
                path: pathSplitted,
            });
        }

        // Delete paths that are not exists in dexes
        const poolPairsNonExists = (await chunk.processInChunksAsync(
            this._getPoolPairOnlyNonExistsTasks(dexes, poolPairPaths as any),
            _settings.chunkSize,
            async (item) => item(),
            _settings.chunkTimeout,
        )).filter(p => p !== undefined);

        // Save only valid paths
        // 1. Собираем невалидные ключи в Set
        const invalidPathSet = new Set<string>();


        for (const invalid of poolPairsNonExists) {
            const dexInterface = dexes.get(invalid.dexInterface);
            const key = invalid.dexInterface + '-' + invalid.path.join('-').toLowerCase();
            if (dexInterface) {
                const keyReversed = invalid.dexInterface + '-' + dexInterface.getReversedPath(invalid.path).join('-').toLowerCase();
                invalidPathSet.add(keyReversed);
            }

            invalidPathSet.add(key);
        }

        // 2. Фильтруем paths
        const filteredPaths = parsedPaths.filter(path => {
            const pathKeyIn = path.dexIn.interfaceName + '-' + path.pathIn.join('-').toLowerCase();
            const pathKeyOut = path.dexOut.interfaceName + '-' + path.pathOut.join('-').toLowerCase();

            return !invalidPathSet.has(pathKeyIn) && !invalidPathSet.has(pathKeyOut);
        });


        if (isLiquidityRequired) {
            // 3. Добавляем ликвидности в пути
            const liquidity = (await chunk.processInChunksAsync(
                this._getLiquidityTasks(dexes, filteredPaths),
                _settings.chunkSize,
                async (item) => item(),
                _settings.chunkTimeout,
            )).filter(p => p !== undefined);

            const liquidityMap = new Map<string, { liquidity: any }>();

            for (const item of liquidity) {
                if (!item) continue;

                const key = item.dexInterface + '-' + item.path.join('-').toLowerCase();
                liquidityMap.set(key, item);
            }

            const filteredPathsWithLiquidity = filteredPaths.map(path => {
                const keyIn = path.dexIn.interfaceName + '-' + path.pathIn.join('-').toLowerCase();
                const keyOut = path.dexOut.interfaceName + '-' + dexes.get(path.dexOut.interfaceName)?.getReversedPath(path.pathOut).join('-').toLowerCase();

                return {
                    ...path,
                    liquidity: {
                        in: liquidityMap.get(keyIn)?.liquidity,
                        out: liquidityMap.get(keyOut)?.liquidity,
                    },
                };
            });


            return filteredPathsWithLiquidity;
        }

        return filteredPaths;
    }


    public static async isPoolExists(dex: DexBase, path: (string | any)[]): Promise<boolean> {
        try {
            const pool = await dex.getPoolAddress(path);
            if (!pool || pool === '0x0000000000000000000000000000000000000000') {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }


    public static removeDuplicates(paths: {
        dexIn: {
            type: DexType | undefined;
            interfaceName: DexInterfaceName;
        };
        dexOut: {
            type: DexType | undefined;
            interfaceName: DexInterfaceName;
        };
        pathIn: any[];
        pathOut: any[];
    }[]) {
        const uniquePaths = new Set<string>();
        const result = [];

        for (const path of paths) {
            const keyIn = path.dexIn.interfaceName + '-' + path.pathIn.join('-').toLowerCase();
            const keyOut = path.dexOut.interfaceName + '-' + path.pathOut.join('-').toLowerCase();
            const key = keyIn + '-' + keyOut;

            if (uniquePaths.has(key)) {
                continue;
            }

            uniquePaths.add(key);
            result.push(path);
        }

        return result;
    }


    // Helpers 
    private static _getPoolPairTasks(
        dexMap: Map<DexInterfaceName, DexBase>,
        params: {
            dexInterface: DexInterfaceName;
            path: (string | any)[];
        }[]
    ) {
        const poolPairTasks: (() => Promise<any | undefined>)[] = [];

        for (const param of params) {
            const dexInterfaceImpl = dexMap.get(param.dexInterface);
            if (!dexInterfaceImpl) continue;

            const splitPaths = dexInterfaceImpl.splitPath(param.path);

            // если хоть один путь пустой — пропускаем
            if (splitPaths.length === 0 || splitPaths.some(p => p.length === 0)) {
                continue;
            }

            // Создаём задачу
            poolPairTasks.push(async () => {
                const existenceResults = await Promise.all(
                    splitPaths.map(path => this.isPoolExists(dexInterfaceImpl, path))
                );

                // Если хотя бы один путь не существует — отбрасываем
                if (existenceResults.includes(false)) {
                    return undefined;
                }

                // Все пути валидны — возвращаем оригинальный полный путь
                return {
                    dexInterface: param.dexInterface,
                    path: param.path, // ← исходный путь, а не склеенный
                };
            });
        }

        return poolPairTasks;
    }

    private static _getPoolPairOnlyNonExistsTasks(
        dexMap: Map<DexInterfaceName, DexBase>,
        params: {
            dexInterface: DexInterfaceName;
            path: (string | any)[];
        }[]
    ) {
        const poolPairTasks: (() => Promise<any | undefined>)[] = [];

        for (const param of params) {
            const dexInterfaceImpl = dexMap.get(param.dexInterface);
            if (!dexInterfaceImpl) continue;

            const splitPaths = dexInterfaceImpl.splitPath(param.path);

            // если хоть один путь пустой — пропускаем весь param
            if (splitPaths.length === 0 || splitPaths.some(p => p.length === 0)) {
                continue;
            }

            // Добавляем задачу, если хотя бы один путь не существует
            poolPairTasks.push(async () => {
                const existenceResults = await Promise.all(
                    splitPaths.map(path => this.isPoolExists(dexInterfaceImpl, path))
                );

                // Если все существуют — пропускаем
                if (existenceResults.every(result => result === true)) {
                    return undefined;
                }

                // Есть хотя бы один несуществующий — вернуть как "невалидный"
                return {
                    dexInterface: param.dexInterface,
                    path: param.path,
                };
            });
        }

        return poolPairTasks;
    }

    private static _getLiquidityTasks(
        dexMap: Map<DexInterfaceName, DexBase>,
        pairPaths: {
            dexIn: {
                type: DexType | undefined;
                interfaceName: DexInterfaceName;
            };
            dexOut: {
                type: DexType | undefined;
                interfaceName: DexInterfaceName;
            };
            pathIn: any[];
            pathOut: any[];
        }[]
    ) {
        const uniquePaths = this._getUniquePaths(dexMap, pairPaths);
        const splittedPaths = this._getSplittedPaths(dexMap, uniquePaths);
        const liquidityTasks: (() => Promise<any | undefined>)[] = [];

        for (const splittedPath of splittedPaths) {
            const dexInterface = dexMap.get(splittedPath.dexInterface);
            if (!dexInterface) {
                continue;
            }

            liquidityTasks.push(async () => {
                const liquidity = await Promise.all(
                    splittedPath.pathSplitted.map(p => dexInterface.getPoolReserves(p))
                );
                return {
                    dexInterface: splittedPath.dexInterface,
                    path: splittedPath.path,
                    liquidity,
                };
            });
        }

        return liquidityTasks;
    }



    private static _parseValue(value: string): string | number | boolean | bigint {
        if (value === "true") return true;
        if (value === "false") return false;

        // Если строка начинается с 0x (или 0X) — не парсим
        if (value.startsWith("0x") || value.startsWith("0X")) {
            return value;
        }

        const num = Number(value);
        if (!isNaN(num) && value.trim() !== "") return num;
        return value;
    }

    private static _getSplittedPaths(dexMap: Map<DexInterfaceName, DexBase>, uniquePaths: Set<string>): {
        dexInterface: DexInterfaceName;
        path: any[];
        pathSplitted: any[][];
    }[] {
        const splittedPaths = [];

        for (const path of uniquePaths) {
            const dexInterface = path.split('-')[0];
            const pathParts = path.split('-').slice(1);
            const pathConcatinated = pathParts.map(part => this._parseValue(part));

            const dex = dexMap.get(dexInterface as DexInterfaceName);
            if (!dex) {
                continue;
            }

            const pathSplitted = dex.splitPath(pathConcatinated);

            splittedPaths.push({
                dexInterface: dexInterface as DexInterfaceName,
                path: pathConcatinated,
                pathSplitted: pathSplitted,
            });
        }

        return splittedPaths;
    }

    private static _getUniquePaths(
        dexMap: Map<DexInterfaceName, DexBase>,
        pairPaths: {
            dexIn: {
                type: DexType | undefined;
                interfaceName: DexInterfaceName;
            };
            dexOut: {
                type: DexType | undefined;
                interfaceName: DexInterfaceName;
            };
            pathIn: any[];
            pathOut: any[];
        }[]
    ) {
        const uniquePaths = new Set<string>();

        for (const path of pairPaths) {
            const dexInterfaceOut = dexMap.get(path.dexIn.interfaceName);
            if (dexInterfaceOut) {
                const reversedPath = dexInterfaceOut.getReversedPath(path.pathOut);
                uniquePaths.add(path.dexOut.interfaceName + '-' + reversedPath.join('-').toLowerCase());
            }
            uniquePaths.add(path.dexIn.interfaceName + '-' + path.pathIn.join('-').toLowerCase());
        }

        return uniquePaths;
    }
}
