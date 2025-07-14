export const PWA_DOMAIN_DEV = "https://pwadev.durolt.in";
export const PWA_DOMAIN_PROD = "https://luggage.durolt.com";
export const API = "api";
export const PWA = "pwa";
export const LUGGAGE = "luggage";
export const LUGGAGE_SETTINGS = "luggage-settings";
export const SEND_OTP = "send-otp";
export const VERIFY_OTP = "verify-otp";
export const AVAILABLE_SIZES = "available-sizes";
export const INITIATE_PAYMENT = "initiate-payment";
export const BOOKING_TYPE_NEW = "new";
export const BOOKING_TYPE_ADDITIONAL = "additional";
export const POST_PAYMENT = "post-payment";
export const LOCKER_BANK = "locker-bank";
export const ASSIGNED_LOCKERS = "assigned-lockers";
export const OPEN_LOCKER = "open-locker";
export const RELEASE_LOCKER = "release-locker";
export const GET = "GET";
export const POST = "POST";
export const SUCCESS = "success";
export const ERROR = "error";
export const REDIRECT = "redirect";
export const GUEST_AUTH_TOKEN = 'GUEST-AUTH-TOKEN';
export const GUEST_AUTH_TOKEN_VALUE = "#up!7O@rh#55Fp3I1CpHQ!d5xs2J2c#FRc@x^bb@ZHTzK5@v5bCivAjSjAx^3Vhs";
export const HH_mm = "HH:mm";
export const HH_mm_ss = "HH:mm:ss";
export const NO_SIZE = "NS";
export const TRUSTED_LINKING_TOKEN = "TRUSTED-LINKING-TOKEN";
export const TRUSTED_LINKING_TOKEN_VAL='kj3YSSa*x3bgj2PHrkOJxz*TMT@v!PUK98uUS(WdnF#cZhZ^v4LEou4dpSOgAx8H'
export const PENDING = 'pending';
export const ASSIGNED = 'assigned'
export const RETURN = 'return'
export const POP = 'POP';
export const PUSH = 'PUSH';
export const PAYMENT_GATEWAY = 'payment-gateway';
export const INITIATE = 'initiate';
export const COD ='cod';
export const UPDATE_PAYMENT = "update-payment";
export const DARK = 'dark';
export const LIGHT = 'light';
export const INITIATED = 'initiated';
export const MAIN_HEADER_RIGHT_ICON = 'mainHeaderRightIcon';
export const MAIN_HEADER_LEFT_ICON = 'mainHeaderLeftIcon';
export const DONE = 'done';
export const ADD_ANOTHER = 'addAnotherParcel'
export const ASSIGNMENT_SLUG = 'ASSIGNMENT-SLUG'
export const DEVICE_ID = 'Device-Id'
export const DEVICE_TYPE = 'Device-Type'
export const EXPIRY_DATE_MASK = '99/99'
export const CARD_NUMBER_MASK = '9999 9999 9999 9999'
export const CLOSED = 'closed';
export const ECONNABORTED = 'ECONNABORTED';
export const DOOR_NOT_CLOSED = 'Door is not closed';
export const API_TIMEOUT_FOR_CLOSE_DOOR_API = 57000
export const LB_NOT_RESPOND = 'Locker Bank is Not Responding';
export const LB_OFFLINE = 'Locker Bank Is Offline';
export const MAX_RETRIES_FOR_CLOSE_ACTIVITY = 2;

// Customers
export const HIVEBOARD = 'HiveBoard';
export const DUROLT = 'Durolt';
export const BLUEDART = 'BlueDart';
export const GOLDGYM = 'GoldGym';

//Events
export const BACKSPACE = 'Backspace';
export const ENTER = 'Enter';

// OTPless authentication
export const OTPLESS_AUTHENTICATION_SOURCE = "https://otpless.com/auth.js";
export const OTPLESS_DUROLT_CID = "VCA1GURCQ7JRRAGY70FRFX9ZBXUJHDFV";

