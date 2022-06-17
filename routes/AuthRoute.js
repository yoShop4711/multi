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
    const { fullname, username, email, password, location } = req.body;

    if (!fullname || !username || !email || !password || !location) {
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
      password: hashedPassword,
      location,
    });

    res.json({ msg: "Account succesfully registered, please log in." });
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
      const accessToken = jwt.sign(
        { id: userExists._id },
        process.env.ACCESS_TOKEN,
        { expiresIn: 60 * 60 }
      );

      res.json({ accessToken });
    } else {
      res.json({ msg: "check your password again" });
    }
  })
);

AuthRoute.post(
  "/auth/forgot_password",
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
      res.json({ msg: "field cannot be empty." });
    }

    const emailFound = await User.findOne({ email });

    if (emailFound) {
      const accessToken = jwt.sign(
        { id: emailFound._id },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1d" }
      );

      res.json({ accessToken });
    } else {
      res.json({ msg: "This email was not found. Please register." });
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

AuthRoute.post('/user/change_role/:id', verify, authAdmin, asyncHandler(async(req, res) => {

const {id} = req.params

await User.findByIdAndUpdate(
  id,
  req.body,
  {new: true}
  
)

res.json({msg: 'user has been succesfully upgraded to seller.'})

}))

AuthRoute.post('/user/show_user/:id', verify, authAdmin, asyncHandler(async(req, res) => {

const {id} = req.params

const user = await User.findById(id).select('-password')

res.json({user})

}))


AuthRoute.post('/user/show_users', verify, authAdmin, asyncHandler(async(req, res) => {
const users = await User.find().select('-password')

res.json({users})


}))


AuthRoute.put('/user/edit_seller/:id', verify, authAdmin, asyncHandler(async(req, res) => {

const {id} = req.params

await User.findByIdAndUpdate(
  id,
  req.body,
  {new: true}
)

res.json({msg: 'seller account successfully updated.'})

}))





module.exports = AuthRoute;
