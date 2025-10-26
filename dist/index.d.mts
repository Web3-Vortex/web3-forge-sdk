import * as ethers from 'ethers';
import { JsonRpcProvider, Contract, AbiCoder, TransactionResponse, TransactionRequest } from 'ethers';
import { TransactionType } from '@ethereumjs/tx';
import { BigIntLike } from '@ethereumjs/util';

declare const aerodromeV2RouterAbi: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    name?: undefined;
    outputs?: undefined;
} | {
    inputs: never[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: ({
        internalType: string;
        name: string;
        type: string;
        components?: undefined;
    } | {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    })[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
} | {
    stateMutability: string;
    type: string;
    inputs?: undefined;
    name?: undefined;
    outputs?: undefined;
})[];
declare const aerodromeV2FactoryAbi: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    name?: undefined;
    anonymous?: undefined;
    outputs?: undefined;
} | {
    inputs: never[];
    name: string;
    type: string;
    stateMutability?: undefined;
    anonymous?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
declare const aerodromeV2CLFactoryAbi: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
declare const aerodromeV2CLPoolAbi: ({
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    outputs?: undefined;
    stateMutability?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
declare const aerodromeV2PoolAbi: ({
    inputs: never[];
    stateMutability: string;
    type: string;
    name?: undefined;
    anonymous?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    anonymous?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
} | {
    inputs: never[];
    name: string;
    outputs: {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];

declare const aerodrome_aerodromeV2CLFactoryAbi: typeof aerodromeV2CLFactoryAbi;
declare const aerodrome_aerodromeV2CLPoolAbi: typeof aerodromeV2CLPoolAbi;
declare const aerodrome_aerodromeV2FactoryAbi: typeof aerodromeV2FactoryAbi;
declare const aerodrome_aerodromeV2PoolAbi: typeof aerodromeV2PoolAbi;
declare const aerodrome_aerodromeV2RouterAbi: typeof aerodromeV2RouterAbi;
declare namespace aerodrome {
  export { aerodrome_aerodromeV2CLFactoryAbi as aerodromeV2CLFactoryAbi, aerodrome_aerodromeV2CLPoolAbi as aerodromeV2CLPoolAbi, aerodrome_aerodromeV2FactoryAbi as aerodromeV2FactoryAbi, aerodrome_aerodromeV2PoolAbi as aerodromeV2PoolAbi, aerodrome_aerodromeV2RouterAbi as aerodromeV2RouterAbi };
}

declare const routerAbi$2: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    name?: undefined;
    outputs?: undefined;
} | {
    inputs: ({
        internalType: string;
        name: string;
        type: string;
        components?: undefined;
    } | {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    })[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
} | {
    stateMutability: string;
    type: string;
    inputs?: undefined;
    name?: undefined;
    outputs?: undefined;
})[];

declare namespace ixswapV2 {
  export { routerAbi$2 as routerAbi };
}

declare const routerAbi$1: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    name?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
} | {
    stateMutability: string;
    type: string;
    inputs?: undefined;
    name?: undefined;
    outputs?: undefined;
})[];
declare const factoryAbi$1: ({
    inputs: never[];
    payable: boolean;
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    constant?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    payable?: undefined;
    stateMutability?: undefined;
    constant?: undefined;
    outputs?: undefined;
} | {
    constant: boolean;
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    payable: boolean;
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
declare const pairAbi: ({
    inputs: never[];
    payable: boolean;
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    constant?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    payable?: undefined;
    stateMutability?: undefined;
    constant?: undefined;
    outputs?: undefined;
} | {
    constant: boolean;
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    payable: boolean;
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];

declare const uniswapV2_pairAbi: typeof pairAbi;
declare namespace uniswapV2 {
  export { factoryAbi$1 as factoryAbi, uniswapV2_pairAbi as pairAbi, routerAbi$1 as routerAbi };
}

declare const routerV1Abi: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    name?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
} | {
    stateMutability: string;
    type: string;
    inputs?: undefined;
    name?: undefined;
    outputs?: undefined;
})[];
declare const routerAbi: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    name?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
} | {
    inputs: {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
} | {
    stateMutability: string;
    type: string;
    inputs?: undefined;
    name?: undefined;
    outputs?: undefined;
})[];
declare const quoterAbi: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    name?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
} | {
    inputs: {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
})[];
declare const factoryAbi: ({
    inputs: never[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
declare const poolAbi: ({
    inputs: never[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];

declare const uniswapV3_factoryAbi: typeof factoryAbi;
declare const uniswapV3_poolAbi: typeof poolAbi;
declare const uniswapV3_quoterAbi: typeof quoterAbi;
declare const uniswapV3_routerAbi: typeof routerAbi;
declare const uniswapV3_routerV1Abi: typeof routerV1Abi;
declare namespace uniswapV3 {
  export { uniswapV3_factoryAbi as factoryAbi, uniswapV3_poolAbi as poolAbi, uniswapV3_quoterAbi as quoterAbi, uniswapV3_routerAbi as routerAbi, uniswapV3_routerV1Abi as routerV1Abi };
}

declare enum Network {
    Arthera = 10242,
    Astar = 592,
    Ethereum = 1,
    Base = 8453,
    BTTC = 199,
    Blast = 81457,
    Bitgert = 32520,
    BOB = 60808,
    BSC = 56,
    Boba = 288,
    BobaAvax = 43288,
    BobaBnb = 56288,
    BobaNetwork = 288,
    BitTorrent = 199,
    Canto = 7700,
    Celo = 42220,
    Core = 1116,
    Cronos = 25,
    Degen = 666666666,
    Dogechain = 2000,
    DoKenSuperChain = 61916,
    Elastos = 20,
    NeonEvm = 245022934,
    RARI = 1380012617,
    Rarimo = 7368,
    Redbelly = 151,
    Kroma = 255,
    Katana = 747474,
    Shibarium = 109,
    Iota = 8822,
    ShibariumBeta = 719,
    Lightlink = 1890,
    Unichain = 130,
    Scroll = 534352,
    Velas = 106,
    Polygon = 137,
    Story = 1514,
    Iotex = 4689,
    HuobiECO = 128,
    ScaleEuropa = 2046399126,
    PolygonZkEvm = 1101,
    Arbitrum = 42161,
    ArbitrumNova = 42170,
    Mode = 34443,
    XDai = 100,
    Telos = 40,
    ShimmerEvm = 148,
    Manta = 169,
    Mantle = 5000,
    ZetaChain = 7000,
    Thundercore = 108,
    Optimism = 10,
    Avalanche = 43114,
    Fantom = 250,
    Filecoin = 314,
    Fuji = 43113,
    Fuse = 122,
    Haqq = 11235,
    Heco = 128,
    Hemi = 43111,
    Kava = 2222,
    Metis = 1088,
    Gnosis = 100,
    Palm = 11297108109,
    Harmony = 162,
    Klaytn = 8217,
    KCC = 321,
    Kaia = 8217,
    Sonic = 146,
    Tatara = 129399,
    Moonbeam = 1284,
    Moonriver = 1285,
    Moonbase = 1287,
    MoonbeamAlpha = 1288,
    Okex = 66,
    OKXChain = 66,
    Zora = 7777777,
    WorldChain = 480,
    ZkEVM = 1101,
    RootStock = 30,
    ZkSync = 324,
    Linea = 59144,
    QBlockchain = 35441,
    opBNB = 204,
    Quitmer = 813,
    Wanchain = 888,
    XDCNetwork = 50,
    XLayer = 196,
    XODEX = 2415
}
interface INetworkConfig {
    id: Network | number;
    rpcUrl: string;
    wssUrl?: string;
    explorerUrl?: string;
    explorerApiKey?: string;
}

interface IDexContract {
    address: string;
    abi: Record<string, any>[];
}
declare const DexType: {
    readonly UniswapV2: "UniswapV2";
    readonly UniswapV3: "UniswapV3";
    readonly UniswapV4: "UniswapV4";
    readonly AerodromeV2: "AerodromeV2";
    readonly IXSwap: "IXSwap";
};
type DexType = typeof DexType[keyof typeof DexType];
declare const DexInterfaceName: {
    readonly AlienBaseV2: "AlienBaseV2";
    readonly AlienBaseArea51V2: "AlienBaseArea51V2";
    readonly BaseSwapV2: "BaseSwapV2";
    readonly DeltaSwapV2: "DeltaSwapV2";
    readonly DackieSwapV2: "DackieSwapV2";
    readonly RingSwapV2: "RingSwapV2";
    readonly RocketSwapV2: "RocketSwapV2";
    readonly RaiFinanceV2: "RaiFinanceV2";
    readonly UniswapV2: "UniswapV2";
    readonly PancakeSwapV2: "PancakeSwapV2";
    readonly SushiSwapV2: "SushiSwapV2";
    readonly SharkSwapV2: "SharkSwapV2";
    readonly SwapBasedAmmV2: "SwapBasedAmmV2";
    readonly LeetSwapV2: "LeetSwapV2";
    readonly IcecreamSwapV2: "IcecreamSwapV2";
    readonly ElkV2: "ElkV2";
    readonly UniswapV3: "UniswapV3";
    readonly PancakeSwapV3: "PancakeSwapV3";
    readonly SushiSwapV3: "SushiSwapV3";
    readonly DerpDexV3: "DerpDexV3";
    readonly ThroneV3: "ThroneV3";
    readonly HorizonDexV3: "HorizonDexV3";
    readonly SwapBasedAmmV3: "SwapBasedAmmV3";
    readonly BaseSwapV3: "BaseSwapV3";
    readonly KinetixV3: "KinetixV3";
    readonly DackieSwapV3: "DackieSwapV3";
    readonly WagmiV3: "WagmiV3";
    readonly AlienBaseV3: "AlienBaseV3";
    readonly AerodromeV2: "AerodromeV2";
    readonly IXSwap: "IXSwap";
};
type DexInterfaceName = typeof DexInterfaceName[keyof typeof DexInterfaceName];
interface IDexParams {
    network: INetworkConfig;
    type: DexType;
    name: DexInterfaceName;
    factory: IDexContract;
    router: IDexContract;
}

type TPathSegment = (string | number | bigint | boolean);

declare abstract class DexBase {
    protected readonly _provider: JsonRpcProvider;
    protected readonly _network: INetworkConfig;
    protected readonly _routerContract: Contract;
    protected readonly _factoryContract: Contract;
    protected readonly _coder: AbiCoder;
    readonly dexParams: {
        type: DexType;
        name: DexInterfaceName;
    };
    constructor(params: IDexParams);
    get routerAddress(): string;
    get factoryAddress(): string;
    abstract getFactoryAddress(): Promise<string>;
    abstract getPoolAddress(path: TPathSegment[]): Promise<any>;
    abstract getPoolAddresses(path: TPathSegment[]): Promise<any>;
    abstract getPoolCount(): Promise<number | any>;
    abstract getPoolReserves(path: TPathSegment[]): Promise<any>;
    abstract getPoolAddressByIndex(index: number): Promise<string | any>;
    abstract getTokenPrice(path: TPathSegment[]): Promise<any>;
    abstract getEncodedSwap(amountsIn: bigint, path: TPathSegment[], sendTo: string, slippage: number, ...params: any): {
        data: string;
        topHalf: string;
        bottomHalf: string;
    };
    abstract getPoolData(path: TPathSegment[]): Promise<{
        poolAddress: string;
        token0: string;
        token1: string;
        reserves0: bigint;
        reserves1: bigint;
    }[]>;
    abstract getSwapEventSignature(): {
        event: string;
        id: string;
    };
    abstract getDecodedSwapData(token0: string, token1: string, data: string): {
        tokenFrom: string;
        tokenTo: string;
        amountsIn: bigint;
        amountsOut: bigint;
    };
    abstract getReversedPath(path: TPathSegment[]): TPathSegment[];
    abstract splitPath(path: TPathSegment[]): TPathSegment[][];
    abstract simulateSwap(from: string, amountsIn: bigint, path: TPathSegment[], sendTo: string): Promise<any>;
}

declare class AerodromeV2 extends DexBase {
    private _clfactoryContract;
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
    getPoolData(path: string[]): Promise<{
        poolAddress: string;
        token0: string;
        token1: string;
        reserves0: bigint;
        reserves1: bigint;
    }[]>;
    getTokenPrice(path: (string | boolean)[]): Promise<number>;
    getFactoryAddress(): Promise<string>;
    getPoolCount(): Promise<{
        clFactoryPoolCount: number;
        factoryPoolCount: number;
    }>;
    getPoolAddressByIndex(index: number): Promise<{
        clFactoryPool: string;
        clPool: string;
    }>;
    getPoolAddress(path: (string | boolean | number | bigint)[]): Promise<string>;
    getPoolAddresses(path: (string | boolean | number | bigint)[]): Promise<string[]>;
    getDecodedSwapData(token0: string, token1: string, data: string): {
        tokenFrom: string;
        tokenTo: string;
        amountsIn: bigint;
        amountsOut: bigint;
    };
    getPoolReserves(path: (string | boolean | number | bigint)[]): Promise<{
        reserve0: number;
        reserve1: number;
        blockTimestampLast?: number;
        sqrtPriceX96?: string;
        liquidity?: string;
    }>;
    simulateSwap(from: string, amountsIn: bigint, path: (string | boolean)[], sendTo?: string, overrides?: {
        gasLimit?: number;
        maxFeePerGas?: number;
        maxPriorityFeePerGas?: number;
    }): Promise<ethers.Result>;
    getEncodedSwap(amountsIn: bigint, path: (string | boolean)[], sendTo: string, slippage?: number): {
        data: string;
        topHalf: string;
        bottomHalf: string;
    };
    getReversedPath(path: (string | boolean)[]): (string | boolean)[];
    splitPath(path: (string | boolean | number | bigint)[]): (string | number | bigint | boolean)[][];
    private _parsePath;
    getSwapEventSignature(): {
        event: string;
        id: string;
    };
}

declare class DexBaseKindUniswapV2 extends DexBase {
    constructor(routerAddress_: string, factoryAddress_: string, network: INetworkConfig, name?: DexInterfaceName, routerAbi_?: any, factoryAbi_?: any);
    getPoolData(path: string[]): Promise<{
        poolAddress: string;
        token0: string;
        token1: string;
        reserves0: bigint;
        reserves1: bigint;
    }[]>;
    getTokenPrice(path: string[]): Promise<number>;
    getPoolAddress(path: string[]): Promise<string>;
    getPoolAddresses(path: string[]): Promise<string[]>;
    getPoolCount(): Promise<number>;
    getPoolAddressByIndex(index: number): Promise<string>;
    getPoolReserves(path: string[]): Promise<{
        reserve0: number;
        reserve1: number;
        blockTimestampLast: number;
    }>;
    getFactoryAddress(): Promise<string>;
    splitPath(path: string[]): string[][];
    getEncodedSwap(amountsIn: bigint, path: (string | any)[], sendTo: string, slippage?: number): {
        data: string;
        topHalf: string;
        bottomHalf: string;
    };
    simulateSwap(from: string, amountsIn: bigint, path: (string | any)[], sendTo?: string, overrides?: {
        gasLimit?: number;
        maxFeePerGas?: number;
        maxPriorityFeePerGas?: number;
    }): Promise<ethers.Result>;
    getDecodedSwapData(token0: string, token1: string, data: string): {
        tokenFrom: string;
        tokenTo: string;
        amountsIn: bigint;
        amountsOut: bigint;
    };
    getReversedPath(path: string[]): string[];
    getSwapEventSignature(): {
        event: string;
        id: string;
    };
}
declare class UniswapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class PancakeSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class SushiSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class AlienBaseV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class AlienBaseArea51V2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class DackieSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class RaiFinanceV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class SharkSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class SwapBasedAmmV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class LeetSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class IcecreamSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class ElkV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class RocketSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class BaseSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class DeltaSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}
declare class RingSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
}

declare class IxSwapV2 extends DexBaseKindUniswapV2 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        name?: DexInterfaceName;
    });
    getTokenPrice(path: string[]): Promise<number>;
    simulateSwap<T>(from: string, amountsIn: bigint, path: T[], sendTo: string, overrides?: {
        gasLimit?: number;
        maxFeePerGas?: number;
        maxPriorityFeePerGas?: number;
    }): Promise<ethers.Result>;
    getEncodedSwap<T>(amountsIn: bigint, path: T[], sendTo: string, slippage?: number): {
        data: string;
        topHalf: string;
        bottomHalf: string;
    };
}

declare class DexBaseKindUniswapV3 extends DexBase {
    private readonly _quoterContract;
    constructor(routerAddress_: string, factoryAddress_: string, quoterAddress_: string, network: INetworkConfig, name?: DexInterfaceName, overrides?: {
        routerAbi: any;
        factoryAbi: any;
        quoterAbi: any;
    });
    get quoterAddress(): string;
    getPoolData(path: string[]): Promise<{
        poolAddress: string;
        token0: string;
        token1: string;
        reserves0: bigint;
        reserves1: bigint;
    }[]>;
    getTokenPrice(path: (string | number | bigint)[]): Promise<number>;
    getPoolAddress(path: (string | number | bigint)[]): Promise<string>;
    getPoolAddresses(path: (string | number | bigint)[]): Promise<string[]>;
    getPoolCount(): Promise<number>;
    getPoolAddressByIndex(_: number): Promise<string>;
    getPoolReserves(path: (string | number | bigint)[]): Promise<{
        reserve0: number;
        reserve1: number;
        sqrtPriceX96: string;
        liquidity: string;
    }>;
    getFactoryAddress(): Promise<string>;
    splitPath(path: (string | number | bigint)[]): (string | number | bigint)[][];
    getEncodedSwap(amountsIn: bigint, path: (string | number | bigint)[], sendTo: string, slippage?: number): {
        data: string;
        topHalf: string;
        bottomHalf: string;
    };
    simulateSwap(from: string, amountsIn: bigint, path: (string | any)[], sendTo?: string, overrides?: {
        gasLimit?: number;
        maxFeePerGas?: number;
        maxPriorityFeePerGas?: number;
    }): Promise<ethers.Result>;
    getReversedPath(path: string[]): string[];
    getDecodedSwapData(token0: string, token1: string, data: string): {
        tokenFrom: string;
        tokenTo: string;
        amountsIn: bigint;
        amountsOut: bigint;
    };
    getSwapEventSignature(): {
        event: string;
        id: string;
    };
    private _encodePath;
}
declare class UniswapV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}
declare class PancakeSwapV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}
declare class SushiSwapV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}
declare class DerpDexV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}
declare class ThroneV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}
declare class HorizonDexV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}
declare class SwapBasedAmmV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}
declare class BaseSwapV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}
declare class KinetixV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}
declare class DackieSwapV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}
declare class WagmiV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}
declare class AlienBaseV3 extends DexBaseKindUniswapV3 {
    constructor(network: INetworkConfig, overrides?: {
        routerAddress: string;
        factoryAddress: string;
        quoterAddress: string;
        name?: DexInterfaceName;
    });
}

