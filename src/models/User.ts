import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IUser {
  id: number;
  name: string;
  email: string;
  created: Date;
}


// **** Functions **** //


// **** Export default **** //

export default {

} as const;
