const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    OrderName: {
        type: String,
        required: true,
        unique: true
    },
    OrderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Order', OrderSchema)

