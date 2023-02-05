import { v4 as uuidv4 } from 'uuid'
import path from 'path';
import { Picture } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class PictureController {
    async create(req, res, next) {
        try {
            const {authorId, name, price, techniqueId, size, categoryId, country, year} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const picture = await Picture.create({authorId, name, price, techniqueId, size, categoryId, country, year, img: fileName})

            // if (info) {
            //     info = JSON.parse(info)
            //     info.forEach(i => 
            //         PictureInfo.create({
            //             title: i.title,
            //             description: i.description,
            //             pictureId: picture.id
            //         })
            //     )
            // }

            return res.json(picture)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {authorId, categoryId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let pictures;
        if(!authorId && !categoryId) {
            pictures = await Picture.findAndCountAll({limit, offset})
        }
        if(authorId && !categoryId) {
            pictures = await Picture.findAndCountAll({where: {authorId}, limit, offset})
        }
        if(!authorId && categoryId) {
            pictures = await Picture.findAndCountAll({where: {categoryId}, limit, offset})
        }
        if(authorId && categoryId) {
            pictures = await Picture.findAndCountAll({where: {authorId ,categoryId}, limit, offset})
        }
        return res.json(pictures)
    }

    async getOne(req, res) {
        const {id} = req.params
        const picture = await Picture.findOne(
            {
                where: {id},
                // include: [{model: Picture, as: info}]
            },
        )
        return res.json(picture)
    }
}

export const pictureController = new PictureController()