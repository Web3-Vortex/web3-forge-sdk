import { INetworkConfig } from "../../types";
import { TAddress, TPrivateKey } from "../../types/hex";

export interface IToken {
    name: string;
    symbol: string;
    decimals: number;
}

export interface IERC20Settings {
    address: TAddress,
    network: INetworkConfig,
    abi?: any,
    privateKey?: TPrivateKey,
}

export interface ITokenable {
    get metadata(): IToken;
}