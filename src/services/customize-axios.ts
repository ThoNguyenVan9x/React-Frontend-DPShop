import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/",
});

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data ? response.data : { statusCode: response.status };
    },
    function (error) {
        let res: any = {};

        if (error.response) {
            res.data = error.response.data;
            res.status = error.response.status;
            res.headers = error.response.headers;

            console.log(res.data);
            console.log(res.status);
            console.log(res.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error: ", error.message);
        }

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return res;
    }
);

export default instance;
