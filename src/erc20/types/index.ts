
import type { TAddress, TPrivateKey } from "../../types/hex";
import type { INetworkConfig } from "../../types/network";

export interface IToken {
    name: string;
    symbol: string;
    decimals: number;
}

export interface IERC20Settings {
    address: TAddress,
    network: INetworkConfig,
    abi?: any,
    privateKey?: TPrivateKey | null | undefined,
}

export interface ITokenable {
    get metadata(): IToken;
}