import Router from 'express';
import { techniqueController } from '../controllers/techniqueController.js';
import { checkRole } from '../middleware/checkRoleMiddleware.js';

export const techniqueRouter = new Router()

techniqueRouter.post('/', checkRole('ADMIN'), techniqueController.create)
techniqueRouter.get('/', techniqueController.getAll)

