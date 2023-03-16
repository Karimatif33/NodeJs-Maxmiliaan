const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/sginup", authController.getsignup);
router.post("/signup", authController.postsignup);

router.get("/rest", authController.getRest);
router.post("/rest", authController.postRest);

router.get("/rest/:token", authController.getNwePassword);
router.post("/new-password", authController.postNewPassword);

router.post("/logout", authController.postLogout);

module.exports = router;
