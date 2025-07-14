// api.js

import moment from 'moment/moment';
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRY_TIME, LOCAL_STORAGE, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRY_TIME } from '../assets/constants/BrowserStorageKeys';
import { API_TIMEOUT_FOR_CLOSE_DOOR_API, ASSIGNMENT_SLUG, DEVICE_ID, DEVICE_TYPE, PWA, TRUSTED_LINKING_TOKEN, TRUSTED_LINKING_TOKEN_VAL } from '../assets/constants/Constants';
import { getSecureItemFromSpecificStorage, storeSecureItemInSpecifiedStorage } from '../lib/BrowserStorageAccessMiddleware';
import axiosInstance from './axiosInstance';
import masterAxiosInstance from './masterAxiosInstance';
import { convertSecondsToDateTimeFormat } from '../lib/Utils';

export const getTenantAndAssignmentSettings = async (lockerBankId) => {
    try {
        let headers = {
            [TRUSTED_LINKING_TOKEN] : TRUSTED_LINKING_TOKEN_VAL,
        }
        const response = await axiosInstance.get(`${PWA}/bank/${lockerBankId}/details/`,{headers : headers});
        return response?.data;
    } catch (error) {
        console.error(`Failed to fetch details for locker bank ID ${lockerBankId}:`, error);
        throw error;
    }
};

export const sendOtp = async (emailOrMobile, assignmentSlug) => {

    console.log('sendOtp called with emailOrMobile: ', emailOrMobile, ' assignmentSlug: ', assignmentSlug);
    try {
        let headers = {
            [TRUSTED_LINKING_TOKEN]: TRUSTED_LINKING_TOKEN_VAL,
            [ASSIGNMENT_SLUG] : assignmentSlug
        }
        let body = {
            email_or_mobile: emailOrMobile,
        }
        const response = await axiosInstance.post(`${PWA}/auth/send-otp/`, body, { headers: headers });
        return response?.data;
    } catch (error) {
        console.error(`Failed to send OTP to phone number ${emailOrMobile}:`, error);
        throw error;
    }
};

export const verifyOtp = async (txnId, otp) => {
    try {
        let headers = {
            [TRUSTED_LINKING_TOKEN]: TRUSTED_LINKING_TOKEN_VAL,
        }
        let body = {
            txn_id: txnId,
            otp: otp
        }
        const response = await axiosInstance.post(`${PWA}/auth/verify-otp/`, body, { headers: headers });
        return response?.data;
    } catch (error) {
        console.error(`Failed to send OTP to phone number ${txnId}:`, error);
        throw error;
    }
};

export const getDomainAndLockerBankIdFromShortCode = async (lockerBankCode) => {
    try {
        const response = await masterAxiosInstance.get(`configurations/${lockerBankCode}/bank-identifier/`);
        return response?.data;
    } catch (error) {
        console.error(`Failed to get domain and locker bank ID for short code ${lockerBankCode}:`, error);
        throw error;
    }
};

export const getAvailableLockerSizesWithUnits = async (assignmentSlug, lockerBankId) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if (accessToken) {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                [ASSIGNMENT_SLUG]: assignmentSlug
            };
            // const body = {
            //     locker_bank_id: lockerBankId
            // };
            // console.log('headers and body: ', headers, body);
            const response = await axiosInstance.get(`${PWA}/bank/available-sizes/?locker_bank_id=${lockerBankId}`, {headers: headers});
            console.log('available sizes response: ', response);
            return response?.data;
        }
    } catch (error) {
        console.error('Failed to get available locker sizes with units: ', error);
        throw error;
    }
};

