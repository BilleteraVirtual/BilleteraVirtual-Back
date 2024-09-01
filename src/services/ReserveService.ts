import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IReserve } from '@src/models/Reserve';
import Reserve from '@src/models/Reserve.model';


// **** Variables **** //

export const RESERVE_NOT_FOUND_ERR = 'Reserve not found';


// **** Functions **** //

async function getAllReserves(): Promise<Reserve[]> {
    return Reserve.findAll().then((reserves: Reserve[]) => {
        return reserves;
    });
}

async function getReserve(id: number): Promise<Reserve> {
    return Reserve.findOne({
        where: { reserveId: id },
    }).then((reserve: Reserve | null) => {
        if (!reserve) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, RESERVE_NOT_FOUND_ERR);
        }
        return reserve;
    });
}

async function addReserve(reserve: IReserve): Promise<void> {
    const { reserveId, reason, amount, entityCVU } = reserve;
    Reserve.create({ reserveId, reason, amount, entityCVU }).then(() => {
        return;
    });
}

async function updateReserve(reserve: IReserve): Promise<void> {
    const { reserveId, reason, amount, entityCVU } = reserve;
    Reserve.update({ reason, amount, entityCVU }, {
        where: { reserveId },
    }).then(() => {
        return;
    });
}

async function deleteReserve(reserveId: number): Promise<void> {
    Reserve.destroy({
        where: { reserveId },
    }).then(() => {
        return;
    });
}
// **** Export default **** //

export default {
    getAllReserves,
    getReserve,
    addReserve,
    updateReserve,
    deleteReserve,
} as const;
