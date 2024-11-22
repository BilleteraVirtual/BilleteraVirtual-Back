import HttpStatusCodes from '@src/common/HttpStatusCodes';
import TransactionService from '@src/services/TransactionService';
import { ITransaction } from '@src/models/Transaction';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

async function getAllTransactions(req: IReq, res: IRes){
    const Transactions = await TransactionService.getAllTransactions();
    res.status(HttpStatusCodes.OK).json(Transactions);
    }

async function getTransaction(req: IReq, res: IRes){
    const  id  = +req.params.id;
    const transaction = await TransactionService.getTransaction(id);
    res.status(HttpStatusCodes.OK).json(transaction);
}

async function addTransaction(req: IReq<ITransaction>, res: IRes){
    const transaction = req.body;
    console.log(transaction);
    await TransactionService.addTransaction(transaction);
    res.status(HttpStatusCodes.CREATED).send();
}

async function updateTransaction(req: IReq<ITransaction>, res: IRes){
    const transaction = req.body;
    transaction.transactionId = +req.params.id;
    await TransactionService.updateTransaction(transaction);
    res.status(HttpStatusCodes.CREATED).send();
}

async function deleteTransaction(req: IReq, res: IRes){
    const id = +req.params.id;
    await TransactionService.deleteTransaction(id);
    res.status(HttpStatusCodes.NO_CONTENT).send();
}

async function getTransactionsByCVU(req: IReq, res: IRes){
    const cvu = req.params.cvu;
    const page = +req.params.page;
    const transactions = await TransactionService.getTransactionsByCVU(cvu, page);
    res.status(HttpStatusCodes.OK).json(transactions);
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
