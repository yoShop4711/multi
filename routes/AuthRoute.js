const AuthRoute = require("express").Router();
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verify");
const authAdmin = require("../middleware/authAdmin");
const authSeller = require("../middleware/authSeller");


AuthRoute.post(
  "/auth/register",
  asyncHandler(async (req, res) => {
    const { fullname, username, email, password, location, question } = req.body;

    if (!fullname || !username || !email || !question || !password || !location ) {
      res.json({ msg: "input box cannot be empty!" });
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      res.json({ msg: "The username you chose exists, please user another" });
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      res.json({ msg: "The email exists, please user another" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
        fullname,
      username,
      email,
      question,
      password: hashedPassword,
      location,
    });

    accesstoken = createAccessToken({id: User._id})
    const refreshtoken = createRefreshToken({id: User._id})


    res.cookie('refreshtoken', refreshtoken, {
      httpOnly: true,
      path: '/auth/refresh_token',
      maxAge: 7*24*60*60*1000 // 7d
    })



    res.json({ accesstoken });
  })
);

AuthRoute.post(
  "/auth/login",
  asyncHandler(async (req, res) => {
    
    const { username, password } = req.body;

    const userExists = await User.findOne({ username }).select("+password");

    if (!userExists) {
      res.json({
        msg: "No user associated with this username exists in our system. Please register.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (passwordMatch) {

      const accesstoken = createAccessToken({id: userExists._id})
      const refreshtoken = createRefreshToken({id: userExists._id})

            


        res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/auth/refresh_token',
        maxAge: 7*24*60*60*1000 // 7d
      })
  




      const { _id, fullname, username, email, role } = userExists

      res.json({ accesstoken, userExists: { _id, email, fullname, username, role } });
    } else {
      res.json({ msg: "check your password again" });
    }
  


  })

);

AuthRoute.get('/auth/refresh_token', asyncHandler(async(req, res) => {
  try{
  const rf_token = req.cookies.refreshtoken;
// console.log(rf_token);

  if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

  jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) =>{
    if(err) return res.status(400).json({msg: "Please Login or Register"})

    const accesstoken = createAccessToken({id: user.id})
    

    res.json({accesstoken})
}) }
catch(err) {
  return res.status(500).json({msg: err.message})

}




}))

AuthRoute.post(
  "/auth/forgot_password",
  asyncHandler(async (req, res) => {
    const { question, email } = req.body;

    if (!question || !email) {
      res.json({ msg: "fields cannot be empty." });
    }

    const emailFound = await User.findOne({ email });
    const questionFound = await User.findOne({ question });

  


    if (emailFound && questionFound) {
      const accessToken =  createAccessToken( { id: emailFound._id })
      // jwt.sign(
      //   { id: emailFound._id },
      //   process.env.ACCESS_TOKEN,
      //   { expiresIn: "1d" }
      // );

      res.json({ accessToken });
    } else {
      res.json({ msg: "please contact the admin to help you in password reset." });
    }
  })
);

AuthRoute.put(
  "/auth/reset_password",
  verify,
  asyncHandler(async (req, res) => {
    const { password } = req.body;

    if (!password) {
      res.json({ msg: "field cannot be empty." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: passwordHash,
      }
    );

    res.json({ msg: "succesfully updated" });
  })
);

AuthRoute.put(
  "/auth/logout",
  verify,
  asyncHandler(async (req, res) => {
    const authHeader = req.headers["authorization"];

    jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
      if (logout) {
        res.send({ msg: "You have been Logged Out" });
      } else {
        res.send({ msg: "Error" });
      }
    });
  })
);

AuthRoute.post('/auth/change_role/:id', verify, authAdmin, asyncHandler(async(req, res) => {

const {id} = req.params

await User.findByIdAndUpdate(
  id,
  req.body,
  {new: true}
  
)

res.json({msg: 'user has been succesfully upgraded to seller.'})

}))

AuthRoute.post('/auth/show_user/:id', verify, authAdmin, asyncHandler(async(req, res) => {

const {id} = req.params

const user = await User.findById(id).select('-password')

res.json({user})

}))


AuthRoute.post('/auth/show_users', verify, authAdmin, asyncHandler(async(req, res) => {
const users = await User.find().select('-password')

res.json({users})


}))


AuthRoute.put('/auth/edit_seller/:id', verify, authAdmin, asyncHandler(async(req, res) => {

const {id} = req.params

await User.findByIdAndUpdate(
  id,
  req.body,
  {new: true}
)

res.json({msg: 'seller account successfully updated.'})

}))


AuthRoute.get('/auth/user',verify, asyncHandler(async(req, res) => {
try{
  const user = await User.findById(req.user).select('-password')
  if(!user) return res.status(400).json({msg: "User does not exist."})

  res.json(user)
console.log(user);

// res.json(req.user)

}
  catch(err) {
    return res.status(500).json({msg: err.message})


  }


}))


const createAccessToken = (user) =>{
  return jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
  return jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: '7d'})
}


module.exports = AuthRoute;
