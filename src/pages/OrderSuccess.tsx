import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
    const navigate = useNavigate();
    return (
        <div>
            <Alert variant="success" className="mt-5 mb-5">
                <div className="container">
                    <Alert.Heading>Đặt hàng thành công!</Alert.Heading>
                    <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                    <p>
                        Có bất kỳ thắc mắc về sản phẩm cũng như dịch vụ, vui
                        lòng liên hệ đến hotline để được giải đáp!
                    </p>
                </div>
            </Alert>
            <div className="d-flex justify-content-center p-3 gap-4">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                >
                    Quay về trang chủ
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/shop")}
                >
                    Tiếp tục mua sắm
                </button>
            </div>
        </div>
    );
}

export default OrderSuccess;
