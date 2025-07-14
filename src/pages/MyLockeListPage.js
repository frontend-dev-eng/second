import React, { useEffect, useState, useCallback, useRef } from 'react';
import moment from 'moment-timezone';
import {Box,Typography,Grid, Divider,useTheme} from '@mui/material';
import CircularProgressLoader from "../components/CircularProgressLoader";
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { BarcodeIcon, ButtonFloatingIcon, SearchIcon } from '../assets/constants/Icons';
import ButtonComponent from "../components/ButtonComponent";
import dashIcon from '../assets/images/dash_icon.png';
import CustomSearchBar from '../components/CustomSearchBar';
import { LockerItemWithDetails } from '../components/LockerItemWithDetails';
import { BadgeComponent } from '../components/BadgeComponent';
import { getSecureItemFromSpecificStorage, storeSecureItemInSpecifiedStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, SESSION_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, USER_INFO, SS_PAYMENT_GATEWAY, SS_PAYMENT_GATEWAY_ACCESS_KEY, LS_IS_REDIRECTED_FROM_STRIPE_PAYMENT_GATEWAY, LS_PROP_LOCKER_UNIT_DETAILS, LS_IS_OPEN_WITH_CHECKOUT_AFTER_OVERSTAY_PAYMENT } from '../assets/constants/BrowserStorageKeys';
import { getAssignedLockerList, openLocker, releaseLockerOfPickUpUser, getAvailableLockerSizesWithUnits, reserveLocker, overduePayment, fetchPaymentStatus, cancelDropOffTransaction } from '../api/api';
import { DYNAMIC_USE_CASE, LUGGAGE_USE_CASE, RETURN, SUCCESS, TOAST_SUCCESS, TOAST_ERROR, ERROR, PENDING, ASSIGNED, COD, REDIRECT, BUTTON_PRIMARY, BUTTON_WARNING } from '../assets/constants/Constants';
import {HOME, LANDING, PAYMENT_GATEWAY, LOCKER_SIZE_SELECTION, LOCKER_UNIT_SELECTION, OPEN_LOCKER, LOCKER_OPENED} from '../assets/constants/PageList';
import { devConsoleLog, getPathForNextPage, convertDurationStringToMilliseconds, convertMillisecondsToSpecifiedTimeFormat, extractPageNumber, arePaymentGatewayAndAccessKeyValid, verifyUserProximity } from '../lib/Utils';
import { APP_RICH_BLACK_COLOR, APP_WHITE_COLOR } from '../assets/constants/Colors';
import CustomDialog from '../components/CustomDialog';
import ShowToast from '../components/ToastComponent';
import { prePaymentRegistration } from '../lib/BackendUtils';

