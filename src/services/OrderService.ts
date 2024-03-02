import axios from "../services/customize-axios";

// const orderApi = (
//     user_id: any,
//     fullname: any,
//     address: any,
//     phone_number: any,
//     email: any,
//     note: any,
//     total_money: any,
//     payment_method: any,
//     cart_items: Object
// ) => {
//     return axios.post(
//         "/api/v1/orders",
//         {
//             user_id,
//             fullname,
//             address,
//             phone_number,
//             email,
//             note,
//             total_money,
//             payment_method,
//             cart_items,
//         },
//         {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         }
//     );
// };

const orderApi = (data: any) => {
    return axios.post("/api/v1/orders", data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

const orderListApi = (page: number, limit: number, keyword: string) => {
    return axios.get(
        `/api/v1/orders?page=${page}&limit=${limit}&keyword=${keyword}`
    );
};

export { orderApi, orderListApi };
