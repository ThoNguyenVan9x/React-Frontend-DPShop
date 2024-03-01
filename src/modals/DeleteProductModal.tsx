import React, { useContext, useEffect, useState } from "react";
import { loginApi } from "../services/AccountService";
import { Modal } from "react-bootstrap";
import ButtonField from "../components/ButtonField";
import TextField from "../components/TextField";
import { useNavigate } from "react-router-dom";
import { User, FieldUser } from "../models/account.model";
import axios from "../services/customize-axios";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";

type Props = {
    handleShow: () => boolean;
    handleClose: () => void;
    handleRefreshList: () => void;
    productId: any;
    productName: any;
};

function DeleteProductModal(props: Props) {
    const navigate = useNavigate();
    const [account, setAccount] = useState<User>();
    const [loadingAPI, setLoadingAPI] = useState(false);

    const { logout } = useContext(UserContext);

    const handleDelete = async () => {
        try {
            let res = await fetch(
                `http://localhost:8080/api/v1/products/${props.productId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            ).then((res) => {
                if (res.ok) {
                    props.handleRefreshList();
                    props.handleClose();
                    toast.success("Delete success!");
                }
            });
        } catch (error) {
            console.log(error);
            toast.error("Delete failed!");
        }
    };

    return (
        <>
            <Modal
                show={props.handleShow()}
                onHide={props.handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <div className="body-login w-75 text-center">
                            <h3>
                                Do you want delete?<br></br>
                                <b>"{props.productName}"</b>
                            </h3>
                            <div>
                                <button
                                    type="button"
                                    style={{ width: "40%" }}
                                    className="btn btn-secondary m-3"
                                    onClick={handleDelete}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    style={{ width: "40%" }}
                                    className="btn btn-primary m-3"
                                    onClick={() => props.handleClose()}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteProductModal;
