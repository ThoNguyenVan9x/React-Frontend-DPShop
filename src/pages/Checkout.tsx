import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { formatCurrency } from "../helpers/common";
import {
    CustomerOrderInfo,
    FieldCustomerInfo,
} from "../models/customerInfo.model";
import { orderApi } from "../services/OrderService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ProductRequestType = {
    product_id: any;
    quantity: any;
};

function Checkout() {
    const { totalPrice, cartItems, clearCartItem } = useShoppingContext();
    const navigate = useNavigate();
    const [customerInfo, setCustomerInfo] = useState<CustomerOrderInfo>();
    const [cartItemsRequest, setCartItemsRequest] = useState<
        ProductRequestType[]
    >([{} as ProductRequestType]);
    // const [orderInfo, setOrderInfo] = useState<OrderInfo>();

    const handleChangeFieldCustomerInfo = (key: string, value: string) => {
        setCustomerInfo({
            ...customerInfo,
            [key]: value,
        });
    };

    const handleOrder = async () => {
        if (
            !customerInfo?.fullName?.trim() ||
            !customerInfo?.address?.trim() ||
            !customerInfo.phone?.trim() ||
            !customerInfo.shippingMethod?.trim() ||
            !customerInfo.paymentMethod?.trim()
        )
            return;
        cartItems.map((item) => {
            setCartItemsRequest([
                ...cartItemsRequest,
                { product_id: item.id, quantity: item.qty },
            ]);
        });

        let dataCartItem: Object[] = [];
        cartItems.map((item) => {
            dataCartItem = [
                ...dataCartItem,
                { product_id: item.id, quantity: item.qty },
            ];
        });

        const data = {
            user_id: localStorage.getItem("id"),
            fullname: customerInfo?.fullName,
            email: customerInfo?.email,
            phone_number: customerInfo?.phone,
            address: localStorage.getItem("address"),
            note: customerInfo?.note,
            total_money: totalPrice,
            shipping_address: customerInfo?.address,
            payment_method: customerInfo?.paymentMethod,
            shipping_method: customerInfo?.shippingMethod,
            cart_items: dataCartItem,
        };

        let res: any = await orderApi(data);
        if (res && res.id) {
            console.log("res order: ", res);

            toast.success("Order success!");
            clearCartItem();
            navigate("/order-success");
        } else {
            toast.error("Order fail!");
        }
    };

    return (
        <div>
            <div>
                {/* <Hero title="Thanh toán" /> */}
                <div className="m-3">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center mb-3 text-black">
                            <h1 className="">Thanh toán</h1>
                            <div className="row mb-2">
                                <div className="col-md-12">
                                    <div className="" role="alert">
                                        Returning customer?{" "}
                                        <a href="#">Click here</a> to login
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-5 mb-md-0">
                                <h2 className="h3 mb-3">
                                    Thông tin người nhận hàng
                                </h2>
                                <div className="p-3 p-lg-4 border bg-white mb-3">
                                    <div className="form-group row mb-2">
                                        <div className="col-md-12">
                                            <label
                                                htmlFor="c_companyname"
                                                className="text-black"
                                            >
                                                Họ tên{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="c_companyname"
                                                name="c_companyname"
                                                onChange={(e) =>
                                                    handleChangeFieldCustomerInfo(
                                                        FieldCustomerInfo.Name,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <div className="col-md-12">
                                            <label
                                                htmlFor="c_address"
                                                className="text-black"
                                            >
                                                Địa chỉ{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="c_address"
                                                name="c_address"
                                                onChange={(e) =>
                                                    handleChangeFieldCustomerInfo(
                                                        FieldCustomerInfo.Address,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-2">
                                        <div className="col-md-12">
                                            <label
                                                htmlFor="c_address"
                                                className="text-black"
                                            >
                                                Số điện thoại{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="c_address"
                                                name="c_address"
                                                onChange={(e) =>
                                                    handleChangeFieldCustomerInfo(
                                                        FieldCustomerInfo.Phone,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <div className="col-md-12">
                                            <label
                                                htmlFor="c_address"
                                                className="text-black"
                                            >
                                                Email{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="c_address"
                                                name="c_address"
                                                onChange={(e) =>
                                                    handleChangeFieldCustomerInfo(
                                                        FieldCustomerInfo.Email,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-2">
                                        <div className="col-md-12">
                                            <label
                                                htmlFor="c_address"
                                                className="text-black"
                                            >
                                                Ghi chú cho người bán{" "}
                                            </label>
                                            <textarea
                                                name="c_order_notes"
                                                id="c_order_notes"
                                                cols={30}
                                                rows={3}
                                                className="form-control"
                                                placeholder="Write your notes here..."
                                                defaultValue={""}
                                                onChange={(e) =>
                                                    handleChangeFieldCustomerInfo(
                                                        FieldCustomerInfo.Note,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-md-12">
                                        <h2 className="h3 mb-3">
                                            Mã khuyến mại
                                        </h2>
                                        <div className="p-3 p-lg-4 border bg-white">
                                            <label
                                                htmlFor="c_code"
                                                className="text-black mb-3"
                                            >
                                                Nhập mã khuyến mại của bạn (nếu
                                                có)
                                            </label>
                                            <div className="input-group w-75 couponcode-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    id="c_code"
                                                    placeholder="Mã khuyến mại"
                                                    aria-label="Coupon Code"
                                                    aria-describedby="button-addon2"
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        type="button"
                                                        id="button-addon2"
                                                    >
                                                        Apply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row mb-5">
                                    <div className="col-md-12">
                                        <h2 className="h3 mb-3">Đơn hàng</h2>
                                        {cartItems.length <= 0 ? (
                                            <div className="p-3 p-lg-5 border bg-white">
                                                <h4>
                                                    Không có sản phẩm trong giỏ
                                                    hàng!
                                                </h4>
                                            </div>
                                        ) : (
                                            <div className="p-3 p-lg-4 border bg-white">
                                                <table className="table site-block-order-table mb-5">
                                                    <thead>
                                                        <tr>
                                                            <th>Sản phẩm</th>
                                                            <th className=" text-center">
                                                                Số lượng
                                                            </th>
                                                            <th className=" text-center">
                                                                Thành tiền
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cartItems.map(
                                                            (item) => {
                                                                return (
                                                                    <tr
                                                                        key={
                                                                            item.id
                                                                        }
                                                                    >
                                                                        <td>
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </td>
                                                                        <td className=" text-center">
                                                                            {
                                                                                item.qty
                                                                            }
                                                                        </td>
                                                                        <td className=" text-center">
                                                                            {formatCurrency(
                                                                                item.price *
                                                                                    item.qty
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                        <tr>
                                                            <td
                                                                colSpan={2}
                                                                className="text-black font-weight-bold"
                                                            >
                                                                <strong>
                                                                    Giảm giá
                                                                </strong>
                                                            </td>
                                                            <td className="text-black text-center">
                                                                {formatCurrency(
                                                                    -0
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                colSpan={2}
                                                                className="text-black font-weight-bold"
                                                            >
                                                                <strong>
                                                                    Tổng tiền
                                                                </strong>
                                                            </td>
                                                            <td className="text-black font-weight-bold text-center">
                                                                <b>
                                                                    {formatCurrency(
                                                                        totalPrice
                                                                    )}
                                                                </b>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div className="form-group mb-5">
                                                    <label
                                                        htmlFor="c_country"
                                                        className="text-black"
                                                    >
                                                        Chọn đơn vị vận chuyển{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <select
                                                        id="c_country"
                                                        className="form-control"
                                                        onChange={(e) =>
                                                            handleChangeFieldCustomerInfo(
                                                                FieldCustomerInfo.ShippingMethod,
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value={""}>
                                                            -- Chọn đơn vị vận
                                                            chuyển --
                                                        </option>
                                                        <option
                                                            value={"EXPRESS"}
                                                        >
                                                            Giao hàng nhanh
                                                            (Express)
                                                        </option>
                                                        <option value={"GHTK"}>
                                                            Giao hàng tiết kiệm
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="form-group mb-5">
                                                    <label
                                                        htmlFor="c_country"
                                                        className="text-black"
                                                    >
                                                        Chọn hình thức thanh
                                                        toán{" "}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </label>
                                                    <select
                                                        id="c_country"
                                                        className="form-control"
                                                        onChange={(e) =>
                                                            handleChangeFieldCustomerInfo(
                                                                FieldCustomerInfo.PaymentMethod,
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value={""}>
                                                            -- Chọn phương thức
                                                            thanh toán --
                                                        </option>
                                                        <option value={"COD"}>
                                                            Thanh toán khi nhận
                                                            hàng
                                                        </option>
                                                        <option value={"MOMO"}>
                                                            Ví MoMo
                                                        </option>
                                                        <option value={"BANK"}>
                                                            Chuyển khoản ngân
                                                            hàng
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <button
                                                        className="btn btn-secondary btn-lg py-3 btn-block"
                                                        onClick={handleOrder}
                                                        disabled={
                                                            customerInfo?.fullName &&
                                                            customerInfo?.address &&
                                                            customerInfo?.phone &&
                                                            customerInfo?.shippingMethod &&
                                                            customerInfo?.paymentMethod
                                                                ? false
                                                                : true
                                                        }
                                                    >
                                                        Đặt hàng
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
