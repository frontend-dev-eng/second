import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HTTPApi from 'i18next-http-backend';
import moment from "moment";
import {PWA_DOMAIN_DEV, PWA_DOMAIN_PROD, LOCKER_BANK, HH_mm_ss, REGEXP_EMAIL, REGEXP_DOMAIN, REGEXP_LB_ID, ASSET_RENTAL_USE_CASE, DYNAMIC_USE_CASE, LUGGAGE_USE_CASE, PARCEL_USE_CASE, ASSET_RENTAL_PAGE_FLOW, DYNAMIC_PAGE_FLOW, LUGGAGE_PAGE_FLOW, PARCEL_PAGE_FLOW, HIVEBOARD, DUROLT, BLUEDART} from "../assets/constants/Constants";
import {DEFAULT_LANGUAGE_ENGLISH} from "../assets/constants/LanguageOptions";
import ShowToast from "../components/ToastComponent";
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRY_TIME, IS_LOGGED_IN, LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, LS_TENANT_INFO, LS_LOCKER_BANK_INFO, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, OPERATION_ID, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRY_TIME, TXN_ID, USER_INFO, LS_CUSTOMER, LS_PAGE_FLOW, PAYMENT_REFERENCE_ID, PAYMENT_GATEWAY_REFERENCE } from "../assets/constants/BrowserStorageKeys";
import { getSecureItemFromSpecificStorage, removeSecureItemFromSpecificStorage, storeSecureItemInSpecifiedStorage } from "./BrowserStorageAccessMiddleware";

export const devConsoleLog = (...args) => {
    if (process.env.REACT_APP_ENV !== 'prod') {
        console.log(...args);
    }
};

export const initializeI18nAndThenAppendCustomerSpecificStylesheet = () => {
    const customerNameLowerCase = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_CUSTOMER) ? getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_CUSTOMER)?.toLowerCase() : DUROLT.toLowerCase();
    console.log(`customerNameLowerCase:`,customerNameLowerCase);
    i18n
        .use(initReactI18next)
        .use(HTTPApi)
        .init({
            lng: retrieveISOCodeOfPreviouslySelectedLanguageFromLocalStorage(),
            fallbackLng: DEFAULT_LANGUAGE_ENGLISH.value,
            // here we are using the i18next-http-backend to load the translation files
            // the loadPath is a function that takes the language and namespace as arguments and returns the path to the translation file
            // the namespace is an array, and we are interested in the first element
            backend: {
                loadPath: loadPathWithNamespace
            },
            interpolation: {
                escapeValue: false
            },
            ns: [customerNameLowerCase, 'translation'],
            defaultNS: customerNameLowerCase,
            fallbackNS: 'translation',
            returnObjects: true
        })
        .then(appendCustomerSpecificStylesheet);

        console.log('appendCustomerSpecificStylesheet:', appendCustomerSpecificStylesheet);
};


const loadPathWithNamespace = (lng, namespace) => {
    // This function constructs the path to load the translation files based on the language and namespace.
    //here namespace is an array, and we are interested in the first element.
    console.log(`namespace:`,namespace);
    let path = `/assets/locales/${lng}/translation.json`;
    const customerNameLowerCase = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_CUSTOMER)?.toLowerCase();

    // Check if the namespace matches the customer name or if it is the default namespace
    // 
    if (namespace[0] === customerNameLowerCase) {
        path = `https://pwadev.s3.ap-south-1.amazonaws.com/brand/${customerNameLowerCase}/${customerNameLowerCase}.json`;
    }
    console.log(namespace[0] === customerNameLowerCase ? `Using customer specific namespace: ${customerNameLowerCase}` : `Using default namespace: translation`);
    console.log('i18n load path: ', path);
    console.log('path: ', path);

    return path;
};

const updateI18nResourcesAndCustomerStylesheet = async (newCustomer) => {
    await updateI18nResources(newCustomer);
    appendCustomerSpecificStylesheet();
}

const updateI18nResources = async (newCustomer) => {
    const customerNameLowerCase = newCustomer.toLowerCase();

    await i18n.loadNamespaces(customerNameLowerCase);
    i18n.setDefaultNamespace(customerNameLowerCase);
    await i18n.reloadResources(i18n.language, [customerNameLowerCase]);
};

