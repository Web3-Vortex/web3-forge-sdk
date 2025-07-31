import { Contract, parseUnits, formatUnits, ZeroAddress } from "ethers";
import { INetworkConfig } from "../types/network";
import { erc20Abi } from "../erc20/abi/erc20-abi";
import { aerodromeV2RouterAbi, aerodromeV2FactoryAbi, aerodromeV2CLFactoryAbi, aerodromeV2PoolAbi, aerodromeV2CLPoolAbi } from "./abi/aerodrome";
import { aerodromeV2Addresses } from "./addresses/uniswap-v2-kind/aerodrome-v2";
import { DexBase } from "./DexBase";
import { DexType } from "./types/IDexParams";
import { ERC20 } from "../erc20/contracts/ERC20";


/**
 * Path-формат Solidly/Aerodrome style:
 *   [token0, token1, fee0, isStable0, factory0,
 *    token1, token2, fee1, isStable1, factory1,
 *    ...]
 *
 * На выходе – массив объектов
 *   { from, to, stable, factory }
 */
type RouteSeg = { from: string; to: string; stable: boolean; factory: string };


export class AerodromeV2 extends DexBase {
    private _clfactoryContract: Contract;

    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = aerodromeV2Addresses.get(network.id)!;
        super({
            network,
            type: DexType.AerodromeV2,
            name: overrides?.name ?? 'Aerodrome V2',
            router: {
                address: overrides?.routerAddress ?? addresses.router,
                abi: aerodromeV2RouterAbi,
            },
            factory: {
                address: overrides?.factoryAddress ?? addresses.factory,
                abi: aerodromeV2FactoryAbi,
            },
        });

