import Router from 'express';
import { categoryController } from '../controllers/categoryController.js';
import { checkRole } from '../middleware/checkRoleMiddleware.js';

export const categoryRouter = new Router()

categoryRouter.post('/', checkRole('ADMIN'), categoryController.create)
categoryRouter.get('/', categoryController.getAll)

