const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

/**
 * Product Routes
 */

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', getProducts);

// @route   POST /api/products
// @desc    Create a new product
// @access  Public (should be protected/admin only in production)
router.post('/', createProduct);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', getProductById);

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Public (should be protected/admin only in production)
router.put('/:id', updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Public (should be protected/admin only in production)
router.delete('/:id', deleteProduct);

module.exports = router;
