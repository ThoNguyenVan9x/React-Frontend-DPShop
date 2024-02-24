import React from "react";
import { Alert } from "react-bootstrap";

function Forbidden() {
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

export default Forbidden;
