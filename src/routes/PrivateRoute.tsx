import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Alert } from "react-bootstrap";

function PrivateRoute(props: any) {
    console.log(">>> props: ", props);

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
            </div>
        );
    }

    return <>{props.children}</>;
}

export default PrivateRoute;
