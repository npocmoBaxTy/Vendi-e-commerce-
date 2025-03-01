import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import ProductsPage from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import ByCategoryPage from "./pages/ByCategory/ByCategoryPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import { listenAuthChanges } from "./utils/authUserListener";

function App() {
  useEffect(() => {
    listenAuthChanges();
    console.log("qweqwe");
  }, []);
  return (
    <div className="wrapper overflow-hidden min-h-full container max-w-[1300px] mx-auto">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/product/:id" element={<Product />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/cart" element={<Cart />} />
        <Route path="/categories/:category" element={<ByCategoryPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
