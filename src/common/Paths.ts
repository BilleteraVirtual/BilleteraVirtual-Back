/**
 * Express router paths go here.
 */

import Reserve from "@src/models/Reserve.model";



export default {
  Base: '/',
  Home: '/home',
  Entities: {
    Base: '/entities',
    Login: '/login',
    Details: '/details',
    GetOne: '/:cvu',
    GetAll: '/all',
    Add: '/add',
    Update: '/update/:cvu',
    Delete: '/delete/:cvu',
    Search: '/search',
  },
  Users: {
    Base: '/users',
    GetOne: '/:dni',
    GetAll: '/all',
    Add: '/add',
    Update: '/update/:dni',
    Delete: '/delete/:dni',
  },
  Companies: {
    Base: '/companies',
    GetOne: '/:id',
    GetAll: '/all',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
  },
  Transactions: {
    Base: '/transactions',
    GetOne: '/:id',
    GetAll: '/all',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
    GetByCVU: '/:cvu/:page',
    Search: '/search',
  },
  Reserves: {
    Base: '/reserves',
    GetByCVU: '/client/:cvu',
    GetOne: '/:id',
    GetAll: '/all',
    Add: '/add',
    Extract: '/extract',
    Deposit: '/deposit',
    Update: '/update/:id',
    Delete: '/delete/:id',
  },
  Categories: {
    Base: '/categories',
    GetOne: '/:id',
    GetAll: '/all',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
  },
  Auth: {
    Base: '/auth',
    Verify: '/verify',
    Decode: '/decode',
  },

} as const;
