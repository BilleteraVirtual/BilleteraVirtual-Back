/**
 * Express router paths go here.
 */


export default {
  Base: '/',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Transactions: {
    Base: '/transactions',
    Get: '/all',
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
