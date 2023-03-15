const path = require('path');
const express = require('express');
const session = require('express-session'); 
const MongoDBStore = require('connect-mongodb-session')(session); 
// const MONGODB_URI = 'mongodb+srv://karimatif33:Karim010@ak.vmcunh8.mongodb.net/shop';
const MONGODB_URI = require('./.Ds_store');
const bodyParser = require('body-parser');
const app = express();


const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection:'session'
})
const mongoose = require('mongoose')
const User = require('./models/user')

app.set('view engine', 'ejs');
app.set('views', 'views');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const error404 = require('./controller/404')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}));


app.use((req, res, next) => {
  if (!req.session.user){
    return next()
  }
  User.findById(req.session.user._id)
    .then(user => {
     req.user = user;
     next();
   
     // app.listen(3000);
    })
    .catch(err => {
      console.log(err)})

   })
 
app.use( adminRoutes); 
app.use(shopRoutes); 
app.use(authRoutes);


 

// Auto refresh Express.js Start/////////////////////////////////////////////////////////////////////////////////////
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
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
.then(result => {
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

 
app.listen(3000)
})
.catch(err => {
  console.log(err)
})


app.use(error404.get404);
