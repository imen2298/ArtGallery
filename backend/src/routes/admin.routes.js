import express from "express";
import { loginAdmin } from "../controllers/admin.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/test", verifyToken, (req, res) => {
    res.status(200).json({
        message: "Route protégée accessible.",
        admin: req.admin
    });
});

export default router;