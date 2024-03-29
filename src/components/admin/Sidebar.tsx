import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../../modals/LogoutModal";

function Sidbar() {
    const navigate = useNavigate();
    const path = window.location.pathname;
    const [isShowLogoutModal, setIsShowLogoutModal] = useState(false);

    const handleShowLogoutModal = () => {
        setIsShowLogoutModal(true);
    };
    const handleCloseLogoutModal = () => {
        setIsShowLogoutModal(false);
    };

    return (
        <>
            {/* Sidebar */}
            <ul
                className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                id="accordionSidebar"
            >
                <a
                    className="sidebar-brand d-flex align-items-center justify-content-center"
                    href="/"
                >
                    <div className="sidebar-brand-icon">
                        <i className="fa-solid fa-warehouse"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">D-Shop.</div>
                </a>
                <hr className="sidebar-divider"></hr>
                <li className={`nav-item ${path === "/admin" ? "active" : ""}`}>
                    <a
                        className="nav-link"
                        href="#"
                        onClick={() => navigate("/admin")}
                    >
                        <i
                            className="fa-solid fa-user-tie"
                            style={{ fontSize: "17px" }}
                        ></i>

                        <span style={{ fontSize: "17px" }}> Admin</span>
                    </a>
                </li>
                <hr className="sidebar-divider"></hr>
                <li
                    className={`nav-item ${
                        path.includes("/admin/products") ? "active" : ""
                    }`}
                >
                    <a
                        className="nav-link"
                        href="#"
                        onClick={() => navigate("/admin/products")}
                    >
                        <i
                            className="fa-brands fa-product-hunt"
                            style={{ fontSize: "17px" }}
                        ></i>

                        <span style={{ fontSize: "17px" }}> Products</span>
                    </a>
                </li>
                <hr className="sidebar-divider"></hr>
                <li
                    className={`nav-item ${
                        path.includes("/admin/orders") ? "active" : ""
                    }`}
                >
                    <a
                        className="nav-link"
                        href="#"
                        onClick={() => navigate("/admin/orders")}
                    >
                        <i
                            className="fa-solid fa-border-all"
                            style={{ fontSize: "17px" }}
                        ></i>

                        <span style={{ fontSize: "17px" }}> Orders</span>
                    </a>
                </li>
                <hr className="sidebar-divider"></hr>
                <li
                    className={`nav-item ${
                        path.includes("/admin/accounts") ? "active" : ""
                    }`}
                >
                    <a
                        className="nav-link"
                        href="#"
                        onClick={() => navigate("/admin/accounts")}
                    >
                        <i
                            className="fa-solid fa-users"
                            style={{ fontSize: "17px" }}
                        ></i>

                        <span style={{ fontSize: "17px" }}> Accounts</span>
                    </a>
                </li>
                <hr className="sidebar-divider"></hr>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i
                            className="fa-regular fa-chart-bar"
                            style={{ fontSize: "17px" }}
                        ></i>

                        <span style={{ fontSize: "17px" }}> Charts</span>
                    </a>
                </li>
                <hr className="sidebar-divider"></hr>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        href="#"
                        onClick={() => handleShowLogoutModal()}
                    >
                        <i
                            className="fa-solid fa-right-from-bracket"
                            style={{ fontSize: "25px" }}
                        ></i>

                        <span style={{ fontSize: "25px" }}> Logout</span>
                    </a>
                </li>
            </ul>
            <LogoutModal
                handleShow={() => isShowLogoutModal}
                handleClose={handleCloseLogoutModal}
            />
            {/* End of Sidebar */}
        </>
    );
}

export default Sidbar;
