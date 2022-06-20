const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MessageSchema = new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
    },
    readBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
    },
    
}, {
    timestamps: true
});

module.exports = Message = mongoose.model('Message', MessageSchema);
