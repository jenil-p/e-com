import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

function App() {
  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> }/>
        <Route path="/products" element={ <ProtectedRoute> <Products /> </ProtectedRoute> }/>
        <Route path="/cart" element={ <ProtectedRoute> <Cart /> </ProtectedRoute> } />
        <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;