const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    errorMessage: message,
  });
  
};
// console.log(err)

exports.getsignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
    errorMessage: message,
  });

  // console.log(err)
};
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/product-list");
            });
          }
        req.flash("error", "Invalid email or password");
          // res.redirect("/product-list");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });

      // res.redirect("/product-list");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postsignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Excist email or password");
        return res.redirect("/sginup");
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });
        return user.save();
      });
    })

    .then((result) => {
      res.redirect("/product-list");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/product-list");
  });
};
