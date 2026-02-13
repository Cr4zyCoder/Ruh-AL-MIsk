const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
    },
    sku: {
        type: String,
        required: [true, 'Please add a SKU'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    oldPrice: {
        type: Number,
    },
    newPrice: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    category: {
        type: String,
        required: [true, 'Please select a fragrance type/category'],
        enum: ['Woody', 'Floral', 'Oudh', 'Musky', 'Citrus', 'Oriental', 'Spicy', 'Fresh'],
    },
    gender: {
        type: String,
        required: [true, 'Please specify gender suitability'],
        enum: ['Male', 'Female', 'Unisex'],
    },
    occasion: {
        type: [String],
        enum: ['Daily Wear', 'Wedding', 'Prayer', 'Office', 'Evening', 'Special Occasion'],
    },
    sizeOptions: [{
        size: { type: String, enum: ['3ml', '6ml', '12ml', '24ml'] },
        stock: { type: Number, default: 0 }
    }],
    totalStock: {
        type: Number,
        required: true,
        default: 0
    },
    images: [{
        type: String, // Cloudinary URLs
    }],
    notes: {
        top: [String],
        heart: [String],
        base: [String]
    },
    longevity: {
        type: Number, // 1-10 scale
        min: 1,
        max: 10,
        default: 7
    },
    projection: {
        type: String,
        enum: ['Intimate', 'Moderate', 'Strong', 'Enormous'],
        default: 'Moderate'
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isBestseller: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['In Stock', 'Out of Stock', 'Coming Soon'],
        default: 'In Stock'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
