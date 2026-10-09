import bcrypt from "bcryptjs";
import sequelize from "../config/database.js";
import Admin from "../models/Admin.js";

const createAdmin = async () => {
    try {
        await sequelize.authenticate();

        const username = process.env.ADMIN_USERNAME;
        const password = process.env.ADMIN_PASSWORD;

        if (!username || !password) {
            throw new Error("ADMIN_USERNAME ou ADMIN_PASSWORD manquant.");
        }

        const existingAdmin = await Admin.findOne({
            where: { username }
        });

        if (existingAdmin) {
            console.log("Cet administrateur existe déjà.");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.create({
            username,
            password: hashedPassword
        });

        console.log("Administrateur créé avec succès.");

    } catch (error) {
        console.error(error);
    } finally {
        await sequelize.close();
    }
};

createAdmin();