import { erc20Abi } from "../abi";
import type { IERC20Settings, IToken, ITokenable } from "../types";
import { ERC20 } from "./ERC20"

export class Token extends ERC20 implements ITokenable {
    private readonly _metadata: IToken;
    constructor({
        name,
        symbol,
        decimals,
        network,
        address,
        privateKey,
        abi = erc20Abi,
    }: IERC20Settings & IToken) {
        super({
            address,
            network,
            abi,
            privateKey
        });
        this._metadata = {
            name,
            symbol,
            decimals,
        };
    }

    public get metadata(): IToken {
        return this._metadata;
    }
}