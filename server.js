require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port  = process.env.PORT || 5500
const cors = require('cors')
const cookieParser = require('cookie-parser')
const AuthRoute =  require('./routes/AuthRoute')
const ProductRoute = require('./routes/ProductRoute')
const CategoryRoute = require('./routes/CategoryRoute')
const path = require('path')





mongoose.connect(process.env.MONGOURL)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){
    console.log("connected to database");
  });

  const io = require("socket.io")(3300)

  app.use(cors())
  app.use("/public", express.static(path.join(__dirname, '/public')));
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(cookieParser())


  app.use(function (req, res, next) {
    req.io = io;
    next();
  });
  

  app.use(AuthRoute)
  app.use(ProductRoute)
  app.use(CategoryRoute)
  


  app.listen(port, () => {
    console.log(`Your server is now running on port ${port}`);
})

