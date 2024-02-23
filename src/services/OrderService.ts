import axios from "../services/customize-axios";

const orderApi = (data: any) => {
    return axios.post("/api/order", { data });
};

export { orderApi };
