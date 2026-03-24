const express = require("express")
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();// Load environment variables

connectDB();// Connect to MongoDB

const app = express()// Initialize Express app

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to ShoppyGlobe API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        getMe: 'GET /api/auth/me (Protected)',
      },
      products: {
        getAll: 'GET /api/products',
        getOne: 'GET /api/products/:id',
        create: 'POST /api/products',
        update: 'PUT /api/products/:id',
        delete: 'DELETE /api/products/:id',
      },
      cart: {
        getCart: 'GET /api/cart (Protected)',
        addToCart: 'POST /api/cart (Protected)',
        updateItem: 'PUT /api/cart/:productId (Protected)',
        removeItem: 'DELETE /api/cart/:productId (Protected)',
        clearCart: 'DELETE /api/cart (Protected)',
      },
    },
  });
});


app.use(errorHandler);// Error handler middleware 

const PORT = process.env.PORT || 3001

//Start Server 
app.get("/", (req,res)=> {
    res.send("Hello from the server")
})

app.listen(PORT, ()=>{
    console.log(`Server is running in the ${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;