export enum Network {
    Ethereum = 1,
    Base = 8453,
    Polygon = 137,
    Arbitrum = 42161,
    Optimism = 10,
    Avalanche = 43114,
    Fantom = 250,
    Gnosis = 100,
    BSC = 56,
    Harmony = 162,
    Klaytn = 8217,
    Moonbeam = 1284,
    Moonriver = 1285,
    Moonbase = 1287,
    MoonbeamAlpha = 1288,
}

export interface INetworkConfig {
    id: Network,
    rpcUrl: string,
    wssUrl: string,
    explorerUrl?: string,
    explorerApiKey?: string,
}