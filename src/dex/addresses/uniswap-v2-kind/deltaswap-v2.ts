import { Network } from "../../../types/network";


// https://docs.gammaswap.com/resources/contract-addresses
export const deltaswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.Ethereum, {
        router: '0x5FbE219e88f6c6F214Ce6f5B1fcAa0294F31aE1b',
        factory: '0xCF2b6bC8c0e0a1292dB7f0AE89410670796350c8',
    }],
    [Network.Arbitrum, {
        router: '0x5FbE219e88f6c6F214Ce6f5B1fcAa0294F31aE1b',
        factory: '0xCb85E1222f715a81b8edaeB73b28182fa37cffA8',
    }],
    [Network.Base, {
        router: '0x1b7655aa64b7BD54077dE56B64a0f92BCba05b85',
        factory: '0x9A9A171c69cC811dc6B59bB2f9990E34a22Fc971',
    }],
    
]);