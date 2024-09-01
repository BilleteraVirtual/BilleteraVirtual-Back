import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IUser } from '@src/models/User';
import User from '@src/models/User.model';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

async function getAllUsers(): Promise<User[]> {
    return User.findAll().then((users: User[]) => {
        return users;
    });
}

async function getUser(dni: number): Promise<User> {
    return User.findOne({
        where: { DNI: dni },
    }).then((user: User | null) => {
        if (!user) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
        }
        return user;
    });
}

async function addUser(user: IUser): Promise<void> {
    const { DNI, firstName, lastName, entityCVU } = user;
    User.create({ DNI, firstName, lastName, entityCVU }).then(() => {
        return;
    });
}

async function updateUser(user: IUser): Promise<void> {
    const { DNI, firstName, lastName, entityCVU } = user;
    User.update({ firstName, lastName, entityCVU }, {
        where: { DNI },
    }).then(() => {
        return;
    });
}

async function deleteUser(dni: number): Promise<void> {
    User.destroy({
        where: { dni },
    }).then(() => {
        return;
    });
}
// **** Export default **** //

export default {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
} as const;
