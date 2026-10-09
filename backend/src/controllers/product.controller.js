import * as productService from "../services/product.service.js";

export const createProduct = async (req, res) => {
    try {
        const {
            title,
            category,
            description,
            dimensions,
            price,
            status
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "L'image est obligatoire."
            });
        }

        const productData = {
            title,
            category,
            description,
            dimensions,
            price,
            image: req.file.filename,
            status
        };

        const product = await productService.createProduct(productData);

        return res.status(201).json({
            message: "Produit créé avec succès.",
            product
        });

    } catch (error) {
        console.error(
            "Erreur lors de la création du produit :",
            error
        );

        return res.status(500).json({
            message: "Erreur interne du serveur."
        });
    }
};


export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();

        return res.status(200).json(products);

    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);

        return res.status(500).json({
            message: "Erreur interne du serveur."
        });
    }
};


export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Produit introuvable."
            });
        }

        return res.status(200).json(product);

    } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);

        return res.status(500).json({
            message: "Erreur interne du serveur."
        });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID reçu :", id);
        console.log("BODY reçu :", req.body);
        console.log("FILE reçu :", req.file);
        const productData = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            dimensions: req.body.dimensions,
            price: req.body.price,
            status: req.body.status
        };

        // Si une nouvelle image a été sélectionnée
        if (req.file) {
            productData.image = req.file.filename;
        }

        const product = await productService.updateProduct(
            id,
            productData
        );

        if (!product) {
            return res.status(404).json({
                message: "Produit introuvable."
            });
        }

        return res.status(200).json({
            message: "Produit modifié avec succès.",
            product
        });

    } catch (error) {
        console.error(
            "Erreur lors de la modification du produit :",
            error
        );

        return res.status(500).json({
            message: "Erreur interne du serveur."
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                message: "Produit introuvable."
            });
        }

        return res.status(200).json({
            message: "Produit supprimé avec succès."
        });

    } catch (error) {
        console.error("Erreur lors de la suppression du produit :", error);

        return res.status(500).json({
            message: "Erreur interne du serveur."
        });
    }
};