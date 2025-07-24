import {
    Contract,
    JsonRpcProvider,
} from "ethers";
import {
    type DexType,
    type IDexParams
} from "./types/IDexParams";

export abstract class DexBase {
    protected readonly _provider: JsonRpcProvider;
    protected readonly _routerContract: Contract;
    protected readonly _factoryContract: Contract;

    public readonly dexParams: {
        type: DexType,
        name: string,
    };

    constructor(params: IDexParams) {
        const network = params.network;

        this.dexParams = {
            type: params.type,
            name: params.name,
        };
        
        this._provider = new JsonRpcProvider(network.rpcUrl, network.id);
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
    public abstract getPoolAddress(path: (string | any)[]): Promise<any>;
    public abstract getTokenPrice(path: (string | any)[]): Promise<any>;
    public abstract getEncodedSwap(
        amountsIn: bigint,
        path: (string | any)[],
        sendTo: string,
        ...params: any
    ): {
        data: string,
        topHalf: string,
        bottomHalf: string,
    }

    public abstract splitPath(path: (string | any)[]): (string | any)[][];
    public abstract simulateSwap(
        from: string,
        amountsIn: bigint,
        path: (string | any)[],
        sendTo: string
    ): Promise<any>;
}