import express, { Router } from 'express';
import Paths from '../common/Paths';
import UserRoutes from './UserRoutes';
import EntityRoutes from './EntityRoutes';

// Create individual routers for users and entities
const userRouter = Router();
const entityRouter = Router();

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


// Create main API router
const apiRouter = Router();

// Use separate routers for users and entities
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Entities.Base, entityRouter);

export default apiRouter;
