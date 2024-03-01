import React from "react";
import Navbar from "../../components/admin/Navbar";
import Sidbar from "../../components/admin/Sidebar";

function Orders() {
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
                            <h1>Order Admin Page.</h1>
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
