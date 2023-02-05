import Router from 'express';
import { authorController } from '../controllers/authorController.js';
import { checkRole } from '../middleware/checkRoleMiddleware.js';

export const authorRouter = new Router()

authorRouter.post('/', checkRole('ADMIN'), authorController.create)
authorRouter.get('/', authorController.getAll)

