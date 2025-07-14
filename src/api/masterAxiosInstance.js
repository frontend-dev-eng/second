import axios from "axios";
import { API_TIMEOUT, TOAST_ERROR, TRUSTED_LINKING_TOKEN, TRUSTED_LINKING_TOKEN_VAL } from "../assets/constants/Constants";
import ShowToast from "../components/ToastComponent";


const masterAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_MASTER_DOMAIN, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
        [TRUSTED_LINKING_TOKEN]: TRUSTED_LINKING_TOKEN_VAL,
    },
    timeout: API_TIMEOUT,
});


// Request Interceptor
masterAxiosInstance.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => {
        // Handle request error here
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

masterAxiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            ShowToast("Timeout Error", TOAST_ERROR);
            console.error('Error: Timeout exceeded');
        } else if (!error.response) {
            console.error('Error: Network Error');
            ShowToast("Network Error",TOAST_ERROR);
        } else {
            const { status, data, headers } = error.response;
            switch (status) {
                case 400:
                    console.error('Error 400: Bad Request', data);
                    if (data?.message) {
                        ShowToast(data?.message, TOAST_ERROR)
                    }
                    break;
                case 401:
                    console.error('Error 401: Unauthorized', data);
                    break;
                case 403:
                    console.error('Error 403: Forbidden', data);
                    break;
                case 404:
                    console.error('Error 404: Not Found', data);
                    break;
                case 406:
                    console.error('Error 406: Not Acceptable', data);
                    break;
                case 500:
                    console.error('Error 500: Internal Server Error', data);
                    break;
                default:
                    console.error(`Error ${status}:`, data);
            }
            console.error('Error Headers:', headers);
        }
        return Promise.reject(error);
    }
);

export default masterAxiosInstance
