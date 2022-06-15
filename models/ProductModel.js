const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productQuantity: {
        type: String,
        required: true
    },
    productAvailability: {
        type: String,
        required: true
    },
    productImage: {
        type: Array,
        default: []
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    categoryId: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Product', ProductSchema)