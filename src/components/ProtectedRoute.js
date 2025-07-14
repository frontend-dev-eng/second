import {Suspense} from "react";
import {Route, Redirect} from "react-router-dom";
import {pathsBeforeLoginForPrivateRoutes, TOAST_ERROR, TOAST_WARN} from "../assets/constants/Constants";
import {LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, USER_INFO} from "../assets/constants/BrowserStorageKeys";
import {isGuestUserAuthenticated} from "../lib/AuthUtils";
import {getSecureItemFromSpecificStorage} from "../lib/BrowserStorageAccessMiddleware";


export const ProtectedRoute = ({component: Component, ...rest}) => {
    const domainAndLockerBankId = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK);
    const areBothDomainAndLockerBankIdValid = ((domainAndLockerBankId?.domain) && (domainAndLockerBankId?.lockerBankId)) ? true : false;
    const userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, USER_INFO);
    const isUserAuthenticated = isGuestUserAuthenticated(userInfo);
    const isPathForProtectedRoute = pathsBeforeLoginForPrivateRoutes.includes(window.location.pathname);

    let message;
    let messageType;

    if (!areBothDomainAndLockerBankIdValid) {
        message = `We couldn't understand which locker bank you were trying to access. Please scan the QR code on the locker bank and try again.`;
        messageType = TOAST_ERROR;
    }
    if (areBothDomainAndLockerBankIdValid && (!isUserAuthenticated)) {
        message = `Please login to book a new locker or to access your locker.`;
        messageType = TOAST_WARN;
    }

    return (
        <Route {...rest} render={(props) => {
            if (areBothDomainAndLockerBankIdValid && (isUserAuthenticated || isPathForProtectedRoute)) {
                return <Suspense fallback={<></>} ><Component {...props} /></Suspense>
            }
            else {
                return (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {
                                message: message,
                                messageType: messageType
                            }
                        }}
                    />
                );
            }
        }}
        />
    );
};