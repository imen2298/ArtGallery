
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import "../models/associations.js";

// GET /api/admin/orders
// Récupérer toutes les commandes
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    as: "items",
                    attributes: [
                        "id",
                        "productId",
                        "productTitle",
                        "productImage",
                        "unitPrice"
                    ]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json(orders);
    } catch (error) {
        console.error("Get orders error:", error);
        return res.status(500).json({
            message: "Impossible de récupérer les commandes."
        });
    }
};

// GET /api/admin/orders/:id
// Récupérer une commande et ses détails
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                {
                    model: OrderItem,
                    as: "items",
                    attributes: [
                        "id",
                        "productId",
                        "productTitle",
                        "productImage",
                        "unitPrice"
                    ]
                }
            ]
        });

        if (!order) {
            return res.status(404).json({
                message: "Commande introuvable."
            });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error("Get order details error:", error);
        return res.status(500).json({
            message: "Impossible de récupérer cette commande."
        });
    }
};

// PATCH /api/admin/orders/:id/status
// Modifier le statut d'une commande
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "pending",
            "confirmed",
            "shipped",
            "delivered",
            "cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Statut de commande invalide."
            });
        }

        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Commande introuvable."
            });
        }

        if (
            ["cancelled", "delivered"].includes(order.status) &&
            order.status !== status
        ) {
            return res.status(409).json({
                message:
                    "Cette commande est terminée ou annulée. " +
                    "Une nouvelle modification n'est pas autorisée."
            });
        }

        await order.update({ status });

        return res.status(200).json({
            message: "Statut de la commande mis à jour.",
            order
        });
    } catch (error) {
        console.error("Update order status error:", error);
        return res.status(500).json({
            message: "Impossible de modifier le statut."
        });
    }
};