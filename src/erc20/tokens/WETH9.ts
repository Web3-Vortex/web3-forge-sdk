import { TAddress } from "../../types/hex";
import { Network } from "../../types/network";
import { weth9abi } from "../abi";
import { IERC20Settings } from "../types";
import { Token } from "./Token";

const wethAddresses = new Map<Network, string>([
    [Network.Ethereum, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
    [Network.Base, '0x4200000000000000000000000000000000000006'],
]);


export class WETH9 extends Token {
    constructor({
        network,
        privateKey,
        address = wethAddresses.get(network.id) ?? wethAddresses.get(Network.Ethereum)!,
        abi = weth9abi,
    }: Omit<IERC20Settings, "address"> & {address?: TAddress}) {
        // const address = overrides?.address ?? wethAddresses.get(network.id) ?? wethAddresses.get(Network.Ethereum)!;
        super({
            name: "Wrapped Ether",
            symbol: "WETH",
            decimals: 18,
            address,
            network,
            abi,
            privateKey
        });
    }

    public async deposit(amount: bigint) {
        const tx = await this._contract.deposit({ value: amount });
        return tx;
    }

    public async withdraw(amount: bigint) {
        const tx = await this._contract.withdraw(amount);
        return tx;
    }
}