export const EASEBUZZ_PAYMENT_GATEWAY_ENV = "prod";
export const EASEBUZZ_PAYMENT_GATEWAY_SOURCE = "https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js";
export const EASEBUZZ_DUROLT_MERCHANT_KEY = "ZJSW49MVY3";

export const RAZORPAY_PAYMENT_GATEWAY_SOURCE = 'https://checkout.razorpay.com/v1/checkout.js';

//Toast Message Types
export const TOAST_INFO = "INFO";
export const TOAST_WARN = "WARN";
export const TOAST_SUCCESS = "SUCCESS";
export const TOAST_ERROR = "ERROR";
export const BUTTON_SECONDARY = "secondary";
export const BUTTON_PRIMARY = "primary";
export const BUTTON_WARNING = 'warning'


// Regular expressions
export const REGEXP_EMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
export const REGEXP_MOBILE = /^(\+91[\s]?)[6789]\d{9}$/; //currently validating only indian numbers.
export const REGEXP_OTP = /[0-9]{4}/i;
export const ALPHANUM_REGEX = /^[a-zA-Z0-9]+$/
export const REGEXP_DOMAIN = /^{.*(?="domain"\s*:\s*"(https:\/\/|http:\/\/)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/").*}$/
export const REGEXP_LB_ID = /^{.*(?="lockerBankId"\s*:\s*"\d+").*}$/

// User actions
// export const OPEN_LOCKER = "openLocker";
export const BOOK_NEW_LOCKER = "bookNewLocker";

//API Constants 
export const API_TIMEOUT = 10000 // 10 seconds

export const validPathsForSubHeader = [
    '/about-screen',
    '/support-screen',
    '/change-pin',
    '/forget-pin',
    '/team-locker',
    '/personal-locker',
    '/terms-and-conditions',
    '/organisation-list',
    '/select-locker-bank',
    '/select-zone',
    '/new-reserve-locker',
    '/select-user',
    '/profile-update',
    '/connect-mobile',
    '/parcel-details',
    '/assignments',
    '/drop-parcel',
    '/connect-mobile',
    // '/verify-otp',
    '/locker-list',
    '/locker-layout',
    '/select-locker-size',
    '/locker-more-options',
    '/assign-locker',
    '/open-locker',
    '/open-parcel',
    '/payment-details',
    '/payment-completion',
    '/locker-size',
    '/select-unit',
    '/swipe-to-open',
    '/locker-opened',
    '/my-lockers',
    '/sublocation-one',
    '/sublocation-two',
    '/sublocation-three',
    '/account-details',
    '/my-rented-products',
    '/faq',
    '/contact-us',
    '/privacy-policy'
];

export const validPathsForBackHeader = [
   '/equipment-details',
   '/verification-successful',
   '/payment-successful',
   '/unit-opened',
   '/capture-product-image'
];

export const excludePathsForFooter = [
]


export const validPathsforAlertBackParcelPages = [
    // '/about-screen',
]

export const validPathsforHideBackButtonFromHeader = [
    '/assignments',
]

export const validPathsForMainHeader = [
    '/home-screen',
    '/equipment-grid'
]

//Some compare constants for the project
const constants = {
    DROP : 'drop',
    PICKUP : 'pickup',
}

const headerConstants = {
    DROP_PARCEL : 'Drop Parcel',
    PICKUP_PARCEL : 'Pickup Parcel',
}

export const OTP_EXPIRATION_TIME = 120; // In seconds

export const validPathsForPreventBack = [
    '/home-screen',
    '/equipment-grid',
]

export const pathsBeforeLoginForPrivateRoutes = [
    '/login-page',
    '/verify-otp'
]

export const RAZORPAY_LANGUAGE_MAP = {
    en: "en",     // English
    hi: "hi",     // Hindi
    mr: "mar",    // Marathi
    kn: "kan",    // Kannada
    ta: "tam",    // Tamil
    te: "tel",    // Telugu
    bn: "ben"     // Bengali
};

export { constants,headerConstants }

