import { Network } from "../../../types/network";

export const sushiswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.ArbitrumNova, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Arbitrum, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Avalanche, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Base, {
        router: '0x6BDED42c6DA8FBf0d2bA55B2fa120C5e0c8D7891',
        factory: '0x71524B4f93c58fcbF659783284E38825f0622859',
    }],
    [Network.Blast, {
        router: '0x54CF3d259a06601b5bC45F61A16443ed5404DD64',
        factory: '0x42Fa929fc636e657AC568C0b5Cf38E203b67aC2b',
    }],
    [Network.BobaAvax, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.BobaBnb, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Boba, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.BSC, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Celo, {
        router: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
        factory: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
        // TODO: add celo router 0xB45e53277a7e0F1D35f2a77160e91e25507f1763
    }],
    [Network.Core, {
        router: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
        factory: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
    }],
    [Network.Ethereum, {
        router: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
        factory: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
    }],
    [Network.Fantom, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Filecoin, {
        router: '0x46B3fDF7b5CDe91Ac049936bF0bDb12c5d22202e',
        factory: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
    }],
    [Network.Fuji, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Fuse, {
        router: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
        factory: '0x43eA90e2b786728520e4f930d2A71a477BF2737C',
    }],
    [Network.Haqq, {
        router: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
        factory: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
    }],
    [Network.Harmony, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Heco, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Hemi, {
        router: '0x46B3fDF7b5CDe91Ac049936bF0bDb12c5d22202e',
        factory: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
    }],
    [Network.Kava, {
        router: '0x1719DEf1BF8422a777f2442bcE704AC4Fb20c7f0',
        factory: '0xD408a20f1213286fB3158a2bfBf5bFfAca8bF269',
    }],
    [Network.Linea, {
        router: '0x2ABf469074dc0b54d793850807E6eb5Faf2625b1',
        factory: '0xFbc12984689e5f15626Bad03Ad60160Fe98B303C',
    }],
    [Network.Polygon, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Metis, {
        router: '0xbF3B71decBCEFABB3210B9D8f18eC22e0556f5F0',
        factory: '0x580ED43F3BBa06555785C81c2957efCCa71f7483',
    }],
    [Network.Moonbeam, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Moonriver, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Okex, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Optimism, {
        router: '0x2ABf469074dc0b54d793850807E6eb5Faf2625b1',
        factory: '0xFbc12984689e5f15626Bad03Ad60160Fe98B303C',
    }],
    [Network.Palm, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.PolygonZkEvm, {
        router: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
        factory: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
    }],
    [Network.RootStock, {
        router: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
        factory: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
    }],
    [Network.Scroll, {
        router: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
        factory: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
    }],
    [Network.Telos, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.Thundercore, {
        router: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
        factory: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
    }],
    [Network.XDai, {
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    }],
    [Network.ZetaChain, {
        router: '0x1f2FCf1d036b375b384012e61D3AA33F8C256bbE',
        factory: '0x33d91116e0370970444B0281AB117e161fEbFcdD',
    }],

    
]);