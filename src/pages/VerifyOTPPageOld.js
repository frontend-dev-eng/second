import React, { useState, useEffect, useCallback } from 'react';
import {Box,Typography,CircularProgress} from '@mui/material';
import ShowToast from "../components/ToastComponent";
import { OTP_EXPIRATION_TIME, REGEXP_OTP, SUCCESS, TOAST_ERROR, TOAST_SUCCESS, HIVEBOARD } from "../assets/constants/Constants";
import {VERIFY_OTP, HOME, LANDING} from '../assets/constants/PageList';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import { GRID_ICON, CONE_ICON } from '../assets/constants/Icons';
import ButtonComponent from "../components/ButtonComponent";
import { CustomTextInput } from '../components/CustomTextInput';
import { sendOtp, verifyOtp } from '../api/api';
import { getSecureItemFromSpecificStorage, storeSecureItemInSpecifiedStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, LS_CUSTOMER, TXN_ID, SS_REDIRECTED_FROM_LOGIN} from '../assets/constants/BrowserStorageKeys';
import { formatTime, handleStoreUserDataInLocalStorage, getPathForNextPage } from '../lib/Utils';

const VerifyOTPPageOld = () => {
    const [otp, setOTP] = useState('');
    const [resend, setResend] = useState(false);
    const [timerOn, setTimerOn] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(OTP_EXPIRATION_TIME);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResetLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const { t } = useTranslation();
    const location = useLocation();
    const history = useHistory();
    const assignemntSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
    const { userInput, toggle } = location?.state;

    let timer;
    const startTimer = () => {
        timer = setInterval(() => {
            setSecondsLeft((secs) => (secs > 0 ? secs - 1 : 0));
        }, 1000);
    };
    
    useEffect(() => {
        if (timerOn) startTimer();
        else clearInterval();
        return () => {
            clearInterval(timer);
        };
    }, [timerOn]);

    useEffect(() => {
        if (secondsLeft === 0) {
            clearInterval(timer);
            setTimerOn(false);
            setResend(true);
        }
    }, [secondsLeft]);


    /**
     * Resends the OTP to the user.
     * 
     * @async
     * @function resendOTP
     * @returns {Promise<void>} A promise that resolves when the OTP is successfully resent.
     * @throws {Error} If an error occurs while resending the OTP.
     */
    const resendOTP = useCallback(async () => {
        try {
            setErrorMessage('');
            setOTP('');
            let assignmentSlug = assignemntSettings?.slug;
            if (assignmentSlug && userInput) {
                setResetLoading(true);
                const response = await sendOtp(userInput, assignmentSlug)
                if (response.status === SUCCESS) {
                    setResetLoading(false);
                    setResend(false);
                    setSecondsLeft(OTP_EXPIRATION_TIME);
                    setTimerOn(true);
                    ShowToast(t('OTPSentSuccessfully'), TOAST_SUCCESS);
                    let txnId = response?.data?.txn_id;
                    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, TXN_ID, txnId);
                } else {
                    setResetLoading(false);
                }
            }
        } catch (error) {
            console.error("resendOTP", error);
            setResetLoading(false);
        }
    }, [resend]);





    /**
     * Validates the input for OTP and handles the verification process.
     * @returns {void}
     */
    const validateInputs = () => {
        try {
            if (otp.trim() === '') {
                ShowToast(t('OTPError'), TOAST_ERROR);
                return;
            } else {
                handleVerifyOtp()
            }
        } catch (error) {
            console.error('validateInputs', error);
        }
    }



    /**
     * Handles the verification of OTP.
     * @async
     * @function handleVerifyOtp
     * @returns {Promise<void>} - A promise that resolves when the OTP verification is complete.
     * @throws {Error} - If an error occurs during the OTP verification process.
     */
    const handleVerifyOtp = async () => {
        try {
            const txn_id = getSecureItemFromSpecificStorage(LOCAL_STORAGE, TXN_ID)
            if (txn_id && otp !== '') {
                setLoading(true);
                const response = await verifyOtp(txn_id, otp);
                if (response.status === SUCCESS) {
                    ShowToast(t('OTPVerifySuccess'), TOAST_SUCCESS);
                    setLoading(false);
                    let userInfo = response?.data
                    handleStoreUserDataInLocalStorage(userInfo)
                    setOTP('');
                    if (getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_CUSTOMER) === HIVEBOARD) {
                        sessionStorage.setItem(SS_REDIRECTED_FROM_LOGIN, true);
                    }
                    history.push(getPathForNextPage(VERIFY_OTP, HOME));
                } else {
                    setLoading(false);
                }
            }
        } catch (error) {
            setLoading(false);
            console.error("handleVerifyOtp", error);
        }
    };


    /**
     * Handles the input change event for OTP field.
     * 
     * @param {Event} e - The input change event object.
     * @returns {void}
     */
    const handleSetOtp = (e) => {
        const otp = e.target.value.replace(/[^\d]/g, '');
        setOTP(otp);

        if (!REGEXP_OTP.test(otp)) {
            setErrorMessage(t('wrongOtpError'));
        } else {
            setErrorMessage('');
        }
        setDisabled(!REGEXP_OTP.test(otp));
    };


    return (
        <Box className={`verify-otp-page ${t("backgroundImage") ? 'img' : ''}`} sx={{backgroundImage : t("backgroundImage") ? `url(${t("backgroundImage")})` : ""}}>
            <Box className='main-container'>
                <Box className='main'>
                {t("logo") !== "logo" ? 
                    <Box className="app-logo">
                    <img height={80} width={93} src={t("logo")} /> 
                    </Box> :
                        <>
                    <Box className="grid">
                        <GRID_ICON className='grid-icon' />
                        <Box className="focus">
                            <CONE_ICON className='cone-icon'/>
                        </Box>
                    </Box>
                        </>}
                    <Typography className='verify-email-mobile-text'>
                        { t('verifyText', {toggle : toggle === 'phone' ? t('mobile') : t('email')}) }
                    </Typography>
                    <Typography className='enter-otp-text'>
                        {t('enterOtpText', {userInput : userInput}) }
                    </Typography>
                    <CustomTextInput
                    className={'input'}
                    inputId='otp-input'
                    placeholder={t('enter_otp')}
                    value={otp}
                    type={'tel'}
                    onChange={handleSetOtp}
                    handleKeyDown={validateInputs}
                    maxLength={4}
                    disabled={disabled}
                    hasError={!!errorMessage}
                    />
                    {errorMessage && <Typography className='verify-input-error'>{errorMessage}</Typography>}
                    {resend ? (
                        <ButtonComponent buttonId='resend-code-button' handleClick={resendOTP} title={ resendLoading ? <CircularProgress size={24} /> : t('button_resend_otp')} />
                    ) : (
                        <Typography className='timeTxt'>{t('waiting_for_time_in_seconds', {timeInSeconds : formatTime(secondsLeft)})}</Typography>
                    )}
                    <ButtonComponent buttonId='submit-button' handleClick={validateInputs} title={ loading ? <CircularProgress size={24} /> : t("submit_btn")} />
                </Box>
            </Box>
        </Box>
    );
};

export default VerifyOTPPageOld;
