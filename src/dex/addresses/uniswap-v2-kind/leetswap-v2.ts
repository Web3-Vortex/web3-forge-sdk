import { Network } from "../../../types/network";

export const leetswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.Base, {
        router: '0xaaa3b1F1bd7BCc97fD1917c18ADE665C5D31F066',
        factory: '0x04C9f118d21e8B767D2e50C946f0cC9F6C367300',
    }],
    [Network.opBNB, {
        router: '0xd3Ea3BC1F5A3F881bD6cE9761cbA5A0833a5d737',
        factory: '0xa2899c776bAAF9925d432F83C950D5054A6CF59C',
    }],
    [Network.Linea, {
        router: '0xd3Ea3BC1F5A3F881bD6cE9761cbA5A0833a5d737',
        factory: '0xa2899c776bAAF9925d432F83C950D5054A6CF59C',
    }],
    [Network.Scroll, {
        router: '0xd3Ea3BC1F5A3F881bD6cE9761cbA5A0833a5d737',
        factory: '0xa2899c776bAAF9925d432F83C950D5054A6CF59C',
    }],
    [Network.Manta, {
        router: '0xd3Ea3BC1F5A3F881bD6cE9761cbA5A0833a5d737',
        factory: '0xa2899c776bAAF9925d432F83C950D5054A6CF59C',
    }],
    [Network.Shibarium, {
        router: '0x3613F73F2eaf7B359571F4c346E5c6D526E70eC1',
        factory: '0xd3Ea3BC1F5A3F881bD6cE9761cbA5A0833a5d737',
    }],
    [Network.PolygonZkEvm, {
        router: '0xd3Ea3BC1F5A3F881bD6cE9761cbA5A0833a5d737',
        factory: '0xa2899c776bAAF9925d432F83C950D5054A6CF59C',
    }],
    [Network.Canto, {
        router: '0xD463786E7d54Fc570A92982157E15130e469dcD8',
        factory: '0x1BB9cf4e63CD2DAb8741c334f525350AB2Ee2c96',
    }],
]);


