import React, { useEffect, useState } from "react";
import ButtonField from "../components/ButtonField";
import { useNavigate, useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { formatCurrency } from "../helpers/common";
import { useShoppingContext } from "../contexts/ShoppingContext";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>({});
    const { addCartItem } = useShoppingContext();

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
            });
    }, [id]);

    console.log("product: ", product);

    return (
        <>
            {/* <div className="container mt-2">
                
            </div> */}

            <div className="untree_co-section product-section before-footer-section">
                <div
                    className="container"
                    style={{
                        display: "flex",
                        columnGap: "6rem",
                    }}
                >
                    <img
                        width="450px"
                        height="450px"
                        src={product.image}
                        alt="product"
                    />
                    <div>
                        <div style={{ marginBottom: "1rem" }}>
                            Sản phẩm:&emsp;
                            <span style={{ fontSize: "24px" }}>
                                {product.name}
                            </span>
                        </div>
                        <div style={{ marginBottom: "1.5rem" }}>
                            Chất liệu:&emsp;
                            <span style={{ fontSize: "24px" }}>
                                {product.material}
                            </span>
                        </div>
                        <div style={{ marginBottom: "1.5rem" }}>
                            Kích thước:&emsp;
                            <span style={{ fontSize: "24px" }}>
                                {product.size}
                            </span>
                        </div>
                        <div style={{ marginBottom: "1.5rem" }}>
                            Giá:&emsp;
                            <span style={{ fontSize: "24px" }}>
                                {formatCurrency(product.price)}
                            </span>
                        </div>
                        <div style={{ marginBottom: "3.5rem" }}>
                            Đánh giá từ khách hàng:
                            <br />
                            <span style={{ fontSize: "24px" }}>
                                &#9734;&#9734;&#9734;&#9734;&#9734;
                            </span>
                        </div>
                        <div
                            style={{ display: "flex", gap: "10px" }}
                            onClick={() => addCartItem(product)}
                        >
                            <ButtonField
                                color="black"
                                onClick={() => window.history.back()}
                            >
                                Quay lại
                            </ButtonField>
                            <ButtonField
                                onClick={() => navigate(`/products/edit/${id}`)}
                            >
                                Chỉnh sửa
                            </ButtonField>
                            <ButtonField color="secondary">
                                Thêm vào giỏ hàng
                            </ButtonField>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
