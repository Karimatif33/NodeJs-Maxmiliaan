const path = require('path');
const express = require('express');
const router = express.Router();
const products = [];
const adminController = require('../controller/admin')




// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

router.get('/admin-product', adminController.getProducts);

// // /aadmin/dd-product => POST
router.post('/add-product', adminController.postAddProduct);

// router.get('/login', adminController.getLogin);


router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);


module.exports = router;
