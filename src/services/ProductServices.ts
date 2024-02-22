import axios from "../services/customize-axios";

const productDetailApi = (id: string) => {
    return axios.get(`/api/products/${id}`);
};

export { productDetailApi };
