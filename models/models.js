import dotenv from 'dotenv';
import { sequelize } from '../db.js';
import { DataTypes } from 'sequelize';

dotenv.config()

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "User"},
})

export const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

export const BasketPicture = sequelize.define('basket_picture', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

export const Picture = sequelize.define('picture', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    author: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    size: {type: DataTypes.STRING, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.INTEGER, allowNull: false},
    technique: {type: DataTypes.STRING, allowNull: false},
    category: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketPicture)
BasketPicture.belongsTo(Basket)

BasketPicture.hasOne(Picture)
Picture.belongsTo(BasketPicture)

export const models = (
    User, Basket, BasketPicture, Picture
)