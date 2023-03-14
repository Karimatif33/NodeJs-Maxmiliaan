const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

router.get("/login", authController.getLogin);
router.get("/sginup", authController.getsignup);
router.post("/signup", authController.postsignup);

router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);

module.exports = router;
