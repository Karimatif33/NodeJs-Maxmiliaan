const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });

  // console.log(err)
};




exports.postAddProduct = (req, res, next) => {
  // products.push({ title: req.body.title });
  const title = req.body.title;
  const imgeUrl = req.body.imgeUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    imgeUrl: imgeUrl,
    description: description,
    userId: req.user._id
  });
  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin-product");
    })
    .catch((err) => {
      console.log(err);
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
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imgeUrl;
  const updatedDesc = req.body.description;

Product.findById(prodId).then(product => {
  product.title = updatedTitle
  product.price = updatedPrice
  product.imgeUrl = updatedImageUrl
  product.description = updatedDesc
   return product.save()
 
})

    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("admin-product");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
  // .select('title price imgeUrl -_id')
  // .populate('userId', 'name')
    .then(products => {
      console.log(products)
      res.render("shop/index", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log("Deleted PRODUCT!");
      res.redirect("/admin-product");
    })
    .catch((err) => console.log(err));
};
