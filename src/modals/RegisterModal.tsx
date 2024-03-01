import React, { useContext, useEffect, useState } from "react";
import { loginApi, registerApi } from "../services/AccountService";
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
    handleOpenLogin: () => void;
};

function RegisterModal(props: Props) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();
    const [loadingAPI, setLoadingAPI] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const handleChangeFieldAccount = (key: string, value: string) => {
        setUser({
            ...user,
            [key]: value,
        });
    };

    useEffect(() => {
        setRegisterSuccess(false);
        setUser({});
    }, [props.handleShow()]);

    const handleRegister = async () => {
        if (
            !user?.fullName?.trim() ||
            !user.phoneNumber?.trim() ||
            !user.address?.trim() ||
            !user.password?.trim() ||
            !user.rePassword?.trim() ||
            user.password?.trim() !== user.rePassword.trim() ||
            !user.dateOfBirth
        ) {
            toast.error("Invalid information!");
            return;
        }
        console.log("user login: ", user);

        setLoadingAPI(true);
        let res: any = await registerApi(
            user.fullName,
            user.phoneNumber,
            user.address,
            user.password,
            user.rePassword,
            user.dateOfBirth,
            1
        );
        if (res) {
            toast.success("Register success");
            setRegisterSuccess(true);
            setUser({});
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
                                                Họ tên{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </span>
                                            <TextField
                                                width="100%"
                                                onChange={(e) =>
                                                    handleChangeFieldAccount(
                                                        FieldUser.FullName,
                                                        e
                                                    )
                                                }
                                            />
                                            <span>
                                                Ngày sinh{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </span>
                                            <TextField
                                                width="100%"
                                                type="date"
                                                onChange={(e) =>
                                                    handleChangeFieldAccount(
                                                        FieldUser.DateOfBirth,
                                                        e
                                                    )
                                                }
                                            />
                                            <span>
                                                Địa chỉ{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </span>
                                            <TextField
                                                width="100%"
                                                onChange={(e) =>
                                                    handleChangeFieldAccount(
                                                        FieldUser.Address,
                                                        e
                                                    )
                                                }
                                            />
                                            <span>Role</span>
                                            <select
                                                id="c_country"
                                                className="form-control"
                                            >
                                                <option value={"1"}>
                                                    CUSTOMER
                                                </option>
                                            </select>
                                        </div>

                                        <div className="w-100">
                                            <span>
                                                Số điện thoại{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </span>
                                            <TextField
                                                width="100%"
                                                onChange={(e) =>
                                                    handleChangeFieldAccount(
                                                        FieldUser.PhoneNumber,
                                                        e
                                                    )
                                                }
                                            />

                                            <span className="mt-3 mb-0">
                                                Mật khẩu{" "}
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
                                                            FieldUser.Password,
                                                            e
                                                        )
                                                    }
                                                />
                                            </div>
                                            <span className="mt-3 mb-0">
                                                Nhập lại mật khẩu{" "}
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
                                                            FieldUser.RePassword,
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
                                            user?.fullName &&
                                            user?.dateOfBirth &&
                                            user?.address &&
                                            user?.phoneNumber &&
                                            user?.password &&
                                            user?.rePassword &&
                                            user?.password == user?.rePassword
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
