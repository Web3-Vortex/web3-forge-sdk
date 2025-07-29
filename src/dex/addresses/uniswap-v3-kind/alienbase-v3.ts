import { Network } from "../../../types/network";

// https://docs.alienbase.xyz/alien-base-v3/v3-contracts
export const alienbaseV3Addresses = new Map<Network, {router: string, factory: string, quoter: string}>([
    [Network.Base, {
        router: '0xB20C411FC84FBB27e78608C24d0056D974ea9411',
        factory: '0x0Fd83557b2be93617c9C1C1B6fd549401C74558C',
        quoter: '',
    }],
]);
