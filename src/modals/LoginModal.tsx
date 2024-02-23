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
    handleOpenRegister: () => void;
};

function LoginModal(props: Props) {
    const navigate = useNavigate();
    const [account, setAccount] = useState<Account>();
    const [loadingAPI, setLoadingAPI] = useState(false);

    const { loginContext } = useContext(UserContext);

    const handleChangeFieldAccount = (key: string, value: string) => {
        setAccount({
            ...account,
            [key]: value,
        });
    };

    useEffect(() => {
        setAccount({});
    }, [props.handleShow()]);

    const handleLogin = async () => {
        if (!account?.username?.trim() || !account.password?.trim()) return;

        setLoadingAPI(true);
        let res: any = await loginApi(account.username, account.password);
        if (res && res.token) {
            toast.success("Login success!");
            loginContext(
                res.username,
                res.fullName,
                res.email,
                res.phone,
                res.address,
                res.role,
                res.token
            );
            setAccount({});
            props.handleClose();
        } else {
            toast.error("Login that bai");
        }
        setLoadingAPI(false);
    };

    const handlePressEnter = (event: any) => {
        if (event && event.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <>
            <Modal
                // fullscreen={true}
                // size="lg"
                show={props.handleShow()}
                onHide={props.handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
                // dialogClassName="modal-90w"
                // aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="example-modal-sizes-title-lg"
                        // id="example-custom-modal-styling-title"
                    >
                        Đăng nhập
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <div className="body-login w-75">
                            <span>Username</span>
                            <TextField
                                width="100%"
                                onChange={(e) =>
                                    handleChangeFieldAccount(
                                        FieldAccount.Username,
                                        e
                                    )
                                }
                            />
                            <p className="mt-3 mb-0">Password</p>
                            <div onKeyDown={(event) => handlePressEnter(event)}>
                                <TextField
                                    type="password"
                                    width="100%"
                                    onChange={(e) =>
                                        handleChangeFieldAccount(
                                            FieldAccount.Password,
                                            e
                                        )
                                    }
                                />
                            </div>
                            {/* <div className="mb-5"></div> */}
                            <div
                                className="d-flex justify-content-between"
                                style={{ cursor: "pointer" }}
                            >
                                <p className="text-center p-4">
                                    Quên mật khẩu?
                                </p>
                                <p
                                    className="text-center p-4"
                                    onClick={() => {
                                        props.handleClose();
                                        props.handleOpenRegister();
                                    }}
                                >
                                    Đăng ký
                                </p>
                            </div>
                            <button
                                disabled={
                                    account?.username && account?.password
                                        ? false
                                        : true
                                }
                                type="button"
                                style={{ width: "100%" }}
                                className="btn btn-primary"
                                onClick={() => handleLogin()}
                            >
                                {loadingAPI && (
                                    <i className="fas fa-spinner fa-spin"></i>
                                )}{" "}
                                Login
                            </button>
                            <div className="p-2"></div>
                            <hr />
                            <div className="p-2"></div>
                            <button
                                type="button"
                                style={{ width: "100%" }}
                                className="btn btn-black"
                            >
                                Login with Google
                            </button>
                            <div className="p-2"></div>
                            <button
                                type="button"
                                style={{ width: "100%" }}
                                className="btn btn-secondary"
                            >
                                Login with Facebook
                            </button>
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

export default LoginModal;
