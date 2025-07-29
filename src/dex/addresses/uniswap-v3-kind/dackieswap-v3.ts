import { Network } from "../../../types/network";


// https://docs.dackieswap.xyz/dackieswap/dackieswap-contracts/base-mainnet-contracts
export const dackieswapV3Addresses = new Map<Network, {router: string, factory: string, quoter: string}>([
    [Network.Base, {
        router: '0x195FBc5B8Fbd5Ac739C1BA57D4Ef6D5a704F34f7',
        factory: '0x3D237AC6D2f425D2E890Cc99198818cc1FA48870',
        quoter: '',
    }],
    [Network.Optimism, {
        router: '0xd1575B2e0C82fba9Eddc3de9c9AAF923AFA670cC',
        factory: '0xc2BC7A73613B9bD5F373FE10B55C59a69F4D617B',
        quoter: '',
    }],
    [Network.Mode, {
        router: '0x3D237AC6D2f425D2E890Cc99198818cc1FA48870',
        factory: '0xc6f3966E5D08Ced98aC30f8B65BeAB5882Be54C7',
        quoter: '',
    }],
]);