// Use cases
export const ASSET_RENTAL_USE_CASE = 'asset_rental';
export const DYNAMIC_USE_CASE = 'dynamic';
export const LUGGAGE_USE_CASE = 'luggage';
export const PARCEL_USE_CASE = 'parcel';

// Page Flows based on use case
// Asset rental: Hiveboard
export const ASSET_RENTAL_PAGE_FLOW = [
    {
        "name": "qrCodeLanding",
        "path": "/locker-bank/:domainAndLockerBankInfoInBase64",
        "exitPages": [
            {
                "key": "accessLockerBank",
                "name": "accessLockerBank",
                "path": "/"
            },
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            }
        ]
    },
    {
        "name": "accessLockerBank",
        "path": "/",
        "exitPages": [
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            },
            {
                "key": "home",
                "name": "equipmentGrid",
                "path": "/equipment-grid"
            }
        ]
    },
    {
        "name": "assignmentSelection",
        "path": "/assignments",
        "exitPages": [
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            }
        ]
    },
    {
        "name": "login",
        "path": "/login-page",
        "exitPages": [
            {
                "key": "verifyOtp",
                "name": "verifyOtp",
                "path": "/verify-otp"
            },
            {
                "key": "home",
                "name": "equipmentGrid",
                "path": "/equipment-grid"
            }
        ]
    },
    {
        "name": "verifyOtp",
        "path": "/verify-otp",
        "exitPages": [
            {
                "key": "home",
                "name": "equipmentGrid",
                "path": "/equipment-grid"
            }
        ]
    },
    {
        "name": "equipmentGrid",
        "path": "/equipment-grid",
        "exitPages": [
            {
                "key": "equipmentDetails",
                "name": "equipmentDetails",
                "path": "/equipment-details"
            },
            {
                "key": "menuDrawer",
                "name": "menuDrawer",
                "path": "/custom-drawer"
            },
            {
                "key": "chatSupport",
                "name": "chatSupport",
                "path": "/chat-support"
            },
            {
                "key": "assignedLockers",
                "name": "myRentedProducts",
                "path": "/my-rented-products"
            }
        ]
    },
    {
        "name": "equipmentDetails",
        "path": "/equipment-details",
        "exitPages": [
            {
                "key": "accessLockerBank",
                "name": "accessLockerBank",
                "path": "/"
            },
            {
                "key": "home",
                "name": "equipmentGrid",
                "path": "/equipment-grid"
            }
        ]
    },
    {
        "name": "externalPaymentGateway",
        "path": null,
        "exitPages": [
            {
                "key": "successPage",
                "name": "paymentDetailsVerified",
                "path": "/verification-successful"
            },
            {
                "key": "cancelOrErrorPage",
                "name": "equipmentGrid",
                "path": "/equipment-grid"
            }
        ]
    },
    {
        "name": "paymentDetailsVerified",
        "path": "/verification-successful",
        "exitPages": [
            {
                "key": "home",
                "name": "equipmentGrid",
                "path": "/equipment-grid"
            },
            {
                "key": "equipmentDetails",
                "name": "equipmentDetails",
                "path": "/equipment-details"
            },
            {
                "key": "lockerOpened",
                "name": "unitOpened",
                "path": "/unit-opened"
            }
        ]
    },
    {
        "name": "unitOpened",
        "path": "/unit-opened",
        "exitPages": [
            {
                "key": "home",
                "name": "equipmentGrid",
                "path": "/equipment-grid"
            },
            {
                "key": "captureEquipmentImage",
                "name": "captureProductImage",
                "path": "/capture-product-image"
            },
            {
                "key": "assignedLockers",
                "name": "myRentedProducts",
                "path": "/my-rented-products"
            }
        ]
    },
    {
        "name": "myRentedProducts",
        "path": "/my-rented-products",
        "exitPages": [
            {
                "key": "home",
                "name": "equipmentGrid",
                "path": "/equipment-grid"
            },
            {
                "key": "lockerOpened",
                "name": "unitOpened",
                "path": "/unit-opened"
            }
        ]
    },
    {
        "name": "captureProductImage",
        "path": "/capture-product-image",
        "exitPages": [
            {
                "key": "accessLockerBank",
                "name": "accessLockerBank",
                "path": "/"
            },
            {
                "key": "paymentSuccessful",
                "name": "paymentSuccessful",
                "path": "/payment-successful"
            },
            {
                "key": "assignedLockers",
                "name": "myRentedProducts",
                "path": "/my-rented-products"
            }
        ]
    },
    {
        "name": "paymentSuccessful",
        "path": "/payment-successful",
        "exitPages": [
            {
                "key": "home",
                "name": "equipmentGrid",
                "path": "/equipment-grid"
            },
            {
                "key": "invoice",
                "name": "invoice",
                "path": "/invoice"
            }
        ]
    },
    {
        "name": "invoice",
        "path": "/invoice",
        "exitPages": [
            {
                "key": "home",
                "name": "equipmentGrid",
                "path": "/equipment-grid"
            }
        ]
    },
    {
        "name": "menuDrawer",
        "path": "/custom-drawer",
        "exitPages": [
            {
                "key": "assignedLockers",
                "name": "myRentedProducts",
                "path": "/my-rented-products"
            },
            {
                "key": "about",
                "name": "about",
                "path": "/about-screen"
            },
            {
                "key": "termsAndConditions",
                "name": "termsAndConditions",
                "path": "/terms-and-conditions"
            },
            {
                "key": "privacyPolicy",
                "name": "privacyPolicy",
                "path": "/privacy-policy"
            },
            {
                "key": "frequentlyAskedQuestions",
                "name": "frequentlyAskedQuestions",
                "path": "/faq"
            },
            {
                "key": "contactUs",
                "name": "contactUs",
                "path": "/contact-us"
            },
            {
                "key": "logout",
                "name": "logout",
                "path": null
            }
        ]
    }
];
  
