import { Contract, formatUnits, parseUnits, solidityPacked } from "ethers";

import { INetworkConfig } from "../types/network";
import { DexBase } from "./DexBase";
import { DexType } from "./types/IDexParams";
import { erc20Abi } from "../erc20/abi/erc20-abi";
import { cutEncodedDataParams } from "../utils/cut-encoded-data-params";
import { quoterAbi, routerAbi, factoryAbi } from "./abi/uniswap-v3";

export class DexBaseKindUniswapV3 extends DexBase {
    protected readonly _quoterContract: Contract;

    constructor(
        routerAddress_: string,
        factoryAddress_: string,
        quoterAddress_: string,
        network: INetworkConfig,
        name?: string,
    ) {
        super({
            network,
            type: DexType.UniswapV2,
            name: name ?? 'Uniswap V2',
            router: {
                address: routerAddress_,
                abi: routerAbi,
            },
            factory: {
                address: factoryAddress_,
                abi: factoryAbi,
            },
        });

        this._quoterContract = new Contract(quoterAddress_, quoterAbi, this._provider);
    }


    public async getTokenPrice<T extends string | bigint | number>(
        path: T[]
    ): Promise<number> {
        const token = new Contract(path[0] as string, erc20Abi, this._provider);
        const tokenQuote = new Contract(path[path.length - 1] as string, erc20Abi, this._provider);

        const encodedPath = this._encodePath(path);

        const [decimals, decimalsQuote]: [bigint, bigint] = await Promise.all([
            token.decimals(),
            tokenQuote.decimals()
        ]);

        const amountsOut: bigint = (await this._quoterContract.quoteExactInput.staticCall(encodedPath, parseUnits('1', decimals)))[0];

        return +formatUnits(amountsOut, decimalsQuote);
    }

    public async getPoolAddress(path: string[]): Promise<string> {
        return await this._factoryContract.getPair(path[0], path[1]);
    }

    public async getFactoryAddress(): Promise<string> {
        return await this._routerContract.factory();
    }

    public splitPath(path: string[]): string[][] {
        if(path.length === 1) {
            return [];
        }
        if(path.length === 2) {
            return [path];
        }

        const pools: string[][] = [];
        for (let i = 0; i < path.length - 1; i++) {
            pools.push([path[i], path[i + 1]]);
        }
        return pools;
    }

    public getEncodedSwap(
        amountsIn: bigint,
        path: (string | any)[],
        sendTo: string
    ): {
        data: string,
        topHalf: string,
        bottomHalf: string,
    } {
        const deadline = Math.floor(Date.now() / 1000) + 10000;

        const data = this._routerContract.interface.encodeFunctionData(
            'swapExactTokensForTokens',
            [
                amountsIn,
                0,
                path,
                sendTo,
                deadline
            ]
        );

        return {
            data,
            ...cutEncodedDataParams(data),
        }
    }


    public async simulateSwap(
        from: string,
        amountsIn: bigint,
        path: (string | any)[],
        sendTo: string
    ) {
        const deadline = Math.floor(Date.now() / 1000) + 600;
        return await this._routerContract.swapExactTokensForTokens.staticCallResult(
            amountsIn,
            0,
            path,
            sendTo,
            deadline,
            {from}
        );
    }


    
    private _encodePath<T>(path: T[]) {
        if (path.length < 2) {
            throw new Error('Path must have at least two addresses.');
        }
        if (path.length % 2 === 0) {
            throw new Error(
                'Path length must be odd (addresses and fees alternate).',
            );
        }

        const types = [];
        for (let i = 0; i < path.length; i++) {
            types.push(i % 2 === 0 ? 'address' : 'uint24'); // Чередуем address и uint24
        }

        return solidityPacked(types, path);
    }
}