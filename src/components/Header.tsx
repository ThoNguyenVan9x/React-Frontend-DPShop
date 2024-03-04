import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartModal from "../modals/CartModal";
import { useShoppingContext } from "../contexts/ShoppingContext";
import LoginModal from "../modals/LoginModal";
import { toast } from "react-toastify";
import LogoutModal from "../modals/LogoutModal";
import { UserContext } from "../contexts/UserContext";
import RegisterModal from "../modals/RegisterModal";
import { jwtDecode } from "jwt-decode";

function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isShowCartModal, setIsShowCartModal] = useState(false);
    const [isShowLoginModal, setIsShowLoginModal] = useState(false);
    const [isShowLogoutModal, setIsShowLogoutModal] = useState(false);
    const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);
    const [resetTextFieldLogin, setResetTextFieldLogin] = useState(false);

    const handleShowCartModal = () => {
        setIsShowCartModal(true);
    };
    const handleCloseCartModal = () => {
        setIsShowCartModal(false);
    };

    const handleShowLoginModal = () => {
        setIsShowRegisterModal(false);
        setIsShowLoginModal(true);
    };
    const handleCloseLoginModal = () => {
        setIsShowLoginModal(false);
    };

    const handleShowLogoutModal = () => {
        setIsShowLogoutModal(true);
    };
    const handleCloseLogoutModal = () => {
        setIsShowLogoutModal(false);
    };

    const handleShowRegisterModal = () => {
        setIsShowRegisterModal(true);
    };
    const handleCloseRegisterModal = () => {
        setIsShowRegisterModal(false);
    };

    const { cartItems, cartQty, totalPrice } = useShoppingContext();

    const { user } = useContext(UserContext);
    const token: any = localStorage.getItem("token");
    let decoded: any = "";
    if (token) {
        decoded = jwtDecode(token);
        console.log("decode: ", decoded);
    }

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
                        <i className="fa-solid fa-warehouse"></i> D-Shop
                        <span>.</span>
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
                            {decoded.role === "ROLE_ADMIN" ||
                            decoded.role === "ROLE_CUSTOMER" ? (
                                <li
                                    style={{ cursor: "pointer" }}
                                    onClick={handleShowLogoutModal}
                                >
                                    <span
                                        className="nav-link h6 mb-0"
                                        style={{
                                            height: "100%",
                                            lineHeight: "30px",
                                        }}
                                    >
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                                        {localStorage.getItem("fullName")}{" "}
                                    </span>
                                </li>
                            ) : (
                                <li
                                    style={{ cursor: "pointer" }}
                                    onClick={handleShowLoginModal}
                                >
                                    <span className="nav-link">
                                        <img src="/assets/images/user.svg" />
                                    </span>
                                </li>
                            )}
                            <li
                                style={{
                                    cursor: "pointer",
                                    marginRight: "30px",
                                }}
                                onClick={handleShowCartModal}
                            >
                                <span className="nav-link ">
                                    <img src="/assets/images/cart.svg" />
                                    <span className="position-absolute start-1 badge badge-pill bg-danger">
                                        {cartQty}
                                    </span>
                                </span>
                            </li>
                            {decoded.role === "ROLE_ADMIN" && (
                                <a href="/admin">
                                    <li
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/admin")}
                                    >
                                        <span className="nav-link ">
                                            <i className="fa-solid fa-user-tie"></i>
                                            <span className="position-absolute start-1 badge badge-pill bg-danger">
                                                AD
                                            </span>
                                        </span>
                                    </li>
                                </a>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            {/* End Header/Navigation */}
            <CartModal
                handleShow={() => isShowCartModal}
                handleClose={handleCloseCartModal}
                cartItems={cartItems}
            />
            <LoginModal
                handleShow={() => isShowLoginModal}
                handleClose={handleCloseLoginModal}
                handleOpenRegister={() => handleShowRegisterModal()}
            />
            <LogoutModal
                handleShow={() => isShowLogoutModal}
                handleClose={handleCloseLogoutModal}
            />
            <RegisterModal
                handleShow={() => isShowRegisterModal}
                handleClose={handleCloseRegisterModal}
                handleOpenLogin={() => handleShowLoginModal()}
            />
        </div>
    );
}

export default Header;
