import { Author } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class AuthorController {
    async create(req, res) {
        const {name} = req.body
        const author = await Author.create({name})
        return res.json({author})
    }

    async getAll(req, res) {
        const authors = await Author.findAll()
        return res.json(authors)
    }
}

export const authorController = new AuthorController()