import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import Hero from "../components/Hero";
import NavbarShop from "../components/NavbarShop";
import ProductItem from "../components/ProductItem";
import ButtonField from "../components/ButtonField";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { productListApi } from "../services/ProductServices";
import { categoryListApi } from "../services/CategoryServices";
import { Carousel } from "react-bootstrap";
import MyCarousel from "../components/MyCarousel";

type ProductType = {
    id: number;
    name: string;
    price: number;
    thumbnail: any;
    description: string;
    categoryId: number;
};

type CategoryItem = {
    id: number;
    name: string;
};

function Shop() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(16);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [category, setCategory] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const searchRef = useRef<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("chay vao ham fetch product type: ");
        console.log("category: ", category);
        console.log("keyword: ", keyword);
        console.log("page index: ", page);

        if (keyword !== "") {
            setCategory("");
        }

        const fetchProductsType = async () => {
            try {
                const res: any = await productListApi(
                    page,
                    limit,
                    category as any,
                    keyword
                );
                console.log("res : ", res);
                if (res) {
                    setTotalPage(res.totalPages);
                    if (products && products.length > 0 && page >= 0) {
                        setProducts([...products, ...res.productResponses]);
                    } else {
                        setProducts(res.productResponses);
                    }
                }
            } catch (error) {
                console.log("error: ", error);
            }
        };
        fetchProductsType();
    }, [page, category, keyword]);

    const handleShowMore = () => {
        if (page < totalPage - 1) {
            setPage(page + 1);
            setIsLoading(true);
        }
    };

    const handleFetchData = (data: string) => {
        if (keyword == "" && data !== category) {
            setCategory(data);
            setPage(0);
            setProducts([]);
        }
    };

    const handleKeyword = (value: string) => {
        clearTimeout(searchRef.current!);
        searchRef.current = setTimeout(() => {
            setPage(0);
            setKeyword(value);
            setCategory("");
            setProducts([]);
        }, 500);
    };

    const handleAddNewProduct = () => {
        navigate("/add-product");
    };

    console.log("chi tiet products: ", products);

    return (
        <div>
            <div>
                <NavbarShop
                    handleFetchData={handleFetchData}
                    handleKeyword={handleKeyword}
                    handleAddNewProduct={handleAddNewProduct}
                />
                <div>
                    <MyCarousel />
                </div>
                <div className="untree_co-section product-section before-footer-section">
                    <div className="container">
                        <div className="row">
                            {!products ||
                            (products && products.length) === 0 ? (
                                <h2>Không có sản phẩm.</h2>
                            ) : (
                                <>
                                    {products.map((item) => {
                                        return (
                                            <ProductItem
                                                key={item.id}
                                                id={item.id}
                                                name={item.name}
                                                price={item.price}
                                                thumbnail={item.thumbnail}
                                                description={item.description}
                                                categoryId={item.categoryId}
                                            />
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        {page < totalPage - 1 && (
                            <ButtonField
                                loading={false}
                                onClick={handleShowMore}
                            >
                                Show more
                            </ButtonField>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
