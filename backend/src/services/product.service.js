import * as productRepository from "../repositories/product.repository.js";

export const createProduct = async (productData) => {
    return await productRepository.createProduct(productData);
};

export const getAllProducts = async () => {
    return await productRepository.getAllProducts();
};

export const getProductById = async (id) => {
    return await productRepository.getProductById(id);
};

export const updateProduct = async (id, productData) => {
    return await productRepository.updateProduct(id, productData);
};

export const deleteProduct = async (id) => {
    return await productRepository.deleteProduct(id);
};