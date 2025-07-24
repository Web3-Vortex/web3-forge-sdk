import { Network } from "../../../types/network";

export const pancakeswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.BSC, {
        router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    }],
    [Network.Ethereum, {
        router: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
        factory: '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362',
    }],
    [Network.ZkEVM, {
        router: '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
        factory: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
    }],
    [Network.ZkSync, {
        router: '0x5aEaF2883FBf30f3D62471154eDa3C0c1b05942d',
        factory: '0xd03D8D566183F0086d8D09A84E1e30b58Dd5619d',
    }],
    [Network.Arbitrum, {
        router: '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
        factory: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
    }],
    [Network.Linea, {
        router: '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
        factory: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
    }],
    [Network.Base, {
        router: '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
        factory: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
    }],
    [Network.opBNB, {
        router: '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
        factory: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
    }],
]);