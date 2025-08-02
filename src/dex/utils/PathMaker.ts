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
        const uniquePaths = new Set<string>();

        for (const path of paths) {
            const dexInterfaceOut = dexes.get(path.dexIn.interfaceName);
            if (dexInterfaceOut) {
                const reversedPath = dexInterfaceOut.getReversedPath(path.pathOut);
                uniquePaths.add(path.dexOut.interfaceName + '-' + reversedPath.join('-').toLowerCase());
            }
            uniquePaths.add(path.dexIn.interfaceName + '-' + path.pathIn.join('-').toLowerCase());
        }

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
            if(dexInterface) {
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
}
