import React, {useState, useEffect, useRef} from "react";
import {useHistory} from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {BUTTON_PRIMARY, BUTTON_WARNING, SUCCESS, TOAST_SUCCESS} from '../assets/constants/Constants';
import { getSecureItemFromSpecificStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS } from '../assets/constants/BrowserStorageKeys';
import {LOCKER_OPEN_ICON} from '../assets/constants/Icons';
import {LANDING, LOCKER_OPENED, HOME} from '../assets/constants/PageList';
import {getPathForNextPage} from '../lib/Utils';
import {releaseLockerOfPickUpUser} from '../api/api';
import ButtonComponent from '../components/ButtonComponent';
import CircularProgressLoader from '../components/CircularProgressLoader';
import CustomDialog from '../components/CustomDialog';
import ShowToast from '../components/ToastComponent';
// import moment from "moment";
// import QrReader from "react-qr-reader";
// import {LUGGAGE, ERROR, SUCCESS, REDIRECT, TOAST_SUCCESS, TOAST_WARN, TOAST_ERROR, OPEN_LOCKER} from "../assets/constants/Constants";
// import {LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, LS_GUEST_USER, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS} from "../assets/constants/BrowserStorageKeys";
// import {isGuestUserAuthenticated, getTenantAssignmentLockerBankConfigurationSettings} from "../lib/AuthUtils";
// import {getDomainAndLockerBankInfoFromScannedQRCode} from "../lib/Utils";
// import {releaseLocker} from "../lib/BackendUtils";
// import {storeSecureItemInSpecifiedStorage, getSecureItemFromSpecificStorage} from "../lib/BrowserStorageAccessMiddleware";
// import ShowToast from "../components/ToastComponent";
// import {REMAINING_TIME_DONUT_CHART} from "../components/RemainingTimeDonutChart";
// import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";
// import CircularProgressLoader from "../components/CircularProgressLoader";
// import ButtonComponent from "../components/ButtonComponent";

