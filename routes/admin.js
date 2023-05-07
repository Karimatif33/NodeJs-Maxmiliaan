const path = require('path');
const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

const products = [];
const adminController = require('../controller/admin')

const isAuth = require('../middleware/is-auth')



// /admin/add-product => GET
router.get('/add-product', isAuth,adminController.getAddProduct);

router.get('/admin-product', isAuth,adminController.getProducts);

// // /aadmin/dd-product => POST
router.post('/add-product',[
    body('title')
    .isString()
    .isLength({ min: 5 })
    .trim(),  
    body('price')
    .isFloat(),
    body('description')
    .isLength({ min: 12 , max: 72})
    .trim()
],isAuth, adminController.postAddProduct);

// router.get('/login', adminController.getLogin);


router.get('/edit-product/:productId',isAuth, adminController.getEditProduct);

router.post('/edit-product',
[
  body('title')
  .isString()
  .isLength({ min: 5 })
  .trim(),  
  body('price')
  .isFloat(),
  body('description')
  .isLength({ min: 12 , max: 72})
  .trim()
  ],isAuth, adminController.postEditProduct);

router.delete('/product/:productId',isAuth, adminController.deleteProduct);


module.exports = router;