type TCreateDex = (network: INetworkConfig) => DexBase;
declare class DexFactory {
    private static readonly _dexes;
    static create(network: INetworkConfig, dexInterfaceName: DexInterfaceName): DexBase;
    static getDexTypeByInterfaceName(dexInterfaceName: DexInterfaceName): DexType;
}

declare const UniswapV3Fees: {
    readonly FEE_0: 100;
    readonly FEE_1: 200;
    readonly FEE_2: 300;
    readonly FEE_3: 400;
    readonly FEE_4: 500;
    readonly FEE_5: 3000;
    readonly FEE_6: 10000;
};
type UniswapV3Fees = typeof UniswapV3Fees[keyof typeof UniswapV3Fees];
declare const AlienbaseV3Fees: {
    readonly FEE_0: 500;
    readonly FEE_1: 3000;
    readonly FEE_2: 10000;
};
type AlienbaseV3Fees = typeof AlienbaseV3Fees[keyof typeof AlienbaseV3Fees];
declare const ThroneV3Fees: {
    readonly FEE_0: 100;
    readonly FEE_1: 500;
    readonly FEE_2: 2500;
    readonly FEE_3: 10000;
};
type ThroneV3Fees = typeof ThroneV3Fees[keyof typeof ThroneV3Fees];
declare const WagmiV3Fees: {
    readonly FEE_0: 0;
    readonly FEE_1: 500;
    readonly FEE_2: 1500;
    readonly FEE_3: 3000;
    readonly FEE_4: 10000;
};
type WagmiV3Fees = typeof WagmiV3Fees[keyof typeof WagmiV3Fees];
declare const HorizonDexV3Fees: {
    readonly FEE_0: 8;
    readonly FEE_1: 300;
};
type HorizonDexV3Fees = typeof HorizonDexV3Fees[keyof typeof HorizonDexV3Fees];
declare const SwapBasedAmmV3Fees: {
    readonly FEE_0: 35;
    readonly FEE_1: 40;
    readonly FEE_2: 80;
    readonly FEE_3: 500;
    readonly FEE_4: 2500;
    readonly FEE_5: 10000;
};
type SwapBasedAmmV3Fees = typeof SwapBasedAmmV3Fees[keyof typeof SwapBasedAmmV3Fees];

