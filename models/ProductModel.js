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
        data: Buffer,
        contentType: String
    
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Product', ProductSchema)