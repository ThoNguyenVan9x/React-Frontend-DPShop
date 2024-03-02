import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useShoppingContext } from "../contexts/ShoppingContext";
import ProductItem from "../components/ProductItem";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../helpers/common";
import ButtonField from "../components/ButtonField";

type CartItem = {
    id: number;
    name: string;
    price: number;
    thumbnail: any;
    description: string;
    categoryId: number;
    qty: number;
};

type Props = {
    handleShow: () => boolean;
    handleClose: () => void;
    cartItems: CartItem[];
};

function CartModal(props: Props) {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const { totalPrice, increaseQty, decreaseQty, removeCartItem } =
        useShoppingContext();
    const navigate = useNavigate();

    return (
        <>
            <Modal
                // fullscreen={true}
                size="xl"
                show={props.handleShow()}
                onHide={props.handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Giỏ hàng của bạn
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new-user">
                        <form>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Ảnh</th>
                                        <th scope="col">Sản phẩm</th>
                                        <th scope="col">Đơn giá</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Thành tiền</th>
                                        <th scope="col">Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.cartItems.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td className="align-middle">
                                                    <img
                                                        src={
                                                            item.thumbnail
                                                                ? `http://localhost:8080/api/v1/products/images/${item.thumbnail}`
                                                                : ""
                                                        }
                                                        alt=""
                                                        style={{
                                                            width: "70px",
                                                            height: "70px",
                                                        }}
                                                    />
                                                </td>
                                                <td className="align-middle">
                                                    {item.name}
                                                </td>
                                                <td className="align-middle">
                                                    {formatCurrency(item.price)}
                                                </td>
                                                <td className="align-middle">
                                                    <div className="d-flex gap-3 align-items-center">
                                                        <button
                                                            type="button"
                                                            style={{
                                                                width: "15%",
                                                                border: "1px solid #3b5d50",
                                                                borderRadius:
                                                                    "3px",
                                                                color: "#3b5d50",
                                                            }}
                                                            onClick={() => {
                                                                decreaseQty(
                                                                    item.id
                                                                );
                                                            }}
                                                        >
                                                            <strong>-</strong>
                                                        </button>
                                                        <strong
                                                            style={{
                                                                alignItems:
                                                                    "center",
                                                                lineHeight:
                                                                    "48px",
                                                            }}
                                                        >
                                                            {item.qty}
                                                        </strong>
                                                        <button
                                                            type="button"
                                                            style={{
                                                                width: "15%",
                                                                border: "1px solid #3b5d50",
                                                                borderRadius:
                                                                    "3px",
                                                                color: "#3b5d50",
                                                            }}
                                                            onClick={() =>
                                                                increaseQty(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            <strong>+</strong>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    {formatCurrency(
                                                        item.price * item.qty
                                                    )}
                                                </td>
                                                <td className="align-middle">
                                                    <button
                                                        style={{
                                                            width: "45%",
                                                            border: "1px solid #3b5d50",
                                                            borderRadius: "3px",
                                                            color: "#fff",
                                                            backgroundColor:
                                                                "#e05d5d",
                                                        }}
                                                        onClick={() =>
                                                            removeCartItem(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <strong>X</strong>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <h6 className="text-primary">
                                Tổng tiền:{" "}
                                <strong>{formatCurrency(totalPrice)}</strong>
                            </h6>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonField onClick={props.handleClose}>Đóng</ButtonField>
                    <ButtonField
                        color="secondary"
                        onClick={() => {
                            props.handleClose();
                            navigate("/checkout");
                        }}
                    >
                        Thanh toán
                    </ButtonField>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CartModal;
