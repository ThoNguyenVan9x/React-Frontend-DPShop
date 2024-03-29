import { eventNames } from "process";
import React from "react";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { formatCurrency } from "../helpers/common";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
    id: number;
    name: string;
    price: number;
    thumbnail: any;
    description: string;
    categoryId: number;
};

function ProductItem(props: Props) {
    const { addCartItem } = useShoppingContext();
    const navigate = useNavigate();
    return (
        <>
            {/* Start Column 1 */}
            <div
                className="col-12 col-md-4 col-lg-3 mb-5"
                onClick={() => navigate(`/products/${props.id}`)}
            >
                <a
                    className="product-item"
                    // href="#"
                >
                    <img
                        src={
                            props.thumbnail
                                ? `http://localhost:8080/api/v1/products/images/${props.thumbnail}`
                                : ""
                        }
                        className="img-fluid product-thumbnail"
                        alt={`Image ${props.id}`}
                    />
                    <h3 className="product-title">{props.name}</h3>
                    <strong className="product-price">
                        {formatCurrency(props.price)}
                    </strong>
                    <span
                        className="icon-cross"
                        style={{ width: "50px", height: "50px" }}
                        onClick={(event) => {
                            event.stopPropagation();
                            console.log("Add to cart");
                            addCartItem(props);
                            toast.success("Thêm thành công");
                        }}
                    >
                        <img
                            src="/assets/images/cross.svg"
                            className="img-fluid"
                        />
                    </span>
                </a>
            </div>
            {/* End Column 1 */}
        </>
    );
}

export default ProductItem;
