import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IEntity } from '@src/models/Entity';
import Entity from '@src/models/Entity.model';


// **** Variables **** //

export const ENTITY_NOT_FOUND_ERR = 'Entity not found';


// **** Functions **** //

async function getAllEntities(): Promise<Entity[]> {
    return Entity.findAll().then((entities: Entity[]) => {
        return entities;
    });
}

async function getEntity(cvu: number): Promise<Entity> {
    return Entity.findOne({
        where: { CVU: cvu },
    }).then((entity: Entity | null) => {
        if (!entity) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, ENTITY_NOT_FOUND_ERR);
        }
        return entity;
    });
}

async function addEntity(entity: IEntity): Promise<void> {
    const { CVU, alias, balance, email } = entity;
    Entity.create({ CVU, alias, balance, email }).then(() => {
        return;
    });
}

async function updateEntity(entity: IEntity): Promise<void> {
    const { CVU, alias, balance, email } = entity;
    Entity.update({ alias, balance, email }, {
        where: { CVU },
    }).then(() => {
        return;
    });
}

async function deleteEntity(cvu: number): Promise<void> {
    Entity.destroy({
        where: { cvu },
    }).then(() => {
        return;
    });
}
// **** Export default **** //

export default {
    getAllEntities,
    getEntity,
    addEntity,
    updateEntity,
    deleteEntity,
} as const;
