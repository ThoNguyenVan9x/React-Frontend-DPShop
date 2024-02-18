import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartModal from "../modals/CartModal";
import { useShoppingContext } from "../contexts/ShoppingContext";

function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isShowModal, setIsShowModal] = useState(false);
    const handleShowModal = () => {
        setIsShowModal(true);
    };
    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    const { cartItems, cartQty, totalPrice } = useShoppingContext();

    return (
        <div>
            {/* Start Header/Navigation */}
            <nav
                className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
                arial-label="Furni navigation bar"
            >
                <div className="container">
                    <span
                        className="navbar-brand"
                        onClick={() => navigate("/")}
                    >
                        DP-Shop<span>.</span>
                    </span>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarsFurni"
                        aria-controls="navbarsFurni"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsFurni">
                        <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0 fs-6">
                            <li className={pathname === "/" ? "active" : ""}>
                                <span
                                    className="nav-link"
                                    onClick={() => navigate("/")}
                                >
                                    Trang chủ
                                </span>
                            </li>
                            <li
                                className={
                                    pathname.includes("/shop") ? "active" : ""
                                }
                            >
                                <span
                                    className="nav-link"
                                    onClick={() => navigate("/shop")}
                                >
                                    Cửa hàng
                                </span>
                            </li>
                            <li
                                className={
                                    pathname.includes("/about") ? "active" : ""
                                }
                            >
                                <span
                                    className="nav-link"
                                    onClick={() => navigate("/about")}
                                >
                                    About us
                                </span>
                            </li>
                            <li
                                className={
                                    pathname.includes("/services")
                                        ? "active"
                                        : ""
                                }
                            >
                                <span
                                    className="nav-link"
                                    onClick={() => navigate("/services")}
                                >
                                    Dịch vụ
                                </span>
                            </li>
                            <li
                                className={
                                    pathname.includes("/blog") ? "active" : ""
                                }
                            >
                                <span
                                    className="nav-link"
                                    onClick={() => navigate("/blog")}
                                >
                                    Blog
                                </span>
                            </li>
                            <li
                                className={
                                    pathname.includes("/contact")
                                        ? "active"
                                        : ""
                                }
                            >
                                <span
                                    className="nav-link"
                                    onClick={() => navigate("/contact")}
                                >
                                    Liên hệ
                                </span>
                            </li>
                        </ul>
                        <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                            <li>
                                <span className="nav-link">
                                    <img src="/assets/images/user.svg" />
                                </span>
                            </li>
                            <li style={{ cursor: "pointer" }}>
                                <span
                                    className="nav-link "
                                    onClick={handleShowModal}
                                >
                                    <img src="/assets/images/cart.svg" />
                                    <span className="position-absolute start-1 badge badge-pill bg-danger">
                                        {cartQty}
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* End Header/Navigation */}
            <CartModal
                handleShow={() => isShowModal}
                handleClose={handleCloseModal}
                cartItems={cartItems}
            />
        </div>
    );
}

export default Header;
