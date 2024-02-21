import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Shop from "./pages/Shop";
import Thankyou from "./pages/Thankyou";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./contexts/UserContext";

function App() {
    const { user, loginContext } = useContext(UserContext);
    console.log(">>> user: ", user);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            loginContext(
                localStorage.getItem("username"),
                localStorage.getItem("password")
            );
        }
    }, []);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/thankyou" element={<Thankyou />} />
            </Routes>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </>
    );
}

export default App;
