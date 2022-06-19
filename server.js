require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port  = process.env.PORT || 5500
const cors = require('cors')
const AuthRoute =  require('./routes/AuthRoute')
const ProductRoute = require('./routes/ProductRoute')
const CategoryRoute = require('./routes/CategoryRoute')
const MessageRoute = require('./routes/MessageRoute')



mongoose.connect(process.env.MONGOURL)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){
    console.log("connected to database");
  });

  app.use(cors())
  app.use('/uploads',express.static('uploads'));
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  app.use(AuthRoute)
  app.use(ProductRoute)
  app.use(CategoryRoute)
  app.use(MessageRoute)


  app.listen(port, () => {
    console.log(`Your server is now running on port ${port}`);
})

