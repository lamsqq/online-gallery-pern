import { Technique } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class TechniqueController {
    async create(req, res) {
        const {name} = req.body
        const technique = await Technique.create({name})
        return res.json({technique})
    }

    async getAll(req, res) {
        const techniques = await Category.findAll()
        return res.json(techniques)
    }
}

export const techniqueController = new TechniqueController()