export const appendCustomerSpecificStylesheet = () => {
    const customer = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_CUSTOMER);
    devConsoleLog('customer selected: ', customer);
    const documentHead = document.head;
    const existingStylesheet = document.getElementById('customer-stylesheet');
    console.log('customer selected: ', customer);
    console.log('existingStylesheet:', existingStylesheet);
    console.log('documentHead:', documentHead); // Correct way
    console.log('documentHead.innerHTML:', documentHead.innerHTML); 


    // Remove existing stylesheet if it exists and does not match the current customer
    // This is to ensure that the stylesheet is not duplicated or mismatched
    if (existingStylesheet && ( !existingStylesheet.className.includes(customer?.toLowerCase()) )) {
        console.log(` documentHead.removeChild(existingStylesheet)`, documentHead.removeChild(existingStylesheet))
        documentHead.removeChild(existingStylesheet);
    }

    //create a new stylesheet link element and append it to the document head
    // this will ensure that the correct stylesheet is always loaded 
    const stylesheet = document.createElement('link');
    stylesheet.type = 'text/css';
    stylesheet.rel = 'stylesheet';
    stylesheet.id = 'customer-stylesheet';
    stylesheet.className = `${customer ? customer.toLowerCase() : DUROLT.toLowerCase()}-stylesheet`;
    
    stylesheet.href = i18n.t('css') !== 'css' ? i18n.t('css') : '/assets/css/durolt.css';
    // console.log('css link: ', i18n.t('css'));
    // console.log('stylesheet href: ', stylesheet.href);
    devConsoleLog('stylesheet: ', stylesheet);
    documentHead.appendChild(stylesheet);
}

export const getDomainAndLockerBankInfoFromScannedQRCode = (qrCodeData) => {
    const luggagePWALinkPattern = new RegExp(`(${PWA_DOMAIN_DEV}|${PWA_DOMAIN_PROD})/${LOCKER_BANK}/.*`);

    if (luggagePWALinkPattern.test(qrCodeData)) {
        const domainAndLockerBankInfoInBase64 = qrCodeData.split(`/${LOCKER_BANK}/`)[1];
        const domainAndLockerBankInformation = window.atob(domainAndLockerBankInfoInBase64);
        const isDomainValid = /^{.*(?="domain"\s*:\s*"[^"]{1,}").*}$/.test(domainAndLockerBankInformation);
        const isLockerBankIdValid = /^{.*(?="lockerBankId"\s*:\s*"\d+").*}$/.test(domainAndLockerBankInformation);

        if (isDomainValid && isLockerBankIdValid) {
            return JSON.parse(domainAndLockerBankInformation);
        }
    }

    return null;
}

export const checkIfAssignmentIsProperlyConfigured = async (tenantLockerBankAndAssignmentInfo, selectedAssignmentIndex = 0) => {
    const tenantInfo = tenantLockerBankAndAssignmentInfo.tenant_settings;
    const lockerBankInfo = tenantLockerBankAndAssignmentInfo.locker_bank;
    const assignment = tenantLockerBankAndAssignmentInfo.locker_assignments[selectedAssignmentIndex];
    const isAssignmentActive = assignment?.is_active;
    const isPwaEnabled = assignment?.usecase_settings?.pwa?.value;
    const isAnyUserAuthenticationMethodAvailable = isAnyAuthenticationMethodAvailable(assignment?.usecase_settings);
    const isGeoFencingEnabled = assignment?.is_geofencing;
    const areBothLockerBankCoordinatesAvailable = (parseInt(lockerBankInfo?.latitude) % 1 === 0) && (parseInt(lockerBankInfo?.longitude) % 1 === 0);
    // const isPwaRuleEngineAvailable = (assignment?.pwa_rule_engines.length > 0) && (assignment?.pwa_rule_engines[0]?.flow.length > 0);

    if ( !isAssignmentActive ) {
        return { isConfigured: false, errorMessage: 'inactiveAssignment' };
    }
    if ( !isPwaEnabled ) {
        return { isConfigured: false, errorMessage: 'pwaAppDisabled' };
    }
    if ( !isAnyUserAuthenticationMethodAvailable ) {
        return { isConfigured: false, errorMessage: 'noAuthOptionsAvailable' };
    }
    if ( isGeoFencingEnabled && !areBothLockerBankCoordinatesAvailable ) {
        return { isConfigured: false, errorMessage: 'Geofencing is enabled but locker bank location information is unavailable. Please contact admin.' };
    }
    // else if ( !isPwaRuleEngineAvailable ) {
    //     return { isConfigured: false, errorMessage: 'Rule Engine not available. Please contact admin.'};
    // }

    storeTenantInfoInLocalStorge(tenantInfo);
    storeLockerBankInfoInLocalStorge(lockerBankInfo);
    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, assignment);
    // storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_PAGE_FLOW, assignment?.pwa_rule_engines[0]?.flow);
    await storeCustomerInLocalStorageAndUpdateResourcesForCurrentUseCase(assignment?.usecase);

    return true;
}

