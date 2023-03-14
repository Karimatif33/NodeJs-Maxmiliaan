const express = require('express');
const shopController = require('../controller/shop')
const router = express.Router();

// قفلتها وشغلتها من الا admin 
// router.get('/admin-product', shopController.getIndex);
router.get('/', shopController.getProducts);

router.get('/product-list', shopController.getProducts);

router.get('/products/:productId' , shopController.getProduct);

router.get('/cart' , shopController.getCart);

router.post('/cart' , shopController.postCart);

router.post('/cart-delete-item' , shopController.postCartDeleteProduct);


router.post('/create-order' , shopController.PostOrder);



router.get('/orders' , shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);




module.exports = router;
