import { Product } from "../models/product.model";
import axios from "../services/customize-axios";

const productListApi = (
    pageIndex: number,
    pageSize: number,
    searchText: string,
    searchType: string
) => {
    return axios.get(
        `/api/products/list?pageIndex=${pageIndex}&pageSize=${pageSize}&searchText=${searchText}&searchType=${searchType}`
    );
};

const productDetailApi = (id: string) => {
    return axios.get(`/api/products/${id}`);
};

const productAddApi = (data: any) => {
    return axios.get(`/api/products/add`, { data });
};

export { productDetailApi, productListApi, productAddApi };
