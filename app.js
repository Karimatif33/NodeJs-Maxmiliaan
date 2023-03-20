const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
// const MONGODB_URI = 'mongodb+srv://karimatif33:Karim010@ak.vmcunh8.mongodb.net/shop';
const MONGODB_URI = require("./.Ds_store");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const multer = require("multer");
const flash = require("connect-flash");
const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "session",
});
const csrfProtection = csrf();

const mongoose = require("mongoose");
const User = require("./models/user");

const fileStorge = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + '-' + file.originalname);
  },
});

    

app.set("view engine", "ejs");
app.set("views", "views");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const error404 = require("./controller/404");
// const error500 = require('./controller/500')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorge }).single("image"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  // throw new Error('dummy dummy')

  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      // throw new Error('dummy')
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.get("/500", error404.get500);

app.use(error404.get404);

app.use((error, req, res, next) => {
  res
    .status(500)
    .render("500", {
      pageTitle: "Database operation failed",
      isAuthenticated: req.isLoggedIn,
    });
});

// Auto refresh Express.js Start/////////////////////////////////////////////////////////////////////////////////////
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    // // User.findOne().then(user => {
    // //   if (!user){
    // //     const user = new User({
    // //       name: 'karim',
    // //       email: 'karim@test.com',
    // //       cart: {
    // //         items: []
    // //       }
    // //     })
    // //     user.save()
    // //   } else{
    // //     // console.log(user, 'done first think for if')
    // //   }

    // })

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