interface IPoolScraperParams {
    tokenIn: string;
    tokenOut: string;
    network: INetworkConfig;
    dexIncluded: DexInterfaceName[];
    isDirectPathOnly?: boolean;
}
declare class PoolScraper {
    static getDexPaths({ tokenIn, tokenOut, network, dexIncluded, isDirectPathOnly, }: IPoolScraperParams, settings?: {
        chunkSize: number;
        chunkTimeout?: number;
    }): Promise<{
        dex: string;
        path: TPathSegment[];
        reserves: {
            poolAddress: string;
            token0: string;
            token1: string;
            reserves0: bigint;
            reserves1: bigint;
        }[];
    }[]>;
    private static _makeDexPaths;
    private static _getValidPath;
}

declare const erc20Abi: ({
    constant: boolean;
    inputs: {
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        name: string;
        type: string;
    }[];
    payable: boolean;
    stateMutability: string;
    type: string;
    anonymous?: undefined;
} | {
    payable: boolean;
    stateMutability: string;
    type: string;
    constant?: undefined;
    inputs?: undefined;
    name?: undefined;
    outputs?: undefined;
    anonymous?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    constant?: undefined;
    outputs?: undefined;
    payable?: undefined;
    stateMutability?: undefined;
})[];

declare const weth9abi: ({
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    payable?: undefined;
    stateMutability?: undefined;
    constant?: undefined;
    outputs?: undefined;
} | {
    payable: boolean;
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    inputs?: undefined;
    name?: undefined;
    constant?: undefined;
    outputs?: undefined;
} | {
    constant: boolean;
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    payable: boolean;
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];

type THex = `0x${string}`;
type TAddress = THex | string;
type TPrivateKey = THex | string;

interface IAddressable {
    address: TAddress;
}

interface IToken {
    name: string;
    symbol: string;
    decimals: number;
}
interface IERC20Settings {
    address: TAddress;
    network: INetworkConfig;
    abi?: any;
    privateKey?: TPrivateKey | null | undefined;
}
interface ITokenable {
    get metadata(): IToken;
}

declare class ERC20 implements IAddressable {
    private readonly _network;
    private readonly _abi;
    protected readonly _contract: Contract;
    private readonly _runner;
    private readonly _runnerWithNonceManager;
    constructor({ address, network, abi, privateKey, }: IERC20Settings);
    get interface(): ethers.Interface;
    get address(): TAddress;
    get abi(): any;
    get network(): INetworkConfig;
    getEncodedApprove(spender: TAddress, amount: bigint): string;
    getEncodedTransfer(to: string, amount: bigint): string;
    getEncodedTransferFrom(from: string, to: string, amount: bigint): string;
    /*******************************************************************************/
    /*******************************************************************************/
    getBalance(address: string): Promise<bigint>;
    getDecimals(): Promise<bigint>;
    getSymbol(): Promise<string>;
    getName(): Promise<string>;
    getTotalSupply(): Promise<bigint>;
    getAllowance(owner: TAddress, spender: TAddress): Promise<bigint>;
    /*******************************************************************************/
    /*******************************************************************************/
    transfer(to: TAddress, amount: bigint): Promise<TransactionResponse>;
    transferFrom(from: TAddress, to: TAddress, amount: bigint): Promise<TransactionResponse>;
    approve(spender: TAddress, amount: bigint): Promise<TransactionResponse>;
    /*******************************************************************************/
    /*******************************************************************************/
    addAllowance(spender: TAddress, amount: bigint): Promise<TransactionResponse>;
    subAllowance(spender: string, amount: bigint): Promise<boolean>;
    revokeApprove(spender: string): Promise<boolean>;
    protected _getRunnerAddress(): string;
}

declare class Token extends ERC20 implements ITokenable {
    private readonly _metadata;
    constructor({ name, symbol, decimals, network, address, privateKey, abi, }: IERC20Settings & IToken);
    get metadata(): IToken;
}

declare class WETH9 extends Token {
    constructor({ network, privateKey, address, abi, }: Omit<IERC20Settings, "address"> & {
        address?: TAddress;
    });
    deposit(amount: bigint): Promise<any>;
    withdraw(amount: bigint): Promise<any>;
}

/** Аргумент функции, события или конструктора */
interface AbiParameter {
    name?: string;
    type: string;
    internalType?: string;
    components?: AbiParameter[];
    indexed?: boolean;
}
/** Описание функции контракта */
interface AbiFunction {
    type: "function";
    name: string;
    constant?: boolean;
    payable?: boolean;
    stateMutability?: "pure" | "view" | "nonpayable" | "payable";
    inputs: AbiParameter[];
    outputs: AbiParameter[];
}
/** Описание события */
interface AbiEvent {
    type: "event";
    name: string;
    anonymous?: boolean;
    inputs: AbiParameter[];
}
/** Конструктор контракта */
interface AbiConstructor {
    type: "constructor";
    inputs: AbiParameter[];
    stateMutability?: "nonpayable" | "payable";
}
/** fallback и receive функции */
interface AbiFallback {
    type: "fallback" | "receive";
    payable?: boolean;
    stateMutability?: "payable" | "nonpayable";
}
/** Все допустимые элементы ABI */
type AbiItem = AbiFunction | AbiEvent | AbiConstructor | AbiFallback;
/** Основной тип ABI (массив элементов) */
type ABI = AbiItem[];

declare function callTransaction(runner: JsonRpcProvider, txRequest: TransactionRequest): Promise<string | {
    code: any;
    action: any;
    data: any;
    reason: any;
}>;

/**
 * Разделяет закодированные данные на две части, вырезая чанки по индексу или диапазону.
 *
 * Эта функция сначала разбирает строку данных, а затем "вырезает"
 * один или несколько чанков. Все, что было до вырезанной части
 * (включая селектор функции), попадает в `topHalf`. Все, что было после,
 * попадает в `bottomHalf`.
 *
 * @param data - Входная шестнадцатеричная строка.
 * @param start - Начальный индекс для вырезания. По умолчанию 0.
 * @param end - Конечный индекс для вырезания. Если end < start, вырезается только
 *              один элемент по индексу start. По умолчанию 0.
 * @returns Объект с полями `topHalf` и `bottomHalf`.
 */
declare function cutEncodedDataParams(data: string, start?: number, end?: number): {
    topHalf: string;
    bottomHalf: string;
};

declare function getEnumValuesArray<E extends Record<string, string | number>>(e: E): (E[keyof E])[];

declare function isObjectAddressable(object: any): object is IAddressable;

declare function reverseCopy<T>(arr: readonly T[]): T[];

declare function signTransaction(rawTx: {
    nonce: bigint;
    gasPrice?: BigIntLike | null;
    maxFeePerGas: bigint;
    maxPriorityFeePerGas: bigint;
    gasLimit: bigint;
    to: string;
    value: bigint;
    data?: string;
    chainId: number;
    type?: TransactionType;
}, privateKey: string): string;

/**
 * Разбирает строку с закодированными данными вызова контракта.
 *
 * Эта функция принимает шестнадцатеричную строку, начинающуюся с '0x',
 * и разделяет ее на селектор функции и чанки данных.
 *
 * @example
 * const data = '0x7ff36ab50000000000000000000000000000000000000000000000000000000000000001';
 * const result = splitEncodedData(data);
 * // result.functionSelector будет '0x7ff36ab5'
 * // result.chunks будет ['0x0000000000000000000000000000000000000000000000000000000000000001']
 *
 * // Перед разбором функция выполняет валидацию:
 * // 1. Проверяет, что строка начинается с префикса '0x'.
 * // 2. Убеждается, что все символы после префикса являются валидными
 * //    шестнадцатеричными символами (0-9, a-f, A-F).
 * // 3. Проверяет, что длина данных после селектора функции (первые 10 символов)
 * //    кратна 64, что соответствует стандартной длине параметров в EVM.
 *
 * @description В случае ошибки валидации, функция выбрасывает исключение с подробным
 * сообщением, указывающим на некорректные символы или неверную длину.
 *
 * @param data - Входная шестнадцатеричная строка, представляющая закодированные данные.
 * @returns Объект, содержащий:
 *          - `original`: исходная строка данных.
 *          - `functionSelector`: первые 10 символов данных (включая '0x'),
 *            которые представляют селектор функции.
 *          - `chunks`: массив строк, представляющий остальные данные,
 *            разделенные на чанки по 64 символа.
 * @throws {Error} Если данные не начинаются с '0x', содержат
 *                 недопустимые шестнадцатеричные символы, или имеют
 *                 некорректную длину.
 */
declare function splitEncodedData(data: string): {
    original: string;
    functionSelector: string;
    chunks: string[];
};

export { type ABI, type AbiConstructor, type AbiEvent, type AbiFallback, type AbiFunction, type AbiItem, type AbiParameter, AerodromeV2, AlienBaseArea51V2, AlienBaseV2, AlienBaseV3, AlienbaseV3Fees, BaseSwapV2, BaseSwapV3, DackieSwapV2, DackieSwapV3, DeltaSwapV2, DerpDexV3, DexBase, DexBaseKindUniswapV2, DexBaseKindUniswapV3, DexFactory, DexInterfaceName, DexType, ERC20, ElkV2, HorizonDexV3, HorizonDexV3Fees, type IAddressable, type IDexContract, type IDexParams, type IERC20Settings, type INetworkConfig, type IPoolScraperParams, type IToken, type ITokenable, IcecreamSwapV2, IxSwapV2, KinetixV3, LeetSwapV2, Network, PancakeSwapV2, PancakeSwapV3, PoolScraper, RaiFinanceV2, RingSwapV2, RocketSwapV2, SharkSwapV2, SushiSwapV2, SushiSwapV3, SwapBasedAmmV2, SwapBasedAmmV3, SwapBasedAmmV3Fees, type TCreateDex, type TPathSegment, ThroneV3, ThroneV3Fees, UniswapV2, UniswapV3, UniswapV3Fees, WETH9, WagmiV3, WagmiV3Fees, aerodrome as aerodromeAbi, callTransaction, cutEncodedDataParams, erc20Abi, getEnumValuesArray, isObjectAddressable, ixswapV2 as ixswapAbi, reverseCopy, signTransaction, splitEncodedData, uniswapV2 as uniswapV2Abi, uniswapV3 as uniswapV3Abi, weth9abi };