export const storeTenantInfoInLocalStorge = (tenantInfo) => {
    const tenantInformation = {
        name: tenantInfo.name
    };

    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_TENANT_INFO, tenantInformation);
};

export const storeLockerBankInfoInLocalStorge = (lockerBankInfo) => {
    const lockerBankInformation = {
        name: lockerBankInfo.name,
        id: lockerBankInfo.id,
        latitude: lockerBankInfo.latitude,
        longitude: lockerBankInfo.longitude,
        timezone: lockerBankInfo.timezone
    };

    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_LOCKER_BANK_INFO, lockerBankInformation);
};

export const storeCustomerInLocalStorageAndUpdateResourcesForCurrentUseCase = async (usecase) => {
    if (usecase === ASSET_RENTAL_USE_CASE) {
        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_PAGE_FLOW, ASSET_RENTAL_PAGE_FLOW);
        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_CUSTOMER, HIVEBOARD);
        await updateI18nResourcesAndCustomerStylesheet(HIVEBOARD);
    }
    else if (usecase === LUGGAGE_USE_CASE) {
        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_PAGE_FLOW, LUGGAGE_PAGE_FLOW);
        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_CUSTOMER, DUROLT);
        await updateI18nResourcesAndCustomerStylesheet(DUROLT);
    }
    else if (usecase === PARCEL_USE_CASE) {
        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_PAGE_FLOW, PARCEL_PAGE_FLOW);
        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_CUSTOMER, BLUEDART);
        await updateI18nResourcesAndCustomerStylesheet(BLUEDART);
    }
    else {
        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_PAGE_FLOW, DYNAMIC_PAGE_FLOW);
        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_CUSTOMER, DUROLT);
        await updateI18nResourcesAndCustomerStylesheet(DUROLT);
    }

    return;
}

export const getPageNameUsingPath = (path) => getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_PAGE_FLOW)?.find((page) => path === page.path)?.name;

export const getPathForNextPage = (currentPageName, nextPageName) => {
    const pageFlow = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_PAGE_FLOW);
    console.log(`pageFlow is:`,pageFlow);

    // First find method returns the current page object
    // Second find method uses the exit pages of current page and returns the path for next page
    return pageFlow.find((page) => currentPageName === page.name)?.exitPages.find((exitPage) => nextPageName === exitPage.key)?.path;
}

export const retrieveDetailsOfPreviouslySelectedLanguageFromLocalStorage = () => {
    let previouslySelectedLanguage = DEFAULT_LANGUAGE_ENGLISH;

    if (localStorage.getItem("selectedLanguage")) {
        previouslySelectedLanguage = JSON.parse(localStorage.getItem("selectedLanguage"));
    }

    return previouslySelectedLanguage;
}


export const retrieveISOCodeOfPreviouslySelectedLanguageFromLocalStorage = () => {
    let previouslySelectedLanguage = DEFAULT_LANGUAGE_ENGLISH;
    
    if (localStorage.getItem("selectedLanguage")) {
        previouslySelectedLanguage = JSON.parse(localStorage.getItem("selectedLanguage"));
    }
    console.log(`previouslySelectedLanguage value:`, previouslySelectedLanguage.value);

    return previouslySelectedLanguage.value;
}

