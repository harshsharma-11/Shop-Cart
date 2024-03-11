const express=require('express');
const router=express.Router();
const cartController=require('../controllers/cartController');

router.post('/fetchCart',cartController.fetchcart);
router.post('/addToCart',cartController.addtocart);
router.post('/removeFromCart',cartController.removefromcart);
router.post('/incrementProduct',cartController.incrementproduct);
router.post('/decrementProduct',cartController.decrementproduct);
router.post('/purchase',cartController.purchaseproduct);
router.post('/fetchOrders',cartController.fetchOrders);
module.exports=router;