import { FeeMarketEIP1559Transaction, LegacyTransaction, TransactionType } from '@ethereumjs/tx';
import { type AddressLike, type BigIntLike, bytesToHex } from '@ethereumjs/util';
import { Common } from '@ethereumjs/common';


export function signTransaction(
    rawTx: {
        nonce: bigint,
        gasPrice?: BigIntLike | null,
        maxFeePerGas: bigint,
        maxPriorityFeePerGas: bigint,
        gasLimit: bigint,
        to: string,
        value: bigint,
        data?: string,
        chainId: number,
        type?: TransactionType
    },
    privateKey: string
): string {
    // Конвертация приватного ключа в Buffer
    const privateKeyBuffer = Buffer.from(privateKey.replace(/^0x/, ''), 'hex');
    const baseTxData = {
        nonce: rawTx.nonce,
        gasLimit: rawTx.gasLimit,
        to: rawTx.to as AddressLike,
        value: rawTx.value,
        data: rawTx.data as AddressLike,
    }

    let txFromTxData = undefined;
    let txData;
    
    const common = Common.custom(
        {
            name: 'base',
            networkId: rawTx.chainId,
            chainId: rawTx.chainId,
        },
    )
    switch(rawTx.type) {
        case TransactionType.Legacy:
            txData = {
                ...baseTxData,
                gasPrice: rawTx.gasPrice,
            };

            txFromTxData = LegacyTransaction.fromTxData(txData, {common});
            break;
        case TransactionType.FeeMarketEIP1559:
            txData = {
                ...baseTxData,
                maxFeePerGas: rawTx.maxFeePerGas,
                maxPriorityFeePerGas: rawTx.maxPriorityFeePerGas,
                chainId: rawTx.chainId,
            };

            txFromTxData = FeeMarketEIP1559Transaction.fromTxData(txData);
            break;
        default:
            throw new Error('not implemented');
    }
    

    // Подписываем транзакцию приватным ключом
    const signedTx = txFromTxData.sign(privateKeyBuffer);

    // Возвращаем сериализованную транзакцию в виде строки
    return bytesToHex(signedTx.serialize());
}