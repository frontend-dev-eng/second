import { Component } from "react";
import moment from "moment";
import { LUGGAGE, SUCCESS, ERROR, REDIRECT, HH_mm_ss, TOAST_SUCCESS, TOAST_WARN, TOAST_ERROR, OPEN_LOCKER, BOOKING_TYPE_ADDITIONAL, BUTTON_SECONDARY } from "../assets/constants/Constants";
import { LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, LS_GUEST_USER } from "../assets/constants/BrowserStorageKeys";
import { GiLockers } from "react-icons/gi";
import { MdChevronRight } from "react-icons/md";
import { isGuestUserAuthenticated, getTenantAssignmentLockerBankConfigurationSettings } from "../lib/AuthUtils";
import { getDomainAndLockerBankInfoFromScannedQRCode, convertMillisecondsToSpecifiedTimeFormat } from "../lib/Utils";
import { getAssignedLockers, openLocker, prePaymentRegistration } from "../lib/BackendUtils";
import { storeSecureItemInSpecifiedStorage, getSecureItemFromSpecificStorage } from "../lib/BrowserStorageAccessMiddleware";
import ShowToast from "../components/ToastComponent";
import { withTranslation } from "react-i18next";
import CustomSliderComponent from "../components/CustomSliderComponent";
import { Box, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import CircularProgressLoader from "../components/CircularProgressLoader";
import ButtonComponent from "../components/ButtonComponent";
import LockIcon from '@mui/icons-material/Lock';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import TimerIcon from '@mui/icons-material/Timer';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CustomDialog from "../components/CustomDialog";
import CustomQRCodeReader from "../components/CustomQRCodeReader";

const lockers = [
    {
        locker_bank: 1,
        locker_unit: 101,
        locker_size: "small",
        booking_start_time: moment().subtract(2, 'hours').valueOf(),
        locker_bank_name: "Locker Bank 1",
        locker_bank_location: "Location 1",
        booking_end_time: moment().add(2, 'hours').valueOf(),
        booking_end_time_grace: moment().add(3, 'hours').valueOf(),
        hasGracePeriodStarted: false,
        isOverstay: false,
    },
    {
        locker_bank: 1,
        locker_unit: 102,
        locker_size: "medium",
        booking_start_time: moment().subtract(2, 'hours').valueOf(),
        locker_bank_name: "Locker Bank 1",
        locker_bank_location: "Location 1",
        booking_end_time: moment().add(2, 'hours').valueOf(),
        booking_end_time_grace: moment().add(3, 'hours').valueOf(),
        hasGracePeriodStarted: true,
        isOverstay: true
    }
]

const userInfo = {
    assignedLockersCount: 2,
}

const settings = {
    isOTPLoginEnabled: true,
    isEmailAddressEnabledForOTPLogin: true,
    isMobileNumberEnabledForOTPLogin: true,
    isOTPlessLoginEnabled: false,
    allowedLockersCount: 3,
    assignmentPricing: 1,
    lockerBankName: "durolt",
    lockerBankLocation: "Pune",
    assignmentPricing: {
        small: {
            price: 10
        },
        medium: {
            price: 20
        },
        large: {
            price: 30
        }
    }
}

class MyLockersPage extends Component {
    constructor(props) {
        super(props)

        // const tenantAssignmentAndLockerBankSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
        const domainAndLockerBankInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK);
        const domain = domainAndLockerBankInfo?.domain ? domainAndLockerBankInfo?.domain : null;
        const lockerBankId = domainAndLockerBankInfo?.lockerBankId ? domainAndLockerBankInfo?.lockerBankId : null;
        // const userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_GUEST_USER);
        const isUserAuthenticated = isGuestUserAuthenticated(userInfo);

        this.state = {
            isLoading: false,
            loadingMessage: null,
            showUserModal: false,
            showPaymentConfirmationModal: false,
            showQRCodeReader: false,
            showErrorMessageAndRetryButtonIfUnableToGetAssignedLockers: false,
            stopCountdownTimersAndClearIntervalWhenTrue: false,
            isOpeningLockerUnit: false,
            domain: domain,
            lockerBankId: lockerBankId,
            userInfo: userInfo,
            isUserAuthenticated: isUserAuthenticated,
            tenantAssignmentAndLockerBankSettings: settings,
            assignedLockersList: lockers,
            selectedLocker: null,
            overstayAmount: null
        }
    }

    componentDidMount = () => {
        if ((this.state.domain !== null) && (this.state.lockerBankId !== null) && (this.state.isUserAuthenticated)) {
            localStorage.setItem("userAction", OPEN_LOCKER);
            this.getAssignedLockersAndStartCountdownTimers();
        }
    }

    userModalHandler = () => {
        this.setState({
            showUserModal: true
        });
    }

    logoutHandler = () => {
        localStorage.removeItem(LS_GUEST_USER);
        sessionStorage.clear();

        this.setState({
            stopCountdownTimersAndClearIntervalWhenTrue: true
        }, () => {
            this.props.history.push({
                pathname: "/",
                state: {
                    message: this.props.t('success_msg_successfully_logged_out'),
                    messageType: TOAST_SUCCESS
                }
            });
        });
    }

    tryAgainButtonHandler = () => {
        this.setState({
            isLoading: true,
            showErrorMessageAndRetryButtonIfUnableToGetAssignedLockers: false,
            stopCountdownTimersAndClearIntervalWhenTrue: true
        }, () => {
            this.getAssignedLockersAndStartCountdownTimers();
        })
    }

    getAssignedLockersAndStartCountdownTimers = async () => {
        const additionalHeaders = { Authorization: `Token ${this.state.userInfo.authToken}` };
        const response = await getAssignedLockers(this.state.domain, additionalHeaders);
        if (response.status === SUCCESS) {
            this.setState({
                assignedLockersList: response.data.data.assigned_lockers.length > 0 ? response.data.data.assigned_lockers : []
            }, () => {
                let userInfo = this.state.userInfo;
                userInfo.assignedLockersCount = this.state.assignedLockersList.length;
                storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_GUEST_USER, userInfo);

                if (this.state.assignedLockersList.length > 0) {
                    this.countdownTimersForRemainingDuration();
                }

                this.setState({
                    isLoading: false
                });
            });
        }
        else if (response.status === ERROR) {
            this.setState({
                isLoading: false,
                showErrorMessageAndRetryButtonIfUnableToGetAssignedLockers: true
            }, () => {
                ShowToast(this.props.t(response.message), TOAST_WARN);
            });
        }
        else if (response.status === REDIRECT) {
            this.setState({
                isLoading: false
            }, () => {
                localStorage.removeItem(LS_GUEST_USER);
                sessionStorage.clear();
                this.props.history.push({
                    pathname: "/"
                });
                window.location.reload();
            });
        }
    }

    countdownTimersForRemainingDuration = () => {
        let assignedLockersList = this.state.assignedLockersList;
        let currentTimeInMilliseconds = moment().valueOf();

        let countdownTimerInterval = setInterval(() => {
            if (this.state.stopCountdownTimersAndClearIntervalWhenTrue) {
                clearInterval(countdownTimerInterval);
            }
            else {
                currentTimeInMilliseconds = moment().valueOf();

                assignedLockersList.forEach((locker, index) => {
                    locker.isOverstay = (currentTimeInMilliseconds < locker.booking_end_time_grace) ? false : true;
                    locker.hasGracePeriodStarted = (currentTimeInMilliseconds < locker.booking_end_time) ? false : true;

                    if (locker.isOverstay) {
                        locker.remainingTimeInMilliseconds = 0;
                        locker.overstayDurationInMilliseconds = currentTimeInMilliseconds - locker.booking_end_time;
                    }
                    else if (locker.hasGracePeriodStarted) {
                        locker.remainingTimeInMilliseconds = locker.booking_end_time_grace - currentTimeInMilliseconds;
                    }
                    else {
                        locker.remainingTimeInMilliseconds = locker.booking_end_time - currentTimeInMilliseconds;
                    }
                });

                this.setState({
                    assignedLockersList: assignedLockersList
                });
            }
        }, 1000);
    }

    openSelectedLocker = async () => {
        this.setState({
            isOpeningLockerUnit: true
        });

        const additionalHeaders = { Authorization: `token ${this.state.userInfo.authToken}` };
        const body = { locker_bank: this.state.selectedLocker.locker_bank, locker_unit: this.state.selectedLocker.locker_unit };
        const response = await openLocker(this.state.domain, additionalHeaders, body);

        if (response.status === SUCCESS) {
            const assignedLockerInfo = {
                lockerBankId: response.data.data.locker_bank,
                lockerBankName: response.data.data.bank_name,
                lockerBankLocation: response.data.data.locker_bank_location,
                lockerUnit: response.data.data.locker_unit.unit_id,
                lockerSize: response.data.data.locker_unit.size,
                bookingStartTimeInMilliseconds: response.data.data.booking_start_time,
                bookingEndTimeInMilliseconds: response.data.data.booking_end_time,
                bookingEndTimeWithGracePeriodInMilliseconds: response.data.data.booking_end_time_grace
            };

            this.setState({
                isOpeningLockerUnit: false,
                stopCountdownTimersAndClearIntervalWhenTrue: true
            }, () => {
                this.props.history.push({
                    pathname: "/locker-opened",
                    state: {
                        assignedLockerInfo: assignedLockerInfo
                    }
                });
            });
        }
        else if (response.status === ERROR) {
            this.setState({
                isOpeningLockerUnit: false
            }, () => {
                ShowToast(this.props.t(response.message), TOAST_ERROR);
                this.setState({
                    selectedLocker: null
                });
            });
        }
        else if (response.status === REDIRECT) {
            this.setState({
                isOpeningLockerUnit: false,
                stopCountdownTimersAndClearIntervalWhenTrue: true
            }, () => {
                this.props.history.push({
                    pathname: "/",
                    state: {
                        message: this.props.t(response.message),
                        messageType: TOAST_ERROR
                    }
                });
            });
        }
    }

    overstayPayButtonHandler = () => {
        let overstayDuration = Math.ceil(this.state.selectedLocker.overstayDurationInMilliseconds / 3600000);
        let priceOfSelectedLocker = this.state.tenantAssignmentAndLockerBankSettings.assignmentPricing[this.state.selectedLocker.locker_size].price;

        this.setState({
            overstayAmount: overstayDuration * parseFloat(priceOfSelectedLocker),
            showPaymentConfirmationModal: true
        });
    }

    makePrePaymentRegistration = async () => {
        this.setState({
            isLoading: true,
            loadingMessage: this.props.t('initiating_transaction_please_wait'),
            showPaymentConfirmationModal: false
        });

        const additionalHeaders = { 'Authorization': `token ${this.state.userInfo.authToken}` };
        const body = {
            ref_id: this.state.selectedLocker.ref_id,
            use_case: LUGGAGE,
            booking_type: BOOKING_TYPE_ADDITIONAL,
            locker_bank_id: this.state.selectedLocker.locker_bank,
            locker_size: this.state.selectedLocker.locker_size,
            locker_selection_mode: "any_available",
            locker_unit: this.state.selectedLocker.locker_unit,
            booking_duration_in_hours: Math.ceil(this.state.selectedLocker.overstayDurationInMilliseconds / 3600000),
            locker_price: this.state.overstayAmount
        };
        const response = await prePaymentRegistration(this.state.domain, additionalHeaders, body);

        if (response.status === SUCCESS) {
            if (response.data?.data?.payment_initiated_key?.status === 1) {
                let userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_GUEST_USER);
                userInfo.refId = response.data?.data?.next_ref_id;
                storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_GUEST_USER, userInfo);

                this.props.history.push({
                    pathname: "/payment-details",
                    state: {
                        currentReferenceId: response.data?.data?.ref_id,
                        paymentGatewayAccessKey: response.data?.data?.payment_initiated_key?.data,
                        redirectionPath: "/my-lockers"
                    }
                });
            } else {
                //free locker
                this.props.history.push({
                    pathname: "/payment-completion",
                    state: {
                        transactionDetails: null,
                        assignedLockerInfo: response.data.data,
                    }
                });
            }
        }
        else if (response.status === ERROR) {
            this.setState({
                isLoading: false
            }, () => {
                ShowToast(this.props.t(response.message), TOAST_ERROR);
            });
        }
        else if (response.status === REDIRECT) {
            this.setState({
                isLoading: false
            }, () => {
                this.props.history.push({
                    pathname: "/",
                    state: {
                        message: this.props.t(response.message),
                        messageType: TOAST_ERROR
                    }
                });
            });
        }
    }

    bookAnotherLockerButtonHandler = () => {
        this.setState({
            isLoading: true,
            loadingMessage: this.props.t('verifying_locker_bank_settings_please_wait'),
            showQRCodeReader: true
        });
    }

    cancelQRCodeScanButtonHandler = () => {
        this.setState({
            isLoading: false,
            loadingMessage: "",
            showQRCodeReader: false
        });
    }

    qrReaderScanHandler = (qrCodeData) => {
        if (qrCodeData) {
            this.setState({
                showQRCodeReader: false
            }, async () => {
                const domainAndLockerBankInfo = getDomainAndLockerBankInfoFromScannedQRCode(qrCodeData);

                if (domainAndLockerBankInfo) {
                    if (domainAndLockerBankInfo.domain === this.state.domain) {
                        const configurationSettings = await getTenantAssignmentLockerBankConfigurationSettings(domainAndLockerBankInfo.domain, domainAndLockerBankInfo.lockerBankId);

                        if (configurationSettings.tenantAssignmentAndLockerBankSettings) {
                            if (configurationSettings.availableLockersCount > 0) {
                                if (domainAndLockerBankInfo.lockerBankId !== this.state.lockerBankId) {
                                    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, domainAndLockerBankInfo);
                                }
                                storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, configurationSettings.tenantAssignmentAndLockerBankSettings);

                                this.setState({
                                    stopCountdownTimersAndClearIntervalWhenTrue: true
                                }, () => {
                                    ShowToast(this.props.t('success_msg_you_are_now_accessing_locker_bank', { lockerBankName: configurationSettings.tenantAssignmentAndLockerBankSettings.lockerBankName }), TOAST_SUCCESS);
                                    this.props.history.push({
                                        pathname: "/locker-size"
                                    });
                                })
                            }
                            else {
                                ShowToast(this.props.t('error_msg_locker_units_not_available_try_later'), TOAST_ERROR);
                            }
                        }
                        else {
                            ShowToast(this.props.t(configurationSettings.errorMessage), TOAST_ERROR);
                        }
                    }
                    else {
                        ShowToast(this.props.t('error_msg_locker_bank_is_under_different_tenant'), TOAST_ERROR);
                    }
                }
                else {
                    ShowToast(this.props.t('error_msg_scanned_qr_not_valid'), TOAST_ERROR);
                }

                this.setState({
                    isLoading: false,
                    loadingMessage: ""
                });
            });
        }
    }

    qrReaderErrorHandler = (error) => {
        this.setState({
            isLoading: false,
            loadingMessage: "",
            showQRCodeReader: false
        }, () => {
            ShowToast(this.props.t('error_msg_error_while_opening_qr_reader'), TOAST_ERROR);
        });
    }

    componentWillUnmount = () => { }

    renderDialogContent = () => {
        return (
            <CustomQRCodeReader handleOnScan={this.qrReaderScanHandler} handleOnError={this.qrReaderErrorHandler} />
        )
    }

    render() {
        return (
            <Box className="my-lockers-page">
                <Box className="main-container">
                    {this.state.isLoading && (
                        <Box className="main">
                            <CircularProgressLoader message={this.state.loadingMessage} />
                        </Box>
                    )}
                    {(!this.state.isLoading && this.state.showErrorMessageAndRetryButtonIfUnableToGetAssignedLockers) && (
                        <Box className="main">
                            <Typography variant="body1" className="error-message">{this.props.t('error_while_retrieving_lockers')}</Typography>
                            <ButtonComponent handleClick={() => this.tryAgainButtonHandler()} title={this.props.t('button_try_again')} />
                        </Box>
                    )}
                    {(!this.state.isLoading && this.state.isOpeningLockerUnit) && (
                        <Box className="main">
                            <CircularProgressLoader message={this.props.t('opening_locker_please_wait', { lockerUnit: 120 })} />
                        </Box>
                    )}
                    {(!this.state.isLoading && !this.state.showErrorMessageAndRetryButtonIfUnableToGetAssignedLockers && !this.state.isOpeningLockerUnit) && (
                        <Box className="main">
                            {this.state.assignedLockersList.length > 0 ? (
                                <Box className="booked-lockers-list">
                                    {this.state.assignedLockersList.map((locker, index) => (
                                        <Box className={((this.state.selectedLocker?.locker_bank === locker.locker_bank) && (this.state.selectedLocker?.locker_bank === locker.locker_unit)) ? `booked-locker accordion-expanded` : `booked-locker accordion`} key={index} onClick={() => this.setState({ selectedLocker: locker })}>
                                            <Box className="locker-information-container">
                                                <Box className="locker-information">
                                                    <Box className="locker-unit-container">
                                                        <Box className="icon-container">
                                                            <LockIcon className="icon-ri-door-lock-box-fill" />
                                                        </Box>
                                                        <Typography className="locker-unit">{locker.locker_unit}</Typography>
                                                    </Box>
                                                    {(!((this.state.selectedLocker?.locker_bank === locker.locker_bank) && (this.state.selectedLocker?.locker_unit === locker.locker_unit))) && (
                                                        <Box className="locker-bank-name-and-remaining-time-container">
                                                            <Box className="locker-bank-name-container">
                                                                <Box className="icon-container">
                                                                    <ViewQuiltIcon className="icon-gi-lockers" />
                                                                </Box>
                                                                <Typography className="locker-bank-name">{locker.locker_bank_name}</Typography>
                                                            </Box>
                                                            <Box className="remaining-time-container">
                                                                <Box className="icon-container">
                                                                    <TimerIcon className="icon-io-timer" />
                                                                </Box>
                                                                <Typography className="remaining-time">{convertMillisecondsToSpecifiedTimeFormat(locker.remainingTimeInMilliseconds, HH_mm_ss)}</Typography>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </Box>
                                                <Box className="icon-container chevron-icon-container">
                                                    <MdChevronRight className="icon-md-chevron-right" />
                                                </Box>
                                            </Box>
                                            {((this.state.selectedLocker?.locker_bank === locker.locker_bank) && (this.state.selectedLocker?.locker_unit === locker.locker_unit)) && (
                                                <Box className="locker-detailed-information-container">
                                                    <Box className="locker-bank-name-container">
                                                        <Box className="icon-container">
                                                            <GiLockers className="icon-gi-lockers" />
                                                        </Box>
                                                        <Typography className="locker-bank-name">{locker.locker_bank_name}</Typography>
                                                    </Box>
                                                    <Box className="locker-bank-location-container">
                                                        <Box className="icon-container">
                                                            <LocationOnIcon className="icon-md-location-on" />
                                                        </Box>
                                                        <Typography className="locker-bank-location">{locker.locker_bank_location}</Typography>
                                                    </Box>
                                                    <Box className="booking-duration-container">
                                                        <Box className="icon-container">
                                                            <WatchLaterIcon className="icon-io-time" />
                                                        </Box>
                                                        <Typography className="booking-duration">{`${moment(locker.booking_start_time).format("DD MMM, HH:mm")} - ${moment(locker.booking_end_time).format("DD MMM, HH:mm")}`}</Typography>
                                                    </Box>
                                                    {(!(locker.hasGracePeriodStarted) && !(locker.isOverstay)) && (
                                                        <Box className="remaining-time-container">
                                                            <Box className="icon-container">
                                                                <TimerIcon className="icon-io-timer" />
                                                            </Box>
                                                            <Typography className="remaining-time">{convertMillisecondsToSpecifiedTimeFormat(locker.remainingTimeInMilliseconds, HH_mm_ss)}</Typography>
                                                        </Box>
                                                    )}
                                                    {(locker.hasGracePeriodStarted && !(locker.isOverstay)) && (
                                                        <Box className="remaining-grace-time-container">
                                                            <Box className="icon-container">
                                                                <TimerIcon className="icon-io-timer" />
                                                            </Box>
                                                            <Typography className="remaining-grace-time">{convertMillisecondsToSpecifiedTimeFormat(locker.remainingTimeInMilliseconds, HH_mm_ss)}</Typography>
                                                        </Box>
                                                    )}
                                                    {(locker.hasGracePeriodStarted && locker.isOverstay) && (
                                                        <Box className="remaining-time-and-overstay-time-container">
                                                            <Box className="remaining-time-container">
                                                                <Box className="icon-container">
                                                                    <TimerIcon className="icon-io-timer" />
                                                                </Box>
                                                                <Typography className="remaining-time">{convertMillisecondsToSpecifiedTimeFormat(locker.remainingTimeInMilliseconds, HH_mm_ss)}</Typography>
                                                            </Box>
                                                            <Box className="overstay-time-container">
                                                                <Box className="icon-container">
                                                                    <TimerIcon className="icon-md-more-time" />
                                                                </Box>
                                                                <Typography className="overstay-time">{convertMillisecondsToSpecifiedTimeFormat(locker.overstayDurationInMilliseconds, HH_mm_ss)}</Typography>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                    {(locker.hasGracePeriodStarted || locker.isOverstay) && (
                                                        <Box className={locker.isOverstay ? "warning-message-container overstay-warning" : "warning-message-continer"}>
                                                            {locker.isOverstay ? (
                                                                <Typography className="warning-message grace-period-warning-message">{this.props.t('booking_time_over_msg')}</Typography>
                                                            ) : (
                                                                <Typography className="warning-message overstay-warning-message">{this.props.t('booking_time_over_grace_time_msg', { bookingGraceTime: (locker.booking_end_time_grace - locker.booking_end_time) / 60000 })}</Typography>
                                                            )}
                                                        </Box>
                                                    )}
                                                    {locker.isOverstay ? (
                                                        <ButtonComponent handleClick={() => this.overstayPayButtonHandler()} title={this.props.t('pay_text')} />
                                                    ) : (
                                                        <CustomSliderComponent
                                                            bankDetails={`${locker.locker_bank_location} > ${locker.locker_bank_name} - ${locker.locker_unit}`}
                                                            onSlideDone={this.openSelectedLocker}
                                                        />
                                                    )}
                                                </Box>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Box className="booked-lockers-list">
                                    <Typography className="warning-message">{this.props.t('no_locker_booked_msg')}</Typography>
                                </Box>
                            )}
                            {(this.state.userInfo.assignedLockersCount < this.state.tenantAssignmentAndLockerBankSettings.allowedLockersCount) ? (
                                <ButtonComponent handleClick={() => this.bookAnotherLockerButtonHandler()} title={this.props.t('button_book_new_locker')} />
                            ) : (
                                <ButtonComponent handleClick={() => ShowToast(this.props.t('warning_msg_max_lockers_booked_release_before_booking_new_one'), TOAST_WARN)} title={this.props.t('button_book_new_locker')} disabled={true} />
                            )}
                        </Box>
                    )}
                </Box>
                <Dialog open={this.state.showPaymentConfirmationModal}
                    onClose={() => this.setState({ showPaymentConfirmationModal: false })}
                    fullWidth={true}
                    maxWidth="xs"
                >
                    <DialogContent>
                        <Box className="info-row">
                            <Typography className="title">{this.props.t('locker_size')}</Typography>
                            <Typography className="value">{this.state.selectedLocker?.locker_size}</Typography>
                        </Box>
                        <Box className="info-row">
                            <Typography className="title">{this.props.t('locker')}</Typography>
                            <Typography className="value">{this.state.selectedLocker?.locker_unit}</Typography>
                        </Box>
                        <Box className="info-row">
                            <Typography className="title overstay-duration-title">{this.props.t('overstay_duration')}</Typography>
                            <Typography className="value overstay-duration-value">{convertMillisecondsToSpecifiedTimeFormat(this.state.selectedLocker?.overstayDurationInMilliseconds, HH_mm_ss)}</Typography>
                        </Box>
                        <Box className="info-row">
                            <Typography className="title">{this.props.t('total_amount')}</Typography>
                            <Typography className="value">{this.state.overstayAmount ? `${this.state.overstayAmount} Rs.` : this.props.t('freeText')}</Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <ButtonComponent handleClick={() => this.setState({ showPaymentConfirmationModal: false })} title={this.props.t('button_cancel')} type={BUTTON_SECONDARY} />
                        <ButtonComponent handleClick={() => this.makePrePaymentRegistration()} title={this.props.t('button_pay')} />
                    </DialogActions>
                </Dialog>
                <CustomDialog
                    dialogVisible={this.state.showQRCodeReader}
                    onClose={() => this.cancelQRCodeScanButtonHandler}
                    handleCancel={() => this.cancelQRCodeScanButtonHandler()}
                    buttonOneTitle={this.props.t('button_cancel')}
                    children={this.renderDialogContent}
                />
            </Box>
        );
    }
}

export default withTranslation()(MyLockersPage);