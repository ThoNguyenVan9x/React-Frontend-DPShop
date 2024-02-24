import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import TextField from "./TextField";
import ButtonField from "./ButtonField";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

type Props = {
    handleFetchData: (data: string) => void;
    handleSearchText: (data: string) => void;
    handleAddNewProduct: () => void;
};

function NavbarShop(props: Props) {
    const [title, setTitle] = useState<string>("");

    const handleFetchData = (title: string) => {
        props.handleFetchData(title);
    };

    const handleSearchText = (data: string) => {
        props.handleSearchText(data);
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
                        <Nav.Link
                            active={title === "SOFA" ? true : false}
                            className="ps-4 pe-4"
                            onClick={() => {
                                handleFetchData("SOFA");
                                setTitle("SOFA");
                            }}
                        >
                            Sofa
                        </Nav.Link>
                        <Nav.Link
                            active={title === "TABLE" ? true : false}
                            className="ps-4 pe-4"
                            onClick={() => {
                                handleFetchData("TABLE");
                                setTitle("TABLE");
                            }}
                        >
                            Bàn
                        </Nav.Link>
                        <Nav.Link
                            active={title === "CHAIR" ? true : false}
                            className="ps-4 pe-4"
                            onClick={() => {
                                handleFetchData("CHAIR");
                                setTitle("CHAIR");
                            }}
                        >
                            Ghế
                        </Nav.Link>
                        <Nav.Link
                            active={title === "BED" ? true : false}
                            className="ps-4 pe-4"
                            onClick={() => {
                                handleFetchData("BED");
                                setTitle("BED");
                            }}
                        >
                            Giường
                        </Nav.Link>
                        <Nav.Link
                            active={title === "CABINET" ? true : false}
                            className="ps-4 pe-4"
                            onClick={() => {
                                handleFetchData("CABINET");
                                setTitle("CABINET");
                            }}
                        >
                            Tủ
                        </Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <TextField
                        placeholder="Nhập để tìm kiếm"
                        onChange={handleSearchText}
                        height="40px"
                        width="300px"
                    />
                    <div style={{ marginLeft: "50px" }}>
                        {user && user.role === "ADMIN" && (
                            <ButtonField
                                borderRadius="10px"
                                onClick={handleAddNewProduct}
                            >
                                Add Product
                            </ButtonField>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarShop;
