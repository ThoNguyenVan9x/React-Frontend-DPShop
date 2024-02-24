import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Alert } from "react-bootstrap";

function PrivateRoute(props: any) {
    console.log(">>> props: ", props);

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    if (user && user.role !== "ADMIN") {
        return (
            <div>
                <Alert variant="danger" className="mt-5 mb-5">
                    <div className="container">
                        <Alert.Heading>Forbidden 403!</Alert.Heading>
                        <p>Bạn không được cấp quyền truy cập vào trang này.</p>
                    </div>
                </Alert>
                <div className="d-flex justify-content-center  mb-5">
                    <a href="/">
                        <button className="btn btn-primary">
                            Quay về trang chủ
                        </button>
                    </a>
                </div>
            </div>
        );
    }

    return <>{props.children}</>;
}

export default PrivateRoute;
