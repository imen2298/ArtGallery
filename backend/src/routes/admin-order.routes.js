
import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";

import {
    getAllOrders,
    getOrderById,
    updateOrderStatus
} from "../controllers/adminOrder.controller.js";

const router = express.Router();

// Toutes les routes de ce fichier sont protégées
router.use(verifyToken);

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);

export default router;