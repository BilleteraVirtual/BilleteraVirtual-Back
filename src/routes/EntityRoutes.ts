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
    const  cvu  = req.params.cvu;
    const entity = await EntityService.getEntity(cvu);
    res.status(HttpStatusCodes.OK).json(entity);
}

async function addEntity(req: IReq<IEntity>, res: IRes) {
    const entity = req.body;
    try {
      const result = await EntityService.addEntity(entity);
  
      // Respond with a success message
      res.status(HttpStatusCodes.CREATED).json({ success: true, message: 'Entity added successfully' });
    } catch (error) {
      console.error('Error adding entity:', error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
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

async function loginEntity(req: IReq, res: IRes){
    const entity = req.body;
    const token = await EntityService.loginEntity(entity);
    res.status(HttpStatusCodes.OK).json(token);
}

async function getEntityDetails(req: IReq<{ cvu: string, type: string }>, res: IRes): Promise<void> {
    const { cvu, type } = req.body; 

    try {
        const entityDetails = await EntityService.getEntityDetails(cvu, type);
        if (!entityDetails) {
            res.status(HttpStatusCodes.NOT_FOUND).json({ message: 'Entity not found' });
            return;
        }
        res.status(HttpStatusCodes.OK).json(entityDetails);
    } catch (error) {
        console.error('Error fetching entity details:', error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: 'An error occurred while fetching entity details' 
        });
    }
}

// **** Export default **** //

export default {
    getAllEntities,
    getEntity,
    addEntity,
    updateEntity,
    deleteEntity,
    loginEntity,
    getEntityDetails,
} as const;
