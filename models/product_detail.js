const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    product_name: {
        required: true,
        type: String
    },
    sku: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    },
    price: {
        required: true,
        type: String
    },
    product_discription: {
        required: true,
        type: String
    },
    thumbnail: {
        required: true,
        type: String
    },
    product_images: {
        required: true,
        type: Array
    },
})

module.exports = mongoose.model('Products', dataSchema)