// Dynamic: Durolt
export const DYNAMIC_PAGE_FLOW = [
    {
        "name": "qrCodeLanding",
        "path": "/locker-bank/:domainAndLockerBankInfoInBase64",
        "exitPages": [
            {
                "key": "accessLockerBank",
                "name": "accessLockerBank",
                "path": "/"
            },
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            }
        ]
    },
    {
        "name": "accessLockerBank",
        "path": "/",
        "exitPages": [
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            },
            {
                "key": "home",
                "name": "home",
                "path": "/home-screen"
            }
        ]
    },
    {
        "name": "assignmentSelection",
        "path": "/assignments",
        "exitPages": [
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            }
        ]
    },
    {
        "name": "login",
        "path": "/login-page",
        "exitPages": [
            {
                "key": "verifyOtp",
                "name": "verifyOtp",
                "path": "/verify-otp"
            },
            {
                "key": "termsAndConditions",
                "name": "FonzelTermsAndConditions",
                "path": "https://www.fonzel.com/terms-and-conditions/"
            }
        ]
    },
    {
        "name": "verifyOtp",
        "path": "/verify-otp",
        "exitPages": [
            {
                "key": "home",
                "name": "home",
                "path": "/home-screen"
            }
        ]
    },
    {
        "name": "home",
        "path": "/home-screen",
        "exitPages": [
            {
                "key": "lockerOpened",
                "name": "lockerOpened",
                "path": "/locker-opened"
            },
            {
                "key": "lockerSizeSelection",
                "name": "lockerSizeSelection",
                "path": "/locker-size"
            },
            {
                "key": "lockerUnitSelection",
                "name": "lockerUnitSelection",
                "path": "/select-unit"
            },
            {
                "key": "openLocker",
                "name": "swipeToOpenLocker",
                "path": "/swipe-to-open"
            },
            {
                "key": "menuDrawer",
                "name": "menuDrawer",
                "path": "/custom-drawer"
            }
        ]
    },
    {
        "name": "lockerSizeSelection",
        "path": "/locker-size",
        "exitPages": [
            {
                "key": "lockerUnitSelection",
                "name": "lockerUnitSelection",
                "path": "/select-unit"
            },
            {
                "key": "openLocker",
                "name": "swipeToOpenLocker",
                "path": "/swipe-to-open"
            }
        ]
    },
    {
        "name": "lockerUnitSelection",
        "path": "/select-unit",
        "exitPages": [
            {
                "key": "openLocker",
                "name": "swipeToOpenLocker",
                "path": "/swipe-to-open"
            }
        ]
    },
    {
        "name": "swipeToOpenLocker",
        "path": "/swipe-to-open",
        "exitPages": [
            {
                "key": "lockerOpened",
                "name": "lockerOpened",
                "path": "/locker-opened"
            }
        ]
    },
    {
        "name": "lockerOpened",
        "path": "/locker-opened",
        "exitPages": [
            {
                "key": "home",
                "name": "home",
                "path": "/home-screen"
            }
        ]
    },
    {
        "name": "menuDrawer",
        "path": "/custom-drawer",
        "exitPages": [
            {
                "key": "about",
                "name": "about",
                "path": "/about-screen"
            },
            {
                "key": "termsAndConditions",
                "name": "termsAndConditions",
                "path": "/terms-and-conditions"
            },
            {
                "key": "support",
                "name": "support",
                "path": "/support-screen"
            },
            {
                "key": "logout",
                "name": "accessLockerBank",
                "path": "/"
            }
        ]
    }
];