export const reserveLocker = async (assignmentSlug, lockerBankId, userId, selectedSize = null, selectedUnit = null, bookingSlotId = null, paymentAmount = null) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if (accessToken) {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                [ASSIGNMENT_SLUG]: assignmentSlug
            };
            const body = {
                locker_bank_id: lockerBankId,
                user_id: userId
                // size: selectedSize,
                // door_id: selectedUnit
            };
            if (selectedSize) {
                body.size = selectedSize;
            }
            if (selectedUnit) {
                body.door_id = selectedUnit;
            }
            if (bookingSlotId) {
                body.door_size_payment_slab = bookingSlotId;
            }
            if (paymentAmount) {
                body.payment_amount = paymentAmount;
            }
            
            console.log('body request during reserve a locker: ', body);
            const response = await axiosInstance.post(`${PWA}/bank/reserve/`, body, {headers: headers});
            return response?.data;
        }
    } catch (error) {
        console.error('Failed to reserve locker: ', error);
        throw error;
    }
};

export const getAssignedLockerList = async (assigmentKey, searchText,page) => {
    try {
        let queryParams = `?assignment_id=${assigmentKey}` + (searchText ? `&search=${searchText}` : '' + (page > 1 ? `&page=${page}` : ''));
        const accessToken = await getRefreshedAccessToken();
        if(accessToken){
            let headers = {
                Authorization: `Bearer ${accessToken}`
            }
            const response = await axiosInstance.get(`${PWA}/bank/my-lockers/${queryParams}`, { headers: headers });
            return response?.data;
        }
    } catch (error) {
        const { status, data, headers } = error?.response;
        switch (status) {
            case 400: Object.assign(error.response);
            break;
            default: throw error;
        }
    }
};

export const getRefreshedAccessToken = async () => {
    try {
        const accessToken = await getSecureItemFromSpecificStorage(LOCAL_STORAGE, ACCESS_TOKEN);
        const refreshToken = await getSecureItemFromSpecificStorage(LOCAL_STORAGE, REFRESH_TOKEN);
        const accessExpiryAt = await getSecureItemFromSpecificStorage(LOCAL_STORAGE, ACCESS_TOKEN_EXPIRY_TIME);
        const refreshExpiryAt = await getSecureItemFromSpecificStorage(LOCAL_STORAGE, REFRESH_TOKEN_EXPIRY_TIME);
        if (!accessToken || !refreshToken) {
            console.error('Token data is missing');
            return null;
        }
        const now = moment.utc();
        const tokenExpiryTime = moment.utc(accessExpiryAt);
        if (now.isBefore(tokenExpiryTime)) {
            return accessToken;
        } else {
            let headers = {
                [TRUSTED_LINKING_TOKEN]: TRUSTED_LINKING_TOKEN_VAL,
            }
            let body = {
                refresh_token: refreshToken
            }
            const response = await axiosInstance.post(`${PWA}/auth/refresh-token/`, body, { headers: headers });
            if (response) {
                const newAccessToken = response.data.data.access;
                const newAccessExpiryAt = response.data.data.access_expires_in;
                storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, ACCESS_TOKEN, newAccessToken);
                storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, ACCESS_TOKEN_EXPIRY_TIME, convertSecondsToDateTimeFormat(newAccessExpiryAt));
                return newAccessToken;
            }
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return null;
    }
};


export const openLocker = async (refId) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if(accessToken){
            let headers = {
                Authorization: `Bearer ${accessToken}`
            }
            let body = {
                ref_id: refId
            }
            const response = await axiosInstance.post(`${PWA}/bank/open-door/`,body, { headers: headers });
            return response?.data;
        }
    } catch (error) {
        console.error(`Failed to fetch locker list :`, error);
        throw error;
    }
};

export const dropParcel = async (refId) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if(accessToken){
            let headers = {
                Authorization: `Bearer ${accessToken}`
            }
            let body = {
                ref_id: refId
            }
            const response = await axiosInstance.post(`${PWA}/bank/drop/`,body, { headers: headers });
            return response?.data;
        }
    } catch (error) {
        console.error(`Failed to fetch locker list :`, error);
        throw error;
    }
}

