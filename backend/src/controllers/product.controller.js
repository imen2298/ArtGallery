import * as productService from "../services/product.service.js";
import supabase from "../config/supabase.js";
import path from "path";


export const createProduct = async (req, res) => {
    let uploadedPath = null;

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

        const extension = path.extname(req.file.originalname) || ".jpg";
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
        uploadedPath = fileName;

        const { error: uploadError } = await supabase.storage
            .from("artworks")
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: false
            });

        if (uploadError) {
            throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
            .from("artworks")
            .getPublicUrl(fileName);

        const productData = {
            title,
            category,
            description,
            dimensions,
            price,
            image: publicUrlData.publicUrl,
            status
        };

        const product = await productService.createProduct(productData);

        return res.status(201).json({
            message: "Produit créé avec succès.",
            product
        });

    } catch (error) {
        console.error("Erreur lors de la création du produit :", error);

        if (uploadedPath) {
            await supabase.storage
                .from("artworks")
                .remove([uploadedPath]);
        }

        return res.status(500).json({
            message: "Erreur lors de la création du produit."
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
    let uploadedPath = null;

    try {
        const { id } = req.params;

        const productData = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            dimensions: req.body.dimensions,
            price: req.body.price,
            status: req.body.status
        };

        if (req.file) {
            const extension = path.extname(req.file.originalname) || ".jpg";
            const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;

            uploadedPath = fileName;

            const { error: uploadError } = await supabase.storage
                .from("artworks")
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                    upsert: false
                });

            if (uploadError) {
                throw uploadError;
            }

            const { data: publicUrlData } = supabase.storage
                .from("artworks")
                .getPublicUrl(fileName);

            productData.image = publicUrlData.publicUrl;
        }

        const product = await productService.updateProduct(id, productData);

        if (!product) {
            if (uploadedPath) {
                await supabase.storage.from("artworks").remove([uploadedPath]);
            }

            return res.status(404).json({
                message: "Œuvre introuvable."
            });
        }

        return res.status(200).json({
            message: "Œuvre modifiée avec succès.",
            product
        });

    } catch (error) {
        console.error("Erreur lors de la modification de l’œuvre :", error);

        if (uploadedPath) {
            const { error: removeError } = await supabase.storage
                .from("artworks")
                .remove([uploadedPath]);

            if (removeError) {
                console.error("Erreur lors de la suppression de la nouvelle image :", removeError);
            }
        }

        return res.status(500).json({
            message: "Erreur lors de la modification de l’œuvre."
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