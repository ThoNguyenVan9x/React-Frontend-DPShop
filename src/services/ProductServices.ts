import { Product } from "../models/product.model";
import axios from "../services/customize-axios";

const productListApi = (
    page: number,
    limit: number,
    categoryId: number,
    keyword: string
) => {
    return axios.get(
        `/api/v1/products?page=${page}&limit=${limit}&category_id=${categoryId}&keyword=${keyword}`
    );
};

const productDetailApi = (id: string) => {
    return axios.get(`/api/products/${id}`);
};

const productAddApi = (data: any) => {
    return axios.get(`/api/products/add`, { data });
};

const imageProductApi = (data: any) => {
    return axios.get(`/api/v1/products/images/${data}`);
};

export { productDetailApi, productListApi, productAddApi, imageProductApi };
