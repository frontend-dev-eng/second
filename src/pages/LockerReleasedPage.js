import {Component} from "react";
import QrReader from "react-qr-reader";
import {TOAST_SUCCESS, TOAST_WARN, TOAST_ERROR, OPEN_LOCKER} from "../assets/constants/Constants";
import {LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, LS_GUEST_USER} from "../assets/constants/BrowserStorageKeys";
import {isGuestUserAuthenticated, getTenantAssignmentLockerBankConfigurationSettings} from "../lib/AuthUtils";
import {getDomainAndLockerBankInfoFromScannedQRCode} from "../lib/Utils";
import {storeSecureItemInSpecifiedStorage, getSecureItemFromSpecificStorage} from "../lib/BrowserStorageAccessMiddleware";
import ShowToast from "../components/ToastComponent";
import {withTranslation} from "react-i18next";
import { Box, Typography, Dialog, DialogContent,DialogActions, Button } from "@mui/material";
import CircularProgressLoader from "../components/CircularProgressLoader";
import ButtonComponent from "../components/ButtonComponent";
class LockerReleasedPage extends Component {
    constructor (props) {
        super (props)

        // const tenantAssignmentAndLockerBankSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
        const domainAndLockerBankInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK);
        const domain = domainAndLockerBankInfo?.domain ? domainAndLockerBankInfo?.domain : null;
        const lockerBankId = domainAndLockerBankInfo?.lockerBankId ? domainAndLockerBankInfo?.lockerBankId : null;
        // const userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_GUEST_USER);
        // const isUserAuthenticated = isGuestUserAuthenticated(userInfo);
        // const releasedLockerInfo = this.props.history.location.state?.releasedLockerInfo;

        const releasedLockerInfo = {
            lockerUnit:501
        } //test
        const userInfo = {
            assignedLockersCount:1
        } //test
        const isUserAuthenticated = isGuestUserAuthenticated(userInfo); //test
        const tenantAssignmentAndLockerBankSettings= {
            allowedLockersCount:2
        }//test

        this.state = {
            isLoading: false,
            loadingMessage: null,
            showQRCodeReader: false,
            domain: domain,
            lockerBankId: lockerBankId,
            tenantAssignmentAndLockerBankSettings: tenantAssignmentAndLockerBankSettings,
            userInfo: userInfo,
            isUserAuthenticated: isUserAuthenticated,
            releasedLockerInfo: releasedLockerInfo,
        }
    }

    componentDidMount = () => {
        if (this.state.isUserAuthenticated) {
            this.setState({
                isLoading: false
            });
        }
    }

    myLockersButtonHandler = () => {
        localStorage.setItem("userAction", OPEN_LOCKER);

        this.props.history.push({
            pathname: "/my-lockers"
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

                                ShowToast(this.props.t('success_msg_you_are_now_accessing_locker_bank', {lockerBankName: configurationSettings.tenantAssignmentAndLockerBankSettings.lockerBankName}), TOAST_SUCCESS);
                                this.props.history.push({
                                    pathname: "/locker-size"
                                });
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
            <Box className="locker-released-page">
                <Box className="main-container">
                    {this.state.isLoading ? (
                        <Box className="main">
                            <CircularProgressLoader message ={this.state.loadingMessage} />
                        </Box>
                    ) : (
                        <Box className="main">
                            <Typography className="locker-released-info">{this.props.t('locker_unit_is_released', {lockerUnit: this.state.releasedLockerInfo?.lockerUnit})}</Typography>
                            <Typography className="locker-released-instructions">{this.props.t('take_belongings_and_close_locker')}</Typography>
                            <Box className="buttons-container">
                                {(this.state.userInfo.assignedLockersCount > 0) && (
                                    <ButtonComponent handleClick={() => this.myLockersButtonHandler()} title={this.props.t('button_my_lockers')} />
                                )}
                                {this.state.userInfo.assignedLockersCount < this.state.tenantAssignmentAndLockerBankSettings.allowedLockersCount ? (
                                    <ButtonComponent handleClick={() => this.bookAnotherLockerButtonHandler()} title={this.props.t('button_book_new_locker')} />
                                ) : (
                                    <ButtonComponent handleClick={() => ShowToast(this.props.t('warning_msg_max_lockers_booked_release_before_booking_new_one'), TOAST_WARN)} title={this.props.t('button_book_new_locker')} />
                                )}
                            </Box>
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
            </Box>
        );
    }
}

export default withTranslation()(LockerReleasedPage);