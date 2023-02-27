import { v4 as uuidv4 } from 'uuid'
import path from 'path';
import { Picture } from '../models/models.js';
import ApiError from '../error/ApiError.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


class PictureController {
    async create(req, res, next) {
        try {
            const { author, name, price, size, country, year, technique, category } = req.body
            const { img } = req.files
            let fileName = uuidv4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const picture = await Picture.create({author, name, price, size, country, year, technique, category, img: fileName})
            return res.json(picture)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let pictures;
        pictures = await Picture.findAndCountAll({ limit, offset });
        return res.json(pictures)
    }

    async getOne(req, res) {
        const { id } = req.params
        const picture = await Picture.findOne({
            where: { id }
            })
        return res.json(picture)
    }
}

export const pictureController = new PictureController()