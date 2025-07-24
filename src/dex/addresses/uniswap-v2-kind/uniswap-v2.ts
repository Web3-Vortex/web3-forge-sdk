import { Network } from "../../../types/network";

export const uniswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.Ethereum, {
        router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    }],
    [Network.Base, {
        router: '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24',
        factory: '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6',
    }],
    [Network.Unichain, {
        router: '0x284f11109359a7e1306c3e447ef14d38400063ff',
        factory: '0x1f98400000000000000000000000000000000002',
    }],
    [Network.Arbitrum, {
        router: '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24',
        factory: '0xf1D7CC64Fb4452F05c498126312eBE29f30Fbcf9',
    }],
    [Network.Avalanche, {
        router: '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24',
        factory: '0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C',
    }],
    [Network.BSC, {
        router: '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24',
        factory: '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6',
    }],
    [Network.Optimism, {
        router: '0x4A7b5Da61326A6379179b40d00F57E5bbDC962c2',
        factory: '0x0c3c1c532F1e39EdF36BE9Fe0bE1410313E074Bf',
    }],
    [Network.Polygon, {
        router: '0xedf6066a2b290C185783862C7F4776A2C8077AD1',
        factory: '0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C',
    }],
    [Network.Blast, {
        router: '0xBB66Eb1c5e875933D44DAe661dbD80e5D9B03035',
        factory: '0x5C346464d33F90bABaf70dB6388507CC889C1070',
    }],
    [Network.Zora, {
        router: '0xa00F34A632630EFd15223B1968358bA4845bEEC7',
        factory: '0x0F797dC7efaEA995bB916f268D919d0a1950eE3C',
    }],
    [Network.WorldChain, {
        router: '0x541aB7c31A119441eF3575F6973277DE0eF460bd',
        factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    }],
]);
