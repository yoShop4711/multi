const MessageRoute = require('express').Router()
const Message = require('../models/MessageModel')
const User = require('../models/UserModel')
const verify = require('../middleware/verify')
const authSeller = require('../middleware/authSeller')
const authAdmin = require('../middleware/authAdmin')
const asyncHandler = require('express-async-handler')

MessageRoute.post('/message/send/:id', verify,  asyncHandler(async(req, res) => {
 

    


}))



module.exports = MessageRoute