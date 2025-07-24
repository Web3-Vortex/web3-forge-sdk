import { Network } from "../../../types/network";

export const dackieswapV2Addresses = new Map<Network, {router: string, factory: string}>([
    [Network.Base, {
        router: '0xCa4EAa32E7081b0c4Ba47e2bDF9B7163907Fe56f',
        factory: '0x591f122D1df761E616c13d265006fcbf4c6d6551',
    }],
    [Network.Optimism, {
        router: '0x88651e15a6f1ECFf6BbC6390c16F6572bC285e84',
        factory: '0xaEdc38bD52b0380b2Af4980948925734fD54FbF4',
    }],
    [Network.Mode, {
        router: '0x507940c2469e6E3B33032F1d4FF8d123BDDe2f5C',
        factory: '0x757cD583004400ee67e5cC3c7A60C6a62E3F6d30',
    }],
]);