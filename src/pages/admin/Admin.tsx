import { useState } from "react";
import { Accordion, Button, Card, Offcanvas } from "react-bootstrap";
import TextField from "../../components/TextField";
import Sidbar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

function Admin() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                            <h1>Admin Page.</h1>
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
            {/* <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up" />
            </a> */}
        </>
    );
}

export default Admin;
