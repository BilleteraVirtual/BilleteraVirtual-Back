import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IEntity } from '@src/models/Entity';
import Entity from '@src/models/Entity.model';


// **** Variables **** //

export const ENTITY_NOT_FOUND_ERR = 'Entity not found';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
    const { CVU, alias, balance, email, password } = entity;
    const hash = bcrypt.hashSync(password, 10);
    
    Entity.create({ CVU, alias, balance, email, hash }).then(() => {
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

async function loginEntity(entity: any): Promise<void> {
    const entity1 = await Entity.findOne({
        where: { email: entity.email },
    });

    if(!entity1){
        throw new RouteError(HttpStatusCodes.NOT_FOUND, ENTITY_NOT_FOUND_ERR);
    }

    const pass = bcrypt.compareSync(entity.password, entity1.hash);

    if (!pass) {
        throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid password');
    }

    return createToken(entity1.email);
}
// **** Export default **** //

function createToken(email: string | undefined) { 
    if (!email) {
        throw new Error('Email is required to create a token');
    } 
    return jwt.sign({ email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1d' });

}

export default {
    getAllEntities,
    getEntity,
    addEntity,
    updateEntity,
    deleteEntity,
    loginEntity,
} as const;
