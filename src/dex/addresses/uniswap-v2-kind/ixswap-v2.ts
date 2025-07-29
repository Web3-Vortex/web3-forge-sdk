import { Network } from "../../../types/network";


// https://github.com/IXS-Finance/interface/blob/main/src/constants/chains.ts
export const ixswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.Base, {
        router: '0x38e1B66bdfd6DF1e79567D9E4D34Febf99823Ed3',
        factory: '0x2eE28d1Bbc2EcB1fFDB83E8055d585E9F0fb757f',
    }],
    [Network.Polygon, {
        router: '0x72f54BEbabE8A26794B8BFeA832b65B7Bd88da37',
        factory: '0xc2D0e0bc81494adB71Ce9Aa350cC875DaE12D81D',
    }],
    [Network.Redbelly, {
        router: '0x0338acFA4F8c6Ae7EC7f8A218Bc436a6A261c874',
        factory: '0x80747745DcDdDb5a8Eb3fb2fBfAb21fE7990aF15',
    }],
    // TODO: check it for the future
    // [Network.Avalanche, {
    //     router: '',
    //     factory: '',
    // }],
    // [Network.Kaia, {
    //     router: '',
    //     factory: '',
    // }],
]);