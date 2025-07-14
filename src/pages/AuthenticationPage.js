import {Component} from "react";
import {withTranslation} from "react-i18next";
import Select from "react-select";
import {SUCCESS, ERROR, REDIRECT, LUGGAGE, GUEST_AUTH_TOKEN, GUEST_AUTH_TOKEN_VALUE, OTPLESS_AUTHENTICATION_SOURCE, OTPLESS_DUROLT_CID, REGEXP_EMAIL, REGEXP_MOBILE, REGEXP_OTP, TOAST_ERROR, TOAST_WARN, BOOK_NEW_LOCKER, OPEN_LOCKER} from "../assets/constants/Constants";
import {LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, LS_GUEST_USER} from "../assets/constants/BrowserStorageKeys";
import {APP_WHITE_COLOR} from "../assets/constants/Colors";
import {MdChevronLeft} from "react-icons/md";
import {ROTATING_LOADING_ICON} from "../assets/constants/Icons";
import {isGuestUserAuthenticated} from "../lib/AuthUtils";
import {sendOTPToUserEmailOrMobile, verifyOTP} from "../lib/BackendUtils";
import {storeSecureItemInSpecifiedStorage, getSecureItemFromSpecificStorage} from "../lib/BrowserStorageAccessMiddleware";
import ShowToast from "../components/ToastComponent";
// import Footer from "../components/Footer";

