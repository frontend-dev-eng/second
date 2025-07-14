import {Component} from "react";
import moment from "moment";
import {SUCCESS, ERROR, REDIRECT, TOAST_ERROR, TOAST_SUCCESS} from "../assets/constants/Constants";
import {LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, LS_GUEST_USER} from "../assets/constants/BrowserStorageKeys";
import {GiLockers} from "react-icons/gi";
import {RiDoorLockBoxFill} from "react-icons/ri";
import {ROTATING_LOADING_ICON} from "../assets/constants/Icons";
import {isGuestUserAuthenticated} from "../lib/AuthUtils";
import {openLocker} from "../lib/BackendUtils";
import {getSecureItemFromSpecificStorage} from "../lib/BrowserStorageAccessMiddleware";
import ShowToast from "../components/ToastComponent";
import {withTranslation} from "react-i18next";
import { Box, Typography } from "@mui/material";
import CircularProgressLoader from "../components/CircularProgressLoader";
import { CheckCircle, Place, WatchLater } from "@mui/icons-material";
import CustomSliderComponent from "../components/CustomSliderComponent";

class PaymentCompletionPage extends Component {
    constructor (props) {
        super (props)

        const domainAndLockerBankInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK);
        const domain = domainAndLockerBankInfo?.domain ? domainAndLockerBankInfo?.domain : null;
        const lockerBankId = domainAndLockerBankInfo?.lockerBankId ? domainAndLockerBankInfo?.lockerBankId : null;
        const userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_GUEST_USER);
        const isUserAuthenticated = isGuestUserAuthenticated(userInfo);
        const transactionDetails = this.props.history.location.state?.transactionDetails;
        const assignedLockerInfo = this.props.history.location.state?.assignedLockerInfo;

        this.state = {
            isLoading: true,
            loadingMessage: null,
            isOpeningLockerUnit: false,
            domain: domain,
            lockerBankId: lockerBankId,
            userInfo: userInfo,
            isUserAuthenticated: isUserAuthenticated,
            transactionDetails: transactionDetails,
            assignedLockerInfo: assignedLockerInfo,
        }
    }

    componentDidMount = () => {
        if (this.state.isUserAuthenticated) {
            this.setState({
                isLoading: false
            });
        }
    }

    logoutHandler = () => {
        localStorage.removeItem(LS_GUEST_USER);
        sessionStorage.clear();

        this.props.history.push({
            pathname: "/",
            state: {
                message: this.props.t('success_msg_successfully_logged_out'),
                messageType: TOAST_SUCCESS
            }
        });
    }

    openLockerButtonHandler = async () => {
        this.setState({
            isOpeningLockerUnit: true
        });

        const additionalHeaders = {Authorization: `token ${this.state.userInfo.authToken}`};
        const body = {locker_bank: this.state.assignedLockerInfo.locker_bank_id, locker_unit: this.state.assignedLockerInfo.locker_unit};
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
                isOpeningLockerUnit: false
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
            });
        }
        else if (response.status === REDIRECT) {
            this.setState({
                isOpeningLockerUnit: false
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

    componentWillUnmount = () => {}

    render () {
        return (
            <Box className="payment-completion-page">
                <Box className="main-container">
                    {this.state.isLoading ? (
                        <Box className="main">
                          <CircularProgressLoader message ={this.state.loadingMessage} />
                        </Box>
                    ) : (
                        <Box className="main">
                            <Box className="booking-info-container">
                                <Box className="booking-status-container">
                                    <Box className="icon-container">
                                        <CheckCircle className="icon-md-check-circle" />
                                    </Box>
                                    <Typography className="booking-status-message">{this.props.t('payment_successful')}</Typography>
                                </Box>
                                <Box className="booking-info">
                                    <Box className="info-row">
                                        <Box className="icon-container">
                                            <RiDoorLockBoxFill className="booking-info-icon icon-ri-door-lock-box-fill" />
                                        </Box>
                                        <Box className="title-and-value-container">
                                            <Typography className="title">{this.props.t('locker')}</Typography>
                                            <Typography className="value">{this.state.assignedLockerInfo.locker_unit}</Typography>
                                        </Box>
                                        <Typography className="locker-size">{this.state.assignedLockerInfo.locker_size}</Typography>
                                    </Box>
                                    <Box className="info-row">
                                        <Box className="icon-container">
                                            <GiLockers className="booking-info-icon icon-gi-lockers" />
                                        </Box>
                                        <Box className="title-and-value-container">
                                            <Typography className="title">{this.props.t('locker_bank_name')}</Typography>
                                            <Typography className="value">{this.state.assignedLockerInfo.locker_bank_name}</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="info-row">
                                        <Box className="icon-container">
                                            <Place className="booking-info-icon icon-md-location" />
                                        </Box>
                                        <Box className="title-and-value-container">
                                            <Typography className="title">{this.props.t('locker_bank_location')}</Typography>
                                            <Typography className="value">{this.state.assignedLockerInfo.locker_bank_location}</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="info-row">
                                        <Box className="icon-container">
                                            <WatchLater className="booking-info-icon icon-md-location" />
                                        </Box>
                                        <Box className="title-and-value-container">
                                            <Typography className="title">{this.props.t('duration')}</Typography>
                                            <Typography className="value">{`${moment(this.state.assignedLockerInfo.booking_start_time).format("DD MMM, hh:mm A")} - ${moment(this.state.assignedLockerInfo.booking_end_time).format("DD MMM, hh:mm A")}`}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="slide-button-container">
                                {this.state.isOpeningLockerUnit ? (
                                    <Box className="loading-icon-and-message-container">
                                        <Box className="loading-icon-container">{ROTATING_LOADING_ICON()}</Box>
                                        <Box className="loading-message">{this.props.t('opening_locker_please_wait')}</Box>
                                    </Box>
                                ) : (
                                    <CustomSliderComponent
                                        bankDetails={`${this.state.assignedLockerInfo.locker_bank_location} > ${this.state.assignedLockerInfo.locker_bank_name} - ${this.state.assignedLockerInfo.locker_unit}`}
                                        onSlideDone={this.openLockerButtonHandler}
                                    />
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        );
    }
}

export default withTranslation()(PaymentCompletionPage);