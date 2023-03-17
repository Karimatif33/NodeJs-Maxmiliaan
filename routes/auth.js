const express = require("express");
const { check } = require('express-validator/check')
const authController = require("../controller/auth");
const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/sginup", authController.getsignup);
router.post("/signup",check('email').isEmail().withMessage('Please enter a valid email') , authController.postsignup);

router.get("/rest", authController.getRest);
router.post("/rest", authController.postRest);

router.get("/rest/:token", authController.getNwePassword);
router.post("/new-password", authController.postNewPassword);

router.post("/logout", authController.postLogout);

module.exports = router;
