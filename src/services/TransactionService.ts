import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { ITransaction } from '@src/models/Transaction';
import Transaction from '@src/models/Transaction.model';
import { Op } from 'sequelize';


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
    const { transactionId, amount, reason, date, idCategory, senderCVU, recipientCVU } = transaction;
    Transaction.create({ transactionId, amount, reason, date, idCategory, senderCVU, recipientCVU }).then(() => {
        return;
    });
}

async function updateTransaction(transaction: ITransaction): Promise<void> {
    const { transactionId, amount, reason, date, idCategory, senderCVU, recipientCVU } = transaction;
    Transaction.update({ amount, reason, date, idCategory, senderCVU, recipientCVU }, {
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

async function getTransactionsByCVU(cvu: string, page: number): Promise<Transaction[]> {
    const limit = 10;
    const offset = (page - 1) * limit;

    return await Transaction.findAll({
      where: {
        [Op.or]: [{ senderCVU: cvu }, { recipientCVU: cvu }],
      },
      limit,
      offset,
      order: [['date', 'DESC']], // Ordenar por fecha descendente
    });
  }

// **** Export default **** //

export default {
    getAllTransactions,
    getTransaction,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByCVU
} as const;
