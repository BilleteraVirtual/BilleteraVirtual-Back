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

async function getCompanyByName(businessName: string): Promise<Company|null> {
    return Company.findOne({
        where: { businessName: businessName },
    })
}

async function addCompany(company: any): Promise<void> {
    console.log(company);
    const { businessName, idCategory, entityCVU } = company;
console.log(idCategory)
    // Crear la empresa en la base de datos
    await Company.create({
        businessName,
        idCategory,
        entityCVU,
    });
}

async function updateCompany(company: ICompany): Promise<void> {
    const {  idCompany, businessName, idCategory, entityCVU } = company;
    Company.update({  businessName, idCategory, entityCVU }, {
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
    getCompanyByName,
    getAllCompanies,
    getCompany,
    addCompany,
    updateCompany,
    deleteCompany,
} as const;
