const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator/check");
const User = require("../models/user");
const crypto = require("crypto");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "SG.U0WNPra5S5Kw1DUR9wGapA.oS5ho9gKDYZ5rgD561G8RKdP3Aj9PT5xQ3mvaMe59kQ",
    },
  })
);

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
    oldInput: {
      email: '',
      password: '',
    },
    validationErrors: [],
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
    oldInput: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationErrors: [],
  });

  // console.log(err)
};
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password
      },
      validationErrors: errors.array()
    });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(422).render("auth/login", {
          pageTitle: "Login",
          path: "/Login",
          errorMessage: 'Invalid email or password',
          oldInput: { email: email,
             password: password
           },
          validationErrors: []
        });
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
          return res.status(422).render("auth/login", {
            pageTitle: "Login",
            path: "/Login",
            errorMessage: "Invalid email or password",
            oldInput: { email: email, password: password },
            validationErrors: [],
          });
        })
        .catch(err => {
          const error = new  Error(err)
    error.httpStatusCode= 500;
    return next(error)
        });

      // res.redirect("/product-list");
    })
    .catch(err => {
      const error = new  Error(err)
error.httpStatusCode= 500;
return next(error)
    });
};
exports.postsignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.array())
    return res.status(422).render("auth/signup", {
      pageTitle: "Signup",
      path: "/signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });
      return user.save();
    })

    .then((result) => {
      res.redirect("/product-list");
      return transporter.sendMail({
        to: email,
        from: "karimatif33233@gmail.com",
        subject: " successfullu sgined up",
        html: " <h1> You signd uo successfuly :) </h1>",
      });
    })
    .catch(err => {
      const error = new  Error(err)
error.httpStatusCode= 500;
return next(error)
    });
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/product-list");
  });
};

exports.getRest = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/rest", {
    pageTitle: "Rest Password",
    path: "/rest",
    errorMessage: message,
  });
};

exports.postRest = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/rest");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "thats not a excisted email");
          return res.redirect("/rest");
        }
        user.restToken = token;
        user.restTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/login");
        return transporter.sendMail({
          to: req.body.email,
          from: "karimatif33233@gmail.com",
          subject: " Password Reast",
          html: ` <p> Reast your Passowrd <a href="http://localhost:3000/rest/${token}">link</a> </p>`,
        });
      })
      .catch(err => {
        const error = new  Error(err)
  error.httpStatusCode= 500;
  return next(error)
      });
  });
};

exports.getNwePassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ restToken: token, restTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {
        pageTitle: "New Password",
        path: "/new-password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch(err => {
      const error = new  Error(err)
error.httpStatusCode= 500;
return next(error)
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let restUser;
  User.findOne({
    restToken: passwordToken,
    restTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      restUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      restUser.password = hashedPassword;
      restUser.restToken = undefined;
      restUser.restTokenExpiration = undefined;
      return restUser.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch(err => {
      const error = new  Error(err)
error.httpStatusCode= 500;
return next(error)
    });
};
