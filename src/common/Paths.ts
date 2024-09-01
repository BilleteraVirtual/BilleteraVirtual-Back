/**
 * Express router paths go here.
 */

import Reserve from "@src/models/Reserve.model";



export default {
  Base: '/',
  Home: '/home',
  Users: {
    Base: '/users',
    GetOne: '/:dni',
    GetAll: '/all',
    Add: '/add',
    Update: '/update/:dni',
    Delete: '/delete/:dni',
  },
  Transactions: {
    Base: '/transactions',
    GetOne: '/:id',
    GetAll: '/all',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
  },
  Entities: {
    Base: '/entities',
    GetOne: '/:cvu',
    GetAll: '/all',
    Add: '/add',
    Update: '/update/:cvu',
    Delete: '/delete/:cvu',
  },
  Reserves: {
    Base: '/reserves',
    GetOne: '/:id',
    GetAll: '/all',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
  },

} as const;
