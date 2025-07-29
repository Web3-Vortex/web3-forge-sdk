import { Network } from "../../../types/network";


// https://derpdex.gitbook.io/home/contracts/contract-addresses
export const derpdexV3Addresses = new Map<Network, {router: string, factory: string, quoter: string}>([
    [Network.ZkSync, {
        router: '0x3de80D2d9dCa6F6357C77EF89ee1f7Db3Bba3c3f',
        factory: '0x52A1865eb6903BC777A02Ae93159105015CA1517',
        quoter: '0x48237655EFC513a79409882643eC987591dd6a81',
    }],
    [Network.Base, {
        router: '0xC9fdf5CE4C657ed8289A7D9D1107Ea7D55dbd53F',
        factory: '0xedDef4273518b137CDbcB3a7FA1C6a688303dFe2',
        quoter: '0x777Dc769bb69F3fd12846a928193765847F234Af',
    }],
    [Network.opBNB, {
        router: '0xe36ABD2f6512fE90b7c9Ed920565bCCE7E86eE0d',
        factory: '0xb91331Ea9539ee881e3A45191076c454E482dAc7',
        quoter: '0xd068aA2be5F7605ABbFC766AA870bDAa430E6d4C',
    }],
]);
