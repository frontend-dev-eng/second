import { getRefreshedAccessToken } from "../api/api";
import { LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK } from "../assets/constants/BrowserStorageKeys";
import {API, PWA, LUGGAGE, LUGGAGE_SETTINGS, SEND_OTP, VERIFY_OTP, AVAILABLE_SIZES, ASSIGNED_LOCKERS, OPEN_LOCKER, RELEASE_LOCKER, GET, POST, SUCCESS, ERROR, REDIRECT, INITIATE_PAYMENT, POST_PAYMENT, PAYMENT_GATEWAY, INITIATE, UPDATE_PAYMENT} from "../assets/constants/Constants";
import { getSecureItemFromSpecificStorage } from "./BrowserStorageAccessMiddleware";

const httpHandler = (url, method, additionalHeaders, body) => {
    const headers = Object.assign({
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }, additionalHeaders);

    let response = fetch (url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }).then( async (resp) => {
        return {statusCode: resp.status, data: await resp.json()};
    }).then( (response) => {
        return response;
    }).catch((error) => {
        console.log('Error: ', JSON.stringify(error));
    });

    return response;
}

export const getTenantAndAssignmentSettings = async (domain, additionalHeaders, body) => {
    const URL_getTenantAndAssignmentSettings = `https://${domain}/${API}/${PWA}/${LUGGAGE}/${LUGGAGE_SETTINGS}/`;

    const response = await httpHandler(URL_getTenantAndAssignmentSettings, POST, additionalHeaders, body);

    switch (response.statusCode) {
        case 200: return Object.assign(response, {status: SUCCESS});
        case 500: return Object.assign(response, {status: ERROR, message: 'error_msg_something_went_wrong_try_again'});
        default: return Object.assign(response, {status: ERROR, message: 'error_msg_error_while_fetching_locker_bank_settings_try_again'});
    }
}

export const sendOTPToUserEmailOrMobile = async (domain, additionalHeaders, body) => {
    const URL_sendOTPToUserEmailOrMobile = `https://${domain}/${API}/${PWA}/${LUGGAGE}/${SEND_OTP}/`;

    const response = await httpHandler(URL_sendOTPToUserEmailOrMobile, POST, additionalHeaders, body);

    switch (response.statusCode) {
        case 200: return Object.assign(response, {status: SUCCESS});
        case 422: return Object.assign(response, {status: REDIRECT});
        case 500: return Object.assign(response, {status: ERROR, message: 'error_msg_something_went_wrong_try_again'});
        default: return Object.assign(response, {status: ERROR, message: 'error_msg_error_occured_while_sending_otp_try_again'});
    }
}

export const verifyOTP = async (domain, additionalHeaders, body) => {
    const URL_verifyOTP = `https://${domain}/${API}/${PWA}/${LUGGAGE}/${VERIFY_OTP}/`;

    const response = await httpHandler(URL_verifyOTP, POST, additionalHeaders, body);

    switch (response.statusCode) {
        case 200: return Object.assign(response, {status: SUCCESS});
        case 401: return Object.assign(response, {status: ERROR, message: 'error_msg_otp_invalid_enter_correct_otp'});
        case 410: return Object.assign(response, {status: ERROR, message: 'error_msg_otp_expired_click_resend_to_get_new_otp'});
        case 500: return Object.assign(response, {status: ERROR, message: 'error_msg_something_went_wrong_try_again'});
        default: return Object.assign(response, {status: ERROR, message: 'error_msg_error_occured_while_verifying_otp_try_again'});
    }
}

export const getLockerSizeAvailability = async (domain, additionalHeaders, body, lockerBankId) => {
    const URL_getLockerSizeAvailability = `https://${domain}/${API}/${PWA}/${LUGGAGE}/${AVAILABLE_SIZES}/${lockerBankId}/`;

    const response = await httpHandler(URL_getLockerSizeAvailability, POST, additionalHeaders, body);

    switch (response.statusCode) {
        case 200: return Object.assign(response, {status: SUCCESS});
        case 500: return Object.assign(response, {status: ERROR, message: 'error_msg_something_went_wrong_try_again'});
        default: return Object.assign(response, {status: ERROR, message: 'error_msg_error_occured_while_checking_available_locker_sizes_try_again'});
    }
}

export const getAssignedLockers = async (domain, additionalHeaders) => {
    const URL_getAssignedLockers = `https://${domain}/${API}/${PWA}/${LUGGAGE}/${ASSIGNED_LOCKERS}/`;

    const response = await httpHandler(URL_getAssignedLockers, GET, additionalHeaders);

    switch (response.statusCode) {
        case 200: return Object.assign(response, {status: SUCCESS});
        case 401: return Object.assign(response, {status: REDIRECT, message: 'error_msg_invalid_token_login_and_try_again'});
        case 500: return Object.assign(response, {status: ERROR, message: 'error_msg_something_went_wrong_try_again'});
        default: return Object.assign(response, {status: ERROR, message: 'error_msg_error_occured_while_fetching_your_lockers_try_again'});
    }
}

// export const prePaymentRegistration = async (domain, additionalHeaders, body) => {
//     const URL_prePaymentRegistration = `https://${domain}/${API}/${PWA}/${LUGGAGE}/${INITIATE_PAYMENT}/`;

