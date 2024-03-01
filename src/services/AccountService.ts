import { User } from "../models/account.model";
import axios from "../services/customize-axios";

const loginApi = (phone_number: any, password: any) => {
    return axios.post(
        "/api/v1/users/login",
        { phone_number, password },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};

const rolesApi = () => {
    return axios.get("/api/v1/roles");
};

const registerApi = (
    fullname: any,
    phone_number: any,
    address: any,
    password: any,
    retype_password: any,
    date_of_birth: any,
    role_id: any
) => {
    return axios.post("/api/v1/users/register", {
        fullname,
        phone_number,
        address,
        password,
        retype_password,
        date_of_birth,
        role_id,
    });
};

export { loginApi, registerApi };
