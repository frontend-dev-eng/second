import CryptoJS from "crypto-js";
import {LOCAL_STORAGE, SESSION_STORAGE} from "../assets/constants/BrowserStorageKeys"

const secretText = "durolt-luggage-pwa";
const secretKeyGenerator = (secretText) => {
    return window.btoa(secretText);
}

export const storeSecureItemInSpecifiedStorage = (browserStorageType, key, value) => {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), secretKeyGenerator(secretText)).toString();
    const encryptedAndEncodedValue = window.btoa(encryptedValue);

    if (browserStorageType === LOCAL_STORAGE) {
        localStorage.setItem(key, encryptedAndEncodedValue);
    }
    else if (browserStorageType === SESSION_STORAGE) {
        sessionStorage.setItem(key, encryptedAndEncodedValue);
    }
}

export const getSecureItemFromSpecificStorage = (browserStorageType, key) => {
    console.log(`getSecureItemFromSpecificStorage function called`)
    console.log(`browserStorageType: ${browserStorageType}, key: ${key}`)

    let encryptedAndEncodedValue = null;

    if (browserStorageType === LOCAL_STORAGE) {
        
        encryptedAndEncodedValue = localStorage.getItem(key);
    }
    else if (browserStorageType === SESSION_STORAGE) {
        encryptedAndEncodedValue = sessionStorage.getItem(key);
    }
    console.log(`encryptedAndEncodedValue: ${encryptedAndEncodedValue}`)

    const encrytpedValue = window.atob(encryptedAndEncodedValue);
    const value = CryptoJS.AES.decrypt(encrytpedValue, secretKeyGenerator(secretText)).toString(CryptoJS.enc.Utf8);
    //console.log(`value after decrpyt which we are returing as JSON.parse in getSecureItemFromSpecificStorage:`,JSON.parse(value));

    return encryptedAndEncodedValue ? JSON.parse(value) : null;
}

export const removeSecureItemFromSpecificStorage = (browserStorageType, key) => {
    if (browserStorageType === LOCAL_STORAGE) {
        localStorage.removeItem(key);
    }
    else if (browserStorageType === SESSION_STORAGE) {
        sessionStorage.removeItem(key);
    }
}

