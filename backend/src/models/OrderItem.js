
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrderItem = sequelize.define(
    "OrderItem",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        productId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        productTitle: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        productImage: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        tableName: "order_items",
        timestamps: true
    }
);

export default OrderItem;