const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/api/products', productController.getProducts);
router.post('/api/products', productController.createProduct);
router.get('/api/products/:id', productController.getProduct);
router.put('/api/products/:id', productController.updateProduct);
router.delete('/api/products/:id', productController.deleteProduct);
router.delete('/api/products', productController.deleteAllProducts);
router.get('/api/products/search', productController.searchProductsByName);

module.exports = router;
