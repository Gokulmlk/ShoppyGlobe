const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

/**
 * Cart Routes
 * All routes are protected - require authentication
 */

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', protect, getCart);

// @route   POST /api/cart
// @desc    Add product to cart
// @access  Private
router.post('/', protect, addToCart);

// @route   PUT /api/cart/:productId
// @desc    Update cart item quantity
// @access  Private
router.put('/:productId', protect, updateCartItem);

// @route   DELETE /api/cart/:productId
// @desc    Remove product from cart
// @access  Private
router.delete('/:productId', protect, removeFromCart);

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Private
router.delete('/', protect, clearCart);

module.exports = router;
