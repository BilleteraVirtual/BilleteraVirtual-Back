import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { ITransaction } from '@src/models/Transaction';
import Transaction from '@src/models/Transaction.model';
import { Op } from 'sequelize';
import Entity from '@src/models/Entity.model';


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
        include: ['category'],
    }).then((transaction: Transaction | null) => {
        if (!transaction) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, TRANSACTION_NOT_FOUND_ERR);
        }
        return transaction;
    });
}

async function addTransaction(transaction: any): Promise<void> {
    const { amount, reason, date, idCategory, recipientCVU } = transaction;
  const senderCVU = transaction.cvu;

  try {
    // Buscar las cuentas del sender y el recipient
    const sender = await Entity.findOne({ where: { CVU: senderCVU } });
    const recipient = await Entity.findOne({ where: { CVU: recipientCVU } });

    if (!sender) {
      throw new Error('La cuenta del remitente no existe.');
    }

    if (!recipient) {
        throw new Error('La cuenta del receptor no existe.');
    }

    if (senderCVU === recipientCVU) {
        throw new Error('El remitente y el receptor no pueden ser la misma cuenta.');
    }

    // Verificar si el sender tiene saldo suficiente
    if (!sender || sender.balance === undefined || sender.balance < amount) {
        throw new Error('El remitente no tiene suficiente saldo para realizar la transacción.');
    }

    // Realizar la transacción: descontar del sender y sumar al recipient
    await sender.update({ balance: sender.balance - amount });
    await recipient.update({ balance: recipient.balance + amount });

    // Registrar la transacción
    await Transaction.create({
      amount,
      reason,
      date,
      idCategory,
      senderCVU,
      recipientCVU,
    });

    console.log('Transacción realizada con éxito.');
  } catch (error) {
    console.error('Error al realizar la transacción:', error.message);
    throw error; // Lanzar el error para que el controlador lo maneje
  }
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
