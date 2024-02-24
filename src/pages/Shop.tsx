import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import Hero from "../components/Hero";
import NavbarShop from "../components/NavbarShop";
import ProductItem from "../components/ProductItem";
import MyPagination from "../components/MyPagination";
import ButtonField from "../components/ButtonField";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { productListApi } from "../services/ProductServices";

type ProductItem = {
    id: number;
    name: string;
    price: number;
    image: string;
};

function Shop() {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(8);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [searchType, setSearchType] = useState<string>("");
    const [searchText, setSearchText] = useState<string>("");
    const searchRef = useRef<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchText !== "") {
            setSearchType("");
        }

        const fetchProductsType = async () => {
            try {
                const res: any = await productListApi(
                    page,
                    pageSize,
                    searchText,
                    searchType
                );
                setTotalPage(res.totalPages);
                if (products.length > 0 && page > 0) {
                    setProducts([...products, ...res.content]);
                } else {
                    setProducts(res.content);
                }
            } catch (error) {
                console.log("error: ", error);
            }
        };
        fetchProductsType();
    }, [page, searchType, searchText]);

    const handleShowMore = () => {
        if (page < totalPage - 1) {
            setPage(page + 1);
            setIsLoading(true);
        }
    };

    const handleFetchData = (data: string) => {
        setSearchType(data);
        setPage(0);
    };

    const handleSearchText = (value: string) => {
        clearTimeout(searchRef.current!);
        searchRef.current = setTimeout(() => {
            setPage(0);
            setSearchText(value);
        }, 100);
    };

    const handleAddNewProduct = () => {
        navigate("/add-product");
    };

    return (
        <div>
            <div>
                <NavbarShop
                    handleFetchData={handleFetchData}
                    handleSearchText={handleSearchText}
                    handleAddNewProduct={handleAddNewProduct}
                />
                <div className="untree_co-section product-section before-footer-section">
                    <div className="container">
                        <div className="row">
                            {products.length === 0 ? (
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
                                                image={item.image}
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
