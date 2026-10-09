import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        // Récupérer le token dans le header Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Token manquant."
            });
        }

        // Vérifier que le header commence par "Bearer"
        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                message: "Format du token invalide."
            });
        }

        const token = parts[1];

        // Vérifier le token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Ajouter les informations de l'admin à la requête
        req.admin = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token invalide ou expiré."
        });
    }
};