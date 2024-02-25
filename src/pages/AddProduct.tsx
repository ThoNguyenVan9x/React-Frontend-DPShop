import React, { useEffect, useState } from "react";
import TextField from "../components/TextField";
import ButtonField from "../components/ButtonField";
import { FieldProduct, Product } from "../models/product.model";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddProduct() {
    const [product, setProduct] = useState<Product>({});
    const [image, setImage] = useState<any>();
    const navigate = useNavigate();

    const handleChangeFieldProduct = (key: string, value: string) => {
        setProduct({
            ...product,
            [key]: value,
        });
    };

    const handleAddNewProduct = () => {
        if (
            !product.name?.trim() ||
            !product.material?.trim() ||
            !product.size?.trim() ||
            !product.price ||
            !product.type?.trim()
            // !product.image?.trim()
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
                    toast.success("Add success!");
                    navigate(`/products/${data.id}`);
                }
            });
    };

    const handleUploadImage = (e: any) => {
        console.log("target: ", e.target.files);

        if (e.target.files.length !== 0) {
            setImage(e.target.files);
        }
    };

    const previewImage = () => {
        return <img src={URL.createObjectURL(image[0])} width="100%" />;
    };

    return (
        <div>
            <div className="container mt-4 mb-5">
                <div className="">
                    <h1 className="mb-4 text-black">Thêm mới sản phẩm</h1>
                    <div className="d-flex">
                        <div className="w-60 d-flex gap-3 me-5">
                            <div className="w-50">
                                <div className="form-group row mb-3">
                                    <div className="col-md-12">
                                        <label
                                            htmlFor="c_companyname"
                                            className="text-black"
                                        >
                                            Tên sản phẩm{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <TextField
                                            onChange={(e) =>
                                                handleChangeFieldProduct(
                                                    FieldProduct.Name,
                                                    e
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <div className="col-md-12">
                                        <label
                                            htmlFor="c_companyname"
                                            className="text-black"
                                        >
                                            Chất liệu{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <TextField
                                            onChange={(e) =>
                                                handleChangeFieldProduct(
                                                    FieldProduct.Material,
                                                    e
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <div className="col-md-12">
                                        <label
                                            htmlFor="c_companyname"
                                            className="text-black"
                                        >
                                            Kích thước (Dài x Rộng x Cao)
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <TextField
                                            onChange={(e) =>
                                                handleChangeFieldProduct(
                                                    FieldProduct.Size,
                                                    e
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <div className="col-md-12">
                                        <label
                                            htmlFor="c_companyname"
                                            className="text-black"
                                        >
                                            Giá{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <TextField
                                            type="number"
                                            onChange={(e) =>
                                                handleChangeFieldProduct(
                                                    FieldProduct.Price,
                                                    e
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="c_country"
                                        className="text-black"
                                    >
                                        Phân loại{" "}
                                        <span className="text-danger">*</span>
                                    </label>
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
                                        <option value="">
                                            -- Chọn phân loại --
                                        </option>
                                        <option value={"SOFA"}>Sofa</option>
                                        <option value={"TABLE"}>Bàn</option>
                                        <option value={"CHAIR"}>Ghế</option>
                                        <option value={"BED"}>Giường</option>
                                        <option value={"CABINET"}>Tủ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group row mb-3">
                                    <div className="col-md-12">
                                        <label
                                            htmlFor="c_companyname"
                                            className="text-black"
                                        >
                                            Discount(%){" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <TextField
                                            onChange={(e) =>
                                                handleChangeFieldProduct(
                                                    FieldProduct.Name,
                                                    e
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <div className="col-md-12">
                                        <label
                                            htmlFor="c_companyname"
                                            className="text-black"
                                        >
                                            Count in Stock{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <TextField
                                            onChange={(e) =>
                                                handleChangeFieldProduct(
                                                    FieldProduct.Material,
                                                    e
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <div className="col-md-12">
                                        <label
                                            htmlFor="c_companyname"
                                            className="text-black"
                                        >
                                            Rating
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <TextField
                                            onChange={(e) =>
                                                handleChangeFieldProduct(
                                                    FieldProduct.Size,
                                                    e
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="form-group row mb-5">
                                    <div className="col-md-12">
                                        <label
                                            htmlFor="c_companyname"
                                            className="text-black"
                                        >
                                            Ảnh{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleUploadImage}
                                        />
                                        {/* <TextField
                                            
                                            type="file"
                                            // onChange={(e) =>
                                            //     handleChangeFieldProduct(
                                            //         FieldProduct.Image,
                                            //         e
                                            //     )
                                            // }
                                        /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-40">{image && previewImage()}</div>
                    </div>

                    <div className="" style={{ display: "flex" }}>
                        <ButtonField
                            onClick={handleAddNewProduct}
                            disabled={
                                !product.name?.trim() ||
                                !product.material?.trim() ||
                                !product.size?.trim() ||
                                !product.price ||
                                !product.type?.trim()
                                // !product.image?.trim()
                            }
                        >
                            Tạo mới
                        </ButtonField>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
