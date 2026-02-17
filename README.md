# ShoppyGlobe – React E-commerce Application

A modern, responsive e-commerce web application built with React, Redux Toolkit, and Tailwind CSS. Browse products, manage your cart, and complete purchases with a seamless user experience.

**GitHub Repository:** [https://github.com/Gokulmlk/ShoppyGlobe.git](https://github.com/Gokulmlk/ShoppyGlobe.git)

---

## 🚀 Features

- **Product Browsing** – Fetch and display products from DummyJSON API
- **Smart Search** – Global product search powered by Redux state management
- **Product Details** – View detailed information via dynamic routes (`/product/:id`)
- **Shopping Cart** – Add, remove, and adjust product quantities (min qty = 1)
- **Cart Summary** – Real-time display of total items and price
- **Checkout Flow** – User details form with order placement
- **Order Confirmation** – Success message, cart clearing, and home redirect
- **404 Page** – Custom error page for invalid routes
- **Fully Responsive** – Optimized for mobile, tablet, and desktop
- **Performance Optimized** – Lazy loading with `React.lazy`, `Suspense`, and lazy image loading

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React (Vite)** | Fast, modern frontend framework |
| **Redux Toolkit** | State management for cart and search |
| **React Router** | Client-side routing with `createBrowserRouter` |
| **Tailwind CSS** | Utility-first styling |
| **DummyJSON API** | Product data source |

**API Endpoint:** `https://dummyjson.com/products`

---

## 📦 Installation & Setup

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Steps

1. **Clone the repository**
```bash
   git clone https://github.com/Gokulmlk/ShoppyGlobe.git
   cd ShoppyGlobe
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start development server**
```bash
   npm run dev
```

4. **Open in browser**
```
   http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🎯 Key Functionality

### Cart Management
- Add products with default quantity of 1
- Increase/decrease quantity (minimum 1)
- Remove items from cart
- Persistent cart state using Redux

### Checkout Process
1. Review cart items and total
2. Fill in user details form
3. Click "Place Order"
4. See confirmation message
5. Cart clears automatically
6. Redirect to home page

### Search
- Real-time product filtering
- Redux-powered global state
- Instant results as you type

---

## 📱 Responsive Design

- **Mobile**: Optimized touch targets and compact layout
- **Tablet**: Adaptive grid system
- **Desktop**: Full-width product grids and detailed views

---

## ⚡ Performance Optimizations

- **Code Splitting**: React.lazy() for route-based splitting
- **Suspense Boundaries**: Loading states for async components
- **Lazy Image Loading**: Images load as they enter viewport
- **Redux Toolkit**: Efficient state updates with Immer

---

## 👨‍💻 Author

**Gokul**

---

