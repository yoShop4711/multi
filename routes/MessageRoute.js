const MessageRoute = require('express').Router()
const Message = require('../models/MessageModel')
const User = require('../models/UserModel')
const Chat = require('../models/ChatModel')
const verify = require('../middleware/verify')
const authSeller = require('../middleware/authSeller')
const authAdmin = require('../middleware/authAdmin')
const asyncHandler = require('express-async-handler')

MessageRoute.post('/message/send/:id', verify,  asyncHandler(async(req, res) => {
 

    let newMessage = {
        sender: req.user._id,
        readBy: req.params.id,
        content: req.body.content
    }

    let message = await Message.create(newMessage)

    message = await message.populate("sender", "username")
    message = await message.populate("readBy")
    // message = await User.populate(message);

    // await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);





}))



module.exports = MessageRoute