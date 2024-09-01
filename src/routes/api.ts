import express, { Router } from 'express';
import Paths from '../common/Paths';
import UserRoutes from './UserRoutes';
import EntityRoutes from './EntityRoutes';
import ReserveRoutes from './ReserveRoutes';
import CompanyRoutes from './CompanyRoutes';

// Create individual routers for users and entities
const userRouter = Router();
const entityRouter = Router();
const reserveRouter = Router();
const companyRouter = Router();

/** 
  * ! Preguntar si hay que separar api.ts en dos archivos, uno para modelo
*/

// Define routes for users
userRouter.get(
  Paths.Users.GetAll, 
  UserRoutes.getAllUsers
);

userRouter.get(
  Paths.Users.GetOne, 
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
entityRouter.get(
  Paths.Entities.GetAll, 
  EntityRoutes.getAllEntities
);

entityRouter.get(
  Paths.Entities.GetOne, 
  EntityRoutes.getEntity
);

entityRouter.post(
  Paths.Entities.Add, 
  EntityRoutes.addEntity
);

entityRouter.put(
  Paths.Entities.Update, 
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


// Create main API router
const apiRouter = Router();

// Use separate routers for users and entities
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Entities.Base, entityRouter);
apiRouter.use(Paths.Reserves.Base, reserveRouter);
apiRouter.use(Paths.Companies.Base, companyRouter);


export default apiRouter;
