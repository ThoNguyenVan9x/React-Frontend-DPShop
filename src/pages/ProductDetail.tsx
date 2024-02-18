import React, { useEffect, useState } from "react";
import ButtonField from "../components/ButtonField";
import { useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { formatCurrency } from "../helpers/common";

type Props = {
    id: number;
};

// type Props2 = {
//     id: number;
//     name: string;
//     price: number;
//     img: string;
// };

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>({});

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                console.log(data);
            });
    }, [id]);

    return (
        <>
            {/* <h1>Trang detail - {id}</h1> */}

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
                            Kích thước:&emsp;
                            <span style={{ fontSize: "24px" }}>
                                45 x 58 x 60
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
                        <div style={{ display: "flex" }}>
                            <ButtonField>Thêm vào giỏ hàng</ButtonField>
                        </div>
                    </div>
                    {/* <table>
                        <tbody>
                            <tr style={{ marginBottom: ".5rem" }}>
                                <td>Sản phẩm:</td>
                                <td>
                                    <span style={{ fontSize: "24px" }}>
                                        45 x 58 x 60
                                    </span>
                                </td>
                            </tr>
                            <tr style={{ marginBottom: ".5rem" }}>
                                <td>Kích thước:</td>
                                <td>
                                    <span style={{ fontSize: "24px" }}>
                                        45 x 58 x 60
                                    </span>
                                </td>
                            </tr>
                            <tr style={{ marginBottom: ".5rem" }}>
                                <td>Giá:</td>
                                <td>
                                    <span style={{ fontSize: "24px" }}>
                                        {formatCurrency(product.price)}
                                    </span>
                                </td>
                            </tr>
                            <tr style={{ marginBottom: ".5rem" }}>
                                <td>Đánh giá từ khách hàng:</td>
                                <td>
                                    <span style={{ fontSize: "24px" }}>
                                        &#9734;&#9734;&#9734;&#9734;&#9734;
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                        <div style={{ display: "flex" }}>
                            <ButtonField>Thêm vào giỏ hàng</ButtonField>
                        </div>
                    </table> */}
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