/*
class LockerOpenedPage extends Component {
    constructor (props) {
        super (props)

        // const tenantAssignmentAndLockerBankSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
        const domainAndLockerBankInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK);
        const domain = domainAndLockerBankInfo?.domain ? domainAndLockerBankInfo?.domain : null;
        const lockerBankId = domainAndLockerBankInfo?.lockerBankId ? domainAndLockerBankInfo?.lockerBankId : null;
        // const userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_GUEST_USER);
        // const isUserAuthenticated = isGuestUserAuthenticated(userInfo);
        // const assignedLockerInfo = this.props.history.location.state?.assignedLockerInfo;
       
        const assignedLockerInfo = {
            lockerUnit:501,
            lockerBankId:5,
            bookingStartTimeInMilliseconds:"1719388960280",
            bookingEndTimeInMilliseconds:"1719561760280",
            bookingEndTimeWithGracePeriodInMilliseconds:20
        } //test

        const userInfo = {
            userId:"101",
            refId:'123456789',
            assignedLockersCount:1
        } //test
        const isUserAuthenticated = isGuestUserAuthenticated(userInfo); //test
        const tenantAssignmentAndLockerBankSettings= {
            allowedLockersCount:2
        }//test

        if ( !(parseInt(assignedLockerInfo?.lockerUnit) )){
            this.props.history.push({
                pathname: "/my-lockers"
            });
        }

        const currentTimeInMilliseconds = moment().valueOf();
        const bookingStartTimeInMilliseconds = parseInt(assignedLockerInfo?.bookingStartTimeInMilliseconds);
        const bookingEndTimeInMilliseconds = parseInt(assignedLockerInfo?.bookingEndTimeInMilliseconds);
        const bookingEndTimeWithGracePeriodInMilliseconds = parseInt(assignedLockerInfo?.bookingEndTimeWithGracePeriodInMilliseconds);
        const showGracePeriodCountdownTimer = (currentTimeInMilliseconds < bookingEndTimeInMilliseconds) ? false : true;
        const remainingTimeInMilliseconds = showGracePeriodCountdownTimer ? (bookingEndTimeWithGracePeriodInMilliseconds - currentTimeInMilliseconds) : (bookingEndTimeInMilliseconds - currentTimeInMilliseconds);

        this.state = {
            isLoading: false,
            loadingMessage: null,
            showQRCodeReader: false,
            showReleaseLockerConfirmationModal: false,
            showReleaseLockerButton: (localStorage.getItem("userAction") === OPEN_LOCKER) ? true : false,
            showGracePeriodCountdownTimer: showGracePeriodCountdownTimer,
            stopCountdownTimerAndClearIntervalWhenTrue: remainingTimeInMilliseconds < 0 ? true : false,
            domain: domain,
            lockerBankId: lockerBankId,
            tenantAssignmentAndLockerBankSettings: tenantAssignmentAndLockerBankSettings,
            userInfo: userInfo,
            isUserAuthenticated: isUserAuthenticated,
            assignedLockerInfo: assignedLockerInfo,
            currentTimeInMilliseconds: currentTimeInMilliseconds,
            bookingStartTimeInMilliseconds: bookingStartTimeInMilliseconds,
            bookingEndTimeInMilliseconds: bookingEndTimeInMilliseconds,
            bookingEndTimeWithGracePeriodInMilliseconds: bookingEndTimeWithGracePeriodInMilliseconds,
            remainingTimeInMilliseconds: remainingTimeInMilliseconds < 0 ? 0 : remainingTimeInMilliseconds
        }
    }

    componentDidMount = () => {
        if (this.state.isUserAuthenticated) {
            this.setState({
                isLoading: false
            });
            this.countDownTimerForRemainingDuration();
        }
    }

    countDownTimerForRemainingDuration = () => {
        let currentTimeInMilliseconds = this.state.currentTimeInMilliseconds;
        let showGracePeriodCountdownTimer = this.state.showGracePeriodCountdownTimer;
        let remainingTimeInMilliseconds = this.state.remainingTimeInMilliseconds;

        let countDownTimerInterval = setInterval(() => {
            if (this.state.stopCountdownTimerAndClearIntervalWhenTrue) {
                clearInterval(countDownTimerInterval);
            }
            else {
                currentTimeInMilliseconds = moment().valueOf();
                showGracePeriodCountdownTimer = (currentTimeInMilliseconds < this.state.bookingEndTimeInMilliseconds) ? false : true;
                remainingTimeInMilliseconds = showGracePeriodCountdownTimer ? (this.state.bookingEndTimeWithGracePeriodInMilliseconds - currentTimeInMilliseconds) : this.state.bookingEndTimeInMilliseconds - currentTimeInMilliseconds;

                this.setState({
                    showGracePeriodCountdownTimer: showGracePeriodCountdownTimer,
                    stopCountdownTimerAndClearIntervalWhenTrue: remainingTimeInMilliseconds < 0 ? true : false,
                    remainingTimeInMilliseconds: remainingTimeInMilliseconds < 0 ? 0 : remainingTimeInMilliseconds
                });
            }
        }, 1000);
    }

    releaseOpenedLocker = async () => {
        this.setState({
            isLoading: true,
            loadingMessage: this.props.t('releasing_locker_please_wait', {lockerUnit: this.state.assignedLockerInfo?.lockerUnit}),
            showReleaseLockerConfirmationModal: false
        });

        const additionalHeaders = {Authorization: `token ${this.state.userInfo.authToken}`};
        const body = {locker_bank_id: String(this.state.assignedLockerInfo?.lockerBankId), locker_unit: this.state.assignedLockerInfo?.lockerUnit, type: LUGGAGE};
        const response = await releaseLocker(this.state.domain, additionalHeaders, body);

        if (response.status === SUCCESS) {
            let userInfo = this.state.userInfo;
            userInfo.assignedLockersCount = userInfo.assignedLockersCount - 1;
            storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_GUEST_USER, userInfo);

            this.setState({
                isLoading: false,
                stopCountdownTimerAndClearIntervalWhenTrue: true
            }, () => {
                this.props.history.push({
                    pathname: "/locker-released",
                    state: {
                        releasedLockerInfo: this.state.assignedLockerInfo
                    }
                });
            });
        }
        else if (response.status === ERROR) {
            this.setState({
                isLoading: false,
            }, () => {
                ShowToast(this.props.t(response.message), TOAST_ERROR);
            });
        }
        else if (response.status === REDIRECT) {
            this.setState({
                isLoading: false,
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

    myLockersButtonHandler = () => {
        localStorage.setItem("userAction", OPEN_LOCKER);

        this.setState({
            stopCountdownTimerAndClearIntervalWhenTrue: true
        }, () => {
            this.props.history.push({
                pathname: "/my-lockers"
            });
        });
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
                                    stopCountdownTimerAndClearIntervalWhenTrue: true
                                }, () => {
                                    ShowToast(this.props.t('success_msg_you_are_now_accessing_locker_bank', {lockerBankName: configurationSettings.tenantAssignmentAndLockerBankSettings.lockerBankName}), TOAST_SUCCESS);
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
    
    componentWillUnmount = () => {}

    render () {
        return (
            <Box className="locker-opened-page">
                <Box className="main-container">
                    {this.state.isLoading ? (
                        <Box className="main">
                            <CircularProgressLoader message ={this.state.loadingMessage} />
                        </Box>
                    ) : (
                        <Box className="main">
                            <Typography className="locker-opened-info">{this.props.t('locker_unit_is_opened', {lockerUnit: this.state.assignedLockerInfo?.lockerUnit})}</Typography>
                            <Typography className="locker-usage-instructions">{this.props.t('close_the_locker_after_use')}</Typography>
                            <Typography className="locker-opened-info">{this.props.t('remaining_time')}</Typography>
                            <Box className="remaining-time-donut-chart-container">{REMAINING_TIME_DONUT_CHART(this.state.remainingTimeInMilliseconds, this.state.bookingEndTimeInMilliseconds - this.state.bookingStartTimeInMilliseconds)}</Box>
                            {this.state.showReleaseLockerButton && (
                                <ButtonComponent handleClick={() => this.setState({showReleaseLockerConfirmationModal: true})} title={this.props.t('button_release_locker')} />
                            )}
                                <ButtonComponent handleClick={() => this.myLockersButtonHandler()} title={this.props.t('button_my_lockers')} />
                            {this.state.userInfo.assignedLockersCount < this.state.tenantAssignmentAndLockerBankSettings.allowedLockersCount ? (
                                <ButtonComponent handleClick={() => this.bookAnotherLockerButtonHandler()} title={this.props.t('button_book_new_locker')} />
                            ) : (
                                <ButtonComponent handleClick={() => ShowToast(this.props.t('warning_msg_max_lockers_booked_release_before_booking_new_one'), TOAST_WARN)} title={this.props.t('button_book_new_locker')} />
                            )}
                        </Box>
                    )}
                </Box>
                <Dialog open={this.state.showQRCodeReader} classes={{ paper: 'custom-dialog-qr-code' }} >
                    <DialogContent>
                        <QrReader
                            className="qr-code-reader"
                            delay={300}
                            onScan={(data) => this.qrReaderScanHandler(data)}
                            onError={(error) => this.qrReaderErrorHandler(error)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.cancelQRCodeScanButtonHandler()}>{this.props.t('button_cancel')}</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.showReleaseLockerConfirmationModal} onClose={() => this.setState({ showReleaseLockerConfirmationModal: false })}>
                    <DialogTitle>{this.props.t('are_you_sure_to_release_the_locker')}</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">{this.props.t('check_belongings_before_releasing_locker')}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ showReleaseLockerConfirmationModal: false })}>{this.props.t('button_cancel')}</Button>
                        <Button onClick={() => this.releaseOpenedLocker()}>{this.props.t('button_release')}</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }
}
*/

