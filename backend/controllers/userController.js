import ApiError from '../error/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Favorite, Basket} from '../models/models.js';

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async register(req, res) {
        const {login, password, role} = req.body
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный логин или пароль'))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, hash, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const favorite = await Favorite.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.jspn({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }
}

export const userController = new UserController()