import HttpStatusCodes from '@src/common/HttpStatusCodes';

import CompanyService from '@src/services/CompanyService';
import { ICompany } from '@src/models/Company';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

async function getAllCompanies(req: IReq, res: IRes){
    const entities = await CompanyService.getAllCompanies();
    res.status(HttpStatusCodes.OK).json(entities);
    }

async function getCompany(req: IReq, res: IRes){
    const  idCompany  = +req.params.id;
    const Company = await CompanyService.getCompany(idCompany);
    res.status(HttpStatusCodes.OK).json(Company);
}

async function addCompany(req: IReq<ICompany>, res: IRes){
    const Company = req.body;
    await CompanyService.addCompany(Company);
    res.status(HttpStatusCodes.CREATED).send();
}

async function updateCompany(req: IReq<ICompany>, res: IRes){
    const Company = req.body;
    Company.idCompany = +req.params.id;
    await CompanyService.updateCompany(Company);
    res.status(HttpStatusCodes.CREATED).send();
}

async function deleteCompany(req: IReq, res: IRes){
    const companyId = +req.params.id;
    await CompanyService.deleteCompany(companyId);
    res.status(HttpStatusCodes.NO_CONTENT).send();
}

// **** Export default **** //

export default {
    getAllCompanies,
    getCompany,
    addCompany,
    updateCompany,
    deleteCompany,
} as const;
