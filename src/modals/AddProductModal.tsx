import React, { useContext, useEffect, useState } from "react";
import { loginApi, registerApi } from "../services/AccountService";
import { Modal } from "react-bootstrap";
import ButtonField from "../components/ButtonField";
import TextField from "../components/TextField";
import { useNavigate } from "react-router-dom";
import { Account, FieldAccount } from "../models/account.model";
import axios from "../services/customize-axios";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import { FieldProduct, Product } from "../models/product.model";
import { productAddApi } from "../services/ProductServices";

type Props = {
    handleShow: () => boolean;
    handleClose: () => void;
    handleRefreshList: () => void;
};

function AddProductModal(props: Props) {
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product>({});

    const handleChangeFieldProduct = (key: string, value: any) => {
        setProduct({
            ...product,
            [key]: value,
        });
    };

    const handleAddNewProduct = async () => {
        if (
            !product.name?.trim() ||
            !product.material?.trim() ||
            !product.size?.trim() ||
            !product.type?.trim() ||
            !product.price
        )
            return;
        fetch(`http://localhost:8080/api/products/add`, {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.id) {
                    setProduct({});
                    props.handleRefreshList();
                    props.handleClose();
                    toast.success("Add success!");
                }
            });
    };

    useEffect(() => {
        setProduct({});
    }, [props.handleShow()]);

    return (
        <>
            <Modal
                // fullscreen={true}
                backdrop="static"
                size="lg"
                show={props.handleShow()}
                onHide={props.handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Add new Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <div className="body-login" style={{ width: "90%" }}>
                            <div className="d-flex gap-3">
                                <div className="w-100">
                                    <span>
                                        Product Name{" "}
                                        <span className="text-danger">*</span>
                                    </span>
                                    <TextField
                                        width="100%"
                                        onChange={(e) =>
                                            handleChangeFieldProduct(
                                                FieldProduct.Name,
                                                e
                                            )
                                        }
                                    />
                                    <span>
                                        Material{" "}
                                        <span className="text-danger">*</span>
                                    </span>
                                    <TextField
                                        width="100%"
                                        onChange={(e) =>
                                            handleChangeFieldProduct(
                                                FieldProduct.Material,
                                                e
                                            )
                                        }
                                    />
                                    <span>
                                        Size(L x W x H){" "}
                                        <span className="text-danger">*</span>
                                    </span>
                                    <TextField
                                        width="100%"
                                        onChange={(e) =>
                                            handleChangeFieldProduct(
                                                FieldProduct.Size,
                                                e
                                            )
                                        }
                                    />
                                    <div className="">
                                        <span className="">
                                            Type{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </span>
                                        <select
                                            id="c_country"
                                            className="form-control"
                                            onChange={(e) =>
                                                handleChangeFieldProduct(
                                                    FieldProduct.Type,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value={""}>
                                                -- Select Type --
                                            </option>
                                            <option value={"TABLE"}>
                                                TABLE
                                            </option>
                                            <option value={"BED"}>BED</option>
                                            <option value={"SOFA"}>SOFA</option>
                                            <option value={"CABINET"}>
                                                CABINET
                                            </option>
                                            <option value={"CHAIR"}>
                                                CHAIR
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="w-100">
                                    <span>
                                        Price{" "}
                                        <span className="text-danger">*</span>
                                    </span>
                                    <TextField
                                        type="number"
                                        width="100%"
                                        onChange={(e) =>
                                            handleChangeFieldProduct(
                                                FieldProduct.Price,
                                                e
                                            )
                                        }
                                    />
                                    <span className="mt-3 mb-0">
                                        Discount(%){" "}
                                    </span>

                                    <TextField
                                        type="number"
                                        width="100%"
                                        onChange={(e) =>
                                            handleChangeFieldProduct(
                                                FieldProduct.Discount,
                                                e
                                            )
                                        }
                                    />

                                    <span>Rating </span>
                                    <TextField
                                        type="number"
                                        width="100%"
                                        onChange={(e) =>
                                            handleChangeFieldProduct(
                                                FieldProduct.Rating,
                                                e
                                            )
                                        }
                                    />
                                    <span>
                                        Image{" "}
                                        <span className="text-danger">*</span>
                                    </span>
                                    <input type="file" />
                                </div>
                            </div>
                            <div className="mb-5"></div>
                            <div className="d-flex justify-content-center gap-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => props.handleClose()}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => handleAddNewProduct()}
                                    disabled={
                                        product?.name &&
                                        product?.material &&
                                        product?.size &&
                                        product?.type &&
                                        product?.price
                                            ? false
                                            : true
                                    }
                                >
                                    Add new
                                </button>
                            </div>

                            {/* <button
                                disabled={
                                    account?.username && account?.password
                                        ? false
                                        : true
                                }
                                type="button"
                                style={{ width: "100%" }}
                                className="btn btn-primary"
                                onClick={() => handleRegister()}
                            >
                                {loadingAPI && (
                                    <i className="fas fa-spinner fa-spin"></i>
                                )}{" "}
                                Register
                            </button> */}

                            <div className="p-3"></div>
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <ButtonField onClick={props.handleClose}>Đóng</ButtonField>
                    <ButtonField
                        color="secondary"
                        onClick={() => {
                            props.handleClose();
                        }}
                    >
                        Thanh toán
                    </ButtonField>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default AddProductModal;
