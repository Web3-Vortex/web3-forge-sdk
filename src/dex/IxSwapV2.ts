import { Contract, parseUnits, formatUnits, MaxUint256 } from "ethers";
import type { INetworkConfig } from "../types/network";
import { ixswapV2Addresses } from "./addresses/uniswap-v2-kind/ixswap-v2";
import { DexBaseKindUniswapV2 } from "./UniswapV2Kind";
import { routerAbi } from "./abi/ixswap-v2";
import { erc20Abi } from "../erc20/abi/erc20-abi";
import { DexInterfaceName } from "./types/IDexParams";

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
        name?: DexInterfaceName,
    }) {
        const addresses = ixswapV2Addresses.get(network.id)!;
        const {
            routerAddress = addresses.router,
            factoryAddress = addresses.factory,
            name = DexInterfaceName.IXSwap,
        } = overrides ?? {};
        super(
            routerAddress as string,
            factoryAddress as string,
            network,
            name,
            routerAbi
        );
    }

    // в параметр path вставляем два токена для находа пары
    // цена будет возвращаться по первому токену из пары вставленному в path
    public override async getTokenPrice(path: string[]): Promise<number> {
        if(path.length < 2) {
            throw new Error('path length should be at least 2');
        }
        const secPath = Array.from({ length: path.length }, () => false);
        const token = new Contract(path[0] as string, erc20Abi, this._provider);
        const tokenQuote = new Contract(path[path.length - 1] as string, erc20Abi, this._provider);

        const [decimals, decimalsQuote] = await Promise.all([
            // @ts-expect-error: ABI methods are attached at runtime by ethers
            token.decimals(),
            // @ts-expect-error: ABI methods are attached at runtime by ethers
            tokenQuote.decimals()
        ]);

        // @ts-expect-error: ABI methods are attached at runtime by ethers
        const amountsOut = await this._routerContract.getAmountsOut(
            parseUnits('1', decimals),
            path,
            secPath
        );

        return +formatUnits(amountsOut[amountsOut.length - 1], decimalsQuote);
    }

    public override async simulateSwap<T>(
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
        // const deadline = Math.floor(Date.now() / 1000) + 600;
        // @ts-expect-error: ABI methods are attached at runtime by ethers
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


    public override getEncodedSwap<T>(
        amountsIn: bigint,
        path: T[],
        sendTo: string,
        slippage?: number,
    ): {
        data: string,
        topHalf: string,
        bottomHalf: string,
    } {
        // const deadline = Math.floor(Date.now() / 1000) + 10000;
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

