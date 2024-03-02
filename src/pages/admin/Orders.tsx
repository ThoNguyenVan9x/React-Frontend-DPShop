import React, { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Sidbar from "../../components/admin/Sidebar";
import TextField from "../../components/TextField";
import { Pagination, Table } from "react-bootstrap";
import { formatCurrency } from "../../helpers/common";
import { productListApi } from "../../services/ProductServices";
import { orderListApi } from "../../services/OrderService";

type ProductItem = {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    category_name: string;
};

type OrderItem = {
    id: number;
    user_id: number;
    fullname: string;
    email: string;
    phone_number: string;
    total_money: number;
    order_date: Date;
    shipping_address: string;
    shipping_method: string;
    payment_method: string;
    shipping_date: Date;
    note: string;
    status: string;
    active: boolean;
};

function Orders() {
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(7);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [keyword, setKeyword] = useState<string>("");

    const [refreshList, setRefreshList] = useState(false);

    const [orderList, setOrderList] = useState<OrderItem[]>([]);

    useEffect(() => {
        const fetchListProduct = async () => {
            const res: any = await orderListApi(page, limit, keyword);

            console.log("res order list: ", res);

            if (res && res.orderResponses) {
                setTotalPages(res.totalPages);
                setOrderList([...res.orderResponses]);
            }
        };
        fetchListProduct();
    }, [keyword, limit, page, refreshList]);

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
                                            placeholder="Nhập để tìm kiếm..."
                                            // onChange={handleSearchKeyword}
                                            height="40px"
                                            width="300px"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            // onChange={(e) =>
                                            //     handleChangeCategory(
                                            //         e.target.value
                                            //     )
                                            // }
                                        >
                                            <option value="">
                                                -- Category --
                                            </option>
                                            {/* {categoryList.map((item) => {
                                                return (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                            })} */}
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </nav>

                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            {/* Page Heading */}
                            {/* Content Row */}
                            <div className="mb-3"></div>

                            {orderList.length == 0 ? (
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
                                                    <th>Orderer id</th>
                                                    <th>Receiver</th>
                                                    <th>Email</th>
                                                    <th>Phone number</th>
                                                    <th>Total money</th>
                                                    <th>Order date</th>
                                                    <th>Shipping address</th>
                                                    <th>Shipping date</th>
                                                    <th>Shipping method</th>
                                                    <th>Payment method</th>
                                                    <th>Status</th>
                                                    <th>Note</th>
                                                    <th>Active</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderList.map((item) => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>
                                                                {item.user_id}
                                                            </td>
                                                            <td>
                                                                {item.fullname}
                                                            </td>
                                                            <td>
                                                                {item.email}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.phone_number
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.total_money
                                                                }
                                                            </td>
                                                            <td>
                                                                {`${item.order_date}`}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.shipping_address
                                                                }
                                                            </td>
                                                            <td>
                                                                {`${item.shipping_date}`}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.shipping_method
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.payment_method
                                                                }
                                                            </td>
                                                            <td>
                                                                {item.status}
                                                            </td>

                                                            <td>{item.note}</td>
                                                            <td>
                                                                {`${item.active}`}
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
        </>
    );
}

export default Orders;
