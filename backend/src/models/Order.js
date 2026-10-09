
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Order = sequelize.define(
    "Order",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        customerName: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        customerPhone: {
            type: DataTypes.STRING(30),
            allowNull: false
        },

        customerAddress: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        status: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: "pending",
            validate: {
                isIn: [[
                    "pending",
                    "confirmed",
                    "shipped",
                    "delivered",
                    "cancelled"
                ]]
            }
        }
    },
    {
        tableName: "orders",
        timestamps: true
    }
);

export default Order;