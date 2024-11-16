import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IEntity } from '@src/models/Entity';
import Entity from '@src/models/Entity.model';
import CompanyService from './CompanyService';
import UserService from './UserService';
import crypto from 'crypto';
import Category from '@src/models/Category.model';


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
    return jwt.sign({ email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '20s' });

}

export default {
    getAllEntities,
    getEntity,
    addEntity,
    updateEntity,
    deleteEntity,
    loginEntity,
} as const;
