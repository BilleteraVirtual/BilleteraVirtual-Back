import HttpStatusCodes from '@src/common/HttpStatusCodes';

import CategoryService from '@src/services/CategoryService';
import { ICategory } from '@src/models/Category';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

async function getAllCategories(req: IReq, res: IRes){
    const Categories = await CategoryService.getAllCategories();
    res.status(HttpStatusCodes.OK).json(Categories);
    }

async function getCategory(req: IReq, res: IRes){
    const  id  = +req.params.id;
    const category = await CategoryService.getCategory(id);
    res.status(HttpStatusCodes.OK).json(category);
}

async function addCategory(req: IReq<ICategory>, res: IRes){
    const category = req.body;
    console.log(category);
    await CategoryService.addCategory(category);
    res.status(HttpStatusCodes.CREATED).send();
}

async function updateCategory(req: IReq<ICategory>, res: IRes){
    const category = req.body;
    category.idCategory = +req.params.id;
    await CategoryService.updateCategory(category);
    res.status(HttpStatusCodes.CREATED).send();
}

async function deleteCategory(req: IReq, res: IRes){
    const id = +req.params.id;
    await CategoryService.deleteCategory(id);
    res.status(HttpStatusCodes.NO_CONTENT).send();
}
// **** Export default **** //

export default {
    getAllCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
} as const;
