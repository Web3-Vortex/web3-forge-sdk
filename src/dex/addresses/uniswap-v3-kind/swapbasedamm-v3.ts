import { Network } from "../../../types/network";


// https://docs.swapbased.finance/informational/contract-adresses
export const swapBasedAmmV3Addresses = new Map<Network, {router: string, factory: string, quoter: string}>([
    [Network.Base, {
        router: '0x756C6BbDd915202adac7beBB1c6C89aC0886503f',
        factory: '0xb5620F90e803C7F957A9EF351B8DB3C746021BEa',
        quoter: '',
    }],
]);
