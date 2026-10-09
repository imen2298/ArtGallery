import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/produit.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import orderRoutes from "./routes/order.routes.js";
import adminOrderRoutes from "./routes/admin-order.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.json());
app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
);

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

export default app;