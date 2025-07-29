import { Network } from "../../../types/network";


// https://docs.wagmi.com/wagmi/contracts
export const wagmiV3Addresses = new Map<Network, {router: string, factory: string, quoter: string}>([
    [Network.Ethereum, {
        router: '0xD8ac778DB70221AB635921460C6BF70cC6d65293',
        factory: '0xB9a14EE1cd3417f3AcC988F61650895151abde24',
        quoter: '0x66034b71A749E655feE0005C5496D5c0949590F0',
    }],
    [Network.Sonic, {
        router: '0x1Ac569879EF7EacB17CC373EF801cDcE4acCdeD5',
        factory: '0x56CFC796bC88C9c7e1b38C2b0aF9B7120B079aef',
        quoter: '0xDb51CffFf3B989d0cB6b58AbF173371b6F2d0D24',
    }],
    [Network.Avalanche, {
        router: '0xd5B59C29efC50348241e815D1AFc37d1A7B26544',
        factory: '0x08d6E1aE0f91423dDBD16f083ca39ccDd1D79cE8',
        quoter: '0x834ddb3d0e54C6d14204c6eC91992aCd66570B87',
    }],
    [Network.BSC, {
        router: '0x83a98D089D0cB37BB82Aa5aE16033C93f474b8a9',
        factory: '0xE3Dc1A5a7aB81F1cC1895FA55034725c24a5BD0e',
        quoter: '0x367Af54525c40337578a0F306C200ba3912462Ff',
    }],
    [Network.Polygon, {
        router: '0x53dca7E0015B8c445881A9BC2baC1D8648d7f800',
        factory: '0x8bb1Be7acD806BF6C9766486dC4c21284a472BaC',
        quoter: '0x86fD613D79ceA7ce51deFd31Bfcf68ADbF4038Fa',
    }],
    [Network.Fantom, {
        router: '0x0834Cf32553B255c767957588936881Ad8089485',
        factory: '0xaf20f5f19698f1D19351028cd7103B63D30DE7d7',
        quoter: '0x5dB68a533465040F5185e2771746AFed8CC4D14E',
    }],
    [Network.Arbitrum, {
        router: '0x491D195B05DF4e9fD6Aba8C00e6f6d3459A1aB51',
        factory: '0x7301350CC76D669ea384e77aF38a70C61661CA48',
        quoter: '0x4E537A3A1E59FCdfA225FA470976B356786888Cc',
    }],
    [Network.Optimism, {
        router: '0x49660491C29344C3C8E463Ed1867A68fb69Bb519',
        factory: '0xC49c177736107fD8351ed6564136B9ADbE5B1eC3',
        quoter: '0xe4d69A93e8CB390B4Fc04Dc7836a8206F074949C',
    }],
    [Network.Kava, {
        router: '0xB9a14EE1cd3417f3AcC988F61650895151abde24',
        factory: '0x0e0Ce4D450c705F8a0B6Dd9d5123e3df2787D16B',
        quoter: '0x8187808B163E7CBAcCc4D0A9B138AE6196ac1f72',
    }],
    [Network.Metis, {
        router: '0x8B741B0D79BE80E135C880F7583d427B4D41F015',
        factory: '0x8112E18a34b63964388a3B2984037d6a2EFE5B8A',
        quoter: '0xB9a14EE1cd3417f3AcC988F61650895151abde24',
    }],
    [Network.Base, {
        router: '0xB5fa77E3929fe198a86Aa40fd6c77886785bCd0e',
        factory: '0x576A1301B42942537d38FB147895fE83fB418fD4',
        quoter: '0x8B741B0D79BE80E135C880F7583d427B4D41F015',
    }],
    [Network.Iota, {
        router: '0xaE7b92C8B14E7bdB523408aE0A6fFbf3f589adD9',
        factory: '0x01Bd510B2eA106917e711f9a05a42fC162bee2Ac',
        quoter: '0x5C08A6762CAF9ec8a42F249eBC23aAE66097218D',
    }],
]);
