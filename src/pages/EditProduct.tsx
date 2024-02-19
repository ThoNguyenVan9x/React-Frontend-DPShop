import React, { useEffect, useState } from "react";
import ButtonField from "../components/ButtonField";
import TextField from "../components/TextField";
import { FieldProduct, Product } from "../models/product.model";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
    const [product, setProduct] = useState<Product>({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
            });
    }, []);

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
            !product.type?.trim() ||
            !product.image?.trim()
        )
            return;
        fetch(`http://localhost:8080/api/products`, {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.id) {
                    navigate("/shop");
                }
            });
    };
    return (
        <div>
            <div className="container mt-4 mb-5">
                <div>
                    <h1 className="mb-4 text-black">Chỉnh sửa sản phẩm</h1>
                    <div className="d-flex justify-content-between gap-5">
                        <div className="w-50">
                            <div className="form-group row mb-3">
                                <div className="col-md-12">
                                    <label
                                        htmlFor="c_companyname"
                                        className="text-black"
                                    >
                                        Tên sản phẩm{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <TextField
                                        // width="90%"
                                        value={product.name}
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
                                        <span className="text-danger">*</span>
                                    </label>
                                    <TextField
                                        value={product.material}
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
                                        <span className="text-danger">*</span>
                                    </label>
                                    <TextField
                                        value={product.size}
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
                                        <span className="text-danger">*</span>
                                    </label>
                                    <TextField
                                        type="number"
                                        value={product.price}
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
                                    value={product.type}
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
                            <div className="form-group row mb-5">
                                <div className="col-md-12">
                                    <label
                                        htmlFor="c_companyname"
                                        className="text-black"
                                    >
                                        Ảnh{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <TextField
                                        type="file"
                                        // onChange={(e) =>
                                        //     handleChangeFieldProduct(
                                        //         FieldProduct.Image,
                                        //         e
                                        //     )
                                        // }
                                    />
                                </div>
                            </div>
                        </div>
                        <img src={product.image} className="w-50 p-5" />
                    </div>
                    <div className="" style={{ display: "flex", gap: "10px" }}>
                        <ButtonField
                            color="black"
                            onClick={() => window.history.back()}
                        >
                            Quay lại
                        </ButtonField>
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
                            Cập nhật
                        </ButtonField>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
