import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { ICompany } from '@src/models/Company';
import Company from '@src/models/Company.model';


// **** Variables **** //

export const Company_NOT_FOUND_ERR = 'Company not found';


// **** Functions **** //

async function getAllCompanies(): Promise<Company[]> {
    return Company.findAll().then((entities: Company[]) => {
        return entities;
    });
}

async function getCompany(idCompany: number): Promise<Company> {
    return Company.findOne({
        where: { idCompany: idCompany },
    }).then((Company: Company | null) => {
        if (!Company) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, Company_NOT_FOUND_ERR);
        }
        return Company;
    });
}

async function addCompany(company: ICompany): Promise<void> {
    const { idCompany, businessName, categoryId, entityCVU } = company;
    Company.create({ idCompany, businessName, categoryId, entityCVU }).then(() => {
        return;
    });
}

async function updateCompany(company: ICompany): Promise<void> {
    const {  idCompany, businessName, categoryId, entityCVU } = company;
    Company.update({  businessName, categoryId, entityCVU }, {
        where: { idCompany },
    }).then(() => {
        return;
    });
}

async function deleteCompany(idCompany: number): Promise<void> {
    Company.destroy({
        where: { idCompany },
    }).then(() => {
        return;
    });
}
// **** Export default **** //

export default {
    getAllCompanies,
    getCompany,
    addCompany,
    updateCompany,
    deleteCompany,
} as const;
