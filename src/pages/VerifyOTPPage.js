import React, { useState, useEffect, useCallback, useRef } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import ShowToast from "../components/ToastComponent";
import {
  OTP_EXPIRATION_TIME,
  REGEXP_OTP,
  SUCCESS,
  TOAST_ERROR,
  TOAST_SUCCESS,
  HIVEBOARD,
} from "../assets/constants/Constants";
import { VERIFY_OTP, HOME, LANDING } from "../assets/constants/PageList";
import { useTranslation } from "react-i18next";
import { useLocation, useHistory } from "react-router-dom";
import { GRID_ICON, CONE_ICON } from "../assets/constants/Icons";
import ButtonComponent from "../components/ButtonComponent";
import { CustomTextInput } from "../components/CustomTextInput";
import { sendOtp, verifyOtp } from "../api/api";
import {
  getSecureItemFromSpecificStorage,
  storeSecureItemInSpecifiedStorage,
} from "../lib/BrowserStorageAccessMiddleware";
import {
  LOCAL_STORAGE,
  LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS,
  LS_CUSTOMER,
  TXN_ID,
  SS_REDIRECTED_FROM_LOGIN,
} from "../assets/constants/BrowserStorageKeys";
import {
  formatTime,
  handleStoreUserDataInLocalStorage,
  getPathForNextPage,
} from "../lib/Utils";
import HeaderComponent from "../components/HeaderComponent";
import { CustomBoxInput } from "../components/CustomBoxInput";


