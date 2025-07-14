import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import {Box, Button, FormControl, List, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material';
import {Circle, ExpandLessRounded, ExpandMoreRounded} from '@mui/icons-material';
import {useTranslation} from 'react-i18next';
import ButtonComponent from '../components/ButtonComponent';
import CircularProgressLoader from '../components/CircularProgressLoader';
import {BUTTON_PRIMARY, BUTTON_WARNING, SUCCESS, ERROR, TOAST_ERROR} from '../assets/constants/Constants';
import {RADIO_CHECKED_ICON, RADIO_UNCHECKED_ICON} from '../assets/constants/Icons';
import {LOCKER_SIZE_SELECTION, LOCKER_UNIT_SELECTION, OPEN_LOCKER} from '../assets/constants/PageList';
import {LOCAL_STORAGE, SESSION_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, SS_PAYMENT_GATEWAY, SS_PAYMENT_GATEWAY_ACCESS_KEY} from '../assets/constants/BrowserStorageKeys';
import {getSecureItemFromSpecificStorage, storeSecureItemInSpecifiedStorage} from '../lib/BrowserStorageAccessMiddleware';
import {reserveLocker} from '../api/api';
import {prePaymentRegistration} from '../lib/BackendUtils';
import {getPathForNextPage, convertDurationStringToMilliseconds} from '../lib/Utils';
import CustomDialog from '../components/CustomDialog';
import ShowToast from '../components/ToastComponent';
// import moment from "moment";
// import {LUGGAGE, SUCCESS, ERROR, TOAST_WARN, BOOK_NEW_LOCKER, BOOKING_TYPE_NEW, REDIRECT, TOAST_ERROR} from "../assets/constants/Constants";
// import {LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, LS_GUEST_USER} from "../assets/constants/BrowserStorageKeys"
// import {isGuestUserAuthenticated} from "../lib/AuthUtils";
// import {getLockerSizeAvailability, prePaymentRegistration} from "../lib/BackendUtils";
// import {storeSecureItemInSpecifiedStorage, getSecureItemFromSpecificStorage} from "../lib/BrowserStorageAccessMiddleware";
// import ShowToast from "../components/ToastComponent";
// import {withTranslation} from "react-i18next";
// import { Box, Button, FormControl, Typography } from "@mui/material";
// import CircularProgressLoader from "../components/CircularProgressLoader";
// import ButtonComponent from "../components/ButtonComponent";
// import { CustomTextInput } from "../components/CustomTextInput";
// import CustomDialog from "../components/CustomDialog";
 
/*
const availableLockerSize = {
    "id": 2, 
    "bank_name": "Durolt", 
    "bank_location":"Pune",
    "blocking_period_in_seconds": 60, 
    "locker_sizes":[{ "dimension": "W None\" × H None\" × L None\"", "free_units": ["501", "502", "504"], "name": "Small", "size": "S" },
    { "dimension": "W None\" × H None\" × L None\"", "free_units": ["503"], "name": "Medium", "size": "M" }
    ]
}

class LockerSizePage extends Component {
    constructor (props) {
        super (props)

        const domainAndLockerBankInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK);
        const domain = domainAndLockerBankInfo?.domain ? domainAndLockerBankInfo?.domain : null;
        const lockerBankId = domainAndLockerBankInfo?.lockerBankId ? domainAndLockerBankInfo?.lockerBankId : null;
        const userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_GUEST_USER);
        const isUserAuthenticated = isGuestUserAuthenticated(userInfo);
        this.handleBackButton = this.handleBackButton.bind(this);

        this.state = {
            isLoading: false,
            loadingMessage: null,
            checkingIfSelectedLockerSizeIsStillAvailable: false,
            showLockerDimensionsIfAvailable: true,
            showBookingDurationTimestampsIfTrueAndWarningIfFalse: true,
            updateBookingStartAndEndTimesAfterEveryMinute: false,
            showUserModal: false,
            showBookingConfirmationModal: false,
            domain: domain,
            lockerBankId: lockerBankId,
            userInfo: userInfo,
            isUserAuthenticated: isUserAuthenticated,
            currentReferenceId: userInfo?.refId,
            availableLockerSizes: [],
            minimumBookingDurationInHours: 1,
            selectedLockerSize: {size: null},
            selectedBookingDurationInHours: 1,
            bookingDurationStartTimestamp: null,
            bookingDurationEndTimestamp: null,
            totalAmount: 0,
            remainingTimeToMakeSuccessfulPayment: null,
            paymentGatewayAccessKey: null
        }
    }

    componentDidMount = async () => {
        window.addEventListener('popstate', this.handleBackButton);
        let availableLockerSizes = [];

        if ((this.state.domain !== null) && (this.state.lockerBankId !== null) && (this.state.isUserAuthenticated)) {
            localStorage.setItem("userAction", BOOK_NEW_LOCKER);
            availableLockerSizes = await this.getAvailableLockerSizes();
        }
        
        this.setState({
            isLoading: false,
            availableLockerSizes: availableLockerSize.locker_sizes
        });
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.handleBackButton);
    }
    
    handleBackButton(event) {
        const currentPage = window.location.pathname;
        if(currentPage === '/payment-details'){
            this.props.history.push({
                pathname: "/my-lockers"
            });
        }
    }


    getAvailableLockerSizes = async () => {
        let availableLockerSizes = [];
        let additionalHeaders = {'Authorization': `token ${this.state.userInfo.authToken}`};
        let body = {ref_id: this.state.currentReferenceId};
        let response = await getLockerSizeAvailability(this.state.domain, additionalHeaders, body, this.state.lockerBankId);

        if (response.status === SUCCESS) {
            if (response.data.data?.locker_sizes) {
                response.data.data.locker_sizes.forEach((item) => {
                    if (item.size !== null && item.size !== '' && item.name !== null && item.name !== '') {
                        availableLockerSizes.push(item);

                        if (this.state.showLockerDimensionsIfAvailable && (item.dimension.includes(`None`))) {
                            this.setState({
                                showLockerDimensionsIfAvailable: false
                            });
                        }
                    }
                });

                this.setState({
                    remainingTimeToMakeSuccessfulPayment: response.data.data?.blocking_period_in_seconds
                });
            }
        }
        else if (response.status === ERROR) {
            localStorage.removeItem(LS_GUEST_USER);
            sessionStorage.clear();
            this.props.history.push({
                pathname: "/"
            });
            window.location.reload();
        }

        return availableLockerSizes;
    }

    lockerSizeSelectionHandler = (selectedLockerSize) => {
        const currentDateTimeInMilliSeconds = moment().valueOf();

        this.setState({
            selectedLockerSize: selectedLockerSize,
            selectedBookingDurationInHours: this.state.minimumBookingDurationInHours,
            showBookingDurationTimestampsIfTrueAndWarningIfFalse: true,
            bookingDurationStartTimestamp: currentDateTimeInMilliSeconds,
            bookingDurationEndTimestamp: currentDateTimeInMilliSeconds + (this.state.minimumBookingDurationInHours * 3600000),
            totalAmount: parseFloat(selectedLockerSize.price) * this.state.minimumBookingDurationInHours,
            updateBookingStartAndEndTimesAfterEveryMinute: true
        }, () => this.bookingStartAndEndTimesUpdaterAfterEveryMinute() );
    }

    bookingStartAndEndTimesUpdaterAfterEveryMinute = () => {
        const bookingStartAndEndTimesUpdaterInterval = setInterval(() => {
            if (this.state.updateBookingStartAndEndTimesAfterEveryMinute) {
                if (moment().seconds() === 0) {
                    this.setState({
                        bookingDurationStartTimestamp: this.state.bookingDurationStartTimestamp + 60000,
                        bookingDurationEndTimestamp: this.state.bookingDurationEndTimestamp + 60000
                    });
                }
            }
            else {
                clearInterval(bookingStartAndEndTimesUpdaterInterval);
            }
        }, 1000);
    }

    bookingDurationInputHandler = (selectedLockerSize, selectedBookingDurationInHours) => {
        if (selectedBookingDurationInHours.length === 0 || /^[1-9]\d*$/.test(selectedBookingDurationInHours)) {
            const currentDateTimeInMilliSeconds = moment().valueOf();

            this.setState({
                selectedBookingDurationInHours: selectedBookingDurationInHours,
                showBookingDurationTimestampsIfTrueAndWarningIfFalse: selectedBookingDurationInHours.length > 0,
                bookingDurationStartTimestamp: currentDateTimeInMilliSeconds,
                bookingDurationEndTimestamp: (selectedBookingDurationInHours.length > 0) ? (currentDateTimeInMilliSeconds + (parseFloat(selectedBookingDurationInHours) * 3600000)) : currentDateTimeInMilliSeconds,
                totalAmount: (selectedBookingDurationInHours.length > 0) ? (parseFloat(selectedLockerSize.price) * parseFloat(selectedBookingDurationInHours)) : 0
            });
        }
        else {
            ShowToast(this.props.t('warning_msg_min_booking_duration', {minimumBookingDurationInHours: this.state.minimumBookingDurationInHours}), TOAST_WARN);
        }
    }

    nextButtonHandler = () => {
        if (this.state.selectedLockerSize.size !== null && (this.state.selectedBookingDurationInHours >= this.state.minimumBookingDurationInHours)) {
            this.setState({
                showBookingConfirmationModal: true
            });
        }
        else if (this.state.selectedLockerSize.size === null) {
            ShowToast(this.props.t('warning_msg_select_locker_size'), TOAST_WARN);
        }
        else {
            ShowToast(this.props.t('warning_msg_min_booking_duration', {minimumBookingDurationInHours: this.state.minimumBookingDurationInHours}), TOAST_WARN);
        }
    }

    makePrePaymentRegistration = async () => {
        this.setState({
            isLoading: true,
            loadingMessage: this.props.t('initiating_transaction_please_wait'),
            showBookingConfirmationModal: false
        });

        const additionalHeaders = {'Authorization': `token ${this.state.userInfo.authToken}`};
        const body = {
            ref_id: this.state.currentReferenceId,
            use_case: LUGGAGE,
            booking_type: BOOKING_TYPE_NEW,
            locker_bank_id: this.state.lockerBankId,
            locker_size: this.state.selectedLockerSize.size,
            locker_price: this.state.selectedLockerSize.price,
            locker_selection_mode: "any_available",
            locker_unit: null,
            booking_duration_in_hours: this.state.selectedBookingDurationInHours,
            // booking_start_time: this.state.bookingDurationStartTimestamp,
            // booking_end_time: this.state.bookingDurationEndTimestamp,
            // locker_total_price: this.state.totalAmount,
            // payment_status: "pending"
        };
        const response = await prePaymentRegistration(this.state.domain, additionalHeaders, body);
        if (response.status === SUCCESS) {
            let userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_GUEST_USER);
            userInfo.refId = response.data?.data?.next_ref_id;
            storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_GUEST_USER, userInfo);

            if (response.data?.data?.payment_initiated_key?.status === 1) {
                this.props.history.push({
                    pathname: "/payment-details",
                    state: {
                        currentReferenceId: this.state.currentReferenceId,
                        paymentGatewayAccessKey: response.data?.data?.payment_initiated_key?.data,
                        redirectionPath: "/locker-size",
                        remainingTimeToMakeSuccessfulPayment: this.state.remainingTimeToMakeSuccessfulPayment
                    }
                });
            } else {
                //free locker
                userInfo.assignedLockersCount = userInfo.assignedLockersCount + 1;
                storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_GUEST_USER, userInfo);
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
                isLoading: true,
                showBookingConfirmationModal: false
            }, async () => {
                let availableLockerSizes = [];
                availableLockerSizes = await this.getAvailableLockerSizes();

                this.setState({
                    isLoading: false,
                    availableLockerSizes: availableLockerSizes,
                    selectedLockerSize: {size: null},
                    selectedBookingDurationInHours: 1
                }, () => {
                    ShowToast(this.props.t(response.message), TOAST_ERROR);
                });
            });
        }
        else if (response.status === REDIRECT) {
            this.setState({
                showBookingConfirmationModal: false
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

    renderDialogContent = () => {
        return(
            <>
            <Box className="info-row">
            <Typography className="title">{this.props.t('locker_size')}:</Typography>
            <Typography className="value">{this.state.selectedLockerSize.size}</Typography>
        </Box>
        <Box className="info-row">
            <Typography className="title booking-duration-title">{this.props.t('duration')}:</Typography>
                <Box className="value booking-duration-value">
                <Typography className="value">{this.state.selectedBookingDurationInHours > 1 ? `${this.state.selectedBookingDurationInHours} Hours` : `${this.state.selectedBookingDurationInHours} Hour`}</Typography>
                <Typography className="value">{`(${moment(this.state.bookingDurationStartTimestamp).format("DD MMM, HH:mm")} - ${moment(this.state.bookingDurationEndTimestamp).format("DD MMM, HH:mm")})`}</Typography>
            </Box>
        </Box>
        <Box className="info-row">
            <Typography className="title">{this.props.t('total_amount')}:</Typography>
            <Typography className="value">{this.state.totalAmount > 0 ? `${this.state.totalAmount} Rs.` : this.props.t('freeText')}</Typography>
        </Box>
        </>
        )
    }

    
    render () {
        return (
            <Box className="locker-size-page">
                    <Box className="main-container">
                        {this.state.isLoading && (
                            <Box className="main">
                            <CircularProgressLoader message ={this.state.loadingMessage} />
                            </Box>
                        )}
                        {(!this.state.isLoading && this.state.availableLockerSizes.length > 0) && (
                            <Box className="main">
                                <Typography variant="h3" className="locker-size-form-heading">{this.props.t('select_locker_size')}</Typography>
                                <FormControl className="locker-size-form">
                                    {this.state.availableLockerSizes.map( (item, index) => (
                                        <Box className="form-item" key={index+1}>
                                             <Button onClick={() => this.lockerSizeSelectionHandler(item)} className={`form-label ${this.state.selectedLockerSize.name === item.name ? 'selected' : (this.state.selectedLockerSize.name === item.name ? '':'blurred')}`}>
                                                <Typography className="form-input">{item.size}</Typography>
                                                {this.state.showLockerDimensionsIfAvailable ? `${item.name} (${item.dimension})` : item.name}
                                            </Button>
                                            {(this.state.selectedLockerSize.size === item.size) && (
                                                <Box className="booking-period-form">
                                                    <Box className="locker-price">
                                                        <Typography className="title">{this.props.t('price')}</Typography>
                                                        <Typography className="value">{item.price > 0 ? `${item.price} Rs` : this.props.t('freeText')}</Typography>
                                                    </Box>
                                                    <Box className="booking-period">
                                                        <Typography className="title">{this.props.t('duration')}</Typography>
                                                        <CustomTextInput
                                                        className={'input-duration'}
                                                        placeholder={this.props.t('duration')}
                                                        value={this.state.selectedBookingDurationInHours}
                                                        onChange={(e) => this.bookingDurationInputHandler(item, e.target.value)}
                                                        type={"number"}
                                                        />
                                                    </Box>
                                                    <Box className="booking-start-and-end-times">
                                                        {this.state.showBookingDurationTimestampsIfTrueAndWarningIfFalse ? (
                                                            <Typography className="value">{`(${moment(this.state.bookingDurationStartTimestamp).format(`DD MMM, HH:mm`)} - ${moment(this.state.bookingDurationEndTimestamp).format(`DD MMM, HH:mm`)})`}</Typography>
                                                        ) : (
                                                            <Typography className="booking-duration-warning">{this.props.t('warning_msg_min_booking_duration', {minimumBookingDurationInHours: this.state.minimumBookingDurationInHours})}</Typography>
                                                        )}
                                                    </Box>
                                                    <Box className="total-amount">
                                                        <Typography className="title">{this.props.t('total_amount')}</Typography>
                                                        <Typography className="value">{this.state.totalAmount > 0 ? `${this.state.totalAmount} Rs` : this.props.t('freeText')}</Typography>
                                                    </Box>
                                                </Box>
                                            )}
                                        </Box>
                                    ))}
                                </FormControl>
                                <ButtonComponent title={this.props.t('button_next')} handleClick={this.nextButtonHandler} disabled={!(this.state.selectedLockerSize.size !== null && (this.state.selectedBookingDurationInHours >= this.state.minimumBookingDurationInHours))}/>
                            </Box>
                        )}
                        {(!this.state.isLoading && this.state.availableLockerSizes.length === 0) && (
                            <Box className="main">
                                <Box className="">{this.props.t('locker_not_available')}</Box>
                            </Box>
                        )}
                    </Box>
                    <CustomDialog 
                        dialogVisible={this.state.showBookingConfirmationModal} 
                        onClose={() => this.setState({showBookingConfirmationModal: false})} 
                        handleCancel={() => this.setState({showBookingConfirmationModal: false})} 
                        handleAccept={this.makePrePaymentRegistration} 
                        children={this.renderDialogContent}
                        buttonOneTitle={this.props.t('button_cancel')}
                        buttonTwoTitle={this.props.t('yesBtnText')}
                    />
            </Box>
        );
    }
}
*/

const LockerSizePage = () => {
    const history = useHistory();
    const {t} = useTranslation();
    const tenantAndAssignmentSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('Loading');
    const [showBookingConfirmationModal, setBookingConfirmationModalVisibility] = useState(false);

    // getting state from history location which is set in the previous page that is MyLockeListPage
    // this is used to get the locker bank id, assignment slug, user id and available
    const { lockerBankId, assignmentSlug, userId, availableLockerSizes, isManualLockerSelectionEnabled } = history.location?.state;
   
    const isPricingEnabled = tenantAndAssignmentSettings?.is_pricing;
    const [selectedSizeId, setSelectedSizeId] = useState(null);
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [showBookingSlots, setShowBookingSlots] = useState(false);
    // const isManualLockerSelectionEnabled = history.location?.state?.isManualLockerSelectionEnabled;

    useEffect(() => {
        console.log()
        if (isPricingEnabled) {
            // Prepare and sort slot durations if pricing is enabled
            sortAndFormatSlotDuration();
        }

        setIsLoading(false);
    }, []);

    // Function to process and sort available locker sizes and their slot durations
        /*
    ========================= Summary of WHY this is done =========================

    1. Convert locker dimensions to string:
        - To create a readable format for locker size like "30" x 40" x 50"".
        - Useful for display on the UI.

    2. Convert each slot's duration to milliseconds:
        - Makes it easy to perform calculations and comparisons.
        - String-based durations can be unreliable for sorting or math operations.

    3. Sort booking slots based on their duration:
        - Ensures time slots appear in ascending order from shortest to longest.
        - Improves user experience when selecting time slots.

    4. Generate readable duration range strings:
        - Displays clear, understandable ranges like "0 - 2 Hours", "2 - 4 Hours".
        - Helps users quickly understand available booking durations.

    5. Store the sorted and processed slots back to the locker size object:
        - Keeps the data structure clean and ready for further use.
        - Avoids recalculating during rendering or other operations.

    6. setIsLoading(false):
        - Indicates that the data processing is complete.
        - Allows the UI to stop showing loaders or spinners.

    ===============================================================================
    */

    const sortAndFormatSlotDuration = () => {
        availableLockerSizes.forEach((lockerSize) => {
            console.log('locker size: ', lockerSize);
             // Create a readable dimensions string (example: 30" x 40" x 50")
            lockerSize.dimensions = `${parseFloat(lockerSize.width)}\" x ${parseFloat(lockerSize.length)}\" x ${parseFloat(lockerSize.height)}\"`;

             // Convert each slot's duration string to milliseconds for easier calculations & sorting
            lockerSize.size_pricing.forEach((slot) => {
                slot.durationInMilliseconds = convertDurationStringToMilliseconds(slot.duration);
            });

            // Sort slots based on their duration in ascending order
            const incrementallySortedBookingSlots = sortBookingSlotsBasedOnDuration(lockerSize.size_pricing);

            // Generate readable duration ranges like "0 - 2 Hours", "2 - 4 Hours", etc.
            let previousDurationInMilliseconds = 0;
            incrementallySortedBookingSlots.forEach((slot) => {
                slot.durationRange = `${previousDurationInMilliseconds / 3600000} - ${slot.durationInMilliseconds / 3600000} Hours`;
                previousDurationInMilliseconds = slot.durationInMilliseconds;
            });

            // Save the sorted and processed slots back to the locker size object
            lockerSize.bookingSlots = incrementallySortedBookingSlots;
        });
        // console.log('sizes: ', availableLockerSizes);
    };


    // const convertDurationStringToMilliseconds = (durationString) => {
    //     let days = 0;
    //     let timePart = "";

    //     if (/\d\s\d{2}:\d{2}:\d{2}/.test(durationString)) {
    //         [days, timePart] = durationString.split(' ');
    //     }
    //     else {
    //         timePart = durationString;
    //     }

    //     const [hours, minutes, seconds] = timePart.split(':').map(Number);
    //     const totalSeconds = (parseInt(days, 10) * 24 * 3600) + (hours * 3600) + (minutes * 60) + seconds;

    //     return totalSeconds * 1000;
    // };

    const sortBookingSlotsBasedOnDuration = (slotsArray) => {
        return slotsArray.slice().sort((a, b) => a.durationInMilliseconds - b.durationInMilliseconds);
    };

    const lockerSizeClickHandler = (item) => {
        if (isPricingEnabled) {
            setSelectedSizeId(item.id);
            setSelectedSlotId(item.bookingSlots[0].id);
            setShowBookingSlots(true);
        }
        else {
            // this is execute when the locker size is clicked and the pricing is not enabled (Dynamic Locker Bank)
            lockerSizeSelectionHandler(item);
        }
    }

    const lockerSizeSelectionHandler = async (item) => {
        if (isManualLockerSelectionEnabled) {
            history.replace({
                pathname: getPathForNextPage(LOCKER_SIZE_SELECTION, LOCKER_UNIT_SELECTION),
                state: {
                    lockerBankId,
                    assignmentSlug,
                    userId,
                    selectedLockerSize: item
                }
            });
        }
        else {
            setIsLoading(true);
            try {
                const reserveLockerResponse = await reserveLocker(assignmentSlug, lockerBankId, userId, item.code);
                if (reserveLockerResponse.status === SUCCESS) {
                    const lockerUnitDetails = {
                        ref_id: reserveLockerResponse?.data?.transaction_id,
                        is_already_opened_once: false,
                        locker_bank: {
                            name: reserveLockerResponse?.data?.locker_bank_name
                        },
                        locker_door: {
                            door_no: reserveLockerResponse?.data?.door_no
                        }
                    };

                    history.replace({
                        pathname: getPathForNextPage(LOCKER_SIZE_SELECTION, OPEN_LOCKER),
                        state: {
                            lockerUnitDetails
                            // assignedLocker: response.data
                        }
                    });
                }
            } catch (error) {
                setIsLoading(false);
                console.error('Error while reserving locker: ', error);
            }
        }
    };

    const bookButtonHandler = async () => {
        setLoadingMessage('Initiating payment. Please wait.');
        setIsLoading(true);
        console.log('selected size id: ', selectedSizeId);
        console.log(`available locker sizes: `, availableLockerSizes);

        const selectedSize = availableLockerSizes.filter((lockerSize) => selectedSizeId === lockerSize?.id)[0];
        const selectedSlot = selectedSize?.size_pricing.filter((slot) => selectedSlotId === slot?.id)[0];

        const reserveLockerResponse = await reserveLockerTillSuccessfulPayment(selectedSize, selectedSlot);
        // console.log('reserve locker response: ', reserveLockerResponse);

        if (reserveLockerResponse?.status === SUCCESS) {
            const prePaymentResponse = await makePrePaymentRegistration(reserveLockerResponse.data);
            // console.log('pre payment response: ', prePaymentResponse);

            if (prePaymentResponse?.status === SUCCESS) {
                const lockerUnitDetails = {
                    ref_id: reserveLockerResponse?.data?.transaction_id,
                    is_already_opened_once: false,
                    locker_bank: {
                        name: reserveLockerResponse?.data?.locker_bank_name
                    },
                    locker_door: {
                        door_no: reserveLockerResponse?.data?.door_no
                    }
                };
                // console.log('locker unit details: ', lockerUnitDetails);
                const lockerData = {
                    reservedLocker: reserveLockerResponse?.data,
                    locker_bank: {
                        name: reserveLockerResponse?.data?.locker_bank_name,
                        location: {
                            name: reserveLockerResponse?.data?.locker_bank_location
                        }
                    },
                    assignment: {
                        payment_gateway: [ reserveLockerResponse?.data?.assignment_payment_gateway ]
                    },
                    payment_records: [
                        { amount: prePaymentResponse?.data?.data?.amount }
                    ],
                    user: {
                        username: reserveLockerResponse?.data?.username ? reserveLockerResponse?.data?.username : "",
                        email: reserveLockerResponse?.data?.transaction_payments[0]?.user_email ? reserveLockerResponse?.data?.transaction_payments[0].user_email : "",
                        mobile_number: reserveLockerResponse?.data?.transaction_payments[0]?.user_mobile ? reserveLockerResponse?.data?.transaction_payments[0].user_mobile : ""
                    }
                };
                // console.log('locker Data: ', lockerData);
                storeSecureItemInSpecifiedStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY, prePaymentResponse?.data?.data?.payment_gateway);
                storeSecureItemInSpecifiedStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY_ACCESS_KEY, prePaymentResponse?.data?.data?.payment_gateway_reference);

                setIsLoading(false);
                // return;

                history.replace({
                    pathname: '/payment-details',
                    state: {
                        lockerUnitDetails,
                        isLockerReservedTillSuccessfulPayment: true,
                        lockerData,
                        // paymentGateway: prePaymentResponse?.data?.data?.payment_gateway,
                        currentReferenceId: prePaymentResponse?.data?.data?.transaction_id,
                        // paymentGatewayAccessKey: prePaymentResponse?.data?.data?.payment_gateway_reference
                    }
                });
            }
            else if (prePaymentResponse.status === ERROR) {
                ShowToast(t(prePaymentResponse.message), TOAST_ERROR);
            }
        }

        setIsLoading(false);
    };

    // here we are re
    const reserveLockerTillSuccessfulPayment = async (selectedSize, selectedSlot) => {
        try {
            return await reserveLocker(assignmentSlug, lockerBankId, userId, selectedSize?.code, null, selectedSlot?.id, parseFloat(selectedSlot?.price));
        } catch (error) {
            console.error('Error while reserving locker before payment: ', error);
        }
    };

    const makePrePaymentRegistration = async (lockerData) => {
        try {
            const body = {
                "payment_reference_id": lockerData?.transaction_payments[0]?.transaction_id,
                "payment_gateway": lockerData?.transaction_payments[0]?.payment_gateway,
                "locker_bank_id": lockerBankId,
                "locker_door_number": lockerData?.door_no,
                "amount": lockerData?.transaction_payments[0]?.amount
            };

            return await prePaymentRegistration(body);
        } catch (error) {
            console.error('Error while initating payment: ', error);
        }
    };

    const renderBookingConfirmationModalContent = () => {
        const selectedSize = availableLockerSizes.filter((lockerSize) => selectedSizeId === lockerSize?.id)[0];
        const selectedSlot = selectedSize?.bookingSlots.filter((slot) => selectedSlotId === slot?.id)[0];
        const bookingStartDateAndTime = moment().format('DD MMM YYYY, hh:mm A');
        const bookingEndDateAndTime = moment().add(selectedSlot?.durationInMilliseconds, 'milliseconds').format('DD MMM YYYY, hh:mm A');

        return (
            <Box className='modal-content'>
                <Box className='booking-details'>
                    <Box className='info-row'>
                        <Typography className='left-column'>Slot:</Typography>
                        <Typography className='right-column'>{selectedSlot?.durationRange}</Typography>
                    </Box>
                    <Box className='info-row'>
                        <Typography className='left-column'>{t('Start date & time:')}</Typography>
                        <Box>
                            <Typography className='right-column'>{bookingStartDateAndTime.split(',')[1]}</Typography>
                            <Typography className='right-column'>{bookingStartDateAndTime.split(',')[0]}</Typography>
                        </Box>
                    </Box>
                    <Box className='info-row'>
                        <Typography className='left-column'>{t('End date & time:')}</Typography>
                        <Box>
                            <Typography className='right-column'>{bookingEndDateAndTime.split(',')[1]}</Typography>
                            <Typography className='right-column'>{bookingEndDateAndTime.split(',')[0]}</Typography>
                        </Box>
                    </Box>
                    <Box className='info-row'>
                        <Typography className='left-column'>{`Price (${selectedSize?.currency}):`}</Typography>
                        <Typography className='right-column'>{selectedSlot?.price}</Typography>
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <Box className='locker-size-page'>
            <Box className='main-container'>
                {isLoading && (
                    <Box className='main'>
                        <CircularProgressLoader message={loadingMessage} />
                    </Box>
                )}
                {(!isLoading) && (
                    <Box className='main'>
                        <Box className='locker-size-list'>
                            {availableLockerSizes.map((item, index) => (
                                <Box className='locker-size accordion' key={index}>
                                    <Button className='accordion-header' onClick={() => lockerSizeClickHandler(item)}>
                                        <Typography className='size-name'>{item.name}</Typography>
                                        <Typography className='units-available'>({item.available_doors_count} Available)</Typography>
                                        {(isPricingEnabled) && (
                                            <Box className='icon-container'>
                                                {(selectedSizeId === item.id) ? (
                                                    <ExpandLessRounded className='accordion-icon' />
                                                ) : (
                                                    <ExpandMoreRounded className='accordion-icon' />
                                                )}
                                            </Box>
                                        )}
                                    </Button>
                                    {(isPricingEnabled && showBookingSlots && (selectedSizeId === item.id)) && (
                                        <Box className='booking-slot-table accordion-details'>
                                            {/* <Typography className='heading'>Select slot</Typography> */}
                                            <Box className='table-header-row'>
                                                {/* <Box></Box> */}
                                                <Typography className='duration-heading'>Duration</Typography>
                                                <Typography className='price-heading'>Price ({item?.currency})</Typography>
                                            </Box>
                                            {item?.bookingSlots.map((bookingSlot, index) => (
                                                <Box key={index} className={`table-info-row booking-slot ${(selectedSlotId === bookingSlot?.id) && 'selected'}`} onClick={() => setSelectedSlotId(bookingSlot?.id)}>
                                                    <Box className='icon-and-duration'>
                                                        <Box className='radio-icon'>
                                                            {(selectedSlotId === bookingSlot?.id) ? (
                                                                <RADIO_CHECKED_ICON />
                                                            ) : (
                                                                <RADIO_UNCHECKED_ICON />
                                                            )}
                                                        </Box>
                                                        <Typography className='slot-duration'>{bookingSlot?.durationRange}</Typography>
                                                    </Box>
                                                    {/* <Typography>{bookingSlot?.duration}</Typography> */}
                                                    <Typography className='slot-price'>{bookingSlot?.price}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                        {isPricingEnabled && (
                            <>
                                <Box className='book-button-container'>
                                    <ButtonComponent
                                        buttonId='book-button'
                                        handleClick={() => setBookingConfirmationModalVisibility(true)}
                                        disabled={(selectedSlotId ? false : true)}
                                        title={t('Check-In')}
                                        type={BUTTON_PRIMARY}
                                    />
                                </Box>
                                <Box className='booking-instructions'>
                                    <Typography className='heading'>{t('instructions')}</Typography>
                                    <List disablePadding className='instructions-list'>
                                        <ListItem disablePadding className='list-item'>
                                            <ListItemIcon className='icon-container'>
                                                <Circle className='circle-icon' />
                                            </ListItemIcon>
                                            <ListItemText>{t('luggageLockerInstructionsPoint1')}</ListItemText>
                                        </ListItem>
                                        <ListItem disablePadding className='list-item'>
                                            <ListItemIcon className='icon-container'>
                                                <Circle className='circle-icon' />
                                            </ListItemIcon>
                                            <ListItemText>{t('luggageLockerInstructionsPoint2')}</ListItemText>
                                        </ListItem>
                                        <ListItem disablePadding className='list-item'>
                                            <ListItemIcon className='icon-container'>
                                                <Circle className='circle-icon' />
                                            </ListItemIcon>
                                            <ListItemText>{t('luggageLockerInstructionsPoint3')}</ListItemText>
                                        </ListItem>
                                    </List>
                                </Box>
                            </>
                        )}
                        <CustomDialog
                            dialogId='booking-confirmation-modal'
                            dialogVisible={showBookingConfirmationModal}
                            onClose={() => setBookingConfirmationModalVisibility(false)}
                            handleCancel={() => setBookingConfirmationModalVisibility(false)}
                            handleAccept={bookButtonHandler}
                            dialogTitle={t('Please Confirm Booking Details')}
                            children={renderBookingConfirmationModalContent}
                            buttonOneTitle={t('Cancel')}
                            buttonTwoTitle={t('Check-In')}
                            buttonProps={{ buttonOne: {type: BUTTON_WARNING}, buttonTwo: {type: BUTTON_PRIMARY} }}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default LockerSizePage;
