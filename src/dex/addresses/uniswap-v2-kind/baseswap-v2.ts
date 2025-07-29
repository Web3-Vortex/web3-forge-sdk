import { Network } from "../../../types/network";

// https://docs.baseswap.fi/baseswap/info/smart-contracts
export const baseswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.Base, {
        router: '0x327Df1E6de05895d2ab08513aaDD9313Fe505d86',
        factory: '0xFDa619b6d20975be80A10332cD39b9a4b0FAa8BB',
    }],
]);