        this._clfactoryContract = new Contract(addresses.clfactory, aerodromeV2CLFactoryAbi, this._provider);
    }

    // в параметр path вставляем два токена для находа пары
    // цена будет возвращаться по первому токену из пары вставленному в path
    public async getTokenPrice(path: (string | boolean)[]): Promise<number> {
        const token = new Contract(path[0] as string, erc20Abi, this._provider);
        const tokenQuote = new Contract(path[path.length - 1] as string, erc20Abi, this._provider);

        const parsedPath = this._parsePath(path);

        const [decimals, decimalsQuote]: [bigint, bigint] = await Promise.all([
            token.decimals(),
            tokenQuote.decimals()
        ]);
        const amountsOut: bigint = (await this._routerContract.getAmountsOut(parseUnits('1', decimals), parsedPath))[0];

        return +formatUnits(amountsOut, decimalsQuote);
    }

    public async getFactoryAddress(): Promise<string> {
        return await this._routerContract.defaultFactory();
    }

    public async getPoolCount(): Promise<{
        clFactoryPoolCount: number,
        factoryPoolCount: number,
    }> {
        const [clCount, factoryCount] = await Promise.all([
            this._clfactoryContract.allPoolsLength(),
            this._factoryContract.allPoolsLength(),
        ]);

        return {
            clFactoryPoolCount: clCount,
            factoryPoolCount: factoryCount,
        };
    }

    public async getPoolAddressByIndex(index: number): Promise<{
        clFactoryPool: string,
        clPool: string,
    }> {
        const {
            clFactoryPoolCount,
            factoryPoolCount,
        } = await this.getPoolCount();

        const clFactoryPoolCountMinusOne = Number(clFactoryPoolCount) - 1;
        const factoryPoolCountMinusOne = Number(factoryPoolCount) - 1;

        if(index > clFactoryPoolCountMinusOne && index > factoryPoolCountMinusOne) {
            return {
                clFactoryPool: ZeroAddress,
                clPool: ZeroAddress,
            };
        }

        if (index >= clFactoryPoolCountMinusOne && index <= factoryPoolCountMinusOne) {
            const clFactoryPool = await this._factoryContract.allPools(index);

            return {
                clFactoryPool: ZeroAddress,
                clPool: clFactoryPool,
            };
        } else if (index >= factoryPoolCountMinusOne && index <= clFactoryPoolCountMinusOne) {
            const clFactoryPool = await this._factoryContract.allPools(index);

            return {
                clFactoryPool: clFactoryPool,
                clPool: ZeroAddress,
            };
        }

        const [clFactoryPool, clPool] = await Promise.all([
            this._clfactoryContract.allPools(index),
            this._factoryContract.allPools(index),
        ]);

        return {
            clFactoryPool,
            clPool,
        };
    }

    public async getPoolAddress(path: (string | boolean | number | bigint)[]): Promise<string> {
        const isFeePool = typeof path[1] !== 'boolean';

        if (isFeePool) {
            return await this._clfactoryContract.getPool(
                path[0],
                path[path.length - 1],
                path[1] as (number | bigint),
            );
        }

        return await this._factoryContract["getPool(address,address,bool)"](
            path[0],
            path[path.length - 1],
            path[1] as boolean,
        );
    }

    public async getPoolReserves(path: (string | boolean | number | bigint)[]): Promise<{
        reserve0: number,
        reserve1: number,
        blockTimestampLast?: number,
        sqrtPriceX96?: string,
        liquidity?: string,
    }> {
        const isFeePool = typeof path[1] !== 'boolean';
        const token0 = new ERC20(path[0] as string, this._provider);
        const token1 = new ERC20(path[path.length - 1] as string, this._provider);
        const pair = await this.getPoolAddress(path);

        if(pair === ZeroAddress) {
            return {
                reserve0: 0,
                reserve1: 0,
                blockTimestampLast: 0,
            };
        }

        if (!isFeePool) {
            const pairContract = new Contract(pair, aerodromeV2PoolAbi, this._provider);
            const [reserve0, reserve1, blockTimestampLast] = await pairContract.getReserves();
            const [decimals0, decimals1] = await Promise.all([
                token0.getDecimals(),
                token1.getDecimals(),
            ]);

            return {
                reserve0: Number(reserve0) / 10**Number(decimals0),
                reserve1: Number(reserve1) / 10**Number(decimals1),
                blockTimestampLast: Number(blockTimestampLast),
            };
        }

        const poolContract = new Contract(pair, aerodromeV2CLPoolAbi, this._provider);
        const [sqrtPriceX96Struct, liquidity] = await Promise.all([
            poolContract.slot0(),
            poolContract.liquidity(),
        ]);

        const sqrtPriceX96 = sqrtPriceX96Struct.sqrtPriceX96 ?? sqrtPriceX96Struct[0]; // совместимость

        const [dec0, dec1] = await Promise.all([
            token0.getDecimals(),
            token1.getDecimals(),
        ]);

        // вычисляем виртуальные резервы
        const Q96 = BigInt(2) ** BigInt(96);
        const sqrtX = BigInt(sqrtPriceX96);
        const L = BigInt(liquidity.toString());

        const reserve0 = Number(L * Q96 / sqrtX) / 10 ** Number(dec0);
        const reserve1 = Number(L * sqrtX / Q96) / 10 ** Number(dec1);

        return {
            reserve0,
            reserve1,
            sqrtPriceX96: sqrtX.toString(),
            liquidity: L.toString(),
        };
    }

    public async simulateSwap<T>(
        from: string,
        amountsIn: bigint,
        path: (string | boolean)[],
        sendTo?: string,
        overrides?: {
            gasLimit?: number,
            maxFeePerGas?: number,
            maxPriorityFeePerGas?: number,
        }
    ) {
        const deadline = Math.floor(Date.now() / 1000) + 10000;

        const data = await this._routerContract.swapExactTokensForTokens.staticCallResult(
            amountsIn,
            0,
            this._parsePath(path),
            sendTo ?? from,
            deadline,
            {
                ...overrides,
                from,
            }
        );

        return data;
    }


    public getEncodedSwap(
        amountsIn: bigint,
        path: (string | boolean)[],
        sendTo: string,
        slippage?: number,
    ): {
        data: string,
        topHalf: string,
        bottomHalf: string,
    } {
        const deadline = Math.floor(Date.now() / 1000) + 10000;
        const amountOutMin = slippage ? amountsIn * BigInt(10000 - slippage) / BigInt(10000) : 0;

        const data = this._routerContract.interface.encodeFunctionData(
            'swapExactTokensForTokens',
            [
                amountsIn,
                amountOutMin,
                this._parsePath(path),
                sendTo,
                deadline,
            ]
        );

        return {
            data,
            topHalf: data.slice(0, 10),
            bottomHalf: '0x' + data.slice(74),
        }
    }


    public getReversedPath(path: (string | boolean)[]): (string | boolean)[] {
        return path.reverse();
    }

    public splitPath(path: (string | boolean | number | bigint)[]): (string | number | bigint | boolean)[][] {
        if (path.length === 1) {
            return [];
        }
        if (path.length === 3) {
            return [path];
        }

        const pools: (string | bigint | number | boolean)[][] = [];

        for (let i = 0; i < path.length - 2; i += 2) {
            pools.push(path.slice(i, i + 3));
        }

        return pools;
    }


    // HELPERS
    private _parsePath(path: (string | boolean)[]): RouteSeg[] {
        if (path.length < 3 || (path.length - 1) % 2 !== 0) {
            throw new Error("Invalid path: must be token,token,stable,factory repeating");
        }

        const routes: RouteSeg[] = [];

        // первый токен - это path[0]; дальше группы длиной 4 с перекрытием
        for (let i = 0; i < path.length - 2; i += 2) {
            routes.push({
                from: path[i] as string,
                to: path[i + 2] as string,
                stable: Boolean(path[i + 1]),
                factory: this._factoryContract.target as string,
            });
        }

        return routes;
    }
}