export const convertMillisecondsToSpecifiedTimeFormat = (milliseconds, timeFormat) => {
    const duration = moment.duration(milliseconds);
    const hours = Math.floor(duration.asHours());
    const minutes = moment.utc(milliseconds).format("mm");

    if (timeFormat === HH_mm_ss) {
        const seconds = moment.utc(milliseconds).format("ss");
        return `${hours}:${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}`;
}

export const convertDurationStringToMilliseconds = (durationString) => {
    // input formats
    // with days: 1 day, 2 hours, 5 minutes, 15 seconds: "1 02:05:15"
    // without days: 23 hours, 59 minutes, 59 seconds: "23:59:59"
    
    let days = 0;
    let timePart = "";

    if (/\d\s\d{2}:\d{2}:\d{2}/.test(durationString)) {
        [days, timePart] = durationString.split(' ');
    }
    else {
        timePart = durationString;
    }

    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    const totalSeconds = (parseInt(days, 10) * 24 * 3600) + (hours * 3600) + (minutes * 60) + seconds;

    return totalSeconds * 1000;
};

export const getFormatTime=(date)=>{
    let Sort= date.toString().replace(/T/, ' ').replace(/\..+/, '').split(" ")   
   var time =Sort[1].toString()
  
      function tConvert (time) {
       // Check correct time format and split into components
          time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
       if (time.length > 1) { 
         time = time.slice (1);
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; 
         time[0] = +time[0] % 12 || 12; 
           time.splice(3, 1," "); 
       }
         return time.join (''); 
      }
       return tConvert(time)
  } 

  export const getFormatDate=(date)=>{
   let Sort= date.toString().replace(/T/, ' ').replace(/\..+/, '').split(" ")   
   const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
   const d = new Date(Sort[0]);
    let month = months[d.getMonth()];
    let year= d.getFullYear();
    let date2=d.getDate()
   return date2+" "+month+" "+year
 } 


 export const isValidDomainAndLockerBankId = (domainAndLockerBankInfoInBase64) => {
    let domainAndLockerBankInformation = null;
    let isDomainValid = null;
    let isLockerBankIdValid = null;

    try {
        domainAndLockerBankInformation = window.atob(domainAndLockerBankInfoInBase64);
        isDomainValid = REGEXP_DOMAIN.test(domainAndLockerBankInformation);
        isLockerBankIdValid = REGEXP_LB_ID.test(domainAndLockerBankInformation);
        if(isDomainValid && isLockerBankIdValid){
            return true
        }
        return;
    }
    catch (error) {
        console.log('Error while scanning the QR code: ', error);
        return false
    }
 }

export const removeSpacesAndHyphens = (input) =>  {
    return input.replace(/[\s-]/g, '');
}

export const extractDomain = (url) => {
    const regex = /https:\/\/([^\/]+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export const convertSecondsToDateTimeFormat = (expiryIn) => {
    const currentTime = moment(); // Current time
    const accessExpiresAt = currentTime.clone().add(expiryIn, 'seconds');
    return accessExpiresAt;
}

export const extractPageNumber = (url) => {
    const match = url.match(/[?&]page=(\d+)/);
    return match ? parseInt(match[1], 10) : null;
};

export const clearLocalStorageForUser = (customer) => {
    if (customer === HIVEBOARD) {
        const arrayOfItemsToRemoveFromLocalStorage = [
            USER_INFO,
            ACCESS_TOKEN,
            REFRESH_TOKEN,
            ACCESS_TOKEN_EXPIRY_TIME,
            REFRESH_TOKEN_EXPIRY_TIME,
            TXN_ID,
            PAYMENT_REFERENCE_ID,
            PAYMENT_GATEWAY_REFERENCE,
            OPERATION_ID,
            IS_LOGGED_IN
        ];

        arrayOfItemsToRemoveFromLocalStorage.forEach((item) => {
            removeSecureItemFromSpecificStorage(LOCAL_STORAGE, item);
        });
    }
    else {
        localStorage.clear();
    }
}

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export const isAnyAuthenticationMethodAvailable = (settings) => {
    if (settings?.verify_with_mobile_otp_pwa?.value) {
        return true;
    }
    else if (settings?.verify_with_email_otp_pwa?.value) {
        return true;
    }
    else if (settings?.login_with_google_pwa?.value) {
        return true;
    }
    else if (settings?.login_with_facebook_pwa?.value) {
        return true;
    }
    else if (settings?.link_my_device?.value) {
        return true;
    }

    return false;
}

export const hasExtraAuthMethods = (settings) => {
    let isExtraAuthMethodsAvailable = false;

    if (settings?.verify_with_mobile_otp_pwa?.value && settings?.verify_with_email_otp_pwa?.value && settings?.link_my_device?.value) {
        isExtraAuthMethodsAvailable = true;
    }
    return isExtraAuthMethodsAvailable;
}

export const extractBase64FromUrl = (url) =>  {
    try {
        const urlObj = new URL(url);
        const pathSegments = urlObj.pathname.split('/').filter(segment => segment); // Filter out empty segments
        return pathSegments[pathSegments.length - 1];
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

export const setDomainAndLockerBankIdInLocalStorage = (domainAndLockerBankInfoObject) => {
    let domain = domainAndLockerBankInfoObject?.domain;
    const baseUrl = domain.includes('https://') || domain.includes('http://')
      ? `${domain}`
      : `https://${domain}/`;
    domainAndLockerBankInfoObject.domain = baseUrl;
    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, domainAndLockerBankInfoObject);
}

export const formatExpiryDate = (value) => {
    // Remove all non-digit characters
    const cleanedValue = value.replace(/\D/g, '');

    // Format the value as MM/YY
    if (cleanedValue.length <= 2) {
        return cleanedValue;
    } else if (cleanedValue.length <= 4) {
        return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    } else {
        return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
    }
};

export const handleStoreUserDataInLocalStorage = (userInfo) => {
    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, IS_LOGGED_IN, true);
    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, USER_INFO, userInfo);
    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, ACCESS_TOKEN, userInfo?.access);
    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, REFRESH_TOKEN, userInfo?.refresh);
    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, ACCESS_TOKEN_EXPIRY_TIME, convertSecondsToDateTimeFormat(userInfo?.access_expires_in));
    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, REFRESH_TOKEN_EXPIRY_TIME, convertSecondsToDateTimeFormat(userInfo?.refresh_expires_in));
}

