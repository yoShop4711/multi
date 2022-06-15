const ProductRoute = require("express").Router();
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const verify = require("../middleware/verify");
const authSeller = require("../middleware/authSeller");
const authAdmin = require("../middleware/authAdmin");
const asyncHandler = require("express-async-handler");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./products/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

ProductRoute.post(
  "/api/create_product",
  verify,
  authSeller,
  upload.array("productImage", 12),
  asyncHandler(async (req, res) => {
    const {
      productName,
      productDescription,
      productQuantity,
      productAvailability,
      categoryId,
    } = req.body;

    if (
      !productName ||
      !productDescription ||
      !productQuantity ||
      !productAvailability ||
      !categoryId
    ) {
      res.json({ msg: "fields cannot be empty when making a post." });
    }

    const product = await Product({
      productName,
      productDescription,
      productQuantity,
      productAvailability,
      categoryId,
      productImage: req.files,
      createdBy: req.user.id,
    });

    await product.save(function (error) {
      if (!error) {
        Product.find({})
          .populate("createdBy")
          .exec(function (error, products) {
            console.log(JSON.stringify(products, null, "\t"));
          });
      }
    });

    res.json({ msg: "product created" });
  })
);

ProductRoute.put('/api/update_product/:id', verify, authSeller, asyncHandler(async(req, res) => {
  const {id} = req.params

  const product = await Product.findById(id)
  const seller = await User.findById(req.user)



  if ( product.createdBy.toString() !== seller._id.toString()) {
    return res.json({ msg: 'Access is denied.' });
  }

  await Product.findByIdAndUpdate(
    product,
    req.body,
    {new: true}
  )

  res.json({msg: 'updated'})



}))

ProductRoute.delete('/api/delete_product/:id', verify, asyncHandler(async(req, res) => {

  const{id} = req.params

  const product = await Product.findById(id)
  const seller = await User.findById(req.user)



  if ( product.createdBy.toString() !== seller._id.toString()) {
    return res.json({ msg: 'Access is denied.' });
  }

  await Product.findByIdAndDelete(product)

  res.json({msg: 'deleted'})


}))


module.exports = ProductRoute;