export const releaseLockerOfPickUpUser = async (refId) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if(accessToken){
            let headers = {
                Authorization: `Bearer ${accessToken}`
            }
            let body = {
                ref_id: refId
            }
            const response = await axiosInstance.post(`${PWA}/bank/release/`,body, { headers: headers });
            return response?.data; 
        }
    } catch (error) {
        console.error(`Failed to fetch locker list :`, error);
        throw error;
    }
}

export const deleteUserAccount = async () => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if(accessToken){
            let headers = {
                Authorization: `Bearer ${accessToken}`
            }
            const response = await axiosInstance.post(`${PWA}/auth/delete-user-account/`,{}, { headers: headers });
            return response?.data;

        }
    } catch (error) {
        console.error(`Failed to fetch locker list :`, error);
        throw error;
    }
}

export const cancelDropOffTransaction = async (refId,cancelReason) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if(accessToken){
            let headers = {
                Authorization: `Bearer ${accessToken}`
            }
            let body = {
                ref_id: refId,
                remark: cancelReason
            }
            const response = await axiosInstance.post(`${PWA}/bank/cancel/`,body, { headers: headers });
            return response?.data;
        }
    } catch (error) {
        console.error(`Failed to cancel locker list :`, error);
        throw error;
    }
}

export const fetchPaymentStatus = async (refId,paymentGateway) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if(accessToken){
            let headers = {
                Authorization: `Bearer ${accessToken}`
            }
            let body = {
                payment_reference_id : refId,
                payment_gateway: paymentGateway
            }
            const response = await axiosInstance.post(`payment-gateway/fetch-payment/`,body, { headers: headers });
            return response?.data;
        }
    } catch (error) {
        console.error(`Failed to fetch payment status :`, error);
        throw error;
    }
}

export const overduePayment = async (transactionId, amount, paymentType = 'OVERDUE') => {
    try {
        const accessToken = await getRefreshedAccessToken();

        if (accessToken) {
            const headers = {
                Authorization: `Bearer ${accessToken}`
            };

            const body = {
                transaction_id: transactionId,
                payment_type: paymentType,
                amount
            };

            const response = await axiosInstance.post('payment-gateway/overdue-payment/', body, {headers: headers});
            return response?.data;
        }
    } catch (error) {
        console.error('Error during overdue payment: ', error);
        throw error;
    }
};

export const getProductsList = async (assignmentSlug) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if(accessToken){
            let headers = {
                Authorization: `Bearer ${accessToken}`,
                [ASSIGNMENT_SLUG] : assignmentSlug
            }
            const response = await axiosInstance.get(`${PWA}/inventory/product-list/`, { headers: headers });
            return response?.data;
        }
    } catch (error) {
        console.error(`Failed to fetch payment status :`, error);
        throw error;
    }
}

export const rentProductAndReserveLocker = async (assignmentSlug,productId, productSlabId, paymentReferenceId) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if(accessToken){
            let headers = {
                Authorization: `Bearer ${accessToken}`,
                [ASSIGNMENT_SLUG] : assignmentSlug
            }

            const body = {
                    "product": productId,
                    "price_slab_id": productSlabId,
                    "payment_reference_id": paymentReferenceId
            }
            const response = await axiosInstance.post(`${PWA}/inventory/product-rent-out/`, body,{ headers: headers });
            return response?.data;
        }
    } catch (error) {
        console.error(`Failed to fetch payment status :`, error);
        throw error;
    }
}

export const openLockerDoor = async (refId) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if(accessToken){
            let headers = {
                Authorization: `Bearer ${accessToken}`,
                [DEVICE_ID] : "123445689", //Setting temporary device id, will be replaced with actual device id
                [DEVICE_TYPE] : PWA
            }

            const body = {
                   ref_id : refId
            }
            const response = await axiosInstance.post(`open-api/operations/open-door/`, body,{ headers: headers });
            return response?.data;
        }
    } catch (error) {
        console.error(`Failed to open door :`, error);
        throw error;
    }
}

