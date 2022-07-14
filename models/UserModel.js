const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
fullname: {
    type: String,
    required: true
},
username: {
    type: String,
    required: true,
    unique: true
},
email: {
    type: String,
    required: true,
    unique: true
},
question: {
    type: String,
    required: true,
    unique: true
},


password: {
    type: String,
    required: true
},
location: {
type: String,
required: true
},
userImage: {
    type: Array,
    required: true,
    default: []

},
role: {
    type: Number,
        default: 0
},
admin: {
    type: Number,
    default: 0
},
cart: {
    type: Array,
        default: []
}

}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)