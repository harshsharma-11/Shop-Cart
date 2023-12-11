
/******************************* */
//for adding dummy data to database
const express = require('express');
const router = express.Router();
const productController=require('../controllers/productController');

router.post('/addproducts',productController.add_dummy_Products);
router.get('/fetchproducts',productController.fetch_products);

module.exports = router;
