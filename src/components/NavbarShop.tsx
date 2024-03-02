import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import TextField from "./TextField";
import ButtonField from "./ButtonField";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { categoryListApi } from "../services/CategoryServices";

type Props = {
    handleFetchData: (data: string) => void;
    handleKeyword: (data: string) => void;
    handleAddNewProduct: () => void;
};

type CategoryItem = {
    id: number;
    name: string;
};

function NavbarShop(props: Props) {
    const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);

    useEffect(() => {
        const fetchListCategory = async () => {
            const res: any = await categoryListApi();
            if (res) {
                setCategoryList([...res]);
            }
        };
        fetchListCategory();
    }, []);

    const [categoryId, setCategoryId] = useState<number>();

    const handleFetchData = (id: string) => {
        props.handleFetchData(id);
    };

    const handleKeyword = (data: string) => {
        props.handleKeyword(data);
    };

    const handleAddNewProduct = () => {
        props.handleAddNewProduct();
    };

    const { user } = useContext(UserContext);

    return (
        <Navbar
            expand="lg"
            className="bg-body-tertiary fs-5 position-sticky bg-light top-0"
            style={{ zIndex: "3" }}
        >
            <Container>
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="" id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {categoryList.map((item) => {
                            return (
                                <Nav.Link
                                    key={item.id}
                                    active={
                                        categoryId === item.id ? true : false
                                    }
                                    className="ps-4 pe-4"
                                    onClick={() => {
                                        handleFetchData(`${item.id}`);
                                        setCategoryId(item.id);
                                    }}
                                >
                                    {item.name}
                                </Nav.Link>
                            );
                        })}
                    </Nav>
                    <TextField
                        placeholder="Nhập để tìm kiếm"
                        onChange={handleKeyword}
                        height="40px"
                        width="300px"
                    />
                    <div style={{ marginLeft: "50px" }}>
                        {/* {user && user.role === "ADMIN" && (
                            <ButtonField
                                borderRadius="10px"
                                onClick={handleAddNewProduct}
                            >
                                Add Product
                            </ButtonField>
                        )} */}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarShop;
