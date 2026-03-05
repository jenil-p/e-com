# Authentication-Based E-Commerce Dashboard

A **frontend-only E-Commerce Dashboard** built with **React (Vite) and Tailwind CSS** that simulates a real product workflow including authentication, product browsing, cart management, and order history — all without a backend.

The project uses **localStorage to simulate backend behavior**, including user authentication, session management, cart storage, and order tracking.

---

### Site is Live available at ...
here url will come after deployeement

## Features

### Authentication

* User **registration and login**
* Credentials stored securely in **localStorage**
* **Protected routes** to prevent unauthorized access
* **Session management with 5-minute expiration**
* **Session countdown timer** displayed in the navbar

### Product Browsing

* Products fetched from a **public API**
* Responsive **product grid layout**
* **Search functionality** for filtering products
* Add products directly to cart
* **Inline quantity controls (+ / −)** from the product page

### Cart Management

* Add products to cart
* Increase / decrease quantity
* Remove items from cart
* View **cart subtotal and total**
* Checkout functionality

### Orders

* Checkout converts cart into an **order**
* Order history stored in **localStorage**
* Dashboard displays **recent orders and order summaries**

### Profile Management

* View and edit:

  * Name
  * Email
  * Password
* Profile updates persist in **localStorage**

### Dashboard

* Overview of:

  * Cart item count
  * Total orders
  * Recent orders summary

---

## Tech Stack

**Frontend**

* React (Vite)
* React Router
* Tailwind CSS

**Libraries**

* Axios — fetching product data
* React Hot Toast — notifications

**Data Handling**

* localStorage (for users, session, cart, and orders)

**Public API**

* Fake Store API

---

## Project Structure

```
src
│
├── api
│   └── productApi.js
│
├── components
│   ├── layout
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── DashboardLayout.jsx
│   │
│   ├── product
│   │   └── ProductCard.jsx
│   │
│   └── cart
│       └── CartItem.jsx
│
├── pages
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── Cart.jsx
│   └── Profile.jsx
│
├── context
│   └── AuthContext.jsx
│
├── hooks
│   └── useAuth.js
│
├── routes
│   └── ProtectedRoute.jsx
│
├── utils
│   ├── storage.js
│   └── session.js
│
└── App.jsx
```

---

## Installation

Clone the repository:

```
git clone https://github.com/jenil-p/e-com.git
```

Navigate into the project directory:

```
cd e-com
```

Install dependencies:

```
npm install
```

---

## Running the Project

Start the development server:

```
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---


## Notes

* No backend is used — all data persistence is handled through **localStorage**.
* Session automatically expires after **5 minutes**, forcing users to log in again.
* The project architecture is designed so it can easily be extended to a real backend API in the future.

---