export const LUGGAGE_PAGE_FLOW = [
    {
        "name": "qrCodeLanding",
        "path": "/locker-bank/:domainAndLockerBankInfoInBase64",
        "exitPages": [
            {
                "key": "accessLockerBank",
                "name": "accessLockerBank",
                "path": "/"
            },
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            }
        ]
    },
    {
        "name": "accessLockerBank",
        "path": "/",
        "exitPages": [
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            },
            {
                "key": "home",
                "name": "home",
                "path": "/home-screen"
            }
        ]
    },
    {
        "name": "assignmentSelection",
        "path": "/assignments",
        "exitPages": [
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            }
        ]
    },
    {
        "name": "login",
        "path": "/login-page",
        "exitPages": [
            {
                "key": "verifyOtp",
                "name": "verifyOtp",
                "path": "/verify-otp"
            },
            {
                "key": "termsAndConditions",
                "name": "DuroltLuggageLockerTermsAndConditions",
                "path": "https://durolt.com/terms-and-conditions-luggage-locker-usage/"
            }
        ]
    },
    {
        "name": "verifyOtp",
        "path": "/verify-otp",
        "exitPages": [
            {
                "key": "home",
                "name": "home",
                "path": "/home-screen"
            }
        ]
    },
    {
        "name": "home",
        "path": "/home-screen",
        "exitPages": [
            {
                "key": "lockerOpened",
                "name": "lockerOpened",
                "path": "/locker-opened"
            },
            {
                "key": "lockerSizeSelection",
                "name": "lockerSizeSelection",
                "path": "/locker-size"
            },
            {
                "key": "openLocker",
                "name": "swipeToOpenLocker",
                "path": "/swipe-to-open"
            },
            {
                "key": "menuDrawer",
                "name": "menuDrawer",
                "path": "/custom-drawer"
            }
        ]
    },
    {
        "name": "lockerSizeSelection",
        "path": "/locker-size",
        "exitPages": [
            {
                "key": "paymentGateway",
                "name": "paymentGateway",
                "path": "/payment-details"
            }
        ]
    },
    {
        "name": "paymentGateway",
        "path": "/payment-details",
        "exitPages": [
            {
                "key": "successPage",
                "name": "swipeToOpenLocker",
                "path": "/swipe-to-open"
            },
            {
                "key": "cancelOrErrorPage",
                "name": "home",
                "path": "/home-screen"
            }
        ]
    },
    {
        "name": "swipeToOpenLocker",
        "path": "/swipe-to-open",
        "exitPages": [
            {
                "key": "lockerOpened",
                "name": "lockerOpened",
                "path": "/locker-opened"
            }
        ]
    },
    {
        "name": "lockerOpened",
        "path": "/locker-opened",
        "exitPages": [
            {
                "key": "home",
                "name": "home",
                "path": "/home-screen"
            }
        ]
    },
    {
        "name": "menuDrawer",
        "path": "/custom-drawer",
        "exitPages": [
            {
                "key": "about",
                "name": "about",
                "path": "/about-screen"
            },
            {
                "key": "termsAndConditions",
                "name": "DuroltLuggageLockerTermsAndConditions",
                "path": "https://durolt.com/terms-and-conditions-luggage-locker-usage/"
            },
            {
                "key": "support",
                "name": "support",
                "path": "/support-screen"
            },
            {
                "key": "logout",
                "name": "accessLockerBank",
                "path": "/"
            }
        ]
    }
];
  
