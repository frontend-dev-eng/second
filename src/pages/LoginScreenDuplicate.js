import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, CircularProgress, useTheme, Link, Tabs, Tab, FormControlLabel, Checkbox } from '@mui/material';
import {AddBoxOutlined, InstallMobileRounded, IosShareRounded} from '@mui/icons-material';
import ShowToast from "../components/ToastComponent";
import { LoginSocialGoogle,LoginSocialFacebook } from 'reactjs-social-login';
import { OTPLESS_AUTHENTICATION_SOURCE, OTPLESS_DUROLT_CID, REGEXP_EMAIL, SUCCESS, TOAST_ERROR, TOAST_SUCCESS, TOAST_WARN, HIVEBOARD, BUTTON_PRIMARY } from "../assets/constants/Constants";
import {LOGIN, TERMS_AND_CONDITIONS, CONNECT_MOBILE, VERIFY_OTP, HOME, LANDING} from '../assets/constants/PageList';
import { useTranslation } from 'react-i18next';
import { DuroltLogoIcon, FaceBookIcon, GoogleIcon } from "../assets/constants/Icons";
import ButtonComponent from "../components/ButtonComponent";
import { useHistory } from 'react-router-dom';
import 'react-phone-input-2/lib/material.css';
import { CustomSwitchInput } from '../components/CustomSwitchInput';
import { getSecureItemFromSpecificStorage, storeSecureItemInSpecifiedStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, LS_CUSTOMER, TXN_ID, SS_REDIRECTED_FROM_LOGIN, IS_LOGGED_IN } from '../assets/constants/BrowserStorageKeys';
import { handleStoreUserDataInLocalStorage, hasExtraAuthMethods, removeSpacesAndHyphens, getPathForNextPage } from '../lib/Utils';
import { registerFacebookLoginUser, registerGoogleLoginUser, sendOtp } from '../api/api';
import packageJson from '../../package.json';
import CircularProgressLoader from '../components/CircularProgressLoader';
import CustomDialog from '../components/CustomDialog';

