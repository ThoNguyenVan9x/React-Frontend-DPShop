import React, { useContext, useEffect, useState } from "react";
import { loginApi } from "../services/AccountService";
import { Modal } from "react-bootstrap";
import ButtonField from "../components/ButtonField";
import TextField from "../components/TextField";
import { useNavigate } from "react-router-dom";
import { Account, FieldAccount } from "../models/account.model";
import axios from "../services/customize-axios";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";

type Props = {
    handleShow: () => boolean;
    handleClose: () => void;
};

function LogoutModal(props: Props) {
    const navigate = useNavigate();
    const [account, setAccount] = useState<Account>();
    const [loadingAPI, setLoadingAPI] = useState(false);

    const { logout } = useContext(UserContext);
    const handleLogout = async () => {
        logout();
        toast.success("Logout success!");
        props.handleClose();
        navigate("/");
    };

    return (
        <>
            <Modal
                // fullscreen={true}
                // size="lg"
                show={props.handleShow()}
                onHide={props.handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
                // centered
                // dialogClassName="modal-90w"
                // aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="example-modal-sizes-title-lg"
                        // id="example-custom-modal-styling-title"
                    >
                        Logout
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <div className="body-login w-75 text-center">
                            <h3>Do you want logout?</h3>
                            <div>
                                <button
                                    type="button"
                                    style={{ width: "40%" }}
                                    className="btn btn-secondary m-3"
                                    onClick={handleLogout}
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

export default LogoutModal;
