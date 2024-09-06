import HttpStatusCodes from '@src/common/HttpStatusCodes';

import EntityService from '@src/services/EntityService';
import { IEntity } from '@src/models/Entity';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

async function getAllEntities(req: IReq, res: IRes){
    const entities = await EntityService.getAllEntities();
    res.status(HttpStatusCodes.OK).json(entities);
    }

async function getEntity(req: IReq, res: IRes){
    const  cvu  = +req.params.cvu;
    const entity = await EntityService.getEntity(cvu);
    res.status(HttpStatusCodes.OK).json(entity);
}

async function addEntity(req: IReq<IEntity>, res: IRes){
    const entity = req.body;
    await EntityService.addEntity(entity);
    res.status(HttpStatusCodes.CREATED).send();
}

async function updateEntity(req: IReq<IEntity>, res: IRes){
    const entity = req.body;
    await EntityService.updateEntity(entity);
    res.status(HttpStatusCodes.CREATED).send();
}

async function deleteEntity(req: IReq, res: IRes){
    const cvu = +req.params.cvu;
    await EntityService.deleteEntity(cvu);
    res.status(HttpStatusCodes.NO_CONTENT).send();
}

// **** Export default **** //

export default {
    getAllEntities,
    getEntity,
    addEntity,
    updateEntity,
    deleteEntity,
} as const;
