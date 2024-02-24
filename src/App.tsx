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
import AppRoutes from "./routes/AppRoutes";
import OrderSuccess from "./pages/OrderSuccess";
import Sidbar from "./components/admin/Sidbar";

function App() {
    const { user, loginContext } = useContext(UserContext);

    const path = window.location.pathname;

    useEffect(() => {
        if (localStorage.getItem("username")) {
            loginContext(
                localStorage.getItem("username"),
                localStorage.getItem("fullName"),
                localStorage.getItem("email"),
                localStorage.getItem("phone"),
                localStorage.getItem("address"),
                localStorage.getItem("role"),
                localStorage.getItem("token")
            );
        }
    }, []);

    return (
        <>
            {!path.includes("/admin") && <Header />}
            <AppRoutes />
            {!path.includes("/admin") && <Footer />}
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
