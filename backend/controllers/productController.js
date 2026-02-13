const Product = require('../models/Product.model');
const cloudinary = require('../utils/cloudinary');

const uploadToCloudinary = async (image) => {
    if (image.startsWith('http')) return image; // Already uploaded
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: 'ruh_al_misk/products',
        });
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        return null;
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const { category, gender, occasion, search, sort } = req.query;
        let query = {};

        // Filtering
        if (category) query.category = category;
        if (gender) query.gender = gender;
        if (occasion) query.occasion = { $in: [occasion] };
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        let productsQuery = Product.find(query);

        // Sorting
        if (sort) {
            const sortBy = sort.split(',').join(' ');
            productsQuery = productsQuery.sort(sortBy);
        } else {
            productsQuery = productsQuery.sort('-createdAt');
        }

        const products = await productsQuery;
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { images, ...productData } = req.body;

        let imageUrls = [];
        if (images && images.length > 0) {
            imageUrls = await Promise.all(images.map(img => uploadToCloudinary(img)));
        }

        const product = new Product({
            ...productData,
            images: imageUrls.filter(url => url !== null)
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            const { images, ...productData } = req.body;

            let imageUrls = [];
            if (images && images.length > 0) {
                imageUrls = await Promise.all(images.map(img => uploadToCloudinary(img)));
            }

            Object.assign(product, {
                ...productData,
                images: imageUrls.filter(url => url !== null)
            });

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
