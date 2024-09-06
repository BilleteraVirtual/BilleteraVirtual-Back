import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


export interface ITransaction {
    transactionId: number;
    amount: number;
    reason: string;
    date: Date;
    categoryId: number;
    senderCVU: string;
    recipientCVU: string;
  }
  