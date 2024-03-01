import React from "react";
import TextField from "../TextField";

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Topbar Search */}
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100">
                    <div className="d-flex align-item-center gap-5">
                        <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="Input to search..."
                                // onChange={(e) =>
                                // handleChangeFieldCustomerInfo(
                                //     FieldCustomerInfo.Email,
                                //     e.target.value
                                // )
                                // }
                            />
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control"
                                // onChange={(e) =>
                                //     handleChangeFieldCustomerInfo(
                                //         FieldCustomerInfo.Payment,
                                //         e.target.value
                                //     )
                                // }
                            >
                                <option value={""}>-- Category --</option>
                                <option value={"COD"}>Do dien tu</option>
                                <option value={"BANK"}>Do gia dung</option>
                            </select>
                        </div>
                    </div>
                </form>
            </nav>
        </>
    );
}

export default Navbar;
