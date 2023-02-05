import { Category } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class CategoryController {
    async create(req, res) {
        const {name} = req.body
        const category = await Category.create({name})
        return res.json({category})
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }
}

export const categoryController = new CategoryController()