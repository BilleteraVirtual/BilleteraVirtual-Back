import HttpStatusCodes from '@src/common/HttpStatusCodes';

import ReserveService from '@src/services/ReserveService';
import { IReserve } from '@src/models/Reserve';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

async function getAllReserves(req: IReq, res: IRes){
    const reserves = await ReserveService.getAllReserves();
    res.status(HttpStatusCodes.OK).json(reserves);
    }

async function getReserve(req: IReq, res: IRes){
    const  reserveId  = +req.params.id;
    const reserve = await ReserveService.getReserve(reserveId);
    res.status(HttpStatusCodes.OK).json(reserve);
}

async function addReserve(req: IReq<IReserve>, res: IRes){
    const reserve = req.body;
    await ReserveService.addReserve(reserve);
    res.status(HttpStatusCodes.CREATED).send();
}

async function updateReserve(req: IReq<IReserve>, res: IRes){
    const reserve = req.body;
    reserve.reserveId = +req.params.id;
    await ReserveService.updateReserve(reserve);
    res.status(HttpStatusCodes.CREATED).send();
}

async function deleteReserve(req: IReq, res: IRes){
    const id = +req.params.id;
    await ReserveService.deleteReserve(id);
    res.status(HttpStatusCodes.NO_CONTENT).send();
}

// **** Export default **** //

export default {
    getAllReserves,
    getReserve,
    addReserve,
    updateReserve,
    deleteReserve,
} as const;
