import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

async function getAllUsers(req: IReq, res: IRes){
    const users = await UserService.getAllUsers();
    res.status(HttpStatusCodes.OK).json(users);
    }

async function getUser(req: IReq, res: IRes){
    const  dni  = +req.params.dni;
    const user = await UserService.getUser(dni);
    res.status(HttpStatusCodes.OK).json(user);
}

async function addUser(req: IReq<IUser>, res: IRes){
    const user = req.body;
    console.log(user);
    await UserService.addUser(user);
    res.status(HttpStatusCodes.CREATED).send();
}

async function updateUser(req: IReq<IUser>, res: IRes){
    const user = req.body;
    user.DNI = +req.params.dni;
    await UserService.updateUser(user);
    res.status(HttpStatusCodes.CREATED).send();
}

async function deleteUser(req: IReq, res: IRes){
    const dni = +req.params.dni;
    await UserService.deleteUser(dni);
    res.status(HttpStatusCodes.NO_CONTENT).send();
}
// **** Export default **** //

export default {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
} as const;
