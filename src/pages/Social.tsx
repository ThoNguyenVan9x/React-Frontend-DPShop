import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Social() {
    const { token, fullName } = useParams();
    const url = window.location.href;

    console.log("da chay vao ham social");
    console.log("param token: ", token);
    console.log("param full name: ", fullName);

    useEffect(() => {
        let tokenValue: any = token;
        let fullNameValue: any = fullName;
        localStorage.setItem("token", tokenValue + "");
        localStorage.setItem("fullName", fullNameValue + "");
        window.location.href = "http://localhost:3000";
    }, []);
    return <div></div>;
}

export default Social;