// Parcel: Bluedart
export const PARCEL_PAGE_FLOW = [
    {
        "name": "qrCodeLanding",
        "path": "/locker-bank/:domainAndLockerBankInfoInBase64",
        "exitPages": [
            {
                "key": "accessLockerBank",
                "name": "accessLockerBank",
                "path": "/"
            },
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            }
        ]
    },
    {
        "name": "accessLockerBank",
        "path": "/",
        "exitPages": [
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            },
            {
                "key": "home",
                "name": "home",
                "path": "/home-screen"
            }
        ]
    },
    {
        "name": "assignmentSelection",
        "path": "/assignments",
        "exitPages": [
            {
                "key": "login",
                "name": "login",
                "path": "/login-page"
            }
        ]
    },
    {
        "name": "login",
        "path": "/login-page",
        "exitPages": [
            {
                "key": "verifyOtp",
                "name": "verifyOtp",
                "path": "/verify-otp"
            },
            {
                "key": "home",
                "name": "home",
                "path": "/home-screen"
            },
            {
                "key": "connectMobile",
                "name": "connectMobile",
                "path": "/connect-mobile"
            },
            {
                "key": "termsAndConditions",
                "name": "FonzelTermsAndConditions",
                "path": "https://www.fonzel.com/terms-and-conditions/"
            }
        ]
    },
    {
        "name": "verifyOtp",
        "path": "/verify-otp",
        "exitPages": [
            {
                "key": "home",
                "name": "home",
                "path": "/home-screen"
            }
        ]
    },
    {
        "name": "home",
        "path": "/home-screen",
        "exitPages": [
            {
                "key": "lockerOpened",
                "name": "dropAndPickupParcel",
                "path": "/drop-parcel"
            },
            {
                "key": "paymentGateway",
                "name": "paymentGateway",
                "path": "/payment-details"
            },
            {
                "key": "accessLockerBank",
                "name": "accessLockerBank",
                "path": "/"
            },
            {
                "key": "menuDrawer",
                "name": "menuDrawer",
                "path": "/custom-drawer"
            },
            {
                "key": "reserveNewLocker",
                "name": "reserveNewLocker",
                "path": "/reserve-new-locker"
            }
        ]
    },
    {
        "name": "paymentGateway",
        "path": "/payment-details",
        "exitPages": [
            {
                "key": "successPage",
                "name": "dropAndPickupParcel",
                "path": "/drop-parcel"
            },
            {
                "key": "cancelOrErrorPage",
                "name": "home",
                "path": "/home-screen"
            }
        ]
    },
    {
        "name": "dropAndPickupParcel",
        "path": "/drop-parcel",
        "exitPages": [
            {
                "key": "home",
                "name": "home",
                "path": "/home-screen"
            },
            {
                "key": "reserveNewLocker",
                "name": "reserveNewLocker",
                "path": "/reserve-new-locker"
            }
        ]
    },
    {
        "name": "menuDrawer",
        "path": "/custom-drawer",
        "exitPages": [
            {
                "key": "about",
                "name": "about",
                "path": "/about-screen"
            },
            {
                "key": "termsAndConditions",
                "name": "termsAndConditions",
                "path": "/terms-and-conditions"
            },
            {
                "key": "support",
                "name": "support",
                "path": "/support-screen"
            },
            {
                "key": "logout",
                "name": "accessLockerBank",
                "path": "/"
            }
        ]
    }
];