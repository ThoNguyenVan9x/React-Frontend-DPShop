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
import { FieldProduct, Product } from "../models/product.model";
import { productAddApi } from "../services/ProductServices";
import { categoryListApi } from "../services/CategoryServices";

type Props = {
    handleShow: () => boolean;
    handleClose: () => void;
    handleRefreshList: () => void;
    isFetchData: boolean;
    productId: any;
};

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

function EditProductModal(props: Props) {
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductItem>({} as ProductItem);
    const [monitorImageProduct, setMonitorImageProduct] = useState<any>();
    const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);

    useEffect(() => {
        if (props.isFetchData == true) {
            try {
                const fetchData = async () => {
                    let res = await fetch(
                        `http://localhost:8080/api/v1/products/${props.productId}`
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            if (data && data.id) {
                                console.log("data ", data);
                                setProduct(data);
                                setMonitorImageProduct(data.thumbnail);
                            }
                        });
                };
                fetchData();
            } catch (error) {
                console.log("error: ", error);
            }
        }
    }, [props.isFetchData]);

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
                `http://localhost:8080/api/v1/products/${props.productId}`,
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
                        props.handleRefreshList();
                        props.handleClose();
                        toast.success("Update success!");
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

    useEffect(() => {
        setProduct({} as ProductItem);
    }, [props.handleShow()]);

    console.log("Product: ", product);

    // useEffect(() => {
    //     console.log(
    //         "value category: ",
    //         (document.getElementById("category") as HTMLSelectElement).value
    //     );
    // }, []);

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
                        Edit Product
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
                                        value={product.name}
                                        onChange={(e) =>
                                            handleChangeFieldProduct(
                                                FieldProductItem.Name,
                                                e
                                            )
                                        }
                                    />
                                    <span>
                                        Price{" "}
                                        <span className="text-danger">*</span>
                                    </span>
                                    <TextField
                                        type="number"
                                        value={product.price}
                                        width="100%"
                                        onChange={(e) =>
                                            handleChangeFieldProduct(
                                                FieldProductItem.Price,
                                                e
                                            )
                                        }
                                    />
                                    <span>
                                        Description{" "}
                                        <span className="text-danger">*</span>
                                    </span>
                                    <TextField
                                        type="text"
                                        value={product.description}
                                        width="100%"
                                        onChange={(e) =>
                                            handleChangeFieldProduct(
                                                FieldProductItem.Description,
                                                e
                                            )
                                        }
                                    />
                                    <div className="">
                                        <span className="">
                                            Category{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </span>
                                        <select
                                            className="form-control"
                                            id="category"
                                            value={product.categoryId}
                                            onChange={(e) =>
                                                handleChangeFieldProduct(
                                                    FieldProductItem.CategoryId,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                -- Category --
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
                                    <span>
                                        Thumbnail{" "}
                                        <span className="text-danger">*</span>
                                    </span>
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

                                <div className="w-100">
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
                                    {/* {product.thumbnail &&
                                        product.thumbnail[0] &&
                                        previewImage()} */}
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
                                    onClick={() => handleEditProduct()}
                                    // disabled={
                                    //     product?.name &&
                                    //     product?.price &&
                                    //     product?.description &&
                                    //     product?.thumbnail &&
                                    //     product?.categoryId
                                    //         ? false
                                    //         : true
                                    // }
                                >
                                    Update
                                </button>
                            </div>
                            <div className="p-3"></div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditProductModal;
