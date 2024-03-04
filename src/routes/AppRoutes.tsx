import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import Blog from "../pages/Blog";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import EditProduct from "../pages/EditProduct";
import ProductDetail from "../pages/ProductDetail";
import Services from "../pages/Services";
import Shop from "../pages/Shop";
import Thankyou from "../pages/Thankyou";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
import OrderSuccess from "../pages/OrderSuccess";
import Admin from "../pages/admin/Admin";
import { UserContext } from "../contexts/UserContext";
import Forbidden from "./Forbidden";
import Products from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";
import Accounts from "../pages/admin/Accounts";
import { jwtDecode } from "jwt-decode";
import Social from "../pages/Social";

function AppRoutes() {
    const { user } = useContext(UserContext);
    const path = window.location.pathname;
    const token: any = localStorage.getItem("token");
    let decoded: any = "";
    if (token) {
        decoded = jwtDecode(token);
        console.log("decode: ", decoded);
    }

    return (
        <div>
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
                <Route path="/thankyou" element={<Thankyou />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route
                    path="token/:token?/fullName/:fullName?"
                    element={<Social />}
                />

                {decoded.role !== "ROLE_ADMIN" &&
                (path.includes("/add-product") ||
                    path.includes("/products/edit") ||
                    path.includes("/admin")) ? (
                    <Route path="*" element={<Forbidden />} />
                ) : (
                    <>
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route
                            path="/products/edit/:id"
                            element={<EditProduct />}
                        />
                        <Route path="/admin/products" element={<Products />} />
                        <Route path="/admin/orders" element={<Orders />} />
                        <Route path="/admin/accounts" element={<Accounts />} />
                    </>
                )}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default AppRoutes;
