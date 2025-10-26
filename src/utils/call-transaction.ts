import { JsonRpcProvider, type TransactionRequest } from "ethers";

export async function callTransaction(
    runner: JsonRpcProvider,
    txRequest: TransactionRequest
) {
    try {
        return await runner.call(txRequest);
    } catch (e: any) {
        return {
            code: e.code,
            action: e.action,
            data: e.data,
            reason: e.reason,
        };
    }
}