import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import TextField from "./TextField";
import ButtonField from "./ButtonField";

type Props = {
    handleFetchData: (data: string) => void;
    handleSearchText: (data: string) => void;
};

function NavbarShop(props: Props) {
    const handleFetchData = (title: string) => {
        props.handleFetchData(title);
    };

    const handleSearchText = (data: string) => {
        props.handleSearchText(data);
    };

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
                            className="ps-4 pe-4"
                            onClick={() => {
                                handleFetchData("SOFA");
                            }}
                        >
                            Sofa
                        </Nav.Link>
                        <Nav.Link
                            className="ps-4 pe-4"
                            onClick={() => {
                                handleFetchData("TABLE");
                            }}
                        >
                            Bàn
                        </Nav.Link>
                        <Nav.Link
                            className="ps-4 pe-4"
                            onClick={() => {
                                handleFetchData("CHAIR");
                            }}
                        >
                            Ghế
                        </Nav.Link>
                        <Nav.Link
                            className="ps-4 pe-4"
                            onClick={() => {
                                handleFetchData("BED");
                            }}
                        >
                            Giường
                        </Nav.Link>
                        <Nav.Link
                            className="ps-4 pe-4"
                            onClick={() => {
                                handleFetchData("CABINET");
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
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarShop;
