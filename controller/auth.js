const User = require('../models/user')


exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').trim().split('=')[0]
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: false
  });

  // console.log(err)
};

exports.postLogin = (req, res, next) => {
  User.findById("6408e48e02da98376a8b7f7b")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user
      res.redirect("/product-list");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err)
    res.redirect("/product-list");
  })    
};

