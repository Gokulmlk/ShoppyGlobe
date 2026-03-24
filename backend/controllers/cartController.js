const Cart = require('../models/Cart');
const Product = require('../models/Product');

/**
 * Get user's cart
 * GET /api/cart
 * Private
 */
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product'
    );

    // If no cart exists, create an empty one
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const total = await cart.calculateTotal();

    res.status(200).json({
      success: true,
      data: {
        cart,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message,
    });
  }
};

/**
 * Add product to cart
 * POST /api/cart
 * Private
 */
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate input
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check stock availability
    const requestedQuantity = quantity || 1;
    if (product.stockQuantity < requestedQuantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stockQuantity} items available in stock`,
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity: requestedQuantity }],
      });
    } else {
      // Check if product already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Update quantity
        const newQuantity = cart.items[itemIndex].quantity + requestedQuantity;

        // Check stock for updated quantity
        if (product.stockQuantity < newQuantity) {
          return res.status(400).json({
            success: false,
            message: `Cannot add more. Only ${product.stockQuantity} items available in stock`,
          });
        }

        cart.items[itemIndex].quantity = newQuantity;
      } else {
        // Add new item to cart
        cart.items.push({ product: productId, quantity: requestedQuantity });
      }

      await cart.save();
    }

    // Populate and return cart
    cart = await Cart.findById(cart._id).populate('items.product');
    const total = await cart.calculateTotal();

    res.status(200).json({
      success: true,
      message: 'Product added to cart successfully',
      data: {
        cart,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding product to cart',
      error: error.message,
    });
  }
};

/**
 * Update cart item quantity
 * PUT /api/cart/:productId
 * Private
 */
exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    // Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check stock availability
    if (product.stockQuantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stockQuantity} items available in stock`,
      });
    }

    // Find cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in cart',
      });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    // Populate and return cart
    cart = await Cart.findById(cart._id).populate('items.product');
    const total = await cart.calculateTotal();

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: {
        cart,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart',
      error: error.message,
    });
  }
};

/**
 *Remove product from cart
 *DELETE /api/cart/:productId
 *Private
 */
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    // Filter out the item
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // Check if item was removed
    if (cart.items.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in cart',
      });
    }

    await cart.save();

    // Populate and return cart
    cart = await Cart.findById(cart._id).populate('items.product');
    const total = await cart.calculateTotal();

    res.status(200).json({
      success: true,
      message: 'Product removed from cart successfully',
      data: {
        cart,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing product from cart',
      error: error.message,
    });
  }
};

/**
 *Clear entire cart
 *DELETE /api/cart
 *Private
 */
exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: {
        cart,
        total: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message,
    });
  }
};
