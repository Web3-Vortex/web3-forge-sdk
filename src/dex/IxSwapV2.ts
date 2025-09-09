import { Contract, parseUnits, formatUnits, MaxUint256, id } from "ethers";
import { INetworkConfig } from "../types/network";
import { ixswapV2Addresses } from "./addresses/uniswap-v2-kind/ixswap-v2";
import { DexBaseKindUniswapV2 } from "./UniswapV2Kind";
import { routerAbi } from "./abi/ixswap-v2";
import { erc20Abi } from "../erc20/abi/erc20-abi";

const emptyAuthorisation = {
    operator: '0x0000000000000000000000000000000000000000',
    deadline:
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    v: 0,
    r: '0x0000000000000000000000000000000000000000000000000000000000000000',
    s: '0x0000000000000000000000000000000000000000000000000000000000000000',
};

export class IxSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string,
        factoryAddress: string,
        name?: string,
    }) {
        const addresses = ixswapV2Addresses.get(network.id)!;
        super(
            overrides?.routerAddress ?? addresses.router,
            overrides?.factoryAddress ?? addresses.factory,
            network,
            overrides?.name ?? 'IXSwap V2',
            routerAbi,
        );
    }

    // в параметр path вставляем два токена для находа пары
    // цена будет возвращаться по первому токену из пары вставленному в path
    public async getTokenPrice(path: string[]): Promise<number> {
        const secPath = Array.from({ length: path.length }, () => false);
        const token = new Contract(path[0], erc20Abi, this._provider);
        const tokenQuote = new Contract(path[path.length - 1], erc20Abi, this._provider);

        const [decimals, decimalsQuote] = await Promise.all([
            token.decimals(),
            tokenQuote.decimals()
        ]);

        const amountsOut = await this._routerContract.getAmountsOut(
            parseUnits('1', decimals),
            path,
            secPath
        );

        return +formatUnits(amountsOut[amountsOut.length - 1], decimalsQuote);
    }

    public async simulateSwap<T>(
        from: string,
        amountsIn: bigint,
        path: T[],
        sendTo: string,
        overrides?: {
            gasLimit?: number,
            maxFeePerGas?: number,
            maxPriorityFeePerGas?: number,
        }
    ) {
        const deadline = Math.floor(Date.now() / 1000) + 600;
        return await this._routerContract.swapExactTokensForTokens.staticCallResult(
            amountsIn,
            0,
            path,
            sendTo,
            MaxUint256,
            [emptyAuthorisation, emptyAuthorisation],
            {
                ...overrides,
                from,
            }
        );
    }


    public getEncodedSwap<T>(
        amountsIn: bigint,
        path: T[],
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
                path,
                sendTo,
                MaxUint256,
                [emptyAuthorisation, emptyAuthorisation]
            ]
        );

        return {
            data,
            topHalf: data.slice(0, 10),
            bottomHalf: '0x' + data.slice(74),
        }
    }
}

