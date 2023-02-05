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

export const Favorite = sequelize.define('favorite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

export const FavoritePicture = sequelize.define('favorite_picture', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

export const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

export const BasketPicture = sequelize.define('basket_picture', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

export const Picture = sequelize.define('picture', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    size: {type: DataTypes.STRING, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})

export const Author = sequelize.define('author', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

export const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

export const Technique = sequelize.define('technique', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

export const AuthorCategory = sequelize.define('author_category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

export const CategoryTechnique = sequelize.define('category_technique', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Favorite)
Favorite.belongsTo(User)

Favorite.hasMany(FavoritePicture)
FavoritePicture.belongsTo(Favorite)

FavoritePicture.hasOne(Picture)
Picture.belongsTo(FavoritePicture)

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketPicture)
BasketPicture.belongsTo(Basket)

BasketPicture.hasOne(Picture)
Picture.belongsTo(BasketPicture)

Author.hasMany(Picture)
Picture.belongsTo(Author)

Category.hasMany(Picture)
Picture.belongsTo(Category)

Technique.hasMany(Picture)
Picture.belongsTo(Technique)

Author.hasOne(Technique)
Technique.belongsTo(Author)

Author.belongsToMany(Category, {through: AuthorCategory})
Category.belongsToMany(Author, {through: AuthorCategory})

Category.belongsToMany(Technique, {through: CategoryTechnique})
Technique.belongsToMany(Category, {through: CategoryTechnique})

export const models = (
    User, Favorite, FavoritePicture, Basket, BasketPicture, Picture, Author, Category, Technique, AuthorCategory, CategoryTechnique
)