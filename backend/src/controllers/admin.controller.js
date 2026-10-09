import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Vérifier que les champs sont présents
        if (!username || !password) {
            return res.status(400).json({
                message: "Username et password sont obligatoires."
            });
        }

        // Chercher l'administrateur dans la base de données
        const admin = await Admin.findOne({
            where: { username }
        });

        if (!admin) {
            return res.status(401).json({
                message: "Identifiants incorrects."
            });
        }

        // Vérifier le mot de passe
        const passwordIsValid = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                message: "Identifiants incorrects."
            });
        }

        // Créer le token JWT
        const token = jwt.sign(
            {
                id: admin.id,
                username: admin.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        // Réponse en cas de connexion réussie
        return res.status(200).json({
            message: "Connexion réussie.",
            token,
            admin: {
                id: admin.id,
                username: admin.username
            }
        });

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);

        return res.status(500).json({
            message: "Erreur interne du serveur."
        });
    }
};