const VerifyOTPPage = () => {
  const [otp, setOTP] = useState("");
  const [resend, setResend] = useState(false);
  //const [timerOn, setTimerOn] = useState(true);
  const [timerOn, setTimerOn] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResetLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
 const [inputValue, setInputValue] = useState(Array(4).fill(''))
const inputRefs = useRef([]);
const totalInputButton = inputValue.length;
//console.log(totalInputButton);
const OTP_EXPIRATION_KEY = 'otp_expiration_time';

  const assignemntSettings = getSecureItemFromSpecificStorage(
    LOCAL_STORAGE,
    LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS
  );
  const { userInput, toggle } = location?.state;

  
 // Format the time in mm:ss
  const formatTime = (secs) => {
    const mins = String(Math.floor(secs / 60)).padStart(2, "0");
    const sec = String(secs % 60).padStart(2, "0");
    return `${mins}:${sec}`;
  };

  // Start the timer and store expiry time
  const startTimer = () => {
    const expiryTime = Date.now() + OTP_EXPIRATION_TIME * 1000;
    console.log(`expiryTime:${expiryTime}`);
    localStorage.setItem(OTP_EXPIRATION_KEY, expiryTime.toString());
    setSecondsLeft(OTP_EXPIRATION_TIME);
    setResend(false);
    setTimerOn(true);
  };

  // On mount: check localStorage or start fresh based on navigation state
  useEffect(() => {
    const shouldStartTimer = location.state?.shouldStartTimer;
    const savedExpiry = localStorage.getItem(OTP_EXPIRATION_KEY);
    console.log(`shouldStartTimer in useEffect: ${shouldStartTimer}`);
    console.log(`saveExpiry in useEffect: ${savedExpiry}`);

    if (savedExpiry) {
      const timeLeft = Math.floor((+savedExpiry - Date.now()) / 1000);
      if (timeLeft > 0) {
        setSecondsLeft(timeLeft);
        setTimerOn(true);
      } else {
        setSecondsLeft(0);
        setTimerOn(false);
        setResend(true);
      }
    } else if (shouldStartTimer) {
      startTimer();
    }
  }, [location.state]);

  // Countdown logic
  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(() => {
        setSecondsLeft((secs) => {
          if (secs <= 1) {
            clearInterval(interval);
            setTimerOn(false);
            setResend(true);
            localStorage.removeItem(OTP_EXPIRATION_KEY);
            return 0;
          }
          return secs - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

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
      setErrorMessage("");
      setOTP("");
      let assignmentSlug = assignemntSettings?.slug;
      if (assignmentSlug && userInput) {
        setResetLoading(true);
        const response = await sendOtp(userInput, assignmentSlug);
        if (response.status === SUCCESS) {
          setResetLoading(false);
          setResend(false);
          setSecondsLeft(OTP_EXPIRATION_TIME);
          setTimerOn(true);
          ShowToast(t("OTPSentSuccessfully"), TOAST_SUCCESS);
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
    const codeInput = inputValue.join('');

    if (inputValue.some((val) => val === '')) {
      ShowToast(t("OTPError"), TOAST_ERROR);
      return;
    }

    if (!REGEXP_OTP.test(codeInput)) {
      ShowToast(t("wrongOtpError"), TOAST_ERROR);
      return;
    }

    handleVerifyOtp(); // now safe to proceed

  } catch (error) {
    console.error("validateInputs", error);
  }
};


  /**
   * Handles the verification of OTP.
   * @async
   * @function handleVerifyOtp
   * @returns {Promise<void>} - A promise that resolves when the OTP verification is complete.
   * @throws {Error} - If an error occurs during the OTP verification process.
   */
 const handleVerifyOtp = async () => {
  try {
    const txn_id = getSecureItemFromSpecificStorage(LOCAL_STORAGE, TXN_ID);
    console.log(`txn_id in the verifyOTP page:${txn_id}`);
    const newOtp = inputValue.join('');

    if (txn_id && newOtp !== '') {
      setLoading(true);
      console.log(`newOtp: ${newOtp}`);

      const response = await verifyOtp(txn_id, newOtp);
      console.log(`response from the verifyOtp api:${response}`);

      if (response.status === SUCCESS) {
        ShowToast(t("OTPVerifySuccess"), TOAST_SUCCESS);
        setLoading(false);

        const userInfo = response?.data;
        handleStoreUserDataInLocalStorage(userInfo);
        setInputValue(Array(4).fill('')); // Reset OTP fields

        if (
          getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_CUSTOMER) === HIVEBOARD
        ) {
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
 const handleSetOtp = (event, index) => {
  const tempVal = [...inputValue];
  const value = event.target.value;

  tempVal[index] = value;
  setInputValue(tempVal);
  

  // Auto-focus next input if current has 1 digit
  if (value.length === 1 && index < inputValue.length - 1) {
    inputRefs.current[index + 1].focus();
  }

  const isValid = tempVal.every((digit) => digit !== '');
  const codeInput = tempVal.join('');
console.log(`tempVal:${tempVal}`);
console.log(`isValid:${isValid}`);
console.log(`codeInput:${codeInput}`);

  // Basic error check
  if (!isValid) {
    setErrorMessage(t('warning_msg_fill_all_inputs'));
    setDisabled(true);
  } else if (!REGEXP_OTP.test(codeInput)) {
    setErrorMessage(t("wrongOtpError"));
    setDisabled(true);
  } else {
    setErrorMessage('');
    setDisabled(false);
  }
};




  // return (
  //     <Box className={`verify-otp-page ${t("backgroundImage") ? 'img' : ''}`} sx={{backgroundImage : t("backgroundImage") ? `url(${t("backgroundImage")})` : ""}}>
  //         <Box className='main-container'>
  //             <Box className='main'>
  //             {t("logo") !== "logo" ?
  //                 <Box className="app-logo">
  //                 <img height={80} width={93} src={t("logo")} />
  //                 </Box> :
  //                     <>
  //                 <Box className="grid">
  //                     <GRID_ICON className='grid-icon' />
  //                     <Box className="focus">
  //                         <CONE_ICON className='cone-icon'/>
  //                     </Box>
  //                 </Box>
  //                     </>}
  //                 <Typography className='verify-email-mobile-text'>
  //                     { t('verifyText', {toggle : toggle === 'phone' ? t('mobile') : t('email')}) }
  //                 </Typography>
  //                 <Typography className='enter-otp-text'>
  //                     {t('enterOtpText', {userInput : userInput}) }
  //                 </Typography>
  //                 <CustomTextInput
  //                 className={'input'}
  //                 inputId='otp-input'
  //                 placeholder={t('enter_otp')}
  //                 value={otp}
  //                 type={'tel'}
  //                 onChange={handleSetOtp}
  //                 handleKeyDown={validateInputs}
  //                 maxLength={4}
  //                 disabled={disabled}
  //                 hasError={!!errorMessage}
  //                 />
  //                 {errorMessage && <Typography className='verify-input-error'>{errorMessage}</Typography>}
  //                 {resend ? (
  //                     <ButtonComponent buttonId='resend-code-button' handleClick={resendOTP} title={ resendLoading ? <CircularProgress size={24} /> : t('button_resend_otp')} />
  //                 ) : (
  //                     <Typography className='timeTxt'>{t('waiting_for_time_in_seconds', {timeInSeconds : formatTime(secondsLeft)})}</Typography>
  //                 )}
  //                 <ButtonComponent buttonId='submit-button' handleClick={validateInputs} title={ loading ? <CircularProgress size={24} /> : t("submit_btn")} />
  //             </Box>
  //         </Box>
  //     </Box>
  // );

  
  return (
    <div
      className={`verify-otp-page ${t("backgroundImage") ? "img" : ""}`}
      style={{
        backgroundImage: t("backgroundImage")
          ? `url(${t("backgroundImage")})`
          : "",
      }}
    >
      <div className="main-container">
        <div className="main">
          {/* <HeaderComponent/> */}

          <div className="first-text-container-otp-page">
            <h2 className="second-heading">
                Enter Your OTP
            </h2>

            <p className="paragraph-text">
                A One-Time Password (OTP) 
                will be sent to your whatsapp and sms for verification.
            </p>
          </div>


          <div className="otp-input-field-verfity-container">
           <CustomBoxInput
              inputValue={inputValue}
              handleChange={handleSetOtp}
              inputRefs={inputRefs}
              error={!!errorMessage}
              handleKeyDown={validateInputs}
              disabled={disabled}
              customClass='input-box-placeholder'
              handleSubmitEvent={validateInputs}
              totalbutton = {totalInputButton}
          />
          {errorMessage && <p className="verify-input-error">{errorMessage}</p>}
             
          </div>


           <div className="button-container">
            <ButtonComponent
                // buttonId="submit-button"
                handleClick={validateInputs}
                title={loading ? <CircularProgress size={24} /> : t("submit_btn")}
                buttonId='continue-button'
                disabled={disabled}
               

              />
      </div>

       <div className="timer-container">
      <p className="timeTxt">
        <span>
          {t("waiting_for_time_in_seconds", {
            timeInSeconds: formatTime(secondsLeft),
          })}
        </span>
      </p>

      <p className="have-recive-otp-container">
        <span className="otp-text">
          Haven’t received the OTP?{" "}
          {resend && !resendLoading ? (
            <span className="resend-link" onClick={resendOTP}>
              {t("button_resend_otp")}
            </span>
          ) : resendLoading ? (
            <CircularProgress size={16} />
          ) : null}
        </span>
      </p>
    </div>


         
        </div>
      </div>
    </div>
   
  );
};

export default VerifyOTPPage;
