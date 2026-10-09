import Product from "../models/Product.js";

export const createProduct = async (productData) => {
    return await Product.create(productData);
};

export const getAllProducts = async () => {
    return await Product.findAll({
        order: [["createdAt", "DESC"]]
    });
};

export const getProductById = async (id) => {
    return await Product.findByPk(id);
};

export const updateProduct = async (id, productData) => {
    const product = await Product.findByPk(id);

    if (!product) {
        return null;
    }

    await product.update(productData);

    return product;
};

export const deleteProduct = async (id) => {
    const product = await Product.findByPk(id);

    if (!product) {
        return null;
    }

    await product.destroy();

    return product;
};