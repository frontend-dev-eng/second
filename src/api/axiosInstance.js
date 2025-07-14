// axiosInstance.js
import axios from 'axios';
import { getSecureItemFromSpecificStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK } from '../assets/constants/BrowserStorageKeys';
import { API_TIMEOUT, TOAST_ERROR } from '../assets/constants/Constants';
import ShowToast from '../components/ToastComponent';



const createAxiosInstance = () => {
  return  axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: API_TIMEOUT,
  });
  
}

const axiosInstance = createAxiosInstance()


// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    let getDomainAndLockerBankId = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK)
    const domain = getDomainAndLockerBankId?.domain;
    const baseUrl = domain.includes('https://') || domain.includes('http://') 
      ? `${domain}api/`
      : `https://${domain}/api/`;
      config.baseURL = baseUrl
      return config;
    },
    (error) => {
      // Handle request error here
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => {
      // Any status code that lies within the range of 2xx causes this function to trigger
      return response;
    },
    (error) => {
      if (error.code === 'ECONNABORTED') {
        ShowToast("Timeout Error",TOAST_ERROR);
        console.error('Error: Timeout exceeded');
      } else if (!error.response) {
        console.error('Error: Network Error');
        ShowToast("Network Error",TOAST_ERROR);
      } else {
        const { status, data, headers} = error?.response;
        switch (status) {
          case 400:
            console.error('Error 400: Bad Request', data);
            if(data?.message){
              if(data?.message !== 'No Data Found'){
                ShowToast(data?.message,TOAST_ERROR)
              }
            }
            break;
          case 401:
            console.error('Error 401: Unauthorized', data);
            break;
          case 403:
            if(data?.message){
                ShowToast(data?.message,TOAST_ERROR)
            }
            console.error('Error 403: Forbidden', data);
            break;
          case 404:
            console.error('Error 404: Not Found', data);
            break;
          case 406:
            const errorKeys = Object.keys(data?.error);
            if (errorKeys.length > 0) {
              // Get the first key's corresponding message array
              const firstErrorMessageArray = data?.error[errorKeys[0]];
              if (Array.isArray(firstErrorMessageArray) && firstErrorMessageArray.length > 0) {
                // Show the first error message using the toaster
                ShowToast(firstErrorMessageArray[0],TOAST_ERROR);
              }
            }
            console.error('Error 406: Not Acceptable', data,error);
            break;
          case 502:
            console.error('Error 502: Bad Gateway', data);
            if(data?.message){
                ShowToast(data?.message,TOAST_ERROR)
            }
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

export default axiosInstance;