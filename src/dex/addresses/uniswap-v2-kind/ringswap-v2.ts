import { Network } from "../../../types/network";


// https://ringprotocol.gitbook.io/ring/docs/deployments
export const ringswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.Blast, {
        router: '0x7001F706ACB6440d17cBFaD63Fa50a22D51696fF',
        factory: '0x24F5Ac9A706De0cF795A8193F6AB3966B14ECfE6',
    }],
    [Network.Ethereum, {
        router: '0x39d1d8fcC5E6EEAf567Bce4e29B94fec956D3519',
        factory: '0xeb2A625B704d73e82946D8d026E1F588Eed06416',
    }],
    [Network.Base, {
        router: '0x224749CDd5791480ECEBE452e5FFAEfEf94Cd254',
        factory: '0x9BfFC3B30D6659e3D84754cc38865B3D60B4980E',
    }],
    [Network.BSC, {
        router: '0x20504f37A95eF80e3FC7476c4801fb39AaE6bAd0',
        factory: '0x4De602A30Ad7fEf8223dcf67A9fB704324C4dd9B',
    }],
    [Network.Arbitrum, {
        router: '0xD69ed581480239357515e200560353AF1BbaA46A',
        factory: '0x1246Fa62467a9AC0892a2d2A9F9aafC2F5609442',
    }],
    [Network.Story, {
        router: '0xf9d7ff2f6A0c3631A807199276a493Af8097916F',
        factory: '0xEeE400Eabfba8F60f4e6B351D8577394BeB972CD',
    }],
    [Network.Unichain, {
        router: '0xf9d7ff2f6A0c3631A807199276a493Af8097916F',
        factory: '0xEeE400Eabfba8F60f4e6B351D8577394BeB972CD',
    }],
]);