export const calculateTimeDifference = (rentalTime, returnFormat = 'object') => {
    const rentalDate = moment(rentalTime);
    const currentDate = moment();
    const duration = moment.duration(currentDate.diff(rentalDate));

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.minutes());
    const seconds = Math.floor(duration.seconds());

    if (returnFormat === 'elapsed') {
        const elapsedTime = hours > 0 ? `${hours}.${minutes}.${seconds.toString().padStart(2, '0')}` : `${minutes}.${seconds.toString().padStart(2, '0')}`;
        return elapsedTime;
    }

    // Default: Return as an object
    return { hours, minutes, seconds };
};


// export const calculateTimeDifference = (hours,minutes,seconds) => {
//     const elapsedTime = `${hours > 0 ? hours : ""}${hours > 0 ? "." : ""}${minutes.toString().padStart(2, '0')}.${seconds.toString().padStart(2, '0')}`;
//     return elapsedTime;
// }

// get min and max price objects and construct price-in-words strings to show on UI
export const getMinAndMaxPriceObjects = (selectedEquipment) => {
    // Assuming pricing duration is uniform for all: hours
    let minRateObject = selectedEquipment?.pricing_info[0];
    let maxRateObject = selectedEquipment?.pricing_info[0];
    
    selectedEquipment?.pricing_info.forEach((pricingObject) => {
        if (pricingObject.rent_price < minRateObject.rent_price) {
            minRateObject = pricingObject;
        }
        else if (pricingObject.rent_price > maxRateObject.rent_price) {
            maxRateObject = pricingObject;
        }
    });
    
    minRateObject.pricePerDurationInWords = `${minRateObject.currency} ${minRateObject.rent_price} / ${minRateObject.rent_minute} ${minRateObject.duration}`;
    maxRateObject.pricePerDurationInWords = `${maxRateObject.rent_minute} ${maxRateObject.duration} rate: ${maxRateObject.currency} ${maxRateObject.rent_price}`;
    
    return {
        min: minRateObject,
        max: maxRateObject
    };
};

