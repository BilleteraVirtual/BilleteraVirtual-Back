import express, { Router } from 'express';
import Paths from '../common/Paths';
import UserRoutes from './UserRoutes';
import EntityRoutes from './EntityRoutes';
import ReserveRoutes from './ReserveRoutes';
import CompanyRoutes from './CompanyRoutes';
import CategoryRoutes from './CategoryRoutes';
import TransactionRoutes from './TransactionRoutes';
import checkToken from '@src/util/authMiddleware';
import authRoutes from './authRoutes';



// Create individual routers for users and entities
const userRouter = Router();
const entityRouter = Router();
const reserveRouter = Router();
const companyRouter = Router();
const categoryRouter = Router();
const transactionRouter = Router();
const authRouter = Router();

// Define routes for users

userRouter.get(
  Paths.Users.GetAll, 
  UserRoutes.getAllUsers
);

userRouter.get(
  Paths.Users.GetOne,
  checkToken,
  UserRoutes.getUser
);

userRouter.post(
  Paths.Users.Add, 
  UserRoutes.addUser
);

userRouter.put(
  Paths.Users.Update, 
  UserRoutes.updateUser
);

userRouter.delete(
  Paths.Users.Delete, 
  UserRoutes.deleteUser
);


// Define routes for entities
entityRouter.post(
  Paths.Entities.Login,
  EntityRoutes.loginEntity
);

entityRouter.get(
  Paths.Entities.GetAll, 
  EntityRoutes.getAllEntities
);

entityRouter.get(
  Paths.Entities.Details,
  checkToken,
  EntityRoutes.getEntityDetails
)

entityRouter.get(
  Paths.Entities.GetOne,
  checkToken, 
  EntityRoutes.getEntity
);

entityRouter.post(
  Paths.Entities.Add, 
  EntityRoutes.addEntity
);

entityRouter.put(
  Paths.Entities.Update,
  checkToken, 
  EntityRoutes.updateEntity
);

entityRouter.delete(
  Paths.Entities.Delete, 
  EntityRoutes.deleteEntity
);


// Define routes for reserves
reserveRouter.get(
  Paths.Reserves.GetAll, 
  ReserveRoutes.getAllReserves
);

reserveRouter.get(
  Paths.Reserves.GetOne, 
  ReserveRoutes.getReserve
);

reserveRouter.post(
  Paths.Reserves.Add, 
  ReserveRoutes.addReserve
);

reserveRouter.put(
  Paths.Reserves.Update, 
  ReserveRoutes.updateReserve
);

reserveRouter.delete(
  Paths.Reserves.Delete, 
  ReserveRoutes.deleteReserve
);

// Define routes for companies

companyRouter.get(
  Paths.Companies.GetAll,
  CompanyRoutes.getAllCompanies
);

companyRouter.get(
  Paths.Companies.GetOne,
  CompanyRoutes.getCompany
);

companyRouter.post(
  Paths.Companies.Add,
  CompanyRoutes.addCompany
);

companyRouter.put(
  Paths.Companies.Update,
  CompanyRoutes.updateCompany
);

companyRouter.delete(
  Paths.Companies.Delete,
  CompanyRoutes.deleteCompany
);

// Define routes for categories

categoryRouter.get(
  Paths.Categories.GetAll,
  CategoryRoutes.getAllCategories
);

categoryRouter.get(
  Paths.Categories.GetOne,
  CategoryRoutes.getCategory
);

categoryRouter.post(
  Paths.Categories.Add,
  CategoryRoutes.addCategory
);

categoryRouter.put(
  Paths.Categories.Update,
  CategoryRoutes.updateCategory
);

categoryRouter.delete(
  Paths.Categories.Delete,
  CategoryRoutes.deleteCategory
);

// Define routes for transaction

transactionRouter.get(
  Paths.Transactions.GetAll,
  TransactionRoutes.getAllTransactions
);

transactionRouter.get(
  Paths.Transactions.GetOne,
  TransactionRoutes.getTransaction
);

transactionRouter.post(
  Paths.Transactions.Add,
  TransactionRoutes.addTransaction
);

transactionRouter.put(
  Paths.Transactions.Update,
  TransactionRoutes.updateTransaction
);

transactionRouter.delete(
  Paths.Transactions.Delete,
  TransactionRoutes.deleteTransaction
);

authRouter.post(
  Paths.Auth.Verify,
  authRoutes.verifyToken
);



// Create main API router
const apiRouter = Router();

// Use separate routers for users and entities
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Entities.Base, entityRouter);
apiRouter.use(Paths.Reserves.Base, reserveRouter);
apiRouter.use(Paths.Companies.Base, companyRouter);
apiRouter.use(Paths.Categories.Base, categoryRouter);
apiRouter.use(Paths.Transactions.Base, transactionRouter);
apiRouter.use(Paths.Auth.Base, authRouter);
apiRouter.use(checkToken)


export default apiRouter;
