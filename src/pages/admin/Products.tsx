import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Sidbar from "../../components/admin/Sidebar";
import { Pagination, Table } from "react-bootstrap";
import { productListApi } from "../../services/ProductServices";
import AddProductModal from "../../modals/AddProductModal";
import { formatCurrency } from "../../helpers/common";
import DeleteProductModal from "../../modals/DeleteProductModal";
import EditProductModal from "../../modals/EditProductModal";
import PaginationComponent from "../../components/PaginationComponent";
import TextField from "../../components/TextField";
import { categoryListApi } from "../../services/CategoryServices";

type ProductItem = {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    category_name: string;
};

type CategoryItem = {
    id: number;
    name: string;
};

function Products() {
    const [refreshList, setRefreshList] = useState(false);
    const [isFetchData, setIsFetchData] = useState(false);

    const [keyword, setKeyword] = useState<string>("");
    const searchRef = useRef<any>(null);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(7);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [productId, setProductId] = useState<number>();
    const [productName, setProductName] = useState<string>();

    const [isShowAddProduct, setIsShowAddProduct] = useState(false);
    const [isShowDeleteProduct, setIsShowDeleteProduct] = useState(false);
    const [isShowEditProduct, setIsShowEditProduct] = useState(false);

    const [productList, setProductList] = useState<ProductItem[]>([]);
    const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);

    const handleShowAddProduct = () => {
        setIsShowAddProduct(true);
    };
    const handleCloseAddProduct = () => {
        setIsShowAddProduct(false);
    };

    const handleShowDeleteProduct = () => {
        setIsShowDeleteProduct(true);
    };
    const handleCloseDeleteProduct = () => {
        setIsShowDeleteProduct(false);
    };

    const handleShowEditProduct = () => {
        setIsShowEditProduct(true);
    };
    const handleCloseEditProduct = () => {
        setIsFetchData(false);
        setIsShowEditProduct(false);
    };

    const handleRefreshList = () => {
        setRefreshList(!refreshList);
    };

    useEffect(() => {
        const fetchListProduct = async () => {
            const res: any = await productListApi(
                page,
                limit,
                categoryId,
                keyword
            );

            if (res) {
                setTotalPages(res.totalPages);
                setProductList([...res.productResponses]);
            }
        };
        fetchListProduct();
    }, [keyword, limit, categoryId, page, refreshList]);

    useEffect(() => {
        const fetchListCategory = async () => {
            const res: any = await categoryListApi();

            if (res) {
                setCategoryList([...res]);
            }
        };
        fetchListCategory();
    }, []);

    const handleSearchKeyword = (value: string) => {
        clearTimeout(searchRef.current!);
        searchRef.current = setTimeout(() => {
            setPage(0);
            setKeyword(value);
        }, 500);
    };

    const handleChangeCategory = (value: string) => {
        clearTimeout(searchRef.current!);
        searchRef.current = setTimeout(() => {
            setPage(0);
            setCategoryId(+value);
        }, 500);
    };

    const displayedPages = [];
    const itemsPerPage = 5; // Number of displayed page numbers
    // Calculate starting and ending page for the displayed range
    const startIndex = Math.max(Math.ceil(page - itemsPerPage / 2), 1);
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalPages);
    // Fill the displayedPages array with page numbers
    for (let i = startIndex; i <= endIndex; i++) {
        displayedPages.push(i);
    }

    return (
        <>
            <div id="wrapper">
                {/*-- Side bar --*/}
                <Sidbar />

                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        {/* <Navbar /> */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            {/* Topbar Search */}
                            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100">
                                <div className="d-flex align-item-center gap-5">
                                    <div className="form-group">
                                        <TextField
                                            placeholder="Nhập để tìm kiếm"
                                            onChange={handleSearchKeyword}
                                            height="40px"
                                            width="300px"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            onChange={(e) =>
                                                handleChangeCategory(
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
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </nav>

                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            {/* Page Heading */}
                            {/* Content Row */}
                            <button
                                className="btn btn-secondary"
                                onClick={handleShowAddProduct}
                            >
                                <b>+</b> Add Product
                            </button>
                            <div className="mb-3"></div>

                            {productList.length == 0 ? (
                                <h2>Không có sản phẩm.</h2>
                            ) : (
                                <>
                                    <div
                                        style={{
                                            height: "55vh",
                                            overflow: "auto",
                                        }}
                                    >
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Description</th>
                                                    <th>Category</th>
                                                    <th>Thumbnail</th>
                                                    <th
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productList.map((item) => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => {
                                                                    setProductId(
                                                                        item.id
                                                                    );
                                                                    setIsShowEditProduct(
                                                                        true
                                                                    );
                                                                    setIsFetchData(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                {item.name}
                                                            </td>
                                                            <td>
                                                                {formatCurrency(
                                                                    item.price
                                                                )}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.description
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.category_name
                                                                }
                                                            </td>
                                                            <td>
                                                                {item.thumbnail !==
                                                                    "" && (
                                                                    <img
                                                                        src={`http://localhost:8080/api/v1/products/images/${item.thumbnail}`}
                                                                        width="50px"
                                                                        height="50px"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className="d-flex gap-3 justify-content-center"
                                                                    style={{
                                                                        paddingBottom:
                                                                            "20px",
                                                                        cursor: "pointer",
                                                                        fontSize:
                                                                            "1.2rem",
                                                                    }}
                                                                    onClick={() => {
                                                                        setProductId(
                                                                            item.id
                                                                        );
                                                                        setProductName(
                                                                            item.name
                                                                        );
                                                                        setIsShowDeleteProduct(
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    <i className="fa-solid fa-trash-can" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="mt-5 d-flex align-item-center gap-3">
                                        <Pagination>
                                            <Pagination.First
                                                onClick={() => setPage(0)}
                                            />
                                            <Pagination.Prev
                                                onClick={() => {
                                                    page > 0 &&
                                                        setPage(page - 1);
                                                }}
                                            />
                                            {page > itemsPerPage / 2 && (
                                                <Pagination.Ellipsis />
                                            )}
                                            {displayedPages.map(
                                                (pageNumber) => (
                                                    <Pagination.Item
                                                        key={pageNumber}
                                                        active={
                                                            pageNumber ===
                                                            page + 1
                                                        }
                                                        onClick={() =>
                                                            setPage(
                                                                pageNumber - 1
                                                            )
                                                        }
                                                    >
                                                        {pageNumber}
                                                    </Pagination.Item>
                                                )
                                            )}
                                            {page <
                                                totalPages -
                                                    itemsPerPage / 2 && (
                                                <Pagination.Ellipsis />
                                            )}
                                            <Pagination.Next
                                                onClick={() => {
                                                    page < totalPages - 1 &&
                                                        setPage(page + 1);
                                                }}
                                            />
                                            <Pagination.Last
                                                onClick={() =>
                                                    setPage(totalPages - 1)
                                                }
                                            />
                                        </Pagination>
                                        <select
                                            // className="form-control"
                                            onChange={(e) =>
                                                setLimit(+e.target.value)
                                            }
                                            style={{ height: "30px" }}
                                        >
                                            <option value={7}>7</option>
                                            <option value={15}>15</option>
                                            <option value={20}>20</option>
                                            <option value={30}>30</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* Content Row */}
                            {/* Content Row */}
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* End of Main Content */}
                    {/* Footer */}
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright © DP-Shop.</span>
                            </div>
                        </div>
                    </footer>
                    {/* End of Footer */}
                </div>
                {/* End of Content Wrapper */}
            </div>
            <AddProductModal
                handleShow={() => isShowAddProduct}
                handleClose={() => handleCloseAddProduct()}
                handleRefreshList={() => handleRefreshList()}
            />
            <DeleteProductModal
                handleShow={() => isShowDeleteProduct}
                handleClose={() => handleCloseDeleteProduct()}
                handleRefreshList={() => handleRefreshList()}
                productId={productId}
                productName={productName}
            />
            <EditProductModal
                handleShow={() => isShowEditProduct}
                handleClose={() => handleCloseEditProduct()}
                handleRefreshList={() => handleRefreshList()}
                productId={productId}
                isFetchData={isFetchData}
            />
        </>
    );
}

export default Products;