export const calculateRentForProduct = (selectedEquipment) => {
    console.log("selectedEquipment",selectedEquipment)
    // Assuming pricing duration is uniform for all: hours
    let minRateObject = selectedEquipment?.pricing_info[0];
    let maxRateObject = selectedEquipment?.pricing_info[0];
    
    selectedEquipment?.pricing_info.forEach((pricingObject) => {
        if (pricingObject.rent_price < minRateObject.rent_price) {
            minRateObject = pricingObject;
        }
        else if (pricingObject.rent_price > maxRateObject.rent_price) {
            maxRateObject = pricingObject;
        }
    });
    
    minRateObject.pricePerDurationInWords = `${minRateObject.currency} ${minRateObject.rent_price} / ${minRateObject.rent_minute} ${minRateObject.duration}`;
    maxRateObject.pricePerDurationInWords = `${maxRateObject.rent_minute} ${maxRateObject.duration} rate: ${maxRateObject.currency} ${maxRateObject.rent_price}`;
    
    return {
        min: minRateObject,
        max: maxRateObject
    };
};

export const formatTimeInLeadingDigits = (value) => {
        return String(value).padStart(2, '0'); // Pads single digits with a leading zero
}

export const scrollSmoothlyToPageTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    return;
}

export const arePaymentGatewayAndAccessKeyValid = (paymentGateway, accessKey) => {
    const isPaymentGatewayValid = /razorpay/i.test(paymentGateway);
    const isAccessKeyValid = /order_.*/.test(accessKey);

    return (isPaymentGatewayValid && isAccessKeyValid);
};

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

export const calculateDistance = (coord1, coord2) => {
    // console.log('lat1, lng1: ', typeof coord1.latitude, typeof coord1.longitude);
    // console.log('2: ', typeof coord2.latitude, typeof coord2.longitude);
    // console.log('coord1, coord2: ', coord1, coord2);
    const earthRadiusInMeters = 6371000;
    const lat1Rad = degreesToRadians(coord1.latitude);
    const lat2Rad = degreesToRadians(coord2.latitude);
    const latDiffRad = degreesToRadians(coord2.latitude - coord1.latitude);
    const lngDiffRad = degreesToRadians(coord2.longitude - coord1.longitude);

    const a =
        Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(lngDiffRad / 2) * Math.sin(lngDiffRad / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInMeters = earthRadiusInMeters * c;

    return distanceInMeters;
};

// export const isUserWithinAllowedDistanceOfALocker = (userCoordinates, lockerCoordinates, maxAllowedDistanceInMeters = 100) => {
//     if (!lockerCoordinates || !userCoordinates) {
//         return false;
//     }

//     const distanceInMeters = calculateDistance(userCoordinates, lockerCoordinates);

//     return distanceInMeters <= maxAllowedDistanceInMeters;
// };

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error('Location permission denied'));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error('Location information unavailable'));
                        break;
                    case error.TIMEOUT:
                        reject(new Error('Location request timed out'));
                        break;
                    default:
                        reject(new Error('Unknown error getting location'));
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 5000
            }
        );
    });
};

export const verifyUserProximity = async (lockerCoordinates, maxAllowedDistanceInMeters) => {
    try {
        const userLocation = await getCurrentLocation();
        console.log('user location: ', userLocation);
        console.log('locker coordinates: ', lockerCoordinates);

        const distanceInMeters = calculateDistance(userLocation, lockerCoordinates);

        const isNearby = distanceInMeters <= maxAllowedDistanceInMeters;

        return {
            isNearby,
            distance: Math.round(distanceInMeters),
            message: isNearby
                ? 'User is within allowed distance'
                : `User is ${Math.round(distanceInMeters)} meters away. Must be within ${maxAllowedDistanceInMeters} meters to open locker.`
        };
    } catch (error) {
        return {
            isNearby: false,
            distance: null,
            message: error.message || 'Failed to verify location proximity'
        };
    }
};