export const registerGoogleLoginUser = async (googleAuthToken,assignmentSlug,email) => {
    try {
        let headers = {
            [TRUSTED_LINKING_TOKEN]: TRUSTED_LINKING_TOKEN_VAL,
            [ASSIGNMENT_SLUG]: assignmentSlug
        }

        const body = {
            token: googleAuthToken,
            email: email
        }
        const response = await axiosInstance.post(`${PWA}/auth/google-login/`, body, { headers: headers });
        return response?.data;

    } catch (error) {
        console.error(`Failed to register google login user :`, error);
        throw error;
    }
}

export const registerFacebookLoginUser = async (faceBookAuthToken,assignmentSlug,email) => {
    try {
        let headers = {
            [TRUSTED_LINKING_TOKEN]: TRUSTED_LINKING_TOKEN_VAL,
            [ASSIGNMENT_SLUG]: assignmentSlug
        }

        const body = {
            token: faceBookAuthToken,
            email: email
        }
        const response = await axiosInstance.post(`${PWA}/auth/facebook-login/`, body, { headers: headers });
        return response?.data;

    } catch (error) {
        console.error(`Failed to register facebook login user :`, error);
        throw error;
    }
}

export const handleNotifyUserForProduct = async (assignmentSlug,productId) => {
    const accessToken = await getRefreshedAccessToken();
    try {
        let headers = {
            Authorization: `Bearer ${accessToken}`,
            [ASSIGNMENT_SLUG]: assignmentSlug
        }

        const body = {
            product: productId,
        }
        const response = await axiosInstance.post(`${PWA}/inventory/notify-me/`, body, { headers: headers });
        return response?.data;

    } catch (error) {
        console.error(`Failed to notify user :`, error);
        throw error;
    }
}

export const getSessionStatus = async (paymentGatewayReference, paymentReferenceId) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if(accessToken){
            let headers = {
                Authorization: `Bearer ${accessToken}`,
            }

            const body = {
                payment_gateway_reference : paymentGatewayReference,
                payment_reference_id:paymentReferenceId
            }
            const response = await axiosInstance.post(`payment-gateway/stripe/session-status/`, body, { headers: headers });
            return response?.data;
        }
    } catch (error) {
        console.error(`Error in getSessionStatus API :`, error);
        throw error;
    }
}

export const capturePayment = async (paymentReferenceId, finalAmount) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if (accessToken) {
            let headers = {
                Authorization: `Bearer ${accessToken}`,
            }

            const body = {
                payment_reference_id: paymentReferenceId,
                amount : parseFloat(finalAmount)
            }
            const response = await axiosInstance.post(`payment-gateway/stripe/payment-charge/`, body, { headers: headers });
            return response?.data;
        }
    } catch (error) {
        console.error(`Error in capturePayment API :`, error);
        throw error;
    }
}

export const productRentInitiate = async (assignmentSlug, productId) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if (accessToken) {
            let headers = {
                Authorization: `Bearer ${accessToken}`,
                [ASSIGNMENT_SLUG] : assignmentSlug
            }

            const body = {
                product: productId,
            }
            const response = await axiosInstance.post(`${PWA}/inventory/product-rent-initiate/`, body, { headers: headers });
            return response?.data;
        }
    } catch (error) {
        console.error(`Error in productRentInitiate API :`, error);
        throw error;
    }
}

export const checkClosedLockerDoorStatus = async (refId, status) => {
    try {
        const accessToken = await getRefreshedAccessToken();
        if (accessToken) {
            let headers = {
                Authorization: `Bearer ${accessToken}`
            }
            let body = {
                ref_id: refId,
                status: status
            }
            const response = await axiosInstance.post(`${PWA}/bank/check-door-status/`, body, { headers: headers, timeout: API_TIMEOUT_FOR_CLOSE_DOOR_API });
            return response?.data;
        }
    } catch (error) {
        console.error(`Failed to fetch payment status :`, error);
        throw error;
    }
}