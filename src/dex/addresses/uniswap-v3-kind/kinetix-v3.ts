import { Network } from "../../../types/network";


// https://docs.kinetix.finance/smart-contract-overview/v2-and-v3-dex
export const kinetixV3Addresses = new Map<Network, {router: string, factory: string, quoter: string}>([
    [Network.Base, {
        router: '0x4548d4eA048729b560cdC89D87eeF57abB756e7f',
        factory: '0xdDF5a3259a88Ab79D5530eB3eB14c1C92CD97FCf',
        quoter: '0xbBD8dD47DBEc68412Ac3f93C102A6Ac45C5c7644',
    }],
    [Network.Kava, {
        router: '0xc8f22018D3c5f5A4101fB1448d5E5CcdDA4f123e',
        factory: '0x2dBB6254231C5569B6A4313c6C1F5Fe1340b35C2 ',
        quoter: '0xfa737a10f74831aA3cC1D4e3BdcC6aF997f16CCD',
    }],
]);