const MyLockeListPage = () => {
    const history = useHistory();
    const { t } = useTranslation();
    moment.tz.setDefault('Asia/Kolkata');
    const lockerBankId = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK)?.lockerBankId;
    const settings = getSecureItemFromSpecificStorage(LOCAL_STORAGE,LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS)
    const userId = getSecureItemFromSpecificStorage(LOCAL_STORAGE, USER_INFO)?.id;
    const isAssignmentPricingEnabled = settings?.is_pricing;
   
    console.log(getSecureItemFromSpecificStorage(LOCAL_STORAGE, USER_INFO))
    console.log(`settings:`,settings);
    console.log(`isAssignmentPricingEnabled:`,isAssignmentPricingEnabled);
    
    const gracePeriodInMilliseconds = (settings?.grace_period) ? convertDurationStringToMilliseconds(settings?.grace_period) : 0;
    console.log('grace period: ', gracePeriodInMilliseconds);
    // const [areCountersRunningForSlotBasedLockers, setCountersState] = useState(false);
    const counterRef = useRef(null);
    const [expandedLockerRefId, setExpandedLockerRefId] = useState(null);
    const isInitialGetAssignedLockersDoneRef = useRef(false);
    const [lockerList, setLockerList] = useState([]);
    const [selectedLockerItemForOverstayPayment, setSelectedLockerItemForOverstayPayment] = useState({});
    const [isOpenWithCheckoutAfterOverstayPayment, setIsOpenWithCheckoutAfterOverstayPayment] = useState(false);
    const [selectedBookingSlotForOverstayPayment, setSelectedBookingSlotForOverstayPayment] = useState({});
    const [amountToBePaidForOverstay, setAmountToBePaidForOverstay] = useState(0);
    const [isOverstayPaymentModalVisible, setIsOverstayPaymentModalVisible] = useState(false);
    const [userProximityError, setUserProximityError] = useState('');
    const [isUserProximityErrorModalVisible, setIsUserProximityErrorModalVisible] = useState(false);
    // const [deviceToken, setDeviceToken] = useState('');
    // const [selectedId, setSelectedId] = useState(null);
    // const [selectedLocker, setSelectedLocker] = useState(null);
    const [isLoading, setLoaderDisabled] = useState(isAssignmentPricingEnabled ? true : false);
    // const [shareLockerList, setshareLockerList] = useState([]);
    // const [listSize, setListSize] = useState(undefined);
    const [active, setActive] = useState(false);
    const [assignLockerror, setAssignLockerror] = useState(false);
    // const [shareLockerror, setShareLockerror] = useState(false);
    const [message, setMessage] = useState({});
    const [originalLockerList, setOriginalLockerList] = useState([]);
    const [returnedLockersList, setReturnedLockersList] = useState([]);
    const [returnFilteredList, setReturnFilteredList] = useState([]);
    const [extraFeatureEnabled, setExtraFeatureEnabled] = useState(false);
    const [hasReturnedLockers, setHasReturnedLockers] = useState(false);
    const [hasDataInSearch, setHasDataInSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [itemPerPage, setItemPerPage] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState(isAssignmentPricingEnabled ? 'Getting assigned lockers' : '');
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [hasNextPageForSearch,setHasNextPageForSearch] = useState(false);
    const [filteredLockers, setFilteredLockers] = useState([]);
    const [isSearchComplete,setIsSearchComplete] = useState(false);
    const [hasPendingLockers, setHasPendingLockers] = useState(0);
    // console.log('settings: ', settings);
    const prevSearchTextRef = useRef();
    const [hasMore, setHasMore] = useState(false);
    const scrollContainerRef = useRef(null);
    const [page,setPage] = useState(1);
    const [count,setCount] = useState(0);
     // Refs to keep track of the latest values
    const hasMoreRef = useRef(hasMore);
    const nextPageUrlRef = useRef(nextPageUrl);
    const pageRef = useRef(page);
    const theme = useTheme();
    const colorScheme = theme.palette.mode;

    const LoadersetON = () => {
        setLoaderDisabled(true);
    };
    const LoadersetOFF = () => {
        setLoaderDisabled(false);
    };

    const toggleLockerAccordionState = (lockerItem) => {
        // if (lockerItem.status === RETURN && hasReturnedLockers) {
        //     return;
        // }

        if (lockerItem?.locker_door?.is_blocked) {
            ShowToast('Locker is blocked. Please contact admin.', TOAST_ERROR);
            return;
        }
        
        if (expandedLockerRefId === lockerItem.ref_id) {
            setExpandedLockerRefId(null);
        }
        else {
            setExpandedLockerRefId(lockerItem.ref_id);
        }
    };

    /**
     1) Runs when the component mounts or when lockerList.length changes.
     2)If pricing isn't enabled or no lockers exist, the function exits early. No need to set up a counter.
     2) If assignment pricing is enabled and lockerList is not empty, it sets up an interval to update the usage time for each assigned locker every second.
     3) The interval calculates the usage time, remaining booking duration, and overstay duration
     4) It formats the usage time into a human-readable format (days, hours, minutes, seconds).
    
    */ 

    useEffect(() => {
         console.log('MyLockeListPage mounted');
        if ( !isAssignmentPricingEnabled || lockerList.length === 0) {
            return;
        }
          console.log('Setting up the counter for assigned lockers.');

          //  Clear any existing interval before setting a new one 
        if (counterRef.current) {
            clearInterval(counterRef.current);
        }

        counterRef.current = setInterval(() => {
            const currentTime = moment();

            setLockerList((prevLockerList) => {
                return prevLockerList.map((locker) => {
                    if (locker?.selected_size_pricing?.id && locker?.status === 'assigned') {
                        const assignedDateAndTime = moment(locker?.assigned_date);
                        const usageTimeInMilliseconds = currentTime.diff(assignedDateAndTime);
                        const remainingBookingDurationInMilliseconds = (usageTimeInMilliseconds <= locker.totalBookingDurationInMilliseconds) ? (locker.totalBookingDurationInMilliseconds - usageTimeInMilliseconds) : 0;
                        const overstayDurationInMilliseconds = (usageTimeInMilliseconds > locker.totalBookingDurationInMilliseconds) ? (usageTimeInMilliseconds - locker.totalBookingDurationInMilliseconds) : 0;
                        const isOverstay = overstayDurationInMilliseconds > 0 ? true : false;
                        // devConsoleLog('remaining booking duration in milliseconds: ', remainingBookingDurationInMilliseconds);
                        // devConsoleLog('overstay duration in milliseconds: ', overstayDurationInMilliseconds);
                        // const usageTimeDuration = moment.duration(usageTimeInMilliseconds);
                        const formattedUsageTime = convertMillisecondsToDaysHoursMinutesSecondsFormat(isOverstay ? overstayDurationInMilliseconds : remainingBookingDurationInMilliseconds);

                        // const isOverstay = checkIfOverstay(convertDurationStringToMilliseconds(locker?.selected_size_pricing.duration), gracePeriodInMilliseconds, usageTimeInMilliseconds);

                        return {
                            ...locker,
                            totalUsageTimeInMilliseconds: usageTimeInMilliseconds,
                            remainingBookingDurationInMilliseconds,
                            overstayDurationInMilliseconds,
                            usageTime: formattedUsageTime,//moment(usageTimeInMilliseconds).format('HH:mm:ss'),
                            isOverstay
                        }
                    }

                    return locker;
                });
            });
        }, 1000);

        return () => {
            if (counterRef.current) {
                clearInterval(counterRef.current);
            }
        }
    }, [lockerList.length]);

    
    const checkIfOverstay = (selectedDurationInMilliseconds, gracePeriodInMilliseconds, usageTimeInMilliseconds) => {
        return (usageTimeInMilliseconds < (selectedDurationInMilliseconds + gracePeriodInMilliseconds)) ? false : true;
    };

    const convertMillisecondsToDaysHoursMinutesSecondsFormat = (milliseconds) => {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        const formattedDays = days.toString().padStart(1, '0');
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedDays} d : ${formattedHours} h : ${formattedMinutes} m : ${formattedSeconds} s`;
    };

    const getAssignedLockersAndCheckPaymentStatus = async () => {
        let getAssignedLockersResponse = await getAssignedLockers(settings.id);
        let assignedLockerList = getAssignedLockersResponse?.data.length > 0 ? getAssignedLockersResponse?.data : [];
        devConsoleLog('assigned locker list: ', assignedLockerList);

        const shouldRefetchUpdatedAssignedLockersList = await checkPaymentStatusOfPendingReservationsAndOverstayTransactions(assignedLockerList);
        devConsoleLog('Should refetch updated assigned lockers list?', shouldRefetchUpdatedAssignedLockersList);

        if (shouldRefetchUpdatedAssignedLockersList) {
            getAssignedLockersResponse = await getAssignedLockers(settings.id);
            assignedLockerList = getAssignedLockersResponse?.data.length > 0 ? getAssignedLockersResponse?.data : [];
        }

        const updatedLockerList = calculateTotalBookingDurationForEachLocker(assignedLockerList);
        devConsoleLog('updated locker list with amount paid and booking duration: ', updatedLockerList);
        setLockerList(updatedLockerList);

        setLoaderDisabled(false);
    };

    const getAssignedLockers = async (assignmentId, searchText = '', pageNumber = 1) => {
        try {
            const getAssignedLockerListResponse = await getAssignedLockerList(assignmentId, searchText, pageNumber);

            if (getAssignedLockerListResponse?.status === SUCCESS) {
                return getAssignedLockerListResponse; //?.data.length > 0 ? getAssignedLockerListResponse?.data : [];
            }
        } catch (error) {
            console.error('Error while fetching assigned lockers list: ', error);
            return [];
        }
    };

    const checkPaymentStatusOfPendingReservationsAndOverstayTransactions = async (assignedLockerList) => {
        const paymentStatusCheckPromises = [];
        let shouldRefetchUpdatedAssignedLockersList = false;

        for (const locker of assignedLockerList) {
            if (locker.status === 'pending') {
                shouldRefetchUpdatedAssignedLockersList = true;
                paymentStatusCheckPromises.push(checkPaymentStatusAndCancelPendingReservation(locker));
            }
            else if (locker.status === 'assigned') {
                for (const paymentRecord of locker.payment_records) {
                    if ((paymentRecord.payment_type === 'OVERDUE') && (paymentRecord.status !== 'completed') && (paymentRecord.status !== 'failed')) {
                        shouldRefetchUpdatedAssignedLockersList = true;
                        paymentStatusCheckPromises.push(checkPaymentStatus(paymentRecord.transaction_id, paymentRecord.payment_gateway));
                    }
                };
            }
        };

        if (paymentStatusCheckPromises.length > 0) {
            await Promise.all(paymentStatusCheckPromises);
        }

        return shouldRefetchUpdatedAssignedLockersList;
    };

    const checkPaymentStatusOfAssignedLockersWithCod = async (assignedLockersList) => {
        const paymentStatusCheckPromises = [];
        let shouldRefetchUpdatedAssignedLockersList = false;

        for (const locker of assignedLockersList) {
            if ((locker.status === ASSIGNED) && (locker.payment_type === COD)) {
                for (const paymentRecord of locker.payment_records) {
                    if ((paymentRecord.payment_type === 'PAYMENT') && (paymentRecord.status !== 'completed') && (paymentRecord.status !== 'failed')) {
                        shouldRefetchUpdatedAssignedLockersList = true;
                        paymentStatusCheckPromises.push(checkPaymentStatus(paymentRecord.transaction_id, paymentRecord.payment_gateway));
                    }
                };
            }
        };

        if (paymentStatusCheckPromises.length > 0) {
            await Promise.all(paymentStatusCheckPromises);
        }

        return shouldRefetchUpdatedAssignedLockersList;
    }

    const checkPaymentStatusAndCancelPendingReservation = async (locker) => {
        try {
            const isLockerReservationPaymentSuccessful = (locker.payment_records[0].status === 'failed') ? false : await checkPaymentStatus(locker.payment_records[0].transaction_id, locker.payment_records[0].payment_gateway);
            // devConsoleLog('is locker reservation payment successful? ', isLockerReservationPaymentSuccessful);

            if (isLockerReservationPaymentSuccessful) {
                return true;
            }
            else if (isLockerReservationPaymentSuccessful === false) {
                const isReservationCancelled = await cancelPendingReservation(locker.ref_id, 'Cancel luggage locker reservation: Unsuccessful payment.');
                
                if (isReservationCancelled) {
                    devConsoleLog('Reservation cancelled for locker: ', locker?.locker_door?.door_no);
                }
                else {
                    devConsoleLog('Unable to cancel reservation for locker: ', locker?.locker_door?.door_no);
                }
            }

            return false;
        } catch (error) {
            console.error();
        }
    };

    const checkPaymentStatus = async (paymentTransactionId, paymentGateway) => {
        try {
            const fetchPaymentStatusResponse = await fetchPaymentStatus(paymentTransactionId, paymentGateway);
            // devConsoleLog('fetch payment status response: ', fetchPaymentStatusResponse);

            if (fetchPaymentStatusResponse?.status === SUCCESS) {
                return fetchPaymentStatusResponse?.data?.is_paid;
            }
        } catch (error) {
            console.error('Error while fetching payment status: ', error);
            return undefined;
        }
    };

    const cancelPendingReservation = async (lockerReferenceId, cancellationReason) => {
        try {
            const cancelReservationResponse = await cancelDropOffTransaction(lockerReferenceId, cancellationReason);

            if (cancelReservationResponse?.status === SUCCESS) {
                return true;
            }
        } catch (error) {
            console.error('Error while cancelling pending reservation: ', error);
            return undefined;
        }
    };

    const calculateTotalBookingDurationForEachLocker = (assignedLockerList) => {
        return assignedLockerList.map((locker) => {
            if (locker.status === 'assigned') {
                locker.size_pricing.forEach((slot) => {
                    slot.durationInMilliseconds = convertDurationStringToMilliseconds(slot.duration);
                });

                const incrementallySortedBookingSlots = locker?.size_pricing?.slice().sort((a, b) => a.durationInMilliseconds - b.durationInMilliseconds);
                const maxDurationBookingSlot = incrementallySortedBookingSlots[incrementallySortedBookingSlots.length - 1];
                // devConsoleLog('max duration booking slot: ', maxDurationBookingSlot);
                const wasPaymentMadeForMaxDurationBookingSlot = maxDurationBookingSlot.durationInMilliseconds === convertDurationStringToMilliseconds(locker.selected_size_pricing.duration);
                // devConsoleLog('was payment made for max duration booking slot?', wasPaymentMadeForMaxDurationBookingSlot);
                // let totalAmountPaid = 0;
                let totalBookingDurationInMilliseconds = 0;

                // if (wasPaymentMadeForMaxDurationBookingSlot) {
                const totalAmountPaid = locker.payment_records.reduce((accumulatedAmount, paymentRecord) => {
                    if ((paymentRecord.payment_type === 'PAYMENT' || paymentRecord.payment_type === 'OVERDUE') && (paymentRecord.status === 'completed')) {
                        return accumulatedAmount + parseFloat(paymentRecord.amount);
                    }
                    else {
                        return accumulatedAmount;
                    }
                }, 0);
                const isTotalAmountPaidGreaterThanMaxDurationBookingSlotPrice = totalAmountPaid > parseFloat(maxDurationBookingSlot.price);

                if (isTotalAmountPaidGreaterThanMaxDurationBookingSlotPrice) {
                    const NumberOfMaxDurationBookingSlotsBasedOnTotalAmountPaid = totalAmountPaid / parseFloat(maxDurationBookingSlot.price);
                    // devConsoleLog('number of max duration bookings slots the total amount is paid for: ', NumberOfMaxDurationBookingSlotsBasedOnTotalAmountPaid);
                    totalBookingDurationInMilliseconds = NumberOfMaxDurationBookingSlotsBasedOnTotalAmountPaid * maxDurationBookingSlot.durationInMilliseconds;
                }
                else {
                    const bookingSlotToConsiderBasedOnTotalAmountPaid = locker.size_pricing.find((slot) => totalAmountPaid === parseFloat(slot.price));
                    devConsoleLog('booking slot to consider based on total amount: ', bookingSlotToConsiderBasedOnTotalAmountPaid);
                    // totalAmountPaid = parseFloat(locker.selected_size_pricing.price);
                    totalBookingDurationInMilliseconds = bookingSlotToConsiderBasedOnTotalAmountPaid.durationInMilliseconds;
                }
                devConsoleLog('total amount paid: ', totalAmountPaid);
                devConsoleLog('total booking duration in milliseconds: ', totalBookingDurationInMilliseconds);

                return {
                    ...locker,
                    totalAmountPaid,
                    totalBookingDurationInMilliseconds
                };
            }
            else {
                return locker;
            }
        });
    };

    const filterLockersWithPendingStatus = (lockerList) => lockerList?.filter(locker => locker.status === PENDING);

    const filterLockersWithReturnedStatus = (lockerList) => lockerList?.filter(locker => locker.status === RETURN);

    const filterAllLockersWithoutReturnedStatus = (lockerList) => lockerList?.filter(locker => locker.status !== RETURN);

    /** 
     * 1) this is second useEffect
     * 2) The purpose of this useEffect is to monitor changes to the length of returnedLockersList and update the hasReturnedLockers state accordingly.
     * 3) When returnedLockersList.length changes, it checks if the length is greater than 0.
     * 4) If it is, it sets hasReturnedLockers to true, indicating that there are returned lockers available.
     * 5) If the length is 0, hasReturnedLockers will be set to false, indicating that there are no returned lockers available.
     * 6) This useEffect is useful for triggering UI updates or other side effects based on the presence of returned lockers in the returnedLockersList.
     * What Triggers This Effect?
            a) The effect runs whenever the length of returnedLockersList changes, i.e.:
            b) When items are added to returnedLockersList
            c) When items are removed
            d) When it's initialized
     *  */ 

    useEffect(() => {
         console.log(`second useEffect for returnedLockersList.length: `, returnedLockersList.length);
        if (returnedLockersList.length > 0) {
            setHasReturnedLockers(true);
        }
    }, [returnedLockersList.length]);

    const resetAllLockerRelatedInfoInBetweenSearches = () => {
        setLockerList([]);
        setHasPendingLockers([]);
        setHasReturnedLockers(false);
        setReturnedLockersList([]);
        setFilteredLockers([]);
        setReturnFilteredList([]);
        setExtraFeatureEnabled(false);
    }

    const getLockerInfo = async (searchText,page = 1) => {
        try {
            if (page === 1) {
                setLockerList([]);
                setFilteredLockers([])
            }
            if (settings) {
                try {
                    let assignLockerList = await getAssignedLockers(settings.id, searchText, page);
                    devConsoleLog('assigned locker list: ', assignLockerList);

                    const shouldRefetchUpdatedAssignedLockersList = await checkPaymentStatusOfAssignedLockersWithCod(assignLockerList?.data.length > 0 ? assignLockerList.data : []);
                    devConsoleLog('should refetch updated assigned lockers list? ', shouldRefetchUpdatedAssignedLockersList);

                    if (shouldRefetchUpdatedAssignedLockersList) {
                        assignLockerList = await getAssignedLockers(settings.id, searchText, page);
                    }

                    if (assignLockerList?.data.length > 0) {
                        assignLockerList = loopAndFlagAssignedLockersWithPendingPayment(assignLockerList);
                    }

                    devConsoleLog('updated locker list: ', assignLockerList);

                    if (assignLockerList?.status === SUCCESS) {
                        // console.log('assigned locker list: ', assignLockerList?.data);
                        setActive(false);
                        setAssignLockerror(false);
                        if (assignLockerList.next) {
                            setHasMore(true);
                            setNextPageUrl(assignLockerList.next);
                        } else {
                            setHasMore(false);
                            setNextPageUrl('');
                        }
                        setItemPerPage(assignLockerList?.item_per_page);
                        const hasPendingLockers = filterLockersWithPendingStatus(assignLockerList.data); //.filter(locker => locker.status === PENDING);
                        setHasPendingLockers(hasPendingLockers);
                        // const hasReturnedStatus = assignLockerList.data.some(locker => locker.status === RETURN);
                        const returnedLockers = filterLockersWithReturnedStatus(assignLockerList.data); //.filter(locker => locker.status === RETURN);
                        // setHasReturnedLockers( ((returnedLockers?.length > 0) || (returnedLockersList?.length > 0)) ? true : false ); //(hasReturnedStatus)
                        setReturnedLockersList(prevList => [...prevList, ...returnedLockers]);
                        const assignedLockers = filterAllLockersWithoutReturnedStatus(assignLockerList.data); //.filter(locker => locker.status !== RETURN);
                        setLockerList(prevList => [...prevList, ...assignedLockers]);
                        const extraFeatureEnabled = (hasPendingLockers?.length > 0) ? true : false; //assignLockerList.data.some(item => item.status ===  PENDING);
                        setExtraFeatureEnabled(extraFeatureEnabled);
                        if ((searchText === undefined || searchText === '') && page === 1) {
                            setCount(assignLockerList?.count)
                            setOriginalLockerList(assignLockerList.data);
                        }
                    } else {
                        setActive(assignLockerList === false);
                        setMessage({ maintext: t('InternalServerText'), subtext: '' });
                        setAssignLockerror(assignLockerList === null);
                    }
                } catch (error) {
                    setMessage({ maintext: t('ServerTimeout') });
                    setAssignLockerror(true);
                    console.error('getMyLockerList error', error);
                }
            }
        } catch (error) {
            console.error('getLockerInfo getMyLockerList try catch = ', error);
        }
    }



    /**
     * Retrieves locker information after performing a search.
     * 
     * @param {string} searchText - The text to search for.
     * @param {number} [page=1] - The page number to retrieve.
     * @returns {Promise<void>} - A promise that resolves when the locker information is retrieved.
     * @throws {Error} - If an error occurs while retrieving the locker information.
     */
    const getLockerInfoAfterSearch = async (searchText, page = 1) => {
        try {
            if (searchText.length > 0) {
                setFilteredLockers([]);
                setReturnFilteredList([]);
            }
            if (settings) {
                let assignLockerList = await getAssignedLockers(settings.id, searchText, page);
                devConsoleLog('assigned locker list after search: ', assignLockerList);

                const shouldRefetchUpdatedAssignedLockersList = await checkPaymentStatusOfAssignedLockersWithCod(assignLockerList?.data.length > 0 ? assignLockerList.data : []);
                devConsoleLog('should refetch updated assigned lockers after search? ', shouldRefetchUpdatedAssignedLockersList);

                if (shouldRefetchUpdatedAssignedLockersList) {
                    assignLockerList = await getAssignedLockers(settings.id, searchText, page);
                }

                if (assignLockerList?.data.length > 0) {
                    assignLockerList = loopAndFlagAssignedLockersWithPendingPayment(assignLockerList);
                }

                devConsoleLog('updated locker list after search: ', assignLockerList);
                
                if (assignLockerList) {
                    setActive(false);
                    setAssignLockerror(false);
                    if (assignLockerList.next) {
                        setHasNextPageForSearch(assignLockerList.next);
                    } else {
                        setHasNextPageForSearch(false);
                    }
                    setIsSearchComplete(true);
                    const assignedLockers = filterAllLockersWithoutReturnedStatus(assignLockerList.data); //.filter(locker => locker.status !== RETURN);
                    setFilteredLockers(assignedLockers);
                    assignLockerList.data.length > 0 && setHasDataInSearch(true);
                    const returnedLockers = filterLockersWithReturnedStatus(assignLockerList.data); //.filter(locker => locker.status === RETURN);
                    // const hasReturnedStatus = assignLockerList?.data.some(locker => locker.status === RETURN);
                    setHasReturnedLockers( (returnedLockers?.length > 0) ? true : false );
                    setReturnFilteredList(returnedLockers);
                    const extraFeatureEnabled = assignLockerList.data.some(item => item.status === PENDING);
                    setExtraFeatureEnabled(extraFeatureEnabled);
                    devConsoleLog('length', returnedLockers?.length, returnedLockers?.length > 0);
                } else {
                    setActive(assignLockerList === false);
                    setMessage({ maintext: t('InternalServerText'), subtext: '' });
                    setAssignLockerror(assignLockerList === null);
                }
            }
        } catch (error) {
            setIsSearchComplete(true);
            console.error('getLockerInfo getMyLockerList try catch = ', error);
        }
    }

    const loopAndFlagAssignedLockersWithPendingPayment = (lockerList) => {
        const updatedLockerListData = lockerList.data.map((locker) => {
            if ((locker.status === 'assigned') && (locker.payment_type === 'cod')) {
                const isCodPaymentDone = locker.payment_records.some(paymentRecord => (paymentRecord.payment_type === 'PAYMENT' && paymentRecord.status === 'completed'));

                return {
                    ...locker,
                    isCodPaymentPending: !isCodPaymentDone
                };
            }

            return locker;
        });

        return {
            ...lockerList,
            data: updatedLockerListData
        };
    }

    /*
    const getSharedLockerInfo = async () => {
        // setSharedList([]);
        setListSize(0);
        try {
            const accessToken = localStorage.getItem('token');
            const domain = localStorage.getItem('domain');
            if (accessToken && domain) {
                try {
                    const data ="" //await getMySharedLockerList(accessToken, domain);
                    if (data) {
                        setShareLockerror(false);
                        const shareSize = data.shared_with_me.length;
                        if (shareSize > 0) {
                            setshareLockerList(data);
                            // setSharedList(data.shared_with_me);
                            setListSize(shareSize);
                        } else {
                            // setSharedList([]);
                            setListSize(0);
                        }
                    } else {
                        setMessage({ maintext: t('InternalServerText'), subtext: '' });
                        setShareLockerror(true);
                        setActive(false);
                    }
                } catch (error) {
                    setMessage({ maintext: t('ServerTimeout') });
                    setShareLockerror(true);
                }
            }
        } catch (error) {
            console.error('getSharedLockerInfo getMySharedLockerList try catch =', error);
        }
    };
    */

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            func(...args);
          }, delay);
        };
      };

    const debouncedGetLockerInfo = useCallback(debounce((text) => {
        getLockerInfoAfterSearch(text);
    }, 500), []);

    /**
     * Handles searching for a user in the local locker list.
     */
    const handleSearchUserInLocal = () => {
        try {
            const filtered = originalLockerList.filter((locker) =>
                locker?.client_ref?.toLowerCase().includes(searchText?.toLowerCase()) || locker?.locker_door?.door_no.includes(searchText)
            );
            const filteredLockers = filterAllLockersWithoutReturnedStatus(filtered); //?.filter(locker => locker.status !== RETURN);
            const extraFeatureEnabled = filtered?.some(item => item.status ===  PENDING);
            setExtraFeatureEnabled(extraFeatureEnabled);
            setFilteredLockers(filteredLockers);
            if (filtered.length > 0) {
                setHasDataInSearch(true);
            } else {
                setHasDataInSearch(false);
            }
            const returnedLockers = filterLockersWithReturnedStatus(filtered); //.filter(locker => locker.status === RETURN);
            // const hasReturnedStatus = filtered.some(locker => locker.status === RETURN);
            setHasReturnedLockers( (returnedLockers?.length > 0) ? true : false );
            setReturnFilteredList(returnedLockers);
            devConsoleLog('length local: ', returnedLockers?.length, returnedLockers?.length > 0)
        } catch (error) {
            console.error("MyLockerListPage.js - handleSearchUserInLocal", error)
        }
    }

    /**
     * this is the third useEffect 
     * 1) The purpose of this useEffect is to perform two entirely different operations based on whether isAssignmentPricingEnabled is true or false, and it tracks changes to the searchText dependency.
     * 2) 
     */
    useEffect(() => {
        console.log(`thid useEffect`)
        if (isAssignmentPricingEnabled) {

        // This block executes only once after component mounts or when searchText changes,
        // provided assignment pricing is enabled and the operation hasn't already been done.

            if ( !isInitialGetAssignedLockersDoneRef.current ) {
                isInitialGetAssignedLockersDoneRef.current = true;
                devConsoleLog('Assignment pricing enabled: luggage locker functionality');
                getAssignedLockersAndCheckPaymentStatus();
            }
        }
        else {

            // This block runs on every change of searchText if assignment pricing is NOT enabled.
            if (prevSearchTextRef.current !== searchText) {
                resetAllLockerRelatedInfoInBetweenSearches();
                setHasReturnedLockers(false);
                if (searchText.length > 2) {

                     // If more than 2 characters typed:
                    if(count > itemPerPage){
                        debouncedGetLockerInfo(searchText); // Call debounced API search
                    }else{
                        handleSearchUserInLocal(); // Perform local search
                    }
                } else if (searchText.length === 0) {
                     // If searchText is cleared, reset search-related states
                    setPage(1)
                    setIsSearchComplete(false);
                    setHasDataInSearch(false);
                    getLockerInfo(); // Fetch default locker list
                }
                 // Store current searchText as previous for next comparison
                prevSearchTextRef.current = searchText;
            }
        }
    }, [searchText]);

    /**
     * Handles the scroll event and loads more locker information if there is more data available.
     */
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 1) {
            if (hasMoreRef.current) {
                const nextPage = extractPageNumber(nextPageUrlRef.current);
                setPage(nextPage);
                pageRef.current = nextPage
                getLockerInfo(searchText, nextPage);
            }
        }
    };

    const debouncedHandleScroll = useCallback(debounce(handleScroll, 200), []);

    /** 
     * this is the fourth useEffect
     * 1) This useEffect sets up and cleans up a scroll event listener for a container element to implement features like infinite scrolling or lazy loading, 
     * while keeping track of some pagination-related states in ref variables.
     */
      useEffect(() => {
        console.log(`forth useEffect for hasMore: `, hasMore, nextPageUrl, page);
        hasMoreRef.current = hasMore;
        nextPageUrlRef.current = nextPageUrl;
        pageRef.current = page;
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
          scrollContainer.addEventListener('scroll', debouncedHandleScroll);
        }
        return () => {
          if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', debouncedHandleScroll);
          }
        };
      }, [debouncedHandleScroll,hasMore, nextPageUrl,page]);
    

    const navigateToScanBarCode = () => {
        history.push('/new-reserve-locker', {scan_barcode: true,hasPendingLockers});
    };

    const navigateToScanQRCode = () => {
        history.push('/new-reserve-locker', {scan_qr_code: true, hasPendingLockers});
    };

    const Locker = ({ item, ListType,isReturnAndDropOff }) => {
        if (isAssignmentPricingEnabled) {
            const isSelectedBookingSlotAvailableForLocker = item?.selected_size_pricing?.id ? true : false;
            const isPaymentPendingWhenSelectedBookingSlotIsAvailable = (item?.status === 'pending') ? true : false;

            if (isSelectedBookingSlotAvailableForLocker && isPaymentPendingWhenSelectedBookingSlotIsAvailable) {
                return (
                    <></>
                );
            }
            else {
                return (
                    <LockerItemWithDetails
                        item={item}
                        className='locker-item'
                        usecase={settings.usecase}
                        showBookingDateAndTime={true}
                        showOpenAndCheckoutButtons={true}
                        isLockerAccordionExpanded={expandedLockerRefId === item.ref_id}
                        onLockerAccordionStateToggle={() => toggleLockerAccordionState(item)}
                        LoadersetOFF={LoadersetOFF}
                        openAndCheckoutButtonsHandler={openAndCheckoutButtonsHandler}
                        // openWithAndWithoutCheckout={openWithAndWithoutCheckout}
                        // showOverstayPaymentConfirmationModal={showOverstayPaymentConfirmationModal}
                        // makePrePaymentRegistration={makePrePaymentRegistration}
                        setLoader={setLoaderDisabled}
                        isLockerOpening={isLoading}
                        setLoaderMessage={setLoadingMessage}
                    />
                );
            }
        }
        else {
            return (
                <LockerItemWithDetails
                    item={item}
                    className='locker-item'
                    // onPress={setSliderId}
                    usecase={settings.usecase}
                    isLockerAccordionExpanded={expandedLockerRefId === item.ref_id}
                    onLockerAccordionStateToggle={() => toggleLockerAccordionState(item)}
                    // selectSlider={selectSlider}
                    // token={deviceToken}
                    ListType={ListType}
                    // LoadersetON={LoadersetON}
                    LoadersetOFF={LoadersetOFF}
                    openAndCheckoutButtonsHandler={openAndCheckoutButtonsHandler}
                    initiateCodPayment={initiateCodPayment}
                    isReturnAndDropOff={isReturnAndDropOff}
                    setLoader={setLoaderDisabled}
                    isLockerOpening={isLoading}
                    setLoaderMessage={setLoadingMessage}
                    hasPendingLockers={hasPendingLockers}
                    returnedLockers={returnedLockersList}
                />
            );
        }
    };


    const handleSearchText = (e) => {
        setSearchText(e.target.value.trim())
    }

    const openAndCheckoutButtonsHandler = (isWithCheckout, lockerItem) => {
        if ((lockerItem?.isOverstay) && (lockerItem.overstayDurationInMilliseconds > gracePeriodInMilliseconds)) {
            showOverstayPaymentConfirmationModal(isWithCheckout, lockerItem);
        }
        else {
            openWithAndWithoutCheckout(isWithCheckout, lockerItem);
        }
    }

    const showOverstayPaymentConfirmationModal = (isWithCheckout, lockerItem) => {
        const amountToBePaid = calculateOverstayAmount(lockerItem);
        setAmountToBePaidForOverstay(amountToBePaid);
        setSelectedLockerItemForOverstayPayment(lockerItem);
        setIsOpenWithCheckoutAfterOverstayPayment(isWithCheckout);
        setIsOverstayPaymentModalVisible(true);
    }

    const calculateOverstayAmount = (lockerItem) => {
        const totalUsageTimeInMilliseconds = lockerItem.totalUsageTimeInMilliseconds;
        const selectedBookingSlotDetails = lockerItem.selected_size_pricing;
        const amountAlreadyPaid = lockerItem.totalAmountPaid;
        let amountToBePaid = 0;

        lockerItem.size_pricing.forEach((slot) => {
            slot.durationInMilliseconds = convertDurationStringToMilliseconds(slot.duration);
        });

        const incrementallySortedBookingSlots = lockerItem?.size_pricing?.slice().sort((a, b) => a.durationInMilliseconds - b.durationInMilliseconds);
        const maxDurationBookingSlot = incrementallySortedBookingSlots[incrementallySortedBookingSlots.length - 1];
        // console.log('incrementally sorted booking slots: ', incrementallySortedBookingSlots);
        // console.log('max duration booking slot: ', maxDurationBookingSlot);

        if (totalUsageTimeInMilliseconds > (maxDurationBookingSlot.durationInMilliseconds)) {
            let totalNumberOfMaxDurationSlotsToConsider = parseInt(totalUsageTimeInMilliseconds / maxDurationBookingSlot.durationInMilliseconds);
            const extraDurationBeyondAllMaxDurationsConsidered = totalUsageTimeInMilliseconds % maxDurationBookingSlot.durationInMilliseconds;

            if (extraDurationBeyondAllMaxDurationsConsidered >= gracePeriodInMilliseconds) {
                ++totalNumberOfMaxDurationSlotsToConsider;
            }

            amountToBePaid = (totalNumberOfMaxDurationSlotsToConsider * parseFloat(maxDurationBookingSlot.price)) - parseFloat(amountAlreadyPaid);
            // console.log('amount to pay: ', amountToBePaid);

            setSelectedBookingSlotForOverstayPayment(maxDurationBookingSlot);

            return amountToBePaid;
        }
        else {
            const bookingSlotToConsiderForOverstay = incrementallySortedBookingSlots.find((slot) => totalUsageTimeInMilliseconds < (slot.durationInMilliseconds + gracePeriodInMilliseconds));
            // console.log('booking slot to consider: ', bookingSlotToConsiderForOverstay);
            amountToBePaid = parseFloat(bookingSlotToConsiderForOverstay.price) - parseFloat(amountAlreadyPaid);
            // console.log('amount to pay: ', amountToBePaid);

            setSelectedBookingSlotForOverstayPayment(bookingSlotToConsiderForOverstay);

            return amountToBePaid;
        }
    }

    const renderOverstayPaymentModalContent = () => {
        const currency = selectedLockerItemForOverstayPayment?.assignment?.payment_gateway[0]?.currency ? `(${selectedLockerItemForOverstayPayment?.assignment?.payment_gateway[0]?.currency})` : '';

        return (
            <Box className='modal-content'>
                <Typography className='overstay-text'>You've exceeded your booking duration. Please pay excess usage fees to open your locker.</Typography>
                <Box className='info-row'>
                    <Typography className='left-column'>{`Price ${currency}:`}</Typography>
                    <Typography className='right-column'>{amountToBePaidForOverstay}</Typography>
                </Box>
            </Box>
        );
    }

    const makeOverstayPaymentAndThenAccessLocker = async () => {
        // console.log('selected locker: ', selectedLockerItemForOverstayPayment);

        setLoadingMessage('Initiating payment. Please wait');
        setLoaderDisabled(true);

        try {
            const overduePaymentResponse = await overduePayment(selectedLockerItemForOverstayPayment.ref_id, amountToBePaidForOverstay);
            // console.log('overdue payment response: ', overduePaymentResponse);

            if (overduePaymentResponse?.status === SUCCESS) {
                const overstayPrePaymentRegistrationResponse = await makeOverstayPrePaymentRegistration(overduePaymentResponse);
                // console.log('overstay pre payment registration response: ', overstayPrePaymentRegistrationResponse);

                if (overstayPrePaymentRegistrationResponse?.status === SUCCESS) {
                    if (isOpenWithCheckoutAfterOverstayPayment) {
                        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_IS_OPEN_WITH_CHECKOUT_AFTER_OVERSTAY_PAYMENT, true);
                    }

                    if (overstayPrePaymentRegistrationResponse?.data?.data?.payment_gateway === 'stripe') {
                        const lockerUnitDetails = selectedLockerItemForOverstayPayment;
                        const newPaymentRecord = {
                            payment_gateway: overstayPrePaymentRegistrationResponse?.data?.data?.payment_gateway,
                            payment_gateway_reference: overstayPrePaymentRegistrationResponse?.data?.data?.payment_id,
                            transaction_id: overstayPrePaymentRegistrationResponse?.data?.data?.transaction_id
                        };
                        lockerUnitDetails.payment_records.unshift(newPaymentRecord);

                        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_IS_REDIRECTED_FROM_STRIPE_PAYMENT_GATEWAY, true);
                        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_PROP_LOCKER_UNIT_DETAILS, lockerUnitDetails);

                        window.location.href = overstayPrePaymentRegistrationResponse?.data?.data?.field_1;
                        return;
                    }

                    if ( !arePaymentGatewayAndAccessKeyValid(overstayPrePaymentRegistrationResponse?.data?.data?.payment_gateway, overstayPrePaymentRegistrationResponse?.data?.data?.payment_gateway_reference) ) {
                        return;
                    }

                    const lockerData = {
                        reservedLocker: selectedLockerItemForOverstayPayment,
                        locker_bank: {
                            name: selectedLockerItemForOverstayPayment.locker_bank.name,
                            location: {
                                name: selectedLockerItemForOverstayPayment.locker_bank.location.name
                            }
                        },
                        assignment: {
                            payment_gateway: selectedLockerItemForOverstayPayment.assignment.payment_gateway
                        },
                        payment_records: [
                            { amount: overstayPrePaymentRegistrationResponse?.data?.data?.amount }
                        ],
                        user: {
                            username: '',
                            email: selectedLockerItemForOverstayPayment.user.email,
                            mobile_number: selectedLockerItemForOverstayPayment.user.mobile_number
                        }
                    };
                    // console.log('locker data for overstay: ', lockerData);

                    // if (isOpenWithCheckoutAfterOverstayPayment) {
                    //     sessionStorage.setItem('isOpenWithCheckoutAfterOverstayPayment', isOpenWithCheckoutAfterOverstayPayment);
                    // }
                    storeSecureItemInSpecifiedStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY, overstayPrePaymentRegistrationResponse?.data?.data?.payment_gateway);
                    storeSecureItemInSpecifiedStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY_ACCESS_KEY, overstayPrePaymentRegistrationResponse?.data?.data?.payment_gateway_reference);

                    setLoaderDisabled(false);
                    history.push({
                        pathname: '/payment-details',
                        state: {
                            lockerUnitDetails: selectedLockerItemForOverstayPayment,
                            lockerData,
                            // paymentGateway: overstayPrePaymentRegistrationResponse?.data?.data?.payment_gateway,
                            currentReferenceId: overstayPrePaymentRegistrationResponse?.data?.data?.transaction_id,
                            // paymentGatewayAccessKey: overstayPrePaymentRegistrationResponse?.data?.data?.payment_gateway_reference,
                            isOverstayPayment: true,
                            selectedBookingSlotForOverstayPayment
                        }
                    })
                }
            }
        } catch (error) {
            setLoaderDisabled(false);
            console.error('Error during overdue payment: ', error);
        }
    };

    const makeOverstayPrePaymentRegistration = async (overduePaymentResponse) => {
        try {
            const body = {
                "payment_reference_id": overduePaymentResponse?.data?.transaction_id,
                "payment_gateway": overduePaymentResponse?.data?.payment_gateway,
                "locker_bank_id": selectedLockerItemForOverstayPayment?.locker_bank.id,
                "locker_door_number": selectedLockerItemForOverstayPayment?.locker_door.door_no,
                "amount": overduePaymentResponse?.data?.amount,
                "currency": overduePaymentResponse?.data?.currency,
                "payment_mode": overduePaymentResponse?.data?.payment_mode
            };

            if (overduePaymentResponse?.data?.payment_gateway === 'stripe') {
                body.success_url = `${window.location.protocol}//${window.location.host}/swipe-to-open`;
                body.cancel_url = `${window.location.protocol}//${window.location.host}/home-screen`;
            }

            return await prePaymentRegistration(body);
        } catch (error) {
            console.error('Error while initiating payment for overstay: ', error);
        }
    };

    const openWithAndWithoutCheckout = async (withCheckout, lockerItem) => {
        setLoadingMessage('Opening locker. Please wait.');
        setLoaderDisabled(true);

        if (settings?.is_geofencing) {
            const lockerBankLatitude = lockerItem?.locker_bank?.latitude ? parseFloat(lockerItem?.locker_bank?.latitude) : null;
            const lockerBankLongitude = lockerItem?.locker_bank?.longitude ? parseFloat(lockerItem?.locker_bank?.longitude) : null;
            const maxAllowedDistanceInMeters = settings?.geofencing_radius;
            const isUserNearbyLockerBank = await verifyUserProximity({latitude: lockerBankLatitude, longitude: lockerBankLongitude}, maxAllowedDistanceInMeters);
            devConsoleLog('is user nearby locker bank: ', isUserNearbyLockerBank);

            if ( !isUserNearbyLockerBank.isNearby ) {
                setLoadingMessage('');
                setLoaderDisabled(false);
                setUserProximityError(isUserNearbyLockerBank.message);
                setIsUserProximityErrorModalVisible(true);

                return;
            }
        }

        try {
            const openLockerResponse = await openLocker(lockerItem?.ref_id);
            if (openLockerResponse.status === SUCCESS) {
                if (withCheckout) {
                    setLoadingMessage('Checkout in progress. Please wait.');
                    const releaseLockerResponse = await releaseLockerOfPickUpUser(lockerItem?.ref_id);

                    if (releaseLockerResponse.status === SUCCESS) {
                        ShowToast(releaseLockerResponse.message, TOAST_SUCCESS);
                    }
                }
                else {
                    ShowToast(openLockerResponse.message, TOAST_SUCCESS);
                }

                setLoaderDisabled(false);

                history.push({
                    pathname: getPathForNextPage(HOME, LOCKER_OPENED),
                    state: {
                        lockerUnitDetails: lockerItem,
                        locker_bank_details: lockerItem.locker_bank,
                        locker_unit_details: lockerItem.locker_door,
                        pickupUserDetails: lockerItem.user,
                        clientRef: lockerItem.client_ref,
                        assignTime: lockerItem.assigned_date,
                        hasPendingLockers: hasPendingLockers,
                        isOpened: true,
                        status: lockerItem.status,
                        // openedLocker: lockerItem?.locker_door,
                        is_already_opened_once: withCheckout ? false : true,
                        ref_id: lockerItem?.ref_id
                    }
                });
            }
        }
        catch (error) {
            setLoaderDisabled(false);
            console.error('Error: ', error);
        }
    }

    const initiateCodPayment = async (lockerItem) => {
        setLoadingMessage(t('initiating_transaction_please_wait'));
        setLoaderDisabled(true);

        let paymentRecordToUseToInitiateCodPayment = lockerItem.payment_records[0];

        if (paymentRecordToUseToInitiateCodPayment.status === 'failed') {
            devConsoleLog('Previous payment failed. Creating new payment record');

            // let failedPaymentRecord = paymentRecordToUseToInitateCodPayment;
            paymentRecordToUseToInitiateCodPayment = await createNewCodPaymentRecordForReAttempt(lockerItem.ref_id, parseFloat(paymentRecordToUseToInitiateCodPayment.amount), 'PAYMENT');

            if (paymentRecordToUseToInitiateCodPayment?.transaction_id) {
                lockerItem.payment_records.unshift(paymentRecordToUseToInitiateCodPayment);
            }
        }

        if (paymentRecordToUseToInitiateCodPayment?.transaction_id) {
            const initiatePaymentResponse = await initiatePayment(lockerItem.locker_bank.id, lockerItem.locker_door.door_no, paymentRecordToUseToInitiateCodPayment.payment_gateway, paymentRecordToUseToInitiateCodPayment.transaction_id, paymentRecordToUseToInitiateCodPayment.amount);

            if (initiatePaymentResponse?.status === SUCCESS && arePaymentGatewayAndAccessKeyValid(initiatePaymentResponse?.data?.data?.payment_gateway, initiatePaymentResponse?.data?.data?.payment_gateway_reference)) {
                // const lockerData = {
                //     locker_bank: {
                //         name: lockerItem.locker_bank.name,
                //         location: {
                //             name: lockerItem.locker_bank.location.name
                //         }
                //     },
                //     assignment: {
                //         payment_gateway: lockerItem.assignment.payment_gateway
                //     },
                //     payment_records: [
                //         { amount: initiatePaymentResponse?.data?.data?.amount }
                //     ],
                //     user: {
                //         email: lockerItem.user.email,
                //         mobile_number: lockerItem.user.mobile_number
                //     }
                // };

                storeSecureItemInSpecifiedStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY, initiatePaymentResponse?.data?.data?.payment_gateway);
                storeSecureItemInSpecifiedStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY_ACCESS_KEY, initiatePaymentResponse?.data?.data?.payment_gateway_reference);

                setLoaderDisabled(false);

                history.push({
                    pathname: getPathForNextPage(HOME, PAYMENT_GATEWAY),
                    state: {
                        lockerData: lockerItem,
                        hasPendingLockers: hasPendingLockers,
                        currentReferenceId: paymentRecordToUseToInitiateCodPayment.transaction_id
                    }
                });
            }
            else if (initiatePaymentResponse?.status === SUCCESS) {
                devConsoleLog('Invalid data in initiate payment success response. Reloading page.');
                window.reload();
            }
        }

        setLoaderDisabled(false);
    };

    const createNewCodPaymentRecordForReAttempt = async (lockerReferenceId, amount, paymentType) => {
        try {
            const overduePaymentResponse = await overduePayment(lockerReferenceId, amount, paymentType);

            if (overduePaymentResponse?.status === SUCCESS) {
                return overduePaymentResponse?.data;
            }
        } catch (error) {
            console.error('Error while re-attempting payment initiation: ', error);
        }
    };

    const initiatePayment = async (lockerBankId, lockerDoorNumber, paymentGateway, paymentReferenceId, amount) => {
        try {
            const body = {
                "locker_bank_id": lockerBankId,
                "locker_door_number": lockerDoorNumber,
                "payment_gateway": paymentGateway,
                "payment_reference_id": paymentReferenceId,
                "amount": amount
            };
            return await prePaymentRegistration(body);
        } catch (error) {
            console.error('Error during pre payment registration: ', error);
        }
    };

    const makePrePaymentRegistration = async (lockerData) => {
        LoadersetON();
        setLoadingMessage(t('initiating_transaction_please_wait'));
        const body = {
            "payment_reference_id": lockerData.payment_records[0].transaction_id,
            "payment_gateway": lockerData.payment_records[0].payment_gateway,
            "locker_bank_id": lockerData.locker_bank.id,
            "locker_door_number": lockerData.payment_records[0].locker_door,
            "amount": lockerData.payment_records[0].amount
        }
        const response = await prePaymentRegistration(body);
        // console.log('response: ', response);
        if (response.status === SUCCESS) {
            storeSecureItemInSpecifiedStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY, lockerData.payment_records[0].payment_gateway);
            storeSecureItemInSpecifiedStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY_ACCESS_KEY, response.data?.data?.payment_gateway_reference);

            history.push(getPathForNextPage(HOME, PAYMENT_GATEWAY), {
                lockerData: lockerData,
                hasPendingLockers: hasPendingLockers,
                // paymentGateway:lockerData.payment_records[0].payment_gateway,
                currentReferenceId: lockerData.payment_records[0].transaction_id,
                // paymentGatewayAccessKey: response.data?.data?.payment_gateway_reference,
                redirectionPath: "/my-lockers"
            });
            LoadersetOFF();
        }
        else if (response.status === ERROR) {
            ShowToast(t(response.message), TOAST_ERROR);
            LoadersetOFF();
        }
        else if (response.status === REDIRECT) {
            history.push(getPathForNextPage(HOME, HOME), {
                message: t(response.message),
                messageType: TOAST_ERROR
            });
            LoadersetOFF();
        }
    }

    /**
     * this is for reserving locker button handler
     * 1) This function handles the click event for the "Reserve Locker" button.
     * 2) It checks the use case of the settings and either redirects the user to scan a QR code or fetches available locker sizes and redirects them accordingly.
     * 3) If the use case is dynamic or luggage, it fetches available locker
     *  sizes and redirects the user to the locker size selection page.
     * 4) If the use case is not dynamic or luggage, it navigates to the scan QR code page.
     * 5) It also checks if assignment pricing is enabled and handles the reservation accordingly.
     * 
      */
    const reserveLockerButtonHandler = () => {
        if (settings.usecase === DYNAMIC_USE_CASE || settings.usecase === LUGGAGE_USE_CASE) {
            getAvailableLockerSizesAndRedirectUser();
        }
        else {
            // this is for navigateScan QR code here  we can implement the logic for scanning QR code 
            // and also we can start the login of Parcel use-case as well
            navigateToScanQRCode();
        }
    };

    /**
     * This function:
     * Fetches available locker sizes for a locker bank.
        a) Based on locker availability and settings, either:
        b) Redirects user to locker selection screens.
        c) Auto-reserves a locker if only one is available and manual selection is disabled.
    1) API call to fetch available locker sizes
    2) If only one locker size is available & assignment pricing is disabled(Dynamic use case)
        1) CASE 1: Manual selection is enabled → Go to locker unit selection page
        2) CASE 2: Manual selection is disabled → Auto-reserve locker and redirect to open locker screen
    3) else Multiple locker sizes available → Go to locker size selection screen(:luggage use case)

        Scenario	                            Action Taken
    1 Locker size,  Manual Selection Enabled	Redirect to Locker Unit Selection page
    1 Locker size,  Manual Selection Disabled	Auto-reserve locker & redirect to Open Locker page
    Multiple Locker sizes available	            Redirect to Locker Size Selection page
    
    */
    const getAvailableLockerSizesAndRedirectUser = async () => {
        try {
            //API call to fetch available locker sizes
            const response = await getAvailableLockerSizesWithUnits(settings?.slug, lockerBankId);
            console.log('availability response: ', response);

            // here in the response we will get the all the locker list with respect to avalale of there 
            // size like m size locker in one array 
            // s size in one array
            // l size in one array like that... 
            if (response.status === SUCCESS) {
                const isManualLockerSelectionEnabled = settings?.usecase_settings?.manual_selection_of_locker?.value;
                console.log('manual selection: ', isManualLockerSelectionEnabled);

                //If only one locker size is available & assignment pricing is disabled it menas it is for Dynamic-use case
                if (response.data.length === 1 && ( !isAssignmentPricingEnabled )) {
                   // CASE 1: Manual selection is enabled → Go to locker unit selection page
                    if (isManualLockerSelectionEnabled) {
                        history.push({
                            pathname: getPathForNextPage(HOME, LOCKER_UNIT_SELECTION),
                            state: {
                                lockerBankId,
                                assignmentSlug: settings?.slug,
                                userId,
                                selectedLockerSize: response.data[0]
                            }
                        });
                    }
                    //CASE 2: Manual selection is disabled → Auto-reserve locker and redirect to open locker screen
                    else {
                        setLoadingMessage('Reserving Locker. Please Wait.');
                        LoadersetON();
                        try {
                            const reserveLockerResponse = await reserveLocker(settings?.slug, lockerBankId, userId, response.data[0].code);
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

                                LoadersetOFF();
                                history.push({
                                    pathname: getPathForNextPage(HOME, OPEN_LOCKER),
                                    state: {
                                        lockerUnitDetails
                                        // assignedLocker: reserveLockerResponse.data
                                    }
                                });
                            }
                        } catch (error) {
                            LoadersetOFF();
                            console.error('Error while reserving locker: ', error);
                        }
                    }
                }
                //else Multiple locker sizes available → Go to locker size selection screen(this is for luggage use case)
                else {
                    history.push({
                        pathname: getPathForNextPage(HOME, LOCKER_SIZE_SELECTION),
                        state: {
                            lockerBankId,
                            assignmentSlug: settings?.slug,
                            userId,
                            availableLockerSizes: response.data,
                            isManualLockerSelectionEnabled
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error while fetching available locker sizes: ', error);
        }
    }

   
console.log(`search-bar is active or not:${settings?.usecase_settings?.show_search_bar_pwa?.value}`)
    return (
        <Box className='my-locker-list-page'>
            <Box className='main-container'>
                {isLoading ? (
                    <Box className='main'>
                        <CircularProgressLoader message={loadingMessage} />
                    </Box>
                ) : (
                    <Box className='main'>
                        {/**
                         * so here active is used to check if the tenant is active or not
                         */}
                        {active ? (
                            <Box>
                                <Box className='dashicon' component="img" src={dashIcon} alt="Dash Icon" />
                                <Typography className='assignText'>{t('Tenat_Inactive')}</Typography>
                            </Box>
                        ) : (
                            <>
                                {/**
                                 * this will render if the tenant is active and locker list is empty
                                 * if the tenant is active and locker list is not empty then it will render the locker list
                                 * if the tenant is active and locker list is empty then it will render the reserve locker button
                                 */}
                                {(lockerList.length > 0 || originalLockerList.length > 0) ? (
                                    <>
                                        <Box className='search-bar-view'>
                                            {(settings?.usecase_settings?.show_search_bar_pwa?.value) && (
                                                <CustomSearchBar
                                                    inputId='search-bar-input'
                                                    onChange={handleSearchText}
                                                    placeholder={t('searchLockersByAWB')}
                                                    value={searchText}
                                                    icon={<SearchIcon iconFillColor={colorScheme === 'dark' ? APP_WHITE_COLOR : APP_RICH_BLACK_COLOR} />}
                                                />
                                            )}
                                            {(settings?.usecase_settings?.verify_with_barcode_pwa?.value && extraFeatureEnabled) && (
                                                <Box className="barcode-float-btn" onClick={navigateToScanBarCode}>
                                                    <BarcodeIcon/>
                                                </Box>
                                            )}
                                        </Box>
                                        <Grid container className="lockergrid" ref={scrollContainerRef}>
                                            {hasReturnedLockers && (
                                                <Box className="badge-view">
                                                    <BadgeComponent badgeContent={1} primaryText={t('pendingPickups')} secondaryText={t('pleaseFinishPickup')} badgeContainer="badge-pink" />
                                                </Box>
                                            )}
                                            {(searchText == '') ? (
                                                <>
                                                    {returnedLockersList.map(item => (
                                                        <Grid item xs={12} key={item.locker_door.id}>
                                                            <Locker item={item} ListType={'Assign'} isReturnAndDropOff={false} />
                                                        </Grid>
                                                    ))}
                                                </>
                                            ) : (
                                                <>
                                                    {(returnFilteredList.length > 0) ? (
                                                        <>
                                                            {returnFilteredList.map(item => (
                                                                <Grid item xs={12} key={item.locker_door.id}>
                                                                    <Locker item={item} ListType={'Assign'} isReturnAndDropOff={false} />
                                                                </Grid>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {!hasDataInSearch && (
                                                                <Typography className='no-locker-data'>{t('searchNotFound')}</Typography> 
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                                
                                            {(hasReturnedLockers && extraFeatureEnabled) && (
                                                <Box className="divider-view">
                                                    <Divider className='divider'/>
                                                    <Box className="badge-view">
                                                        <BadgeComponent badgeContent={2} primaryText={t('dropOff')} badgeContainer="badge-green" />
                                                    </Box>
                                                </Box>
                                            )}
                                            {(searchText == '') ? (
                                                <>
                                                    {lockerList.map(item => (
                                                        <Grid item xs={12} key={item.locker_door.id}>
                                                            <Locker item={item} ListType={'Assign'} isReturnAndDropOff={hasReturnedLockers} />
                                                        </Grid>
                                                    ))}
                                                </>
                                            ) : (
                                                <>
                                                    {(filteredLockers.length > 0) ? (
                                                        <>
                                                            {/* {(!hasNextPageForSearch) ? (
                                                                <> */}
                                                                    {filteredLockers.map(item => (
                                                                        <Grid item xs={12} key={item.locker_door.id}>
                                                                            <Locker item={item} ListType={'Assign'} isReturnAndDropOff={hasReturnedLockers} />
                                                                        </Grid>
                                                                    ))}
                                                                {/* </>
                                                            ) : (
                                                                <Typography className='request-digits'>{t('requestMoreDigitsText')}</Typography>
                                                            )} */}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {(isSearchComplete && !hasReturnedLockers) && (
                                                                <Typography className='no-locker-data'>{t('searchNotFound')}</Typography>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                            {/*
                                            {shareLockerList.length > 0 && (
                                                <>
                                                    <Typography className='shareText'>{t('sharedWithMeText')}</Typography>
                                                    {shareLockerList.map(item => (
                                                        <Grid item xs={12} key={item.locker_unit_bank}>
                                                            <Locker item={item} ListType={'SHARE'} />
                                                        </Grid>
                                                    ))}
                                                </>
                                            )}
                                            */}
                                        </Grid>
                                        {((settings?.usecase_settings?.verify_with_qr_code_pwa?.value && extraFeatureEnabled) || ((settings.usecase === DYNAMIC_USE_CASE || settings.usecase === LUGGAGE_USE_CASE) && (lockerList.length < settings.lockers_allowed))) && (
                                            <Box className="assignNewlocker">
                                                <Box className="floatingBtn" onClick={reserveLockerButtonHandler}>
                                                    <ButtonFloatingIcon />
                                                </Box>
                                            </Box>
                                        )}
                                    </>
                                ) : (
                                    <Box className="noAssignedLockerBlock">
                                        <Box className='dashicon' component="img" src={dashIcon} alt="Dash Icon" />
                                        <Typography className='assignText'>{t('notAssignLockerText')}</Typography>
                                        {settings?.usecase_settings?.show_reserve_locker_btn?.value && (
                                            <ButtonComponent handleClick={reserveLockerButtonHandler} title={t('reserveLockerText')} />
                                        )}
                                    </Box>
                                )}
                            </>
                        )}
                        <CustomDialog
                            dialogId='overstay-payment-modal'
                            dialogVisible={isOverstayPaymentModalVisible}
                            onClose={() => setIsOverstayPaymentModalVisible(false)}
                            handleCancel={() => setIsOverstayPaymentModalVisible(false)}
                            handleAccept={makeOverstayPaymentAndThenAccessLocker}
                            dialogTitle={t('Overstay')}
                            children={renderOverstayPaymentModalContent}
                            buttonOneTitle={t('Cancel')}
                            buttonTwoTitle={t('Pay')}
                            buttonProps={{ buttonOne: {type: BUTTON_WARNING}, buttonTwo: {type: BUTTON_PRIMARY}}}
                        />
                        <CustomDialog
                            dialogId='user-proximity-error-modal'
                            dialogVisible={isUserProximityErrorModalVisible}
                            onClose={() => setIsUserProximityErrorModalVisible(false)}
                            handleCancel={() => setIsUserProximityErrorModalVisible(false)}
                            dialogTitle={t('Location Error')}
                            dialogContentText={userProximityError}
                            buttonOneTitle={t('Ok')}
                            buttonProps={{buttonOne: {type: BUTTON_PRIMARY}}}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default MyLockeListPage;