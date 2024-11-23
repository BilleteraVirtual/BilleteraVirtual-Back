import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


export interface IReserve {
  reserveId: number;
  reason: string;
  amount: number;
  entityCVU: string;
}
