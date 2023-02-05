import Router from 'express';
import { userRouter } from './userRouter.js';
import { authorRouter } from './authorRouter.js';
import { categoryRouter } from './categoryRouter.js';
import { pictureRouter } from './pictureRouter.js';
import { techniqueRouter } from './techniqueRouter.js';
import dotenv from 'dotenv'

dotenv.config()

export const router = new Router()

router.use('/user', userRouter)
router.use('/author', authorRouter)
router.use('/category', categoryRouter)
router.use('/picture', pictureRouter)
router.use('/technique', techniqueRouter)

