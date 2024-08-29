import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IUser {
  dni: number;
  name: string;
  lastName: string;
  entidad_CVU: number;
}