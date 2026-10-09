
import app from "./App.js";
import sequelize from "./config/database.js";

import Admin from "./models/Admin.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import OrderItem from "./models/OrderItem.js";

import "./models/associations.js";

const PORT = 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log("SQL Server connected successfully.");

        await Admin.sync();
        await Product.sync();

        await Order.sync();
        await OrderItem.sync();

        console.log("Database tables ready.");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Unable to connect to SQL Server:");
        console.error(error);
    }
};

startServer();