// const products = [];
const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  // const products = adminData.products;
  Product.find()
    .then((products) => {
      console.log(products)
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};









exports.getCart = (req, res, next) => {
  req.user
  .populate('cart.items.productId')
  // execPopulate()
    .then(user => {
      console.log(user.cart.items)
      const products = user.cart.items
        res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
            products: products,
          });

    })
    .catch((err) => console.log(err));
};



exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product => {
    return req.user.addToCart(product)
  })
  .then(result => {
    console.log(result)
    res.redirect("/cart");
  })
};



  exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
      .removeFromCart(prodId)
      .then((result) => {
        res.redirect("/cart");
      })
      .catch((err) => console.log(err));
  };





  exports.PostOrder = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    // execPopulate()
      .then(user => {
        // console.log()
        // console.log(user.cart.items)
        const products = user.cart.items.map(i => {
          return {quantity: i.quantity, product: {...i.productId._doc}}
        })
        const order = new Order({
          user: {
            name: req.user.name,
            userId: req.user
          },
          products: products
        })
     return order.save()
      })
      .then(result => {
       return req.user.clearCart()
      })
      .then(() => {
        res.redirect('/orders');

      })
      .catch((err) => console.log(err));
  };
  
  exports.getOrders = (req, res, next) => {
    Order.find({'user.userId': req.user._id})

      .then(orders => {
        res.render("shop/orders", {
          pageTitle: "Orders",
          path: "/orders",
          orders: orders,
        });
      })
      .catch((err) => console.log(err));
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
