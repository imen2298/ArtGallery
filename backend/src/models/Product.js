import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        category: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        dimensions: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        image: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM("available", "sold"),
            allowNull: false,
            defaultValue: "available"
        }
    },
    {
        tableName: "products",
        timestamps: true
    }
);

export default Product;