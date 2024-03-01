import axios from "../services/customize-axios";

const categoryListApi = () => {
    return axios.get(`/api/v1/categories`);
};

export { categoryListApi };
