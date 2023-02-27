import Router from 'express';
import { userRouter } from './userRouter.js';
import { pictureRouter } from './pictureRouter.js';
import dotenv from 'dotenv'

dotenv.config()

export const router = new Router()

router.use('/user', userRouter)
router.use('/picture', pictureRouter)

