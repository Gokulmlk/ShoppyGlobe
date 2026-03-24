const mongoose = require('mongoose');

/**
 * Product Schema
 * Stores product information including name, price, description, and stock
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    stockQuantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock quantity cannot be negative'],
      default: 0,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300',
    },
    category: {
      type: String,
      default: 'General',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Product', productSchema);
