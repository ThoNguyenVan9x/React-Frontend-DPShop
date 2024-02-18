import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import Hero from "../components/Hero";
import NavbarShop from "../components/NavbarShop";
import ProductItem from "../components/ProductItem";
import MyPagination from "../components/MyPagination";
import ButtonField from "../components/ButtonField";

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
    const [totalPage, setTotalPage] = useState<number>(0);
    const [searchType, setSearchType] = useState<string>("SOFA");
    const [searchText, setSearchText] = useState<string>("");
    const searchRef = useRef<any>(null);

    useEffect(() => {
        // console.log("chay ham fetch");

        const fetchProductsType = async () => {
            try {
                if (searchText === "") {
                    console.log("search text = empty ");

                    const res = await axios.get(
                        `http://localhost:8080/api/products?pageIndex=${page}&searchType=${searchType}`
                    );
                    setTotalPage(res.data.totalPages);
                    // console.log("products trong fetch: ", products);
                    if (products.length > 0 && page > 0) {
                        setProducts([...products, ...res.data.content]);
                    } else {
                        setProducts(res.data.content);
                    }
                } else {
                    console.log("search text has data");
                    const res = await axios.get(
                        `http://localhost:8080/api/products?pageIndex=${page}&search=${searchText}`
                    );
                    setTotalPage(res.data.totalPages);
                    // console.log("products trong fetch: ", products);
                    if (products.length > 0 && page > 0) {
                        setProducts([...products, ...res.data.content]);
                    } else {
                        setProducts(res.data.content);
                    }
                }
            } catch (error) {
                console.log("error: ", error);
            }
        };
        fetchProductsType();
    }, [page, searchType, searchText]);

    const handleShowMore = () => {
        // console.log("handle show more");
        // console.log("page: ", page);
        // console.log("total page: ", totalPage);

        if (page < totalPage - 1) {
            setPage(page + 1);
            setIsLoading(true);
        }
    };

    const handleFetchData = (data: string) => {
        // console.log("handle fetch data");
        // console.log("data title : ", data);
        // console.log("search type ben trong handle fetch data: ", searchType);

        setSearchType(data);
        setPage(0);
    };

    const handleSearchText = (value: string) => {
        console.log("handle search text");

        clearTimeout(searchRef.current!);
        searchRef.current = setTimeout(() => {
            setPage(0);
            setSearchText(value);
        }, 100);
    };

    // console.log("Render component");
    // console.log("page: ", page);
    // console.log("searchType ben ngoai: ", searchType);
    // console.log("products ben ngoai: ", products);

    return (
        <div>
            <div>
                <NavbarShop
                    handleFetchData={handleFetchData}
                    handleSearchText={handleSearchText}
                />
                <div className="untree_co-section product-section before-footer-section">
                    <div className="container">
                        <div className="row">
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
