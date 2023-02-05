import Router from 'express';
import { userController } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

export const userRouter = new Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.get('/auth', authMiddleware, userController.check)

