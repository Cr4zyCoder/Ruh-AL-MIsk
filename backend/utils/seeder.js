const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product.model');

const products = [
    {
        name: "Golden Oudh",
        sku: "RM-GOUD-001",
        description: "A majestic blend of aged Cambodian Oud, Bulgarian rose, and warm amber. Evokes the splendor of Arabian nights.",
        oldPrice: 4500,
        newPrice: 3800,
        category: "Oudh",
        gender: "Unisex",
        occasion: ["Wedding", "Special Occasion"],
        sizeOptions: [
            { size: "3ml", stock: 15 },
            { size: "6ml", stock: 10 },
            { size: "12ml", stock: 5 }
        ],
        totalStock: 30,
        images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"],
        notes: {
            top: ["Saffron", "Rose"],
            heart: ["Cambodian Oud", "Sandalwood"],
            base: ["Amber", "White Musk"]
        },
        longevity: 9,
        projection: "Strong",
        isFeatured: true,
        status: "In Stock"
    },
    {
        name: "Royal Musk",
        sku: "RM-RMUSK-002",
        description: "Experience the purity of white musk blended with soft lily and powdery notes. A clean, sophisticated scent for daily elegance.",
        oldPrice: 2800,
        newPrice: 2200,
        category: "Musky",
        gender: "Unisex",
        occasion: ["Daily Wear", "Office", "Prayer"],
        sizeOptions: [
            { size: "3ml", stock: 20 },
            { size: "6ml", stock: 15 },
            { size: "12ml", stock: 8 }
        ],
        totalStock: 43,
        images: ["https://images.unsplash.com/photo-1547881338-64674330681b?auto=format&fit=crop&w=800&q=80"],
        notes: {
            top: ["Lily", "Powdery Notes"],
            heart: ["White Musk", "Jasmine"],
            base: ["Sandalwood", "Amber"]
        },
        longevity: 7,
        projection: "Moderate",
        isBestseller: true,
        status: "In Stock"
    },
    {
        name: "Midnight Rose",
        sku: "RM-MROSE-003",
        description: "A dark, seductive rose fragrance with hints of spicy clove and deep patchouli. Perfect for winter evenings.",
        oldPrice: 3200,
        newPrice: 2600,
        category: "Floral",
        gender: "Female",
        occasion: ["Evening", "Special Occasion"],
        sizeOptions: [
            { size: "3ml", stock: 10 },
            { size: "6ml", stock: 8 }
        ],
        totalStock: 18,
        images: ["https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"],
        notes: {
            top: ["Pink Pepper", "Cloves"],
            heart: ["Damask Rose", "Geranium"],
            base: ["Patchouli", "Benzoin"]
        },
        longevity: 8,
        projection: "Strong",
        status: "In Stock"
    },
    {
        name: "Desert Citrus",
        sku: "RM-DCIT-004",
        description: "An invigorating burst of Mediterranean citrus softened by golden amber and nomadic woods.",
        oldPrice: 2500,
        newPrice: 1900,
        category: "Citrus",
        gender: "Male",
        occasion: ["Daily Wear", "Office"],
        sizeOptions: [
            { size: "6ml", stock: 12 },
            { size: "12ml", stock: 10 }
        ],
        totalStock: 22,
        images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"],
        notes: {
            top: ["Bergamot", "Lemon", "Grapefruit"],
            heart: ["Ginger", "Mint"],
            base: ["Amber", "Cedarwood"]
        },
        longevity: 6,
        projection: "Moderate",
        status: "In Stock"
    }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Product.deleteMany();
        await Product.insertMany(products);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
