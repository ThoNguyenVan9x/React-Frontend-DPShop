import axios from "../services/customize-axios";

const loginApi = (username: string, password: string) => {
    return axios.post("/api/login", { username, password });
};

export { loginApi };
