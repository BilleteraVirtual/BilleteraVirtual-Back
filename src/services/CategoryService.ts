import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { ICategory } from '@src/models/Category';
import Category from '@src/models/Category.model';


// **** Variables **** //

export const CATEGORY_NOT_FOUND_ERR = 'Category not found';


// **** Functions **** //

async function getAllCategories(): Promise<Category[]> {
    return Category.findAll().then((Categories: Category[]) => {
        return Categories;
    });
}

async function getCategory(idCategory: number): Promise<Category> {
    return Category.findOne({
        where: { categoryId: idCategory },
    }).then((category: Category | null) => {
        if (!category) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, CATEGORY_NOT_FOUND_ERR);
        }
        return category;
    });
}

async function addCategory(category: ICategory): Promise<void> {
    const { categoryId, type } = category;
    Category.create({ categoryId, type }).then(() => {
        return;
    });
}

async function updateCategory(category: ICategory): Promise<void> {
    const { categoryId, type } = category;
    Category.update({ type }, {
        where: { categoryId },
    }).then(() => {
        return;
    });
}

async function deleteCategory(categoryId: number): Promise<void> {
    Category.destroy({
        where: { categoryId },
    }).then(() => {
        return;
    });
}
// **** Export default **** //

export default {
    getAllCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
} as const;
