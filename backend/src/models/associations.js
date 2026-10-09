
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Product from "./Product.js";

// Une commande contient plusieurs œuvres
Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    as: "items",
    onDelete: "CASCADE"
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order"
});

// Une ligne de commande peut référencer une œuvre existante
OrderItem.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
    onDelete: "SET NULL"
});

Product.hasMany(OrderItem, {
    foreignKey: "productId",
    as: "orderItems"
});

export { Order, OrderItem, Product };