
import sequelize from "../config/database.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const {
            customerName,
            customerPhone,
            customerAddress,
            notes,
            items
        } = req.body;

        // Vérifier les informations du client
        if (
            typeof customerName !== "string" ||
            !customerName.trim() ||
            typeof customerPhone !== "string" ||
            !customerPhone.trim() ||
            typeof customerAddress !== "string" ||
            !customerAddress.trim()
        ) {
            await transaction.rollback();

            return res.status(400).json({
                message: "Please provide your name, phone number and address."
            });
        }

        // Vérifier le panier
        if (
            !Array.isArray(items) ||
            items.length === 0 ||
            items.length > 50
        ) {
            await transaction.rollback();

            return res.status(400).json({
                message: "Your cart is empty or contains too many items."
            });
        }

        // Vérifier les identifiants des œuvres
        const productIds = items.map((item) => item.productId);

        if (
            productIds.some(
                (id) => !Number.isSafeInteger(Number(id)) ||
                    Number(id) <= 0
            ) ||
            new Set(productIds.map(Number)).size !== productIds.length
        ) {
            await transaction.rollback();

            return res.status(400).json({
                message: "The cart contains invalid or duplicate artworks."
            });
        }

        // Récupérer les œuvres depuis SQL Server
        const products = await Product.findAll({
            where: {
                id: productIds.map(Number)
            },
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        if (products.length !== productIds.length) {
            await transaction.rollback();

            return res.status(400).json({
                message: "One or more artworks could not be found."
            });
        }

        // Vérifier la disponibilité et calculer le total côté serveur
        const productById = new Map(
            products.map((product) => [Number(product.id), product])
        );

        for (const item of items) {
            const product = productById.get(Number(item.productId));

            if (product.status !== "available") {
                await transaction.rollback();

                return res.status(409).json({
                    message: `The artwork "${product.title}" is no longer available.`
                });
            }
        }

        const totalAmount = products.reduce(
            (sum, product) => sum + Number(product.price),
            0
        );

        // Créer la commande
        const order = await Order.create(
            {
                customerName: customerName.trim(),
                customerPhone: customerPhone.trim(),
                customerAddress: customerAddress.trim(),
                notes: typeof notes === "string" ? notes.trim() || null : null,
                totalAmount: totalAmount.toFixed(2),
                status: "pending"
            },
            { transaction }
        );

        // Enregistrer les œuvres avec leur prix au moment de la commande
        await OrderItem.bulkCreate(
            products.map((product) => ({
                orderId: order.id,
                productId: product.id,
                productTitle: product.title,
                productImage: product.image,
                unitPrice: product.price
            })),
            { transaction }
        );

        await transaction.commit();

        return res.status(201).json({
            message: "Your order has been placed successfully.",
            orderId: order.id,
            totalAmount: totalAmount.toFixed(2),
            status: order.status
        });

    } catch (error) {
        if (!transaction.finished) {
            await transaction.rollback();
        }

        console.error("Create order error:", error);

        return res.status(500).json({
            message: "Unable to place your order. Please try again."
        });
    }
};