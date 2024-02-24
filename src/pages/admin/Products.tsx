import React, { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Sidbar from "../../components/admin/Sidbar";
import { Pagination, Table } from "react-bootstrap";
import { productListApi } from "../../services/ProductServices";
import AddProductModal from "../../modals/AddProductModal";

type ProductItem = {
    id: number;
    name: string;
    material: string;
    size: string;
    price: number;
    image: string;
};

function Products() {
    const [refreshList, setRefreshList] = useState(false);

    const [searchText, setSearchText] = useState<string>("");
    const [searchType, setSearchType] = useState<string>("");
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(7);
    const [totalPage, setTotalPage] = useState<number>(0);

    const [isShowAddProduct, setIsShowAddProduct] = useState(false);

    const [productList, setProductList] = useState<ProductItem[]>([]);

    const handleShowAddProduct = () => {
        setIsShowAddProduct(true);
    };
    const handleCloseAddProduct = () => {
        setIsShowAddProduct(false);
    };

    const handleRefreshList = () => {
        setRefreshList(!refreshList);
    };

    useEffect(() => {
        const fetchListProduct = async () => {
            const res: any = await productListApi(
                pageIndex,
                pageSize,
                searchText,
                searchType
            );
            if (res) {
                setTotalPage(res.totalPages);
                setProductList([...res.content]);
            }
        };
        fetchListProduct();
    }, [searchText, pageIndex, refreshList]);

    let items = [];

    for (let i = 1; i <= totalPage; i++) {
        items.push(
            <Pagination.Item
                key={i}
                active={i === pageIndex + 1}
                onClick={() => setPageIndex(i - 1)}
            >
                {i}
            </Pagination.Item>
        );
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
                        <Navbar />

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
                                            height: "50vh",
                                            overflow: "auto",
                                        }}
                                    >
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Material</th>
                                                    <th>Size</th>
                                                    <th>Price</th>
                                                    <th>Image</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productList.map((item) => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.name}</td>
                                                            <td>
                                                                {item.material}
                                                            </td>
                                                            <td>
                                                                @{item.size}
                                                            </td>
                                                            <td>
                                                                @{item.price}
                                                            </td>
                                                            <td>
                                                                @{item.image}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="mt-5">
                                        <Pagination>{items}</Pagination>
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
        </>
    );
}

export default Products;