const LockerOpenedPage = () => {
    const history = useHistory();
    const {t} = useTranslation();
    const lockerUnitDetails = history.location.state?.lockerUnitDetails;
    // console.log('locker unit details 2: ', lockerUnitDetails);
    // const openedLocker = history.location.state?.openedLocker ? history.location.state?.openedLocker : history.location.state?.locker_unit_details;
    const showReleaseLockerButton = history.location.state?.is_already_opened_once;
    // const refId = history.location.state?.ref_id;
    const checkoutTerminologyInsteadOfRelease = history.location.state?.checkoutTerminologyInsteadOfRelease;
    const tenantAndAssignmentSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE,LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
    const canReleaseLockerAutomaticallyAfterCountdown = tenantAndAssignmentSettings?.usecase_settings?.release_after_pickup_pwa?.value;
    const [isLoading, setIsLoading] = useState(false);
    const countdownTimerRef = useRef(null);
    const [remainingTimeInSecondsToReleaseLocker, setRemainingTimeInSecondsToReleaseLocker] = useState(8);
    const [isReleaseLockerModalVisible, setIsReleaseLockerModalVisible] = useState(false);

    useEffect(() => {
        if (showReleaseLockerButton && canReleaseLockerAutomaticallyAfterCountdown) {
            let remainingTime = remainingTimeInSecondsToReleaseLocker;
            
            if (countdownTimerRef.current) {
                clearInterval(countdownTimerRef.current);
            }

            countdownTimerRef.current = setInterval(() => {
                --remainingTime;

                if (remainingTime === 0) {
                    clearInterval(countdownTimerRef.current);
                    releaseButtonHandler();
                }
                else {
                    setRemainingTimeInSecondsToReleaseLocker(remainingTime);
                }
            }, 1000);
        }

        return () => {
            if (countdownTimerRef.current) {
                clearInterval(countdownTimerRef.current);
            }
        }
    }, []);

    const doneButtonHandler = () => {
        if (showReleaseLockerButton && canReleaseLockerAutomaticallyAfterCountdown) {
            clearInterval(countdownTimerRef.current);
        }
        history.replace({
            pathname: getPathForNextPage(LOCKER_OPENED, HOME)
        });
    };

    const showReleaseLockerModal = () => {
        if (canReleaseLockerAutomaticallyAfterCountdown) {
            clearInterval(countdownTimerRef.current);
        }
        setIsReleaseLockerModalVisible(true);
    };

    const releaseButtonHandler = async () => {
        setIsLoading(true);

        try {
            const releaseLockerResponse = await releaseLockerOfPickUpUser(lockerUnitDetails?.ref_id);
            if (releaseLockerResponse.status === SUCCESS) {
                ShowToast(releaseLockerResponse.message, TOAST_SUCCESS);
                history.replace({
                    pathname: getPathForNextPage(LOCKER_OPENED, HOME)
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error while releasing locker: ', error);
        }
    };

    return (
        <Box className='locker-opened-page'>
            <Box className='main-container'>
                {isLoading && (
                    <Box className='main'>
                        <CircularProgressLoader message={t('Relasing Locker. Please Wait.')} />
                    </Box>
                )}
                {(!isLoading) && (
                    <Box className='main'>
                        <Box className='locker-open-icon-container'>
                            <LOCKER_OPEN_ICON />
                        </Box>
                        <Typography className='locker-unit'>Locker {lockerUnitDetails?.locker_door?.door_no}</Typography>
                        <Typography className='close-door-instructions'>Please close the locker door properly.</Typography>
                        <ButtonComponent buttonId='done-button' handleClick={doneButtonHandler} title={(showReleaseLockerButton && canReleaseLockerAutomaticallyAfterCountdown) ? t('Continue To Use') : t('Done')} />
                        {(showReleaseLockerButton && ( !tenantAndAssignmentSettings?.is_pricing )) && (
                            <ButtonComponent buttonId='release-button' type={BUTTON_WARNING} handleClick={showReleaseLockerModal} title={canReleaseLockerAutomaticallyAfterCountdown ? (`${checkoutTerminologyInsteadOfRelease ? 'Check-Out' : 'Release'} (${remainingTimeInSecondsToReleaseLocker})`) : (checkoutTerminologyInsteadOfRelease ? 'Checkout' : t('Release'))} />
                        )}
                        <CustomDialog
                            dialogVisible={isReleaseLockerModalVisible}
                            onClose={() => setIsReleaseLockerModalVisible(false)}
                            handleCancel={() => setIsReleaseLockerModalVisible(false)}
                            handleAccept={releaseButtonHandler}
                            dialogTitle={checkoutTerminologyInsteadOfRelease ? 'Check-Out' : t('Release Locker')}
                            dialogContentText={`Are you sure you want to ${checkoutTerminologyInsteadOfRelease ? 'check-out' : 'release this locker'}?`}
                            buttonOneTitle={t('button_cancel')}
                            buttonTwoTitle={checkoutTerminologyInsteadOfRelease ? 'Check-Out' : t('Relase')}
                            buttonProps={{buttonOne: {type: BUTTON_PRIMARY}, buttonTwo: {type: BUTTON_WARNING}}}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default LockerOpenedPage;