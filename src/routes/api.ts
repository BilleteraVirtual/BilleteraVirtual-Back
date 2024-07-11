import express, { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../common/Paths';
import User from '@src/models/User';
import UserRoutes from './UserRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = express.Router();

userRouter.get(
  Paths.Users.GetAll,
  
  
);





// **** Export default **** //

export default apiRouter;
