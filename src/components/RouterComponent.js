import {Suspense, useEffect, useState} from "react";
import {withRouter, Switch, Route} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import AuthenticationPage from "../pages/AuthenticationPage";
import MyLockersPage from "../pages/MyLockersPage";
import LockerSizePage from "../pages/LockerSizePage";
import PaymentDetailsPage from "../pages/PaymentDetailsPage";
import PaymentCompletionPage from "../pages/PaymentCompletionPage";
import LockerOpenedPage from "../pages/LockerOpenedPage";
import LockerReleasedPage from "../pages/LockerReleasedPage";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage";
import HelpPage from "../pages/HelpPage";
import ErrorPage from "../pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import AboutScreenPage from "../pages/AboutScreenPage";
import OrganisationListPage from "../pages/OrganisationListPage";
import SupportScreenPage from "../pages/SupportScreenPage";
import ChangePinPage from "../pages/ChangePinPage";
import ForgetPinPage from "../pages/ForgetPinPage";
import NewReserveLockerPage from "../pages/NewReserveLockerPage";
import SelectZone from "../pages/SelectZone";
import SubLocationOnePage from "../pages/SubLocationOnePage";
import SubLocationTwoPage from "../pages/SubLocationTwoPage";
import SelectLockerBankPage from "../pages/SelectLockerBankPage";
import SubLocationThreePage from "../pages/SubLocationThreePage";
import CustomDrawer from "./CustomDrawer";
import TeamLockerPage from "../pages/TeamLockerPage";
import PersonalLockerPage from "../pages/PersonalLockerPage";
import ProfileUpdatePage from "../pages/ProfileUpdatePage";
import SubHeader from "./SubHeader";
import { validPathsForSubHeader, validPathsforAlertBackParcelPages, validPathsforHideBackButtonFromHeader, validPathsForMainHeader, excludePathsForFooter, BUTTON_WARNING, BUTTON_PRIMARY, validPathsForPreventBack, TOAST_SUCCESS, validPathsForBackHeader, DARK, HIVEBOARD} from "../assets/constants/Constants";
import {ACCESS_LOCKER_BANK, HOME, LOGIN, LANDING} from '../assets/constants/PageList';
import MainHeader from "./MainHeader";
import SelectParcelUserScreenPage from "../pages/SelectParcelUserScreenPage";
import ConnectMobilePage from "../pages/ConnectMobilePage";
import ParcelDetailsScreenPage from "../pages/ParcelDetailsScreenPage";
import UseCaseListScreenPage from "../pages/UseCaseListScreenPage";
import DropParcelScreenPage from "../pages/DropParcelScreenPage";
import Notifications from "../pages/Notifications";
import LoginScreen from "../pages/LoginScreen";
import VerifyOTPPage from "../pages/VerifyOTPPage";
import LockerListPage from "../pages/LockerListPage";
import LockerLayoutPage from "../pages/LockerLayoutPage";
import SelectLockerSizePage from "../pages/SelectLockerSizePage";
import MyLockeListPage from "../pages/MyLockeListPage";
import LockersMoreOptions from "../pages/LockersMoreOptions";
import ReleaseLockerPage from "../pages/ReleaseLockerPage";
import AssignLockerScreen from "../pages/AssignLockerPage";
import OpenLockerPage from "../pages/OpenLockerPage";
import HomeScreenPage from "../pages/HomeScreenPage";
import OpenParcelPage from "../pages/OpenParcelPage";
import EquipmentGridPage from '../pages/EquipmentGridPage';
import EquipmentDetailsPage from '../pages/EquipmentDetailsPage';
import VerificationSuccessfulPage from '../pages/VerificationSuccessfulPage';
import PaymentSuccessfulPage from '../pages/PaymentSuccessfulPage';
import InvoicePage from '../pages/InvoicePage';
import UnitOpenedPage from '../pages/UnitOpenedPage';
import { Box, useTheme } from "@mui/material";
import CustomDialog from "./CustomDialog";
import { useTranslation } from "react-i18next";
import { getPathForNextPage, clearLocalStorageForUser } from "../lib/Utils";
import ShowToast from "./ToastComponent";
import { IS_LOGGED_IN, LOCAL_STORAGE, LS_CUSTOMER } from "../assets/constants/BrowserStorageKeys";
import { getSecureItemFromSpecificStorage } from "../lib/BrowserStorageAccessMiddleware";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import MyRentedProductsPage from "../pages/MyRentedProductsPage";
import TakeProductPhotoPage from "../pages/TakeProductPhotoPage";
import AccountDetailsPage from "../pages/DrawerMenu/AccountDetailsPage";
import BackIconHeader from "./BackIconHeader";
import ChatBoatPage from "../pages/ChatBoatPage";
import FAQPage from "../pages/DrawerMenu/FAQPage";
import ContactUsPage from "../pages/DrawerMenu/ContactUsPage";
import PrivacyPolicyPage from "../pages/DrawerMenu/PrivacyPolicyPage";
import StripePayCheckout from "./StripePayCheckout";
import LockerUnitSelectionPage from '../pages/LockerUnitSelectionPage';
import SwipeToOpenPage from '../pages/SwipeToOpenPage';

