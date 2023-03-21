// const products = [];
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const Product = require("../models/product");
const Order = require("../models/order");

const ITEMS_PER_PAGE = 1;

exports.getProducts = (req, res, next) => {
  // const products = adminData.products;
  const page = +req.query.page || 1;
  let totalItems;

  Product.find()
  .countDocuments()
  .then(numProducts => {
    totalItems = numProducts
    return Product.find()
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
  })
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            });
    })
    .catch((err) => {
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
      console.log('ffffffffff')
    });
};



// exports.getProducts = (req, res, next) => {
//   // const products = adminData.products;
//   Product.find()
//     .then((products) => {
//       // console.log(products)
//       res.render("shop/product-list", {
//         prods: products,
//         pageTitle: "All Products",
//         path: "/products",
//         isAuthenticated: req.session.isLoggedIn,
//       });
//     })
//     .catch((err) => {
//       // const error = new Error(err);
//       // error.httpStatusCode = 500;
//       // return next(error);
//       console.log('gggggg')
//     });
// };

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
      console.log('sssssssssssssss')
    });
};
exports.getIndex = (req, res, next) => {
  // const products = adminData.products;
  const page = +req.query.page || 1;
  let totalItems

  Product.find()
  .countDocuments()
  .then(numProducts => {
    totalItems = numProducts
    return Product.find()
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
  })
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            });
    })
    .catch((err) => {
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
      console.log('ffffffffff')
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    // execPopulate()
    .then((user) => {
      // console.log(user.cart.items)
      const products = user.cart.items;
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      // console.log(result)
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.PostOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    // execPopulate()
    .then((user) => {
      // console.log()
      // console.log(user.cart.items)
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })

    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return next(new Error("No order Found"));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error("Unauthorized"));
      }
      const invoiceName = "invoice-" + orderId + ".pdf";
      const invoicePath = path.join("data", "invoices", invoiceName);

      const pdfDoc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="' + invoiceName + '"'
      );
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);
      pdfDoc.fontSize(26).text("Invoice", {
        underline: true,
      });
      pdfDoc.text("--------------------");
      let totalPrice = 0;
      order.products.forEach((prod) => {
        totalPrice += prod.quantity * prod.product.price;
        pdfDoc.text(
          prod.product.title +
            " - " +
            prod.quantity +
            " x " +
            " $ " +
            prod.product.price
        );
      });
      pdfDoc.text("----");
      pdfDoc.text("Total Ptice: $ " + totalPrice);

      pdfDoc.end();

      // fs.readFile(invoicePath, (err,data) => {
      //   if(err){
      //     return next(err)
      //   }
      //   res.setHeader('Content-Type', 'application/pdf')
      //   res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"')
      //   res.send(data)
      // })
      //   const file = fs.createReadStream(invoicePath)

      //   file.pipe(res)
    })
    .catch((err) => {
      next(err);
    });
};

// Cart.getCart((cart) => {
//   Product.fetchAll((products) => {
//     const cartProducts = [];
//     for (product of products) {
//       const cartProductData = cart.products.find(
//         (prod) => prod.id === product.id
//       );
//       if (cartProductData) {
//         cartProducts.push({ productData: product, qty: cartProductData.qty });
//       }
//     }
//     res.render("shop/cart", {
//       pageTitle: "Your Cart",
//       path: "/cart",
//       products: cartProducts,
//     });
//   });
// });
// };

// let fetchedCart;
// let newQuantity = 1;
// req.user
//   .getCart()
//   .then((cart) => {
//     fetchedCart = cart;
//     return cart.getProducts({ where: { id: prodId } });
//   })
//   .then((products) => {
//     let product;
//     if (products.length > 0) {
//       product = products[0];
//     }
//     if (product) {
//       const oldQuantity = product.cartItem.quantity;
//       newQuantity = oldQuantity + 1;
//       return product;
//     }
//     return Product.findByPk(prodId);
//   })
//   .then((product) => {
//     return fetchedCart.addProduct(product, {
//       through: { quantity: newQuantity },
//     });
//   })
//   .then(() => {
//     res.redirect("/cart");
//   })
//   .catch((err) => console.log(err));

// exports.PostOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//    .addOrder()
//     .then(result => {
//       res.redirect('/orders');
//     })
//     .catch((err) => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders()
//     .then((orders) => {
//       res.render("shop/orders", {
//         pageTitle: "Orders",
//         path: "/orders",
//         orders: orders,
//       });
//     })
//     .catch((err) => console.log(err));
// };
