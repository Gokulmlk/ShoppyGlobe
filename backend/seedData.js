const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

/**
 * Sample Products Data
 * Used to populate the database for testing
 */
const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    price: 2999,
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
    stockQuantity: 50,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  {
    name: 'Smart Watch Pro',
    price: 12999,
    description: 'Advanced fitness tracking smartwatch with heart rate monitor and GPS',
    stockQuantity: 30,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  },
  {
    name: 'Laptop Backpack',
    price: 1499,
    description: 'Durable water-resistant backpack with padded laptop compartment',
    stockQuantity: 100,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
  },
  {
    name: 'Wireless Mouse',
    price: 799,
    description: 'Ergonomic wireless mouse with precision tracking and long battery life',
    stockQuantity: 75,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
  },
  {
    name: 'USB-C Hub',
    price: 1999,
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader and more',
    stockQuantity: 60,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
  },
  {
    name: 'Phone Stand',
    price: 299,
    description: 'Adjustable aluminum phone stand for desk use',
    stockQuantity: 120,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
  },
  {
    name: 'Mechanical Keyboard',
    price: 5999,
    description: 'RGB mechanical gaming keyboard with blue switches',
    stockQuantity: 40,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500',
  },
  {
    name: 'Webcam HD',
    price: 3499,
    description: '1080p HD webcam with built-in microphone for video calls',
    stockQuantity: 55,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1588200908342-23b585c03e26?w=500',
  },
  {
    name: 'Desk Lamp LED',
    price: 1299,
    description: 'Modern LED desk lamp with adjustable brightness and color temperature',
    stockQuantity: 80,
    category: 'Home & Office',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
  },
  {
    name: 'Portable SSD 1TB',
    price: 8999,
    description: 'Ultra-fast portable SSD with USB 3.2 Gen 2 for quick data transfer',
    stockQuantity: 45,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
  },
];

/**
 * Connect to Database and Seed Products
 */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');

    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products deleted');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    console.log(`
    Database seeded successfully!     
    ${sampleProducts.length} products added              ║
    `);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
