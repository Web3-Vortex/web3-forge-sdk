import { INetworkConfig, Network } from "../../types/network";
import { ERC20 } from "../contracts/ERC20";

const wethAddresses = new Map<Network, string>([
    [Network.Ethereum, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
    [Network.Base, '0x4200000000000000000000000000000000000006'],
]);


export class Weth extends ERC20 {
    constructor(network: INetworkConfig, overrides?: {address: string}) {
        const address = overrides?.address ?? wethAddresses.get(network.id) ?? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
        super(address, network);
    }
}