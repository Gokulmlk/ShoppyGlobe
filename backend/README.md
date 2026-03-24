# ShoppyGlobe Backend API

Complete Node.js + Express.js + MongoDB backend for ShoppyGlobe E-commerce Application

**GitHub Repository:** [https://github.com/Gokulmlk/Backend_ShopyGlobe.git](https://github.com/Gokulmlk/Backend_ShopyGlobe.git)

---

## 📋 Project Overview

This is the backend API server for ShoppyGlobe, providing RESTful endpoints for:
- User authentication (JWT-based)
- Product management
- Shopping cart operations
- MongoDB data persistence

---

## 🎯 Features

### API Endpoints
- GET /products - Fetch all products from MongoDB
- GET /products/:id - Fetch single product by ID
- POST /cart - Add product to cart
- PUT /cart/:productId - Update cart item quantity
- DELETE /cart/:productId - Remove product from cart

### MongoDB Integration
- Products Collection (name, price, description, stockQuantity, image, category)
- Cart Collection (user reference, product items, quantities)
- Users Collection (authentication)
- Complete CRUD operations

### Authentication & Security
- JWT-based authentication
- Password hashing with bcryptjs
- Protected cart routes
- Input validation for all routes
- Error handling with proper HTTP status codes

---

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Step 1: Clone Repository

```bash
git clone https://github.com/Gokulmlk/Backend_ShopyGlobe.git
cd Backend_ShopyGlobe
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

**For MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shoppyglobe
```

### Step 4: Seed Database (Optional)

Populate database with sample products:

```bash
node seedData.js
```

### Step 5: Start Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on: **http://localhost:3000**

---

## 📁 Project Structure

```
ShoppyGlobe-Backend/
│
├── config/
│   └── db.js                    # MongoDB connection
│
├── controllers/
│   ├── authController.js        # Authentication logic
│   ├── productController.js     # Product operations
│   └── cartController.js        # Cart operations
│
├── middleware/
│   ├── auth.js                  # JWT authentication middleware
│   └── errorHandler.js          # Global error handler
│
├── models/
│   ├── User.js                  # User schema
│   ├── Product.js               # Product schema
│   └── Cart.js                  # Cart schema
│
├── routes/
│   ├── authRoutes.js            # Auth endpoints
│   ├── productRoutes.js         # Product endpoints
│   └── cartRoutes.js            # Cart endpoints
│
├── .env                         # Environment variables
├── .env.example                 # Example env file
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
├── seedData.js                  # Database seeder
├── server.js                    # Main application file
└── README.md                    # Documentation
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | Login user | Public |
| GET | `/auth/me` | Get current user | Private |

### Product Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/products` | Get all products | Public |
| GET | `/products/:id` | Get single product | Public |
| POST | `/products` | Create product | Public |
| PUT | `/products/:id` | Update product | Public |
| DELETE | `/products/:id` | Delete product | Public |

### Cart Routes (Protected - Requires Authentication)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/cart` | Get user cart | Private |
| POST | `/cart` | Add to cart | Private |
| PUT | `/cart/:productId` | Update quantity | Private |
| DELETE | `/cart/:productId` | Remove from cart | Private |
| DELETE | `/cart` | Clear cart | Private |

---

## 📝 API Usage Examples

### 1. Register User

**Endpoint:** `POST http://localhost:3000/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "65abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. Login User

**Endpoint:** `POST http://localhost:3000/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "65abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Get All Products

**Endpoint:** `GET http://localhost:3000/api/products`

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "65abc456...",
      "name": "Wireless Bluetooth Headphones",
      "price": 2999,
      "description": "Premium wireless headphones...",
      "stockQuantity": 50,
      "category": "Electronics",
      "image": "https://..."
    }
  ]
}
```

---

### 4. Add to Cart (Protected)

**Endpoint:** `POST http://localhost:3000/api/cart`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "65abc456...",
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product added to cart successfully",
  "data": {
    "cart": {
      "_id": "65abc789...",
      "user": "65abc123...",
      "items": [
        {
          "product": {
            "_id": "65abc456...",
            "name": "Wireless Bluetooth Headphones",
            "price": 2999
          },
          "quantity": 2
        }
      ]
    },
    "total": 5998
  }
}
```

---

### 5. Update Cart Item (Protected)

**Endpoint:** `PUT http://localhost:3000/api/cart/:productId`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "quantity": 3
}
```

---

## 🧪 Testing the API

### Using Postman

1. **Install Postman** from [postman.com](https://www.postman.com/downloads/)
2. **Import Collection** (if provided)
3. **Set Base URL:** `http://localhost:3000/api`

### Authentication Flow

1. Register a user → Get token
2. Login → Get token
3. Copy token for protected routes
4. Add header: `Authorization: Bearer <token>`

### Testing Order

1. POST /auth/register
2. POST /auth/login (save token)
3. GET /products
4. POST /cart (use token)
5. PUT /cart/:productId (use token)
6. DELETE /cart/:productId (use token)

---

## 🗄️ Database Schema

### User Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection
```javascript
{
  name: String,
  price: Number,
  description: String,
  stockQuantity: Number,
  image: String,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Collection
```javascript
{
  user: ObjectId (ref: User),
  items: [
    {
      product: ObjectId (ref: Product),
      quantity: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token-based authentication
- Protected routes with authentication middleware
- Input validation and sanitization
- Error handling without exposing sensitive information
- CORS enabled for cross-origin requests

---

## 🐛 Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Successful request |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Validation errors |
| 401 | Unauthorized - Authentication required |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## 🚀 Deployment

### Deploy to Heroku

```bash
heroku create shoppyglobe-api
heroku config:set MONGO_URI=<your_mongodb_atlas_uri>
heroku config:set JWT_SECRET=<your_secret>
git push heroku main
```

### Deploy to Railway

1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem:** Cannot connect to MongoDB

**Solution:**
- Check if MongoDB is running: `mongosh`
- Verify MONGO_URI in .env file
- For Atlas: Check IP whitelist

### Port Already in Use

**Problem:** Port 3000 is already in use

**Solution:**
```bash
# Find and kill process
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Missing Dependencies

**Problem:** Module not found

**Solution:**
```bash
npm install
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Gokul**

GitHub: [@Gokulmlk](https://github.com/Gokulmlk)

---


**Happy Coding! 🚀**