//     const response = await httpHandler(URL_prePaymentRegistration, POST, additionalHeaders, body);

//     switch (response.statusCode) {
//         case 200: return Object.assign(response, {status: SUCCESS});
//         case 400: return Object.assign(response, {status: ERROR});
//         case 401: return Object.assign(response, {status: REDIRECT, message: 'error_msg_unexpected_error_while_initiating_payment_login_and_try'});
//         case 403: return Object.assign(response, {status: ERROR});
//         case 500: return Object.assign(response, {status: ERROR, message: 'error_msg_something_went_wrong_try_again'});
//         default: return Object.assign(response, {status: ERROR, message: 'error_msg_error_occured_while_initiating_payment_try_again'});
//     }
// }

// export const postPaymentSaveTransaction = async (domain, additionalHeaders, body) => {
//     const URL_postPaymentSaveTransaction = `https://${domain}/${API}/${PWA}/${LUGGAGE}/${POST_PAYMENT}/`;

//     const response = await httpHandler(URL_postPaymentSaveTransaction, POST, additionalHeaders, body);

//     switch (response.statusCode) {
//         case 200: return Object.assign(response, {status: SUCCESS});
//         case 500: return Object.assign(response, {status: ERROR, message: 'error_msg_something_went_wrong_try_again'});
//         default: return Object.assign(response, {status: ERROR, message: 'error_msg_error_occured_while_verifying_transaction'});
//     }
// }

export const openLocker = async (domain, additionalHeaders, body) => {
    const URL_openLocker = `https://${domain}/${API}/${PWA}/${LUGGAGE}/${OPEN_LOCKER}/`;

    const response = await httpHandler(URL_openLocker, POST, additionalHeaders, body);

    switch (response.statusCode) {
        case 200: return Object.assign(response, {status: SUCCESS});
        case 400: return Object.assign(response, {status: ERROR});
        case 401: return Object.assign(response, {status: REDIRECT});
        case 404: return Object.assign(response, {status: REDIRECT});
        case 500: return Object.assign(response, {status: ERROR, message: 'error_msg_something_went_wrong_try_again'});
        default: return Object.assign(response, {status: ERROR, message: 'error_msg_error_occured_while_opening_your_locker_try_again'});
    }
}

export const releaseLocker = async (domain, additionalHeaders, body) => {
    const URL_releaseLocker = `https://${domain}/${API}/${PWA}/${LUGGAGE}/${RELEASE_LOCKER}/`;

    const response = await httpHandler(URL_releaseLocker, POST, additionalHeaders, body);

    switch (response.statusCode) {
        case 200: return Object.assign(response, {status: SUCCESS});
        case 400: return Object.assign(response, {status: ERROR});
        case 401: return Object.assign(response, {status: REDIRECT});
        case 404: return Object.assign(response, {status: REDIRECT});
        case 422: return Object.assign(response, {status: ERROR});
        case 500: return Object.assign(response, {status: ERROR, message: 'error_msg_something_went_wrong_try_again'});
        default: return Object.assign(response, {status: ERROR, message: 'error_msg_error_occured_while_releasing_your_locker_try_again'});
    }
}

export const prePaymentRegistration = async (body) => {
    let getDomainAndLockerBankId = await getCurrentDomain();
    let accessToken = await getRefreshedAccessToken(); 
    let headers = {
        Authorization: `Bearer ${accessToken}`
    }
    const URL_prePaymentRegistration = `${getDomainAndLockerBankId?.domain}${API}/${PAYMENT_GATEWAY}/${INITIATE}/`;
    const response = await httpHandler(URL_prePaymentRegistration, POST, headers, body);

    switch (response.statusCode) {
        case 200: return Object.assign(response, {status: SUCCESS});
        case 400: return Object.assign(response, {status: ERROR});
        case 401: return Object.assign(response, {status: REDIRECT, message: 'error_msg_unexpected_error_while_initiating_payment_login_and_try'});
        case 403: return Object.assign(response, {status: ERROR});
        case 500: return Object.assign(response, {status: ERROR, message: 'error_msg_something_went_wrong_try_again'});
        default: return Object.assign(response, {status: ERROR, message: 'error_msg_error_occured_while_initiating_payment_try_again'});
    }
}

export const postPaymentSaveTransaction = async (body) => {
    let getDomainAndLockerBankId = await getCurrentDomain();
    let accessToken = await getRefreshedAccessToken(); 
    let headers = {
        Authorization: `Bearer ${accessToken}`
    }

    const URL_postPaymentSaveTransaction = `${getDomainAndLockerBankId?.domain}${API}/${PAYMENT_GATEWAY}/${UPDATE_PAYMENT}/`;
    const response = await httpHandler(URL_postPaymentSaveTransaction, POST, headers, body);
    switch (response.statusCode) {
        case 200: return Object.assign(response, {status: SUCCESS});
        case 500: return Object.assign(response, {status: ERROR, message: 'error_msg_something_went_wrong_try_again'});
        default: return Object.assign(response, {status: ERROR, message: 'error_msg_error_occured_while_verifying_transaction'});
    }
}

export const getCurrentDomain = () => {
    return getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK)
}