const LoginScreen = () => {
    const history = useHistory();
    const isLoggedIn = getSecureItemFromSpecificStorage(LOCAL_STORAGE, IS_LOGGED_IN);

    if (isLoggedIn) {
        history.replace({
            pathname: getPathForNextPage(LOGIN, HOME)
        });
    };

    const [areTermsAndConditionsAccepted, setAreTermsAndConditionsAccepted] = useState(true);
    const [installAppPrompt, setInstallAppPrompt] = useState(null);
    const [showInstallAppModal, setShowInstallAppModal] = useState(false);
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoginLoading, setIsGoogleLoginLoading] = useState(false);
    const [isFacebooLoginkLoading, setIsFacebookLoginLoading] = useState(false);
    const [selCountryLength, setSelCountryLength] = useState(0)
    const [disabled, setDisabled] = useState(true);
    const [errorMessage,setErrorMessage] = useState('');
    const { t } = useTranslation();
    const assignmentSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE,LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
    const [isMobile, setIsMobile] = useState(assignmentSettings?.usecase_settings?.verify_with_mobile_otp_pwa?.value);
    const [type, setType] = useState(assignmentSettings?.usecase_settings?.verify_with_mobile_otp_pwa?.value ? 'Mobile' : 'Email');
    const hasSwitchedAuthMethod = assignmentSettings?.usecase_settings?.verify_with_mobile_otp_pwa?.value && assignmentSettings?.usecase_settings?.verify_with_email_otp_pwa?.value;
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const customer = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_CUSTOMER);      
    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState(null)
    const [showLoader, setShowLoader] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const isLoginWithGoogle = assignmentSettings?.usecase_settings?.login_with_google_pwa?.value; 
    const isLoginWithFacebook = assignmentSettings?.usecase_settings?.login_with_facebook_pwa?.value;
    const isEmailOtpEnabled = assignmentSettings?.usecase_settings?.verify_with_email_otp_pwa?.value;
    const isMobileOtpEnabled = assignmentSettings?.usecase_settings?.verify_with_mobile_otp_pwa?.value;
    const assignmentSlug = assignmentSettings?.slug;

    const settings = {
        isOTPlessLoginEnabled: false,
        show_otp_inputs_with_tabs : customer === "HiveBoard" ? true : false
    }

    useEffect(() => {
        const handleBeforeInstallAppPrompt = (e) => {
            e.preventDefault();
            setInstallAppPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallAppPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallAppPrompt);
        };
    }, []);

    const toggleInput = () => {
        setMobile('');
        setErrorMessage('');
        setEmail('');
        setIsMobile(!isMobile);
        setType(!isMobile ? 'Mobile' : 'Email');
    };

    const getToken = async () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'false' || isLoggedIn === null) {
            localStorage.removeItem('token');
        }
    };

    useEffect(() => {

        if (settings?.isOTPlessLoginEnabled) {
            constructAndAppendOTPlessScriptElement();
        }
        getUserDetailsAfterOTPlessAuthentication();
        getToken();
    }, []);

    const onLoginStart = useCallback(() => {
        setLoadingMessage(t('pleaseWaitText'));
        setShowLoader(true);
      }, [])

      const onLogoutSuccess = useCallback(() => {
        setProfile(null)
        setProvider('')
        alert('logout success')
      }, [])

    const constructAndAppendOTPlessScriptElement = () => {
        const otplessScriptElement = document.createElement("script");
        otplessScriptElement.src = OTPLESS_AUTHENTICATION_SOURCE;
        otplessScriptElement.cid = OTPLESS_DUROLT_CID;
        otplessScriptElement.id = "otpless-script";

        const otplessLoginPageElement = document.getElementById("otpless-login-page");
        otplessLoginPageElement.appendChild(otplessScriptElement);
    }

    const getUserDetailsAfterOTPlessAuthentication = () => {
        window.otpless = (otplessUserDetails) => {
            alert("Auth page OTPLess alert:" + JSON.stringify(otplessUserDetails));
            if (settings?.isOTPlessLoginEnabled) { removeOTPlessScriptAndWidgetWhenRedirectingToAnotherPage() }
            this.props.history.push({
                pathname: "/locker-size"
            });
        }
    }

    const removeOTPlessScriptAndWidgetWhenRedirectingToAnotherPage = () => {
        document.getElementById("otpless-script")?.remove();
        document.getElementById("otpless-floating-button")?.remove();
        document.getElementById("otpless-loader-style")?.remove();
    }

    /**
     * The `isMobileValid` function checks if a mobile number is valid based on certain conditions and
     * displays corresponding toasts if validation fails.
     */
    const validation = () => {
        if ( !areTermsAndConditionsAccepted ) {
            ShowToast('Please accept terms and conditions to proceed.', TOAST_WARN);
            return false;
        }
        
        const isMobileValid = () => {
            if (mobile.trim() === '') {
                ShowToast(t('LoginPhoneError'), TOAST_WARN);
                return false;
            }else if(selCountryLength !== mobile.length){
                ShowToast(t('OTPSentPhoneFailed'), TOAST_ERROR);
                return false
            }
            return true;
        };

        /**
         * The function `isEmailValid` checks if an email is valid and displays a toast message
         * accordingly.
         * @returns The function `isEmailValid` will return a boolean value - `true` if the email is valid
         * based on the conditions specified in the function, and `false` if the email is not valid.
         */
        const isEmailValid = () => {
            if (email.trim() === '') {
                ShowToast(t('LoginEmailError'), TOAST_WARN);
                return false;
            } else if (!REGEXP_EMAIL.test(email.trim())) {
                ShowToast(t('OTPSentEmailFailed'), TOAST_ERROR);
                return false;
            }
            return true;
        };

        if (type === 'Mobile') {
            if (isMobileValid()) {
                let mobileNumber = removeSpacesAndHyphens(mobile);
                sendOTPRequest(mobileNumber, 'phone');
            }
        } else if (isEmailValid()) {
            sendOTPRequest(email, 'email');
        }
    };

    /**
     * The function `sendOTPRequest` is an asynchronous function that sends an OTP request based on
     * user input, handles the response, and displays appropriate messages.
     * @param toggle - The `toggle` parameter in the `sendOTPRequest` function is used to determine
     * whether the OTP should be sent to a mobile number or an email address. It helps in deciding the
     * communication channel for sending the OTP.
     */
    const sendOTPRequest = async (userInput,toggle) => {
        try {
            if(assignmentSettings && userInput !== ''){
                setIsLoading(true);
                let assignmentSlug = assignmentSettings?.slug;
                const response = await sendOtp(userInput,assignmentSlug);
                if (response.status == SUCCESS) {
                    let txnId = response?.data?.txn_id;
                    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, TXN_ID, txnId);
                    setIsLoading(false);
                    ShowToast(t('OTPSentSuccessfully'), TOAST_SUCCESS);
                    if (type === 'Mobile') {
                        setMobile('');
                    } else {
                        setEmail('');
                    }
                    history.push(getPathForNextPage(LOGIN, VERIFY_OTP), { userInput: userInput, toggle: toggle })
                } else {
                    setIsLoading(false);
                    ShowToast(toggle === 'Mobile' ? t('OTPSentPhoneFailed') : t('OTPSentEmailFailed'), TOAST_ERROR);
                }
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error while sending OTP:', error);
        }
    };


    const scanQRCode = async () => {
        localStorage.setItem('Is_Guest', 'false');
        history.push(getPathForNextPage(LOGIN, CONNECT_MOBILE));
    };


    /**
     * Handles setting the mobile value and selected country length.
     * @param {string} value - The value of the input field.
     * @param {object} country - The selected country object.
     * @param {object} e - The event object.
     */
    const handleSetMobile = (value, country, e) => {
        const phoneNumber = e.target.value;

        if (phoneNumber) {
            setSelCountryLength(country.format.length);
            setMobile(phoneNumber);

            // Validate phone number (example validation: length check)
            const isValidPhoneNumber = phoneNumber.length === country.format.length;

            if (!isValidPhoneNumber) {
                setErrorMessage(t('LoginPhoneError'));
            } else {
                setErrorMessage('');
            }
            setDisabled(!isValidPhoneNumber);
        }
    };


    /**
     * Handles the change event of the email input field.
     * 
     * @param {Event} e - The event object.
     * @returns {void}
     */
    const handleSetEmail = (e) => {
        const email = e.target.value;
        setEmail(email);

        if (!REGEXP_EMAIL.test(email)) {
            setErrorMessage(t('LoginEmailError'));
        } else {
            setErrorMessage('');
        }
        setDisabled(!REGEXP_EMAIL.test(email));
    };

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
        toggleInput();
    };

    const handleRegisterGoogleUser = async (userData) => {
        try {
            const googleAccessToken = userData?.access_token;
            const email = userData?.email
            if (googleAccessToken && email) {
                const response = await registerGoogleLoginUser(googleAccessToken, assignmentSlug, email);
                if (response.status === SUCCESS) {
                    setShowLoader(false);
                    let userInfo = response?.data
                    handleStoreUserDataInLocalStorage(userInfo)
                    sessionStorage.setItem(SS_REDIRECTED_FROM_LOGIN, true);
                    history.push(getPathForNextPage(LOGIN, HOME));
                } else {
                    setShowLoader(false);
                }
            } else {
                setShowLoader(false);
            }
        } catch (error) {
            setShowLoader(false);
            console.error("Error while registering Google user:", error);
        }
    }

    const handleRegisterFacebookUser = async (userData) => {
        try {
            const faceBookAuthToken = userData?.accessToken;
            const email = userData?.email
            if (faceBookAuthToken && email) {
                const response = await registerFacebookLoginUser(faceBookAuthToken, assignmentSlug, email);
                if (response.status === SUCCESS) {
                    setShowLoader(false);
                    let userInfo = response?.data
                    handleStoreUserDataInLocalStorage(userInfo)
                    sessionStorage.setItem(SS_REDIRECTED_FROM_LOGIN, true);
                    history.push(getPathForNextPage(LOGIN, HOME));
                } else {
                    setShowLoader(false);
                }
            } else {
                setShowLoader(false);
            }
        } catch (error) {
            setShowLoader(false);
            console.error("Error while registering Google user:", error);
        }
    }

    const handleInstallAppButtonClick = async () => {
        const userAgent = navigator.userAgent;
        const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isSafariBrowser = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

        if (isAppleDevice && isSafariBrowser) {
            setShowInstallAppModal(true);
        }
        else if (installAppPrompt) {
            try {
                installAppPrompt.prompt();

                setInstallAppPrompt(null);
            } catch (error) {
                console.error('Install app prompt error: ', error);
            }
        }
        else if (window.matchMedia('(display-mode: standalone)').matches) {
            alert('The app is already installed');
        }
        else {
            alert('Installation not available');
        }
    };

    const renderInstallAppModalContent = () => {
        return (
            <Box className='modal-content'>
                <Typography className='install-text'>To install the app from iOS Safari browser:</Typography>
                <Box className='instructions-list'>
                    <Typography className='instruction'>
                        1. Tap the <b>Share button</b> <IosShareRounded className='instruction-icon' /> at the bottom bar
                    </Typography>
                    <Typography className='instruction'>
                        2. In the options visible, click <b>Add to Home Screen</b> <AddBoxOutlined className='instruction-icon' />
                    </Typography>
                    <Typography className='instruction'>
                        3. On the next dialog, click <b>Add</b>
                    </Typography>
                </Box>
            </Box>
        );
    };

    return (
        <Box className={`login-screen-page ${t("backgroundImage") ? 'img' : ''}`}
        sx={{backgroundImage : t("backgroundImage") ? `url(${t("backgroundImage")})` : ""}}
        >
            <Box className='main-container'>
                <Box className='main'>
                    <Box className="logo_style">
                        {t("logo") !== "logo" ? <img  height={80} width={93} src={t("logo")}/> :
                        <DuroltLogoIcon />}
                    </Box>
                        <Box className="formView">
                            <Typography className='text' sx={{ color: theme.palette.text.primary }}> {t('loginTitle')} </Typography>
                            <Typography className='anotherText' sx={{ color: theme.palette.text.primary }}> {t('loginText')} </Typography>
                            <Box className='input-tab-bar-container'>
                            <Tabs className='tab-bar' classes={{indicator : 'indicator-style'}}value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                               {isMobileOtpEnabled && <Tab className='tab-bar-label' label={t('phoneNumberLabel')} />}
                               {isEmailOtpEnabled && <Tab className='tab-bar-label' label={t('emailAddressLabel')} />}
                            </Tabs>
                            </Box>
                                {(assignmentSettings?.usecase_settings?.verify_with_mobile_otp_pwa?.value || assignmentSettings?.usecase_settings?.verify_with_email_otp_pwa?.value) &&
                                <>
                                <CustomSwitchInput
                                    isMobile={isMobile}
                                    mobile={mobile}
                                    email={email}
                                    handleSetMobile={handleSetMobile}
                                    toggleInput={toggleInput}
                                    handleSetEmail={handleSetEmail}
                                    validation={validation}
                                    error={!!errorMessage}
                                    hasSwitchedAuthMethod={hasSwitchedAuthMethod}
                                    disabled={disabled}
                                    enableTabs={settings?.show_otp_inputs_with_tabs}
                                />
                            {errorMessage && <Typography className="login-error-message">{errorMessage}</Typography>}
                            {(customer !== HIVEBOARD) && (
                                <FormControlLabel
                                    className='tnc'
                                    control={
                                        <Checkbox
                                            className='tnc-checkbox'
                                            defaultChecked
                                            sx={{ color: 'grey', '&.Mui-checked': {color: '#669f00'}, '& .MuiSvgIcon-root': {fontSize: 24} }}
                                            inputProps={{className: 'tnc-checkbox-input'}}
                                            onChange={() => setAreTermsAndConditionsAccepted(!areTermsAndConditionsAccepted)}
                                        />
                                    }
                                    label={
                                        <Typography className='tnc-label'>
                                            {t('concent_to_accept_terms')}
                                            <Link href={getPathForNextPage(LOGIN, TERMS_AND_CONDITIONS)} target="_blank" className='tnc-link'>
                                                {t('terms_and_conditions')}
                                            </Link>
                                        </Typography>
                                    }
                                />
                            )}
                            <Box className="login-button">
                                <ButtonComponent handleClick={validation} title={isLoading ? <CircularProgress size={24} /> : t("loginBtnText")} disabled={customer === "Durolt" && disabled} />
                            </Box>
                            </>}
                            {(hasExtraAuthMethods(assignmentSettings?.usecase_settings) || isLoginWithGoogle && isLoginWithFacebook) &&
                                <Box className='textORMainContainer'>
                                    <Box className='textORLine' />
                                    <Box className='textORContainer'>
                                        <Typography className='shareText'>{t('orText')}</Typography>
                                    </Box>
                                    <Box className='textORLine' />
                                </Box>}
                        <LoginSocialGoogle
                            client_id={process.env.REACT_APP_GG_APP_ID || ''}
                            scope="openid profile email"
                            // redirect_uri={}
                            onLoginStart={onLoginStart}
                            onResolve={({ provider, data }) => {
                                setProvider(provider);
                                setProfile(data);
                                handleRegisterGoogleUser(data)
                            }}
                            onReject={(err) => {
                                setShowLoader(false);
                                console.log("Error", err);
                            }}>
                            {isLoginWithGoogle && <ButtonComponent buttonId='login-with-google-button' handleClick={() => { }} title={isGoogleLoginLoading ? <CircularProgress size={24} /> : t("loginWithGoogleLabel")} disabled={null} customClass='blurred' startIcon={<GoogleIcon />} />}
                        </LoginSocialGoogle>
                        <LoginSocialFacebook
                            appId={process.env.REACT_APP_FB_APP_ID || ''}
                            onLoginStart={onLoginStart}
                            onResolve={({ provider, data }) => {
                                setProvider(provider)
                                setProfile(data)
                                handleRegisterFacebookUser(data)
                            }}
                            onReject={(err) => {
                                setShowLoader(false);
                                console.log(err)
                            }}
                        >
                        {isLoginWithFacebook && <ButtonComponent buttonId='login-with-facebook-button' handleClick={() => {}} title={isFacebooLoginkLoading ? <CircularProgress size={24} /> : t("loginWithFacebookLabel")} disabled={null} customClass='blurred' startIcon={<FaceBookIcon />} />}
                        </LoginSocialFacebook>
                            {assignmentSettings?.usecase_settings?.link_my_device?.value &&
                                <ButtonComponent handleClick={scanQRCode} title={t('scanBtnText')} variant='outlined' customClass="scanView" />}
                        </Box>
                    {settings?.isOTPlessLoginEnabled && (
                        <Box className="otpless-login-page-container">
                            <Box id="otpless-login-page"></Box>
                        </Box>
                    )}
                    <ButtonComponent buttonId='install-app-button' handleClick={handleInstallAppButtonClick} title={t('Install App')} startIcon={<InstallMobileRounded />} type='default' />
                    <Box className="loginPageFooterText">
                        {/* <Typography className='footerTextStyle'> {t('poweredByText')} </Typography> */}
                        {/* <Typography className='duroltTextStyle footerTextStyle'> {t('duroltText')} </Typography> */}
                        <Typography className='footerTextStyle'> {t('appVersionText')} {process.env.REACT_APP_RELEASE_VERSION}</Typography>
                    </Box>
                </Box>
                <CustomDialog
                    dialogId='install-app-instructions-modal'
                    dialogVisible={showInstallAppModal}
                    dialogTitle={t('Install App')}
                    children={renderInstallAppModalContent}
                    buttonTwoTitle={t('button_ok')}
                    buttonProps={{buttonTwo: {type: BUTTON_PRIMARY}}}
                    handleAccept={() => setShowInstallAppModal(false)}
                    onClose={() => setShowInstallAppModal(false)}
                />
            </Box>
            {showLoader && (<CircularProgressLoader message={loadingMessage} />)}
        </Box>
    );
};

export default LoginScreen;
