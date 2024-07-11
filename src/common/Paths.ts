/**
 * Express router paths go here.
 */


export default {
  Base: '/',
  Home: '/home',
  Users: {
    Base: '/users',
    GetOne: '/:dni',
    GetAll: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:dni',
  },
  Transactions: {
    Base: '/transactions',
    GetOne: '/:id',
    GetAll: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  }
  /**
   * ?  Revisar esto
  Audit: {
    Base: '/audit',
    Get: '/all',
  },
  */

} as const;
