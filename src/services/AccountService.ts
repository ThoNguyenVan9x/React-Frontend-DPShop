import { Account } from "../models/account.model";
import axios from "../services/customize-axios";

const loginApi = (username: string, password: string) => {
    return axios.post("/api/login", { username, password });
};

const registerApi = (data: any) => {
    return axios.post("/api/register", { data });
};

export { loginApi, registerApi };