class AuthenticationPage extends Component {
    constructor (props) {
        super (props)

        const tenantAssignmentAndLockerBankSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
        const domainAndLockerBankInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK);
        const domain = domainAndLockerBankInfo?.domain ? domainAndLockerBankInfo?.domain : null;
        const lockerBankId = domainAndLockerBankInfo?.lockerBankId ? domainAndLockerBankInfo?.lockerBankId : null;
        const userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_GUEST_USER);
        const isUserAuthenticated = isGuestUserAuthenticated(userInfo);
        if ((domain === null) || (lockerBankId === null)) {
            this.props.history.push({
                pathname: "/",
                state: {
                    message: this.props.t('error_msg_could_not_recognise_locker_bank'),
                    messageType: TOAST_ERROR
                }
            });
        }
        if (isUserAuthenticated) {
            this.props.history.push({
                pathname: (userInfo?.assignedLockersCount > 0) ? "/my-lockers" : "/locker-size"
            });
        }

        this.state = {
            isLoading: true,
            awaitingSendOTPResponse: false,
            awaitingVerifyOTPResponse: false,
            showLoginFormIfTrueAndVerifyOTPFormIfFalse: true,
            showEmailIdIfTrueOrMobileNumberIfFalse: tenantAssignmentAndLockerBankSettings?.isEmailAddressEnabledForOTPLogin,
            showResendOTPButtonWhenCountDownTimerReachesZero: false,
            domain: domain,
            lockerBankId: lockerBankId,
            tenantAssignmentAndLockerBankSettings: tenantAssignmentAndLockerBankSettings,
            userEmailId: "",
            userCountryCode: {value: "+91", label: "IN (+91)"},
            userMobileNumber: "",
            userMobileNumberWithCountryCode: "",
            userGroupId: null,
            enteredOTP: "",
            remainingTimeInSecondsToEnableResendOTPButton: 25
        }
    }

    componentDidMount = () => {
        if (this.state.tenantAssignmentAndLockerBankSettings?.isOTPlessLoginEnabled) {
            this.constructAndAppendOTPlessScriptElement();
        }
        this.getUserDetailsAfterOTPlessAuthentication();
    }

    constructAndAppendOTPlessScriptElement = () => {
        const otplessScriptElement = document.createElement("script");
        otplessScriptElement.src = OTPLESS_AUTHENTICATION_SOURCE;
        otplessScriptElement.cid = OTPLESS_DUROLT_CID;
        otplessScriptElement.id = "otpless-script";

        const otplessLoginPageElement = document.getElementById("otpless-login-page");
        otplessLoginPageElement.appendChild(otplessScriptElement);
    }

    getUserDetailsAfterOTPlessAuthentication = () => {
        window.otpless = (otplessUserDetails) => {
            alert("Auth page OTPLess alert:"+JSON.stringify(otplessUserDetails));

            if (this.state.tenantAssignmentAndLockerBankSettings?.isOTPlessLoginEnabled) {this.removeOTPlessScriptAndWidgetWhenRedirectingToAnotherPage()}

            this.props.history.push({
                pathname: "/locker-size"
            });
        }
    }

    mobileNumberInputHandler = (mobileNumber) => {
        let mobileNumberWithCountryCode = this.state.userCountryCode.value.concat(" ", mobileNumber);

        this.setState({
            userMobileNumber: mobileNumber,
            userMobileNumberWithCountryCode: mobileNumberWithCountryCode
        });
    }

    otpInputHandler = (otp) => {
        if (otp.length < 5) {
            this.setState({
                enteredOTP: otp
            });
        }
    }

    sendOTPHandler = async (enteredEmailOrMobile) => {
        if (this.validateEnteredEmailOrMobile(enteredEmailOrMobile)) {
            this.setState({
                awaitingSendOTPResponse: true
            });

            let sendOTPResponse = await this.sendOTPToEnteredEmailOrMobile(enteredEmailOrMobile);
            if (sendOTPResponse.status === SUCCESS) {
                if (sendOTPResponse.data.user_group_id) {
                    this.setState({
                        awaitingSendOTPResponse: false,
                        userGroupId: sendOTPResponse.data.user_group_id[0],
                        showLoginFormIfTrueAndVerifyOTPFormIfFalse: false,
                        showResendOTPButtonWhenCountDownTimerReachesZero: false
                    }, () => this.countDownTimer());
                }
            }
            else if (sendOTPResponse.status === ERROR) {
                this.setState({
                    awaitingSendOTPResponse: false
                }, () => {
                    ShowToast(this.props.t(sendOTPResponse.message), TOAST_ERROR);
                });
            }
            else if (sendOTPResponse.status === REDIRECT) {
                this.setState({
                    awaitingSendOTPResponse: false
                });

                if (this.state.tenantAssignmentAndLockerBankSettings?.isOTPlessLoginEnabled) {this.removeOTPlessScriptAndWidgetWhenRedirectingToAnotherPage()}

                this.props.history.push({
                    pathname: "/"
                });
            }
        }
        else {
            if (this.state.showEmailIdIfTrueOrMobileNumberIfFalse) {
                ShowToast(`${this.props.t('warning_msg_enter_valid_email')}`, TOAST_WARN);
            }
            else {
                ShowToast(`${this.props.t('warning_msg_enter_valid_mobile')}`, TOAST_WARN);
            }
        }
    }

    verifyOTPHandler = async (enteredEmailOrMobile) => {
        let isEnteredOTPValid = REGEXP_OTP.test(this.state.enteredOTP);

        if (isEnteredOTPValid) {
            this.setState({
                awaitingVerifyOTPResponse: true
            });

            let verifyOTPResponse = await this.verifyEnteredOTP(enteredEmailOrMobile);

            if (verifyOTPResponse.status === SUCCESS) {
                if (verifyOTPResponse.data.User_Details) {
                    this.setState({
                        awaitingVerifyOTPResponse: false
                    });

                    const userInfo = {
                        userId: verifyOTPResponse.data.User_Details.user_id,
                        email: verifyOTPResponse.data.User_Details.email ? verifyOTPResponse.data.User_Details.email : "",
                        phone: verifyOTPResponse.data.User_Details.phone ? verifyOTPResponse.data.User_Details.phone : "",
                        refId: verifyOTPResponse.data.User_Details.ref_id,
                        authToken: verifyOTPResponse.data.User_Details.token,
                        assignedLockersCount: verifyOTPResponse.data.User_Details.lockers_assigned ? verifyOTPResponse.data.User_Details.lockers_assigned : 0
                    };

                    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_GUEST_USER, userInfo);
                    localStorage.setItem("userAction", (parseInt(verifyOTPResponse.data.User_Details.lockers_assigned) > 0) ? OPEN_LOCKER : BOOK_NEW_LOCKER);

                    if (this.state.tenantAssignmentAndLockerBankSettings?.isOTPlessLoginEnabled) {this.removeOTPlessScriptAndWidgetWhenRedirectingToAnotherPage()}

                    this.props.history.push({
                        pathname: (parseInt(verifyOTPResponse.data.User_Details.lockers_assigned) > 0) ? "/my-lockers" : "/locker-size",
                    });
                }
            }
            else if (verifyOTPResponse.status === ERROR) {
                this.setState({
                    awaitingVerifyOTPResponse: false
                });
                ShowToast(this.props.t(verifyOTPResponse.message), TOAST_ERROR);
            }
        }
        else {
            ShowToast(`${this.props.t('warning_msg_enter_valid_otp')}`, TOAST_WARN);
        }
    }

    validateEnteredEmailOrMobile = (enteredEmailOrMobile) => {
        if (this.state.showEmailIdIfTrueOrMobileNumberIfFalse) {
            return REGEXP_EMAIL.test(enteredEmailOrMobile);
        }
        else {
            return REGEXP_MOBILE.test(enteredEmailOrMobile);
        }
    }

    countDownTimer = () => {
        let remainingTimeInSecondsToEnableResendOTPButton = this.state.remainingTimeInSecondsToEnableResendOTPButton;
        let countDownTimerInterval = setInterval(() => {
            --remainingTimeInSecondsToEnableResendOTPButton;

            if (remainingTimeInSecondsToEnableResendOTPButton === 0 || this.state.showLoginFormIfTrueAndVerifyOTPFormIfFalse) {
                clearInterval(countDownTimerInterval);
                this.setState({
                    showResendOTPButtonWhenCountDownTimerReachesZero: true,
                    remainingTimeInSecondsToEnableResendOTPButton: 25
                });
            }
            else {
                this.setState({
                    remainingTimeInSecondsToEnableResendOTPButton: remainingTimeInSecondsToEnableResendOTPButton
                });
            }
        }, 1000);
    }

    sendOTPToEnteredEmailOrMobile = async (enteredEmailOrMobile) => {
        let additionalHeaders = {[GUEST_AUTH_TOKEN]: GUEST_AUTH_TOKEN_VALUE};
        let body = {
            email_or_mobile: enteredEmailOrMobile,
            locker_bank_id: this.state.lockerBankId,
            use_case: LUGGAGE
        };

        return await sendOTPToUserEmailOrMobile(this.state.domain, additionalHeaders, body);
    }

    verifyEnteredOTP = async (enteredEmailOrMobile) => {
        let additionalHeaders = {[GUEST_AUTH_TOKEN]: GUEST_AUTH_TOKEN_VALUE};
        let body = {
            email_or_mobile: enteredEmailOrMobile,
            locker_bank_id: this.state.lockerBankId,
            otp: this.state.enteredOTP,
            user_group_id: [this.state.userGroupId],
            use_case: LUGGAGE
        };

        return await verifyOTP(this.state.domain, additionalHeaders, body);
    }

    backButtonHandler = () => {
        this.setState({
            showLoginFormIfTrueAndVerifyOTPFormIfFalse: true
        }, () => {
            if (this.state.tenantAssignmentAndLockerBankSettings?.isOTPlessLoginEnabled) {
                this.constructAndAppendOTPlessScriptElement();
            }
        });
    }

    removeOTPlessScriptAndWidgetWhenRedirectingToAnotherPage = () => {
        document.getElementById("otpless-script")?.remove();
        document.getElementById("otpless-floating-button")?.remove();
        document.getElementById("otpless-loader-style")?.remove();
    }

    linkMyPhoneHandler = () => {
        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_GUEST_USER, false);
        this.props.history.push({
            pathname: "/connect-mobile"
        });
    }

    componentWillUnmount = () => {}

    render () {
        return (
            <div className={this.state.showLoginFormIfTrueAndVerifyOTPFormIfFalse ? "authentication-page send-otp-ui" : "authentication-page verify-otp-ui"}>
                <div className="header-container">
                    <div className={this.state.showLoginFormIfTrueAndVerifyOTPFormIfFalse ? "header send-otp-ui" : "header verify-otp-ui"}>
                        {this.state.showLoginFormIfTrueAndVerifyOTPFormIfFalse ? (
                            <img className="durolt-logo" src={require("../assets/images/durolt_app_logo.png")} alt={this.props.t('durolt_logo')}/>
                        ) : (
                            <div className="back-button icon-container" onClick={() => this.backButtonHandler() }>
                                <MdChevronLeft className="icon-md-chevron-left" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="main-container">
                    {this.state.showLoginFormIfTrueAndVerifyOTPFormIfFalse ? (
                        <div className="main">
                            {this.state.tenantAssignmentAndLockerBankSettings?.isOTPLoginEnabled && (
                                <form className="send-otp-form">
                                    {(this.state.tenantAssignmentAndLockerBankSettings?.isEmailAddressEnabledForOTPLogin && this.state.tenantAssignmentAndLockerBankSettings?.isMobileNumberEnabledForOTPLogin) ? (
                                        <div className="labels-container">
                                            <label className={this.state.showEmailIdIfTrueOrMobileNumberIfFalse ? 'form-label selected-login-option' : 'form-label'} htmlFor="userEmailId" onClick={() => this.setState({showEmailIdIfTrueOrMobileNumberIfFalse: true})}>{this.props.t('email')}</label>
                                            <label className={this.state.showEmailIdIfTrueOrMobileNumberIfFalse ? 'form-label' : 'form-label selected-login-option'} htmlFor="userMobileNumber" onClick={() => this.setState({showEmailIdIfTrueOrMobileNumberIfFalse: false})}>{this.props.t('mobile')}</label>
                                        </div>
                                    ) : (
                                        <div className="label-container">
                                            {this.state.tenantAssignmentAndLockerBankSettings?.isEmailAddressEnabledForOTPLogin && (
                                                <label className="form-label" htmlFor="userEmailId">{this.props.t('email')}</label>
                                            )}
                                            {this.state.tenantAssignmentAndLockerBankSettings?.isMobileNumberEnabledForOTPLogin && (
                                                <label className="form-label" htmlFor="userMobileNumber">{this.props.t('mobile')}</label>
                                            )}
                                        </div>
                                    )}
                                    {this.state.showEmailIdIfTrueOrMobileNumberIfFalse ? (
                                        <input className="form-input" type="text" id="userEmailId" name="userEmailId" value={this.state.userEmailId} placeholder={this.props.t('enter_your_email_address')} onChange={(event) => this.setState({userEmailId: event.target.value})} />
                                    ) : (
                                        <div className="country-code-selector-and-mobile-number-input-container">
                                            <Select
                                                className="react-select country-code-selector"
                                                classNamePrefix="country-code-selector"
                                                isSearchable={true}
                                                isRtl={false}
                                                isDisabled={true}
                                                value={this.state.userCountryCode}
                                                onChange={(event) => this.setState({userCountryCode: event}) }
                                                options={[
                                                    {value: '+91', label: 'IN (+91)'},
                                                    // {value: '+1', label: 'US (+1)'},
                                                    // {value: 'Code', label: 'Country Name - 2 Digits ISO (Code)'}
                                                ]}
                                            />
                                            <input className="form-input mobile-number-input" type="tel" maxLength={10} id="userMobileNumber" name="userMobileNumber" value={this.state.userMobileNumber} placeholder={this.props.t('enter_your_mobile_number')} onChange={(event) => this.mobileNumberInputHandler(event.target.value)} />
                                        </div>
                                    )}
                                    <div className="send-otp-button" onClick={() => this.sendOTPHandler(this.state.showEmailIdIfTrueOrMobileNumberIfFalse ? this.state.userEmailId : this.state.userMobileNumberWithCountryCode)}>{this.state.awaitingSendOTPResponse ? ROTATING_LOADING_ICON(APP_WHITE_COLOR) : `${this.props.t('button_send_otp')}`}</div>
                                    {(this.state.showEmailIdIfTrueOrMobileNumberIfFalse === false) && (
                                        <div className="info-text" style={{marginTop: "2em", marginBottom: "2em", fontSize: "0.8em", color: "gray", textAlign: "center"}}>{this.props.t('mobile_login_available_only_for_indian_numbers')}</div>
                                    )}
                                </form>
                            )}
                            {/* {this.state.tenantAssignmentAndLockerBankSettings?.isOTPLoginEnabled && this.state.tenantAssignmentAndLockerBankSettings?.isOTPlessLoginEnabled && ( */}
                                <div className="otp-and-otpless-login-divider">
                                    <div className="divider-line"></div>
                                    <div className="or-text">{this.props.t('or')}</div>
                                    <div className="divider-line"></div>
                                </div>
                            {/* )} */}
                            {this.state.tenantAssignmentAndLockerBankSettings?.isOTPlessLoginEnabled && (
                                <div className="otpless-login-page-container">
                                    <div id="otpless-login-page"></div>
                                </div>
                            )}
                            <div className="link-my-phone-button" onClick={() => this.linkMyPhoneHandler()}>{this.props.t('link_my_phone')}</div>
                        </div>
                    ) : (
                        <div className="main">
                            <form className="verify-otp-form">
                                <label className="form-label">{this.props.t('enter_otp_sent_to_user_email_or_mobile', {userEmailOrMobile: this.state.showEmailIdIfTrueOrMobileNumberIfFalse ? this.state.userEmailId : this.state.userMobileNumberWithCountryCode})}</label>
                                <input className="form-input" type="number" name="enteredOTP" value={this.state.enteredOTP} placeholder={this.props.t('enter_otp')} onChange={(event) => this.otpInputHandler(event.target.value)} />
                                {this.state.showResendOTPButtonWhenCountDownTimerReachesZero ? (
                                    <div className="resend-otp-button" onClick={() => this.sendOTPHandler(this.state.showEmailIdIfTrueOrMobileNumberIfFalse ? this.state.userEmailId : this.state.userMobileNumberWithCountryCode)}>{this.props.t('button_resend_otp')}</div>
                                ) : (
                                    <div className="countdown-timer">{this.props.t('waiting_for_time_in_seconds', {timeInSeconds: this.state.remainingTimeInSecondsToEnableResendOTPButton})}</div>
                                )}
                                <div className="verify-otp-button" onClick={() => this.verifyOTPHandler(this.state.showEmailIdIfTrueOrMobileNumberIfFalse ? this.state.userEmailId : this.state.userMobileNumberWithCountryCode)}>{this.state.awaitingVerifyOTPResponse ? ROTATING_LOADING_ICON(APP_WHITE_COLOR) : `${this.props.t('button_verify_otp')}`}</div>
                            </form>
                        </div>
                    )}
                </div>
                {/* <Footer /> */}
            </div>
        );
    }
}

export default withTranslation()(AuthenticationPage);