const RouterComponent = withRouter ( ({location, history,theme}) => {
    const isValidPathForSubHeader = validPathsForSubHeader.includes(location.pathname);
    const isValidPathForBackHeader = validPathsForBackHeader.includes(location.pathname);
    const isValidPathForAlertBackParcelPages = validPathsforAlertBackParcelPages.includes(location.pathname);
    const isValidPathForHideBackButtonFromHeader = validPathsforHideBackButtonFromHeader.includes(location.pathname);
    const isValidPathForMainHeader = validPathsForMainHeader.includes(location.pathname);
    const isExcludedPathForFooter = excludePathsForFooter.includes(location.pathname)
    const isValidPathForPreventBack = validPathsForPreventBack.includes(location.pathname);
    const [modalVisible, setModalVisible] = useState(false);
    const isLoggedIn = getSecureItemFromSpecificStorage(LOCAL_STORAGE, IS_LOGGED_IN);
    const customer = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_CUSTOMER);
    const {t} = useTranslation();
    const colorScheme = theme.palette.mode;
    console.log(`colorSchema:${colorScheme}`);




    useEffect(() => {
        const unblock = history.block((location, action) => {
            if (action === 'POP') {
                if(isValidPathForPreventBack) {
                    // Show confirmation dialog to prevent back navigation 
                    setModalVisible(true);
                    
                    return false;
                }
            }
        });

        return () => {
            unblock();
        };
    }, [isValidPathForPreventBack]); // Commented the code due to on pop-up confirmation browser tab is not closing

    const cancelLogout = () => {
        setModalVisible(false);
    }

    const handleLogout = () => {
        setModalVisible(false);
        clearLocalStorageForUser(customer);
        ShowToast(t('success_msg_successfully_logged_out'), TOAST_SUCCESS);
        history.replace(customer === HIVEBOARD ? '/login-page' : '/'); //getPathForNextPage(HOME, LOGIN) : '/');
    }


    return (
        <Box className={`app ${colorScheme === DARK ? 'dark-app' : ""}`}>
            { isValidPathForBackHeader && <BackIconHeader title={location.pathname} alertback = {isValidPathForAlertBackParcelPages ? true : false} hide= { isValidPathForHideBackButtonFromHeader ? true : false} condition={location?.state} /> }
            { isValidPathForSubHeader && <SubHeader title={location.pathname} alertback = {isValidPathForAlertBackParcelPages ? true : false} hide= { isValidPathForHideBackButtonFromHeader ? true : false} condition={location?.state} /> }
            { isValidPathForMainHeader && <MainHeader/> }
            <Switch>
                <Route path="/locker-bank/:domainAndLockerBankInfoInBase64" render={(props) => <Suspense fallback={<></>} ><LandingPage {...props} /></Suspense> } />
               {/* // this is the main landing page for the app where the user will be redirected to the login page 
               and the user will be redirected to the home page if the user is already logged in and  */}

                <Route exact path="/" render={(props) => (
                    isLoggedIn ? 
                    (<Redirect to={getPathForNextPage(ACCESS_LOCKER_BANK, HOME)} />) 
                    : 
                    (<Suspense fallback={<></>}><HomePage {...props} /></Suspense> )) } />

                <Route path="/login" render={(props) => <Suspense fallback={<></>} ><AuthenticationPage {...props} /></Suspense> } />
                <Route path="/organisation-list" component={OrganisationListPage} />
                <ProtectedRoute path="/new-reserve-locker" component={NewReserveLockerPage} />
                <Route path="/select-zone" component={SelectZone} />
                <Route path="/sublocation-one" component={SubLocationOnePage} />
                <Route path="/sublocation-two" component={SubLocationTwoPage} />
                <Route path="/sublocation-three" component={SubLocationThreePage} />
                <Route path="/select-locker-bank" component={SelectLockerBankPage} />
                <Route path="/select-user" component={SelectParcelUserScreenPage} />
                <Route path="/parcel-details" component={ParcelDetailsScreenPage} />
                <Route path="/assignments" component={UseCaseListScreenPage} />
                <ProtectedRoute path="/drop-parcel" component={DropParcelScreenPage} />
                <Route path="/my-lockers" component={MyLockersPage} />
                <ProtectedRoute path="/locker-size" component={LockerSizePage} />
                <ProtectedRoute path="/payment-details" component={PaymentDetailsPage} />
                <ProtectedRoute path="/payment-completion" component={PaymentCompletionPage} />
                <ProtectedRoute path="/locker-opened" component={LockerOpenedPage} />
                <ProtectedRoute path="/locker-released" component={LockerReleasedPage} />
                <ProtectedRoute path="/about-screen" component={AboutScreenPage} />
                <ProtectedRoute path="/support-screen" component={SupportScreenPage} />
                <Route path="/change-pin" component={ChangePinPage} />
                <Route path="/forget-pin" component={ForgetPinPage} />
                <Route path="/custom-drawer" component={CustomDrawer} />
                <Route path="/team-locker" component={TeamLockerPage} />
                <Route path="/personal-locker" component={PersonalLockerPage} />
                <Route path="/profile-update" component={ProfileUpdatePage} />
                <Route path="/connect-mobile" component={ConnectMobilePage} />
                <Route path="/notification" component={Notifications} />
                <ProtectedRoute path="/login-page" component={LoginScreen} />
                <ProtectedRoute path="/verify-otp" component={VerifyOTPPage} />
                <Route path="/locker-list" component={LockerListPage} />
                <Route path="/locker-layout" component={LockerLayoutPage} />
                <Route path="/select-locker-size" component={SelectLockerSizePage} />
                <ProtectedRoute path="/my-Locker-list" component={MyLockeListPage} />
                <Route path="/locker-more-options" component={LockersMoreOptions} />
                <Route path="/release-locker" component={ReleaseLockerPage} />
                <Route path="/assign-locker" component={AssignLockerScreen} />
                <Route path="/open-locker" component={OpenLockerPage} />
                <ProtectedRoute path="/home-screen" component={HomeScreenPage} />
                <ProtectedRoute path="/account-details" component={AccountDetailsPage} />
                <Route path="/open-parcel" component={OpenParcelPage} />
                <ProtectedRoute path="/equipment-grid" component={EquipmentGridPage} />
                <ProtectedRoute path="/equipment-details" component={EquipmentDetailsPage} />
                <ProtectedRoute path='/verification-successful' component={VerificationSuccessfulPage} />
                <ProtectedRoute path='/payment-successful' component={PaymentSuccessfulPage} />
                <ProtectedRoute path='/invoice' component={InvoicePage} />
                <ProtectedRoute path='/unit-opened' component={UnitOpenedPage} />
                <ProtectedRoute path='/my-rented-products' component={MyRentedProductsPage} />
                <ProtectedRoute path='/capture-product-image' component={TakeProductPhotoPage} />
                <ProtectedRoute path="/chat-support" component={ChatBoatPage} />
                <ProtectedRoute path="/contact-us" component={ContactUsPage} />
                <ProtectedRoute path="/privacy-policy" component={PrivacyPolicyPage} />
                <ProtectedRoute path="/faq" component={FAQPage} />
                <ProtectedRoute path="/stripe-checkout" component={StripePayCheckout} />
                <ProtectedRoute path='/select-unit' component={LockerUnitSelectionPage} />
                <ProtectedRoute path='/swipe-to-open' component={SwipeToOpenPage} />
                <Route path="/terms-and-conditions" render={(props) => <Suspense fallback={<></>} ><TermsAndConditionsPage {...props} /></Suspense> } />
                <Route path="/help" render={(props) => <Suspense fallback={<></>} ><HelpPage {...props} /></Suspense>} />
                <Route path="*" render={(props) => <Suspense fallback={<></>} ><ErrorPage {...props} /></Suspense>} />
            </Switch>
            <ToastContainer/>
            {(false && !isExcludedPathForFooter && customer === "Durolt") && <Footer/>}
            
            <CustomDialog
            dialogVisible={modalVisible} 
            onClose={cancelLogout} 
            handleCancel={cancelLogout} 
            handleAccept={handleLogout}
            dialogTitle={t('confirmText')}
            dialogContentText={t('are_you_sure_to_logout')}
            buttonOneTitle={t('button_cancel')}
            buttonTwoTitle={t('yesBtnText')}
            buttonProps={{buttonOne : {variant : "outlined",customClass : "cancel-button"},buttonTwo : {type : BUTTON_WARNING}}}
          />
        </Box>
    );
});

export default RouterComponent;