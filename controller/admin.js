const Product = require("../models/product");
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const fileHelper = require('../util/file')
const { validationResult } = require("express-validator");
exports.getAddProduct = (req, res, next) => {

  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
     hasError: false,
     errorMessage: null,
     validationErrors: [],
  })

  // console.log(err)
};




exports.postAddProduct = (req, res, next) => {
  // products.push({ title: req.body.title });
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  if (!image) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description:description,
      },
      errorMessage: 'File is not an image' ,
      validationErrors: []
    });
  }
  const errors = validationResult(req);

  if (!errors.isEmpty()){
    console.log(errors.array())
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description:description
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: []
    });
  } 
const imgeUrl = image.path
  const product = new Product({
    title: title,
    price: price,
    imgeUrl: imgeUrl,
    description: description,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      console.log("Created Product");
      res.redirect("/admin-product");
    })
    
    .catch(err => {
      
const error = new  Error(err)
error.httpStatusCode= 500;
return next(error)
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: null,
      validationErrors: [],

      })
    })
    
    .catch((err) => {



      const error = new  Error(err)
      error.httpStatusCode= 500;
      return next(error)   
    
    
    });
};


exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDesc = req.body.description;
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    console.log(errors.array())
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      product: {
        title: updatedTitle,
        price: updatedPrice,
        description:updatedDesc,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: [],
      // validationErrors: errors.array(),
    });
  } 

  Product.findById(prodId)
.then(product => {
  if (product.userId.toString() !== req.user._id.toString()){
      return res.redirect("admin-product");
  } 
  product.title = updatedTitle
  product.price = updatedPrice
  product.imgeUrl = updatedImageUrl
  product.description = updatedDesc
   return product.save()
 
   .then(result => {
     console.log("UPDATED PRODUCT!");
     res.redirect("admin-product");
   }) 
  })
  .catch((err) => {
    const error = new  Error(err)
error.httpStatusCode= 500;
return next(error)
  });
  };


exports.getProducts = (req, res, next) => {
  Product.find({userId: req.user._id})
  // .select('title price imgeUrl -_id')
  // .populate('userId', 'name')
    .then(products => {
      // console.log(products)
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "admin/products",
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
Product.findById(prodId)
.then(product => {
  if (!product) {
    return next(new Error('product not found'))
  }
  fileHelper.deleteFile(product.imgeUrl)
  return   Product.deleteOne({_id: prodId, userId: req.user._id})

})
.then(() => {
  console.log("Deleted PRODUCT!");
  res.status(200).json({message: 'succes!'});
})
.catch(err => {
  res.status(500).json({message: 'faild!'});
});
}
