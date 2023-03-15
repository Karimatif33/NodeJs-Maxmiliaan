const express = require('express');
const shopController = require('../controller/shop')
const router = express.Router();
const isAuth = require('../middleware/is-auth')
// قفلتها وشغلتها من الا admin 
// router.get('/admin-product', shopController.getIndex);
router.get('/', shopController.getProducts);

router.get('/product-list', shopController.getProducts);

router.get('/products/:productId' , shopController.getProduct);

router.get('/cart' ,isAuth, shopController.getCart);

router.post('/cart' ,isAuth, shopController.postCart);

router.post('/cart-delete-item' , isAuth,shopController.postCartDeleteProduct);


router.post('/create-order' ,isAuth, shopController.PostOrder);



router.get('/orders' ,isAuth, shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);




module.exports = router;
