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

type Props = {
    handleShow: () => boolean;
    handleClose: () => void;
    handleOpenLogin: () => void;
};

function RegisterModal(props: Props) {
    const navigate = useNavigate();
    const [account, setAccount] = useState<Account>();
    const [loadingAPI, setLoadingAPI] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const handleChangeFieldAccount = (key: string, value: string) => {
        setAccount({
            ...account,
            [key]: value,
        });
    };

    useEffect(() => {
        setRegisterSuccess(false);
        setAccount({});
    }, [props.handleShow()]);

    const handleRegister = async () => {
        if (
            !account?.username?.trim() ||
            !account.password?.trim() ||
            !account.fullName?.trim() ||
            !account.email?.trim() ||
            !account.address?.trim() ||
            !account.phone?.trim() ||
            !account.rePassword?.trim() ||
            account?.password !== account?.rePassword
        ) {
            toast.error("Invalid information!");
            return;
        }

        setLoadingAPI(true);
        let res: any = await registerApi(account);
        if (res) {
            toast.success("Register success");
            setRegisterSuccess(true);
            setAccount({});
            // props.handleClose();
        } else {
            toast.error("Have an error!");
        }
        setLoadingAPI(false);
    };

    const handlePressEnter = (event: any) => {
        if (event && event.key === "Enter") {
            handleRegister();
        }
    };

    return (
        <>
            <Modal
                // fullscreen={true}
                size="lg"
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
                        Đăng ký
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <div className="body-login" style={{ width: "90%" }}>
                            {!registerSuccess ? (
                                <>
                                    <div className="d-flex gap-3">
                                        <div className="w-100">
                                            <span>
                                                Full name{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </span>
                                            <TextField
                                                width="100%"
                                                onChange={(e) =>
                                                    handleChangeFieldAccount(
                                                        FieldAccount.FullName,
                                                        e
                                                    )
                                                }
                                            />
                                            <span>
                                                Email{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </span>
                                            <TextField
                                                width="100%"
                                                onChange={(e) =>
                                                    handleChangeFieldAccount(
                                                        FieldAccount.Email,
                                                        e
                                                    )
                                                }
                                            />
                                            <span>
                                                Phone{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </span>
                                            <TextField
                                                width="100%"
                                                onChange={(e) =>
                                                    handleChangeFieldAccount(
                                                        FieldAccount.phone,
                                                        e
                                                    )
                                                }
                                            />
                                            <span>
                                                Address{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </span>
                                            <TextField
                                                width="100%"
                                                onChange={(e) =>
                                                    handleChangeFieldAccount(
                                                        FieldAccount.Address,
                                                        e
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="w-100">
                                            <span>
                                                Username{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </span>
                                            <TextField
                                                width="100%"
                                                onChange={(e) =>
                                                    handleChangeFieldAccount(
                                                        FieldAccount.Username,
                                                        e
                                                    )
                                                }
                                            />
                                            <span className="mt-3 mb-0">
                                                Password{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </span>
                                            <div
                                                onKeyDown={(event) =>
                                                    handlePressEnter(event)
                                                }
                                            >
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
                                            <span className="mt-3 mb-0">
                                                Re-Password{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </span>
                                            <div
                                                onKeyDown={(event) =>
                                                    handlePressEnter(event)
                                                }
                                            >
                                                <TextField
                                                    type="password"
                                                    width="100%"
                                                    onChange={(e) =>
                                                        handleChangeFieldAccount(
                                                            FieldAccount.RePassword,
                                                            e
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="mb-5"></div> */}
                                    <div className="d-flex justify-content-between">
                                        <span
                                            style={{ cursor: "pointer" }}
                                            className="text-center mt-5 mb-5 h6"
                                            onClick={() => {
                                                props.handleClose();
                                                props.handleOpenLogin();
                                            }}
                                        >
                                            <i className="fa-solid fa-angles-left"></i>{" "}
                                            Back to Login
                                        </span>
                                    </div>
                                    <button
                                        disabled={
                                            account?.username &&
                                            account?.password
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
                                    </button>
                                </>
                            ) : (
                                <div>
                                    <span className="h5 mb-5">
                                        Đăng ký thành công!
                                    </span>
                                    <div className="d-flex justify-content-center p-3 gap-4">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                navigate("/");
                                                props.handleClose();
                                            }}
                                        >
                                            Go to Home Page
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                props.handleOpenLogin()
                                            }
                                        >
                                            Go to Login Page
                                        </button>
                                    </div>
                                </div>
                            )}
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

export default RegisterModal;
