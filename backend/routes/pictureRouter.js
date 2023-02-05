import Router from 'express';
import { pictureController } from '../controllers/pictureController.js';
import { checkRole } from '../middleware/checkRoleMiddleware.js';

export const pictureRouter = new Router()

pictureRouter.post('/', checkRole('ADMIN'), pictureController.create)
pictureRouter.get('/', pictureController.getAll)
pictureRouter.get('/:id', pictureController.getOne)

