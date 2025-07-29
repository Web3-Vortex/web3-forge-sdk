import { Network } from "../../../types/network";


// https://docs.rocketswap.cc/contracts-and-audit-report
export const rocketswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.Base, {
        router: '0x4cf76043B3f97ba06917cBd90F9e3A2AAC1B306e',
        factory: '0x1B8128c3A1B7D20053D10763ff02466ca7FF99FC',
    }],
    [Network.opBNB, {
        router: '0xBe35BeEC0AC33eefBcfaf16e8088897153C69fCB',
        factory: '0xc83ef35eB044b57850CF28EfF40067719F136770',
    }],
    // TODO: find addresses in Shibarium Chain
]);