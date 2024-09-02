import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { ITransaction } from '@src/models/Transaction';
import Transaction from '@src/models/Transaction.model';


// **** Variables **** //

export const TRANSACTION_NOT_FOUND_ERR = 'Transaction not found';


// **** Functions **** //

async function getAllTransactions(): Promise<Transaction[]> {
    return Transaction.findAll().then((Transactions: Transaction[]) => {
        return Transactions;
    });
}

async function getTransaction(idTransaction: number): Promise<Transaction> {
    return Transaction.findOne({
        where: { transactionId: idTransaction },
    }).then((transaction: Transaction | null) => {
        if (!transaction) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, TRANSACTION_NOT_FOUND_ERR);
        }
        return transaction;
    });
}

async function addTransaction(transaction: ITransaction): Promise<void> {
    const { transactionId, amount, reason, date, categoryId, senderCVU, recipientCVU } = transaction;
    Transaction.create({ transactionId, amount, reason, date, categoryId, senderCVU, recipientCVU }).then(() => {
        return;
    });
}

async function updateTransaction(transaction: ITransaction): Promise<void> {
    const { transactionId, amount, reason, date, categoryId, senderCVU, recipientCVU } = transaction;
    Transaction.update({ amount, reason, date, categoryId, senderCVU, recipientCVU }, {
        where: { transactionId },
    }).then(() => {
        return;
    });
}

async function deleteTransaction(transactionId: number): Promise<void> {
    Transaction.destroy({
        where: { transactionId },
    }).then(() => {
        return;
    });
}
// **** Export default **** //

export default {
    getAllTransactions,
    getTransaction,
    addTransaction,
    updateTransaction,
    deleteTransaction,
} as const;
