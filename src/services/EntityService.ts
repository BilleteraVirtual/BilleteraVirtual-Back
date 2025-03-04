import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IEntity } from '@src/models/Entity';
import Entity from '@src/models/Entity.model';
import CompanyService from './CompanyService';
import UserService from './UserService';
import crypto from 'crypto';
import Category from '@src/models/Category.model';
import Company from '@src/models/Company.model';
import User from '@src/models/User.model';


// **** Variables **** //

export const ENTITY_NOT_FOUND_ERR = 'Entity not found';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function generateUniqueCVU(): Promise<string> {
    let unique = false;
    let cvu = '';

    while (!unique) {
        // Generar un número de 22 dígitos como string
        cvu = Array.from({ length: 22 }, () => Math.floor(Math.random() * 10)).join('');

        // Verificar que no exista ya en la base de datos
        const existingEntity = await Entity.findOne({ where: { CVU: cvu } });
        if (!existingEntity) {
            unique = true;
        }
    }

    return cvu;
}

// **** Functions **** //

async function getAllEntities(): Promise<Entity[]> {
    return Entity.findAll().then((entities: Entity[]) => {
        return entities;
    });
}

async function getEntity(cvu: string): Promise<Entity> {
    return Entity.findOne({
        where: { CVU: cvu },
    }).then((entity: Entity | null) => {
        if (!entity) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, ENTITY_NOT_FOUND_ERR);
        }
        return entity;
    });
}

async function addEntity(entity: any): Promise<any> {
    const { alias, email, password, DNI, firstName, lastName, businessName, idCategory } = entity;
  
    // Validar que no exista el mismo email en la base de datos
    const existingEntity = await Entity.findOne({ where: { email } });
    if (existingEntity) {
      throw new Error(`El email "${email}" ya está registrado.`);
    }
  
    // Validar que no exista el mismo DNI en caso de que sea un User
    if (DNI) {
      const existingUser = await UserService.getUser(DNI);
      if (existingUser) {
        throw new Error(`El DNI "${DNI}" ya está registrado.`);
      }
    }
  
    // Validar que no exista el mismo nombre de empresa en caso de que sea una Company
    if (businessName) {
      const existingCompany = await CompanyService.getCompanyByName(businessName);
      console.log(existingCompany)
      if (existingCompany) {
        throw new Error(`La empresa con nombre "${businessName}" ya está registrada.`);
      }
    }
  
    // Generar CVU único
    const cvu = await generateUniqueCVU();
  
    // Hashear contraseña
    const hash = bcrypt.hashSync(password, 10);
  
    // Crear entidad
    await Entity.create({ CVU: cvu, alias, email, balance: 0, hash });
    console.log( businessName, idCategory)
    // Agregar usuario o empresa según corresponda
    if (DNI && firstName && lastName) {
      await UserService.addUser({
        DNI,
        firstName,
        lastName,
        entityCVU: cvu,
      });
    } else if (businessName && idCategory) {
      await CompanyService.addCompany({
        businessName,
        idCategory: idCategory,
        entityCVU: cvu,
      });
    }

    return { success: true, message: 'Usuario o empresa creado exitosamente' };
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

async function getEntityDetails(cvu: string, type: string): Promise<object | null> {
    if (type === 'user') {
        const user = await User.findOne({
            where: { entityCVU: cvu },
        });
        if (!user) return null;

        return {
            firstName: user.firstName,
            lastName: user.lastName,
        };
    } else if (type === 'company') {
        const company = await Company.findOne({
            where: { entityCVU: cvu },
            include: [{ model: Category, attributes: ['type'] }],
        });
        if (!company) return null;

        return {
            businessName: company.businessName,
            category: company.category?.type || 'No category assigned',
        };
    }
    return null; 
}



async function loginEntity(entity: any): Promise<string> {
    const entityRecord = await Entity.findOne({
        where: { email: entity.email },
    });

    if (!entityRecord) {
        throw new RouteError(HttpStatusCodes.NOT_FOUND, ENTITY_NOT_FOUND_ERR);
    }

    const isPasswordValid = bcrypt.compareSync(entity.password, entityRecord.hash);

    if (!isPasswordValid) {
        throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid password');
    }

    // Determinar el tipo de entidad (usuario o empresa)
    let type: 'user' | 'company';

    const user = await User.findOne({
        where: { entityCVU: entityRecord.CVU },
    });

    if (user) {
        type = 'user';
    } else {
        const company = await Company.findOne({
            where: { entityCVU: entityRecord.CVU },
        });

        if (company) {
            type = 'company';
        } else {
            throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Invalid entity type');
        }
    }

    // Crear y devolver token
    return createToken(entityRecord.email, entityRecord.CVU, type);
}
// **** Export default **** //

function createToken(email: string | undefined, cvu: string, type: 'user' | 'company'): string {
    if (!email || !cvu || !type) {
        throw new Error('Email, CVU, and type are required to create a token');
    }

    return jwt.sign(
        { email, cvu, type },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1d' }
    );
}

export default {
    getAllEntities,
    getEntity,
    addEntity,
    updateEntity,
    deleteEntity,
    loginEntity,
    getEntityDetails,
} as const;
