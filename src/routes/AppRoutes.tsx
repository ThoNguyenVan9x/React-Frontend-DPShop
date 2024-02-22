import React from "react";
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

function AppRoutes() {
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
                <Route
                    path="/add-product"
                    element={
                        <PrivateRoute>
                            <AddProduct />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditProduct />
                        </PrivateRoute>
                    }
                />

                {/* <Route path="/thankyou" element={<Thankyou />} /> */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default AppRoutes;
