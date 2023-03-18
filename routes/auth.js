const express = require("express");
const { check,body } = require("express-validator");
const authController = require("../controller/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);


router.post(
   '/login',
   [
     body('email')
       .isEmail()
       .withMessage('Please enter a valid email address.')
       .normalizeEmail(),
     body('password', 'Password has to be valid.')
       .isLength({ min: 5 })
       .isAlphanumeric()
       .trim()
   ],
    authController.postLogin);

router.get("/sginup", authController.getsignup);










router.post(
  "/signup",
  [
    check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value, { req }) => {
   //   if (value === 'brnskarim@yahoo.com'){
   //      throw new Error('this is forbidden')
   //   }
   //      return true
   return  User.findOne({ email: value })
   .then((userDoc) => {
     if (userDoc) {
      return Promise.reject('Excist email or password2')
     }
   })
    })
    .normalizeEmail(),
    body('password','at least 5')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
      
      body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password){
           throw new Error('this is dosnt match')
        }
           return true
       })
  ],
  authController.postsignup
);












router.get("/rest", authController.getRest);
router.post("/rest", authController.postRest);

router.get("/rest/:token", authController.getNwePassword);
router.post("/new-password", authController.postNewPassword);

router.post("/logout", authController.postLogout);

module.exports = router;
