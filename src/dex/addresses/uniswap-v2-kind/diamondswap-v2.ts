import { Network } from "../../../types/network";


// https://docs.diamondswap.com/docs/v2-deployment-addresses
export const diamondswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.Ethereum, {
        router: '0x57712F6FDb7e8be144a9157f5E7958B1Dc612480',
        factory: '0xE1046fcB1057ef82B68f3A6B8eBb0e411Cf334E0',
    }],
    [Network.BSC, {
        router: '0xdA627463977C8DA8E14A8afBafDdc8041DFC18B3',
        factory: '0x81A1417CBEc636e631fA62b81F970a5Ec23B39CA',
    }],
    [Network.Base, {
        router: '0x0681363e5da35a248E1abb5CddD6DB9cDac9a771',
        factory: '0x1a62A841E83ECC3D72b0de6002AF7a7Dbf921Cd5',
    }],
    [Network.Arbitrum, {
        router: '0xeAa3ff4F434EFe6eFBB148075EfF2e37D311568F',
        factory: '0xE56d7e0344C68D0C5A2456eed229115B4071DB5e',
    }],
    [Network.Linea, {
        router: '0xA69BC8eB7Edf32C403c3208A3360820f0C0BeC48',
        factory: '0xE3762AC5A3547c2734590Cb8A6e0cff3C690db84',
    }],
    [Network.Scroll, {
        router: '0xc8cefBd5429fD5413e5d9EF16F20eF93Da4F6Ec4',
        factory: '0xAcF7Ca94d3534D065fc1454EF18eB89948b9AAe7',
    }],
    [Network.Blast, {
        router: '0xc8cefBd5429fD5413e5d9EF16F20eF93Da4F6Ec4',
        factory: '0xfD5b5332D3472AD4ef539424B14D7C9182427dbB',
    }],
]);