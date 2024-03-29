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
import { log } from "console";

type Props = {
    handleShow: () => boolean;
    handleClose: () => void;
    handleOpenRegister: () => void;
};

function LoginModal(props: Props) {
    const navigate = useNavigate();
    const [account, setAccount] = useState<User>();
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
        console.log("account: ", account);
        console.log(account?.phoneNumber);
        if (!account?.phoneNumber?.trim() || !account.password?.trim()) return;
        setLoadingAPI(true);
        let res: any = await loginApi(account.phoneNumber, account.password);
        if (res && res.token) {
            toast.success("Login success!");
            loginContext(
                res.user.id,
                res.user.fullName,
                res.user.phoneNumber,
                res.user.address,
                res.user.dateOfBirth,
                res.user.role,
                res.token
            );
            setAccount({});
            props.handleClose();
        } else {
            toast.error("Login that bai");
            setAccount({});
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
                            <span>Phone number</span>
                            <TextField
                                width="100%"
                                value={
                                    account?.phoneNumber
                                        ? account.phoneNumber
                                        : ""
                                }
                                onChange={(e) =>
                                    handleChangeFieldAccount(
                                        FieldUser.PhoneNumber,
                                        e
                                    )
                                }
                            />
                            <p className="mt-3 mb-0">Password</p>
                            <div onKeyDown={(event) => handlePressEnter(event)}>
                                <TextField
                                    type="password"
                                    value={
                                        account?.password
                                            ? account.password
                                            : ""
                                    }
                                    width="100%"
                                    onChange={(e) =>
                                        handleChangeFieldAccount(
                                            FieldUser.Password,
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
                                    account?.phoneNumber && account?.password
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
                            <a href="http://localhost:8080/oauth2/authorization/github">
                                <button
                                    type="button"
                                    style={{ width: "100%" }}
                                    className="btn btn-black"
                                >
                                    Login with Github
                                </button>
                            </a>
                            <div className="p-2"></div>
                            <a href="http://localhost:8080/oauth2/authorization/google">
                                <button
                                    type="button"
                                    style={{ width: "100%" }}
                                    className="btn btn-secondary"
                                >
                                    Login with Google
                                </button>
                            </a>
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
