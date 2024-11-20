import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IReserve } from '@src/models/Reserve';
import Reserve from '@src/models/Reserve.model';
import EntityService from './EntityService';
import Entity from '@src/models/Entity.model';

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

async function getReservesByCVU(entityCVU: string): Promise<Reserve[]> {
    return Reserve.findAll({
        where: { entityCVU },
    }).then((reserves: Reserve[]) => {
        return reserves;
    });
}

async function addReserve(reserve: IReserve): Promise<void> {
    const { reserveId, reason, amount, entityCVU } = reserve;

    try {
        // Hacer una llamada a la API para obtener el balance de la entidad
        const entityResponse = await EntityService.getEntity(entityCVU);
        console.log('Balance actual:', entityResponse.balance);
        console.log('Monto de la reserva:', amount);
        // Verificar si hay suficiente balance
        if (entityResponse.balance !== undefined && entityResponse.balance < amount) {
            throw new Error('Balance insuficiente para realizar esta reserva.');
        }
        if (entityResponse.balance === undefined) {
            throw new Error('Error al obtener el balance de la entidad.');
        }
        const newBalance = entityResponse.balance - amount;
        // Crear la reserva si el balance es suficiente
        await Reserve.create({ reserveId, reason, amount, entityCVU });
        console.log('Reserva creada exitosamente');

        // Actualizar el balance de la entidad
        
        await Entity.update({ balance: newBalance }, {
            where: { CVU: entityCVU },
        });
        console.log('Balance de la entidad actualizado:', newBalance);
    } catch (error) {
        console.error('Error al agregar la reserva:', error.message);
        throw error; // Re-lanzar el error para que el llamador lo maneje
    }
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
    const reserve = await getReserve(reserveId);
    const entity = await EntityService.getEntity(reserve.entityCVU);
    const reserveAmount = reserve.amount ?? 0; // Add null check for reserve.amount
    const entityBalance = entity.balance ?? 0; // Add null check for reserve.amount
    Entity.update({ balance: entityBalance + reserveAmount }, { // Use reserveAmount instead of reserve.amount
        where: { CVU: reserve.entityCVU },
    });
    Reserve.destroy({
        where: { reserveId },
    }).then(() => {
        return;
    });
}

async function depositMoney(cvu: string, amount: number, reserveId: number): Promise<void> {
    try{
        const reserve = await getReserve(reserveId);
        const entity = await EntityService.getEntity(cvu);
        if (!entity) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Entity not found');
        }
        if (entity.balance === undefined || reserve.amount === undefined) {
            throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener el balance de la entidad');
        }
        const newBalance = entity.balance - amount;
        if (newBalance < 0) {
            throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Insufficient balance');
        }
        await Reserve.update({ amount: reserve.amount + amount }, {
            where: { reserveId },
        });
        await Entity.update({ balance: newBalance }, {
            where: { CVU: cvu },
        });
    } catch (error) {
        console.error('Error al depositar el dinero:', error.message);
        throw error; // Re-lanzar el error para que el llamador lo maneje
    }
}

async function extractMoney(cvu: string, amount: number, reserveId: number): Promise<void> {
    const reserve = await getReserve(reserveId);
    const entity = await EntityService.getEntity(cvu);
    if (!entity) {
        throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Entity not found');
    }
    if (entity.balance === undefined || reserve.amount === undefined) {
        throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener el balance de la entidad');
    }
    if (amount > reserve.amount) {
        throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Insufficient balance');
    }
    const newBalance = entity.balance + amount;
    await Reserve.update({ amount: reserve.amount - amount }, {
        where: { reserveId },
    });
    await Entity.update({ balance: newBalance }, {
        where: { CVU: cvu },
    });
}


// **** Export default **** //

export default {
    getAllReserves,
    getReservesByCVU,
    getReserve,
    addReserve,
    updateReserve,
    deleteReserve,
    depositMoney,
    extractMoney
} as const;
