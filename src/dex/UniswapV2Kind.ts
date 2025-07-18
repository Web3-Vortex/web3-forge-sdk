import { DexBase } from "./DexBase";
import { IDexParams } from "./types/IDexParams";

export class UniswapV2Kind extends DexBase {
    constructor(params: IDexParams) {
        super(params);
    }

    public getPoolAddress(path: (string | any)[]): Promise<any> {
        return this._routerContract.getPoolAddress(path);
    }

}