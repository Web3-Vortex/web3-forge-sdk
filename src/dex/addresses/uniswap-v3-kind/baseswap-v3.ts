import { Network } from "../../../types/network";


// https://docs.baseswap.fi/baseswap/info/smart-contracts
export const baseswapV3Addresses = new Map<Network, {router: string, factory: string, quoter: string}>([
    [Network.Base, {
        router: '0x1B8eea9315bE495187D873DA7773a874545D9D48',
        factory: '0x38015D05f4fEC8AFe15D7cc0386a126574e8077B',
        quoter: '',
    }],
]);
