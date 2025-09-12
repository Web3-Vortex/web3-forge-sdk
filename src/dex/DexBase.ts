import {
    AbiCoder,
    Contract,
    JsonRpcProvider,
} from "ethers";
import {
    type DexType,
    type IDexParams
} from "./types/IDexParams";
import { TPathSegment } from "./types/path";
import { INetworkConfig } from "../types/network";

export abstract class DexBase {
    protected readonly _provider: JsonRpcProvider;
    protected readonly _network: INetworkConfig;
    protected readonly _routerContract: Contract;
    protected readonly _factoryContract: Contract;
    protected readonly _coder = AbiCoder.defaultAbiCoder();

    public readonly dexParams: {
        type: DexType,
        name: string,
    };

    constructor(params: IDexParams) {
        this._network = params.network;

        this.dexParams = {
            type: params.type,
            name: params.name,
        };
        
        this._provider = new JsonRpcProvider(
            params.network.rpcUrl,
            {
                chainId: params.network.id,
                name: "custom",
            },
            {
                staticNetwork: true,
            }
        );
        
        this._factoryContract = new Contract(params.factory.address, params.factory.abi, this._provider);
        this._routerContract = new Contract(params.router.address, params.router.abi, this._provider);
    }

    public get routerAddress(): string {
        return this._routerContract.target as string;
    }

    public get factoryAddress(): string {
        return this._factoryContract.target as string;
    }

    public abstract getFactoryAddress(): Promise<string>;
    public abstract getPoolAddress(path: TPathSegment[]): Promise<any>;
    public abstract getPoolAddresses(path: TPathSegment[]): Promise<any>;
    public abstract getPoolCount(): Promise<number | any>;
    public abstract getPoolReserves(path: TPathSegment[]): Promise<any>;
    public abstract getPoolAddressByIndex(index: number): Promise<string | any>;
    public abstract getTokenPrice(path: TPathSegment[]): Promise<any>;
    public abstract getEncodedSwap(
        amountsIn: bigint,
        path: TPathSegment[],
        sendTo: string,
        slippage: number,
        ...params: any
    ): {
        data: string,
        topHalf: string,
        bottomHalf: string,
    }

    public abstract getPoolData(path: TPathSegment[]): Promise<{
        poolAddress: string;
        token0: string;
        token1: string;
        reserves0: bigint;
        reserves1: bigint;
    }[]>;

    public abstract getSwapEventSignature(): {
        event: string,
        id: string
    };

    public abstract getDecodedSwapData(token0: string, token1: string, data: string): {
        tokenFrom: string,
        tokenTo: string,
        amountsIn: bigint,
        amountsOut: bigint,
    }

    public abstract getReversedPath(path: TPathSegment[]): TPathSegment[];

    public abstract splitPath(path: TPathSegment[]): TPathSegment[][];
    public abstract simulateSwap(
        from: string,
        amountsIn: bigint,
        path: TPathSegment[],
        sendTo: string
    ): Promise<any>;
}