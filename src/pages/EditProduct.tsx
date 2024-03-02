import React, { useEffect, useState } from "react";
import ButtonField from "../components/ButtonField";
import TextField from "../components/TextField";
import { FieldProduct, Product } from "../models/product.model";
import { useNavigate, useParams } from "react-router-dom";
import { productDetailApi } from "../services/ProductServices";
import { toast } from "react-toastify";
import { categoryListApi } from "../services/CategoryServices";

type ProductItem = {
    id: number;
    name: string;
    price: number;
    thumbnail: any;
    description: string;
    categoryId: number;
    category_name: string;
};

enum FieldProductItem {
    Id = "id",
    Name = "name",
    Price = "price",
    Thumbnail = "thumbnail",
    Description = "description",
    CategoryId = "categoryId",
    CategoryName = "category_name",
}

type CategoryItem = {
    id: number;
    name: string;
};

function EditProduct() {
    const [product, setProduct] = useState<ProductItem>({} as ProductItem);
    const [monitorImageProduct, setMonitorImageProduct] = useState<any>();
    const navigate = useNavigate();
    const { id } = useParams();
    const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                let res = await fetch(
                    `http://localhost:8080/api/v1/products/${id}`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        if (data && data.id) {
                            setProduct(data);
                            setMonitorImageProduct(data.thumbnail);
                        }
                    });
            };
            fetchData();
        } catch (error) {
            console.log("error: ", error);
        }
    }, []);

    useEffect(() => {
        const fetchListCategory = async () => {
            const res: any = await categoryListApi();

            if (res) {
                setCategoryList([...res]);
            }
        };
        fetchListCategory();
    }, []);

    const handleChangeFieldProduct = (key: string, value: any) => {
        setProduct({
            ...product,
            [key]: value,
        });
    };

    const handleEditProduct = async () => {
        let categoryData: any = (
            document.getElementById("category") as HTMLSelectElement
        ).value;
        product.categoryId = categoryData;

        // console.log("product data send request: ", product);
        // console.log("monitor image product: ", monitorImageProduct);
        // console.log(monitorImageProduct == product.thumbnail);

        if (monitorImageProduct == product.thumbnail) {
            product.thumbnail = "";
        } else {
            let thumbnailRequest = product.thumbnail[0];
            product.thumbnail = thumbnailRequest;
        }

        let productSendRequest = {
            name: product.name,
            price: product.price,
            description: product.description,
            category_id: product.categoryId,
        };

        console.log("productSendRequest : ", productSendRequest);
        console.log("thumbnailRequest: ", product.thumbnail);

        const formData = new FormData();
        formData.append("image", product.thumbnail);
        formData.append("object", JSON.stringify(productSendRequest));

        try {
            let res = await fetch(
                `http://localhost:8080/api/v1/products/${id}`,
                {
                    method: "PUT",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.id) {
                        setProduct({} as ProductItem);
                        // props.handleRefreshList();
                        // props.handleClose();
                        toast.success("Update success!");
                        navigate(`/products/${id}`);
                    }
                });
        } catch (error) {
            console.log(error);
            toast.error("Update failed!");
        }

        // if (
        //     !product.name?.trim() ||
        //     !product.material?.trim() ||
        //     !product.size?.trim() ||
        //     !product.price ||
        //     !product.type?.trim()
        // )
        //     return;
        // fetch(`http://localhost:8080/api/products/edit`, {
        //     method: "PUT",
        //     body: JSON.stringify(product),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8",
        //         Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        // }).then((res) => {
        //     if (res.ok) {
        //         props.handleRefreshList();
        //         toast.success("Save product success!");
        //         props.handleClose();
        //     }
        // });
    };

    const previewImage = () => {
        return (
            <img src={URL.createObjectURL(product.thumbnail[0])} width="100%" />
        );
    };

    return (
        <div>
            <div className="container mt-4 mb-5">
                <div>
                    <h1 className="mb-4 text-black">Chỉnh sửa sản phẩm</h1>
                    <div className="d-flex justify-content-between gap-5">
                        <div className="w-50 d-flex gap-3">
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
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <TextField
                                            disable
                                            // value={product.description}
                                            // onChange={(e) =>
                                            //     handleChangeFieldProduct(
                                            //         FieldProduct.Material,
                                            //         e
                                            //     )
                                            // }
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
                                            disable
                                            // value={product.size}
                                            // onChange={(e) =>
                                            //     handleChangeFieldProduct(
                                            //         FieldProduct.Size,
                                            //         e
                                            //     )
                                            // }
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
                                        id="category"
                                        className="form-control"
                                        value={product.categoryId}
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
                                        {categoryList.map((item) => {
                                            return (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                    selected={
                                                        item.name ==
                                                        product.category_name
                                                    }
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
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
                                            disable
                                            // value={product.discount}
                                            // onChange={(e) =>
                                            //     handleChangeFieldProduct(
                                            //         FieldProduct.Discount,
                                            //         e
                                            //     )
                                            // }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <div className="col-md-12">
                                        <label
                                            htmlFor="c_companyname"
                                            className="text-black"
                                        >
                                            Count in Stock
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <TextField
                                            disable
                                            // value={product.countInStock}
                                            // onChange={(e) =>
                                            //     handleChangeFieldProduct(
                                            //         FieldProduct.CountInStock,
                                            //         e
                                            //     )
                                            // }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <div className="col-md-12">
                                        <label
                                            htmlFor="c_companyname"
                                            className="text-black"
                                        >
                                            Rating{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <TextField
                                            disable
                                            type="number"
                                            // value={product.rating}
                                            // onChange={(e) =>
                                            //     handleChangeFieldProduct(
                                            //         FieldProduct.Rating,
                                            //         e
                                            //     )
                                            // }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <div className="col-md-12">
                                        <label
                                            htmlFor="c_companyname"
                                            className="text-black"
                                        >
                                            Description{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <TextField
                                            type="text"
                                            value={product.description}
                                            onChange={(e) =>
                                                handleChangeFieldProduct(
                                                    FieldProductItem.Description,
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
                                            onChange={(e) =>
                                                handleChangeFieldProduct(
                                                    FieldProductItem.Thumbnail,
                                                    e.target.files
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-50">
                            {monitorImageProduct == product.thumbnail
                                ? product.thumbnail && (
                                      <img
                                          src={`http://localhost:8080/api/v1/products/images/${product.thumbnail}`}
                                          width="100%"
                                      />
                                  )
                                : product.thumbnail &&
                                  product.thumbnail[0] &&
                                  previewImage()}
                        </div>
                    </div>
                    <div className="" style={{ display: "flex", gap: "10px" }}>
                        <ButtonField
                            color="black"
                            onClick={() => navigate(`/products/${id}`)}
                        >
                            Quay lại
                        </ButtonField>
                        <ButtonField
                            onClick={handleEditProduct}
                            // disabled={
                            //     !product.name?.trim() ||
                            //     !product.material?.trim() ||
                            //     !product.size?.trim() ||
                            //     !product.price ||
                            //     !product.type?.trim()
                            //     // !product.image?.trim()
                            // }
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
