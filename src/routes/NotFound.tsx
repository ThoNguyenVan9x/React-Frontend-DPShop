import React from "react";
import { Alert } from "react-bootstrap";

function NotFound() {
    return (
        <div>
            <Alert variant="warning" className="mt-5 mb-5">
                <div className="container">
                    <Alert.Heading>Not Found 404!</Alert.Heading>
                    <p>Trang web không tồn tại.</p>
                </div>
            </Alert>
        </div>
    );
}

export default NotFound;
