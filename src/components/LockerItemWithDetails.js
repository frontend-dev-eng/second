import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Box, Typography, IconButton, Paper, useTheme, CircularProgress } from '@mui/material';
import {ExitToAppRounded, OutputRounded, TimerOutlined} from '@mui/icons-material';
import { PARCEL_ICON, DownArrowIcon, UpArrowIcon, DottedLineUp, DottedLineDown } from '../assets/constants/Icons';
import ShowToast from "../components/ToastComponent";
import { DYNAMIC_USE_CASE, LUGGAGE_USE_CASE, DARK, PENDING, RETURN, SUCCESS, TOAST_SUCCESS, TOAST_ERROR, ASSIGNED, COD, INITIATED, BUTTON_PRIMARY, BUTTON_WARNING } from "../assets/constants/Constants";
import {LANDING, HOME, DROP_PARCEL, LOCKER_OPENED} from '../assets/constants/PageList';
import {getPathForNextPage, convertDurationStringToMilliseconds} from '../lib/Utils';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import ButtonComponent from "../components/ButtonComponent";
import CustomSliderComponent from './CustomSliderComponent';
import { fetchPaymentStatus, openLocker } from '../api/api';
import { APP_RICH_BLACK_COLOR, APP_WHITE_COLOR } from '../assets/constants/Colors';

export const LockerItemWithDetails = ({
    item,
    usecase,
    showBookingDateAndTime,
    showOpenAndCheckoutButtons,
    isLockerAccordionExpanded,
    onLockerAccordionStateToggle,
    // selectSlider,
    // onPress,
    // itemData,
    // selectedItem,
    // ListType,
    // LoadersetON,
    LoadersetOFF,
    setLoader,
    openAndCheckoutButtonsHandler,
    initiateCodPayment,
    // openWithAndWithoutCheckout,
    // showOverstayPaymentConfirmationModal,
    // makePrePaymentRegistration,
    isReturnAndDropOff,
    hasPendingLockers,
    setLoaderMessage,
    // isLockerOpening,
    returnedLockers
}) => {
    const history = useHistory();
    const { t } = useTranslation();
    const theme = useTheme()
    const colorScheme = theme.palette.mode;
    const isBlockedLocker = item?.locker_door?.is_blocked;
    const isLockerAssignedToPickupUser = item?.status === ASSIGNED;
    const isPaymentTypeCod = item?.payment_type === COD;
    const isPaymentStatusCompleted = item?.payment_records[0]?.status === 'completed';
    // const [isPaid, setIsPaid] = useState(null);
    const isPaymentPending = isLockerAssignedToPickupUser && isPaymentTypeCod && ( !isPaymentStatusCompleted );
    // const [isLockerAccordionExpanded, setIsLockerAccordionExpanded] = useState(false)
    // const [isPaid,setIsPaid] = useState(null)
    const [showLoader,setShowLoader] = useState(false)
    const apiCalledRef = useRef(false); // Ref to track if the API call has been made
    // const toggleExtraDetails = () => {
    //     setShowExtraDetails(!isLockerAccordionExpanded)
    // }
    const hasMatchedForReturn = returnedLockers?.some(locker => locker?.locker_door?.id === item?.locker_door?.id);
    
    const getBookingEndDateAndTime = () => {
        const assignedDateAndTimeInMilliseconds = moment(item?.assigned_date).valueOf();
        const selectedSlotDurationInMilliseconds = convertDurationStringToMilliseconds(item?.selected_size_pricing?.duration);

        return moment(assignedDateAndTimeInMilliseconds + selectedSlotDurationInMilliseconds).format('DD-MM-YYYY, HH:mm:ss A');
    };
    const bookingEndDateAndTime = showBookingDateAndTime ? getBookingEndDateAndTime() : null;

    const showUserDetails = () => {
        if (usecase === DYNAMIC_USE_CASE || usecase === LUGGAGE_USE_CASE) {
            return false;
        }

        return true;
    };
    const showDottedLines = () => {
        if (usecase === DYNAMIC_USE_CASE || usecase === LUGGAGE_USE_CASE) {
            return false;
        }

        return true;
    };

    /*
    const lockerAccordionClickHandler = () => {
        if (isBlockedLocker) {
            ShowToast(t('Locker is blocked. Please contact admin.'), TOAST_ERROR);
        }
        else {
            setIsLockerAccordionExpanded(!isLockerAccordionExpanded);
        }
    };
    */

    // console.log('selectedSlider: ', selectSlider);

    /*
    const openLockerUnit = async () => {
        try {
            setLoaderMessage(t('opening_locker_please_wait'))
            setLoader(true)
            const response = await openLocker(item.ref_id);
            // console.log('item: ', item);
            if(response.status === SUCCESS){
                ShowToast(response.message, TOAST_SUCCESS);
                setLoader(false)
                history.push(getPathForNextPage(HOME, LOCKER_OPENED), {
                    lockerUnitDetails: item,
                    locker_bank_details: item.locker_bank,
                    is_already_opened_once: item.is_already_opened_once,
                    locker_unit_details : item?.locker_door,
                    pickupUserDetails : item.user,
                    clientRef : item?.client_ref,
                    assignTime : item.assigned_date,
                    hasPendingLockers : hasPendingLockers,
                    isOpened : true,
                    status: item.status,
                    headerTitle : item.status === PENDING ? t('dropParcel') : t('pickupParcel'),
                    ref_id : item.ref_id,
                });
            }
        } catch (error) {
            setLoader(false)
            LoadersetOFF();
            console.error('Error in LockerComponent.js open Locker:', error);
        }
    };
    */

    /**
     * Handles the restriction logic based on the item's status and the return and drop-off condition.
     */
    // const handleRestrict = () => {
    //     if (item.status === RETURN && isReturnAndDropOff) {
    //         setIsLockerAccordionExpanded(false);
    //     }
    // }

    // useEffect(() => {
    //     if (item?.payment_type === COD && item?.status === ASSIGNED && item?.payment_records[0]?.status === INITIATED && item?.payment_records[0]?.payment_gateway_reference && !apiCalledRef.current && !isLockerOpening) {
    //         setShowLoader(true)
    //         handleFetchPaymentStatus().finally(() => {
    //             setShowLoader(false);
    //         });
    //         apiCalledRef.current = true; // Set the ref to true after the API call
    //     }
    // }, [item])

    // const handleFetchPaymentStatus = async () => {
    //     try {
    //         let paymentRefId = item?.payment_records[0]?.transaction_id;
    //         let paymentGatewayMethod = item?.payment_records[0]?.payment_gateway;
    //         const response = await fetchPaymentStatus(paymentRefId, paymentGatewayMethod);
    //         if (response.status === SUCCESS) {
    //             console.log('payment status: ', item, response?.data);
    //             if (response?.data?.is_paid) {
    //                 console.log('isPaid: ', response?.data?.is_paid);
    //                 setShowLoader(false)
    //                 setIsPaid(true)
    //             } else {
    //                 setShowLoader(false)
    //             }
    //         } else {
    //             setShowLoader(false)
    //         }
    //     } catch (error) {
    //         setShowLoader(false)
    //         console.error("Error in LockerItemWithDetails.js handleFetchPaymentStatus:", error);
    //     }
    // }


    return (
        showLoader ? (
            <Box className="loader">
                <CircularProgress className='loader-style' size="20px"/>
            </Box>
        ) : (
            <Paper className='LockerWrapper'>
                <Box component="button" className='lockerContainer' onClick={onLockerAccordionStateToggle}>
                    <Box className={`listItem ${isLockerAccordionExpanded ? 'no-bottom-radius' : ""} ${isBlockedLocker ? 'list-item-blocked' : null} ${item?.status === PENDING && hasMatchedForReturn ? 'listItem-dimmed' : ''}`} onClick={() => {}}>
                        <Box className="content-wrapper">
                            <Box className="content">
                                <Box className="imageGroup">
                                    <PARCEL_ICON />
                                </Box>
                                <Box className="contentInfo">
                                    <Typography className={`text-one ${isBlockedLocker ? 'text-one-block' : ""}`} sx={{color : theme.palette.text.primary}}>{item.locker_bank.name}</Typography>
                                    <Typography className={`locker-title ${isBlockedLocker ? 'locker-title-block' : ""}`} sx={{color : theme.palette.text.primary}}>{t('lockerText')} {item.locker_door.door_no}</Typography>
                                    <Typography className={`textline-three ${isBlockedLocker ? 'textline-three-block' : ""}`} sx={{color : theme.palette.text.primary}}>{item?.client_ref}</Typography>
                                </Box>
                            </Box>
                            {( isLockerAccordionExpanded && showUserDetails() ) && (
                                <Box className="extra-locker-details">
                                    <Box className="user-details">
                                        <Box className="initial-view">
                                            <Typography variant="h6">
                                                {item?.user?.username?.substring(0, 1).toUpperCase()}
                                            </Typography>
                                        </Box>
                                        <Box className="contentInfo">
                                            <Typography className={`text-one ${isBlockedLocker ? 'text-one-block' : ""}`} sx={{color : theme.palette.text.primary}}>{item.user?.username}</Typography>
                                            <Typography className={`locker-title ${isBlockedLocker ? 'locker-title-block' : ""}`} sx={{color : theme.palette.text.primary}}>{item.user?.email}</Typography>
                                            <Typography className={`textline-three ${isBlockedLocker ? 'textline-three-block' : ""}`} sx={{color : theme.palette.text.primary}}>{item.user?.mobile_number}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                        {( isLockerAccordionExpanded && showDottedLines() ) && (
                            <Box className="dotted-line-up">
                                <DottedLineUp />
                                <Typography className='dotted-line-text'>{t('toText')}</Typography>
                                <DottedLineDown />
                            </Box>
                        )}
                        {( !isLockerAccordionExpanded && item.isCodPaymentPending ) && (
                            <Box className="cod-view">
                                <Typography className="cod-view-text">{t('unpaidText')}</Typography>
                            </Box>
                        )}
                        {( !isLockerAccordionExpanded && showBookingDateAndTime && item?.isOverstay ) && (
                            <Box className='overstay-indicator'>
                                <Typography className='overstay-text'>Overstay</Typography>
                            </Box>
                        )}
                        {( !isBlockedLocker ) && (
                            <Box className="arrow-icon">
                                <IconButton className='accordion-button'>
                                    {isLockerAccordionExpanded ? (
                                        <UpArrowIcon iconFillColor={colorScheme === DARK ? APP_WHITE_COLOR : APP_RICH_BLACK_COLOR} />
                                    ) : (
                                        <DownArrowIcon iconFillColor={colorScheme === DARK ? APP_WHITE_COLOR : APP_RICH_BLACK_COLOR}/>
                                    )}
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                    {(isLockerAccordionExpanded && showBookingDateAndTime) && (
                        <Box className='booking-info-container'>
                            {/* <Box className='info-row'>
                                <Box className='icon-container'>
                                    <ExitToAppRounded />
                                </Box>
                                <Typography className='title'>Checked-In:</Typography>
                                <Typography className='value'>{moment(item?.assigned_date).format('DD-MM-YYYY, HH:mm:ss A')}</Typography>
                            </Box>
                            <Box className='info-row'>
                                <Box className='icon-container'>
                                    <OutputRounded />
                                </Box>
                                <Typography className='title'>Check-Out:</Typography>
                                <Typography className='value'>{bookingEndDateAndTime}</Typography>
                            </Box> */}
                            <Box className='info-row'>
                                <Box className={item?.isOverstay ? 'icon-container overstay' : 'icon-container'}>
                                    <TimerOutlined />
                                </Box>
                                <Typography className='title'>{item?.isOverstay ? 'Overstay:' : 'Remaining Time:'}</Typography>
                                <Typography className='value'>{item.usageTime}</Typography>
                            </Box>
                            {/* {item?.isOverstay && (
                                <Box className='overstay-info'>
                                    <Typography className='overstay-heading'>Overstay</Typography>
                                    <Typography className='overstay-text'>You've exceeded your check-out time. Please pay extra usage fees to access your locker.</Typography>
                                </Box>
                            )} */}
                        </Box>
                    )}
                    {isLockerAccordionExpanded && (
                        <>
                            {showOpenAndCheckoutButtons ? (
                                <Box className='buttons-view'>
                                    {/* {(item?.isOverstay) ? (
                                        <Box className='buttons-container'>
                                            <ButtonComponent buttonId='overstay-button' handleClick={() => showOverstayPaymentConfirmationModal(item)} title={t('Pay Overstay Fees')} type={BUTTON_PRIMARY} />
                                        </Box>
                                    ) : ( */}
                                        <Box className='buttons-container'>
                                            <ButtonComponent buttonId='open-without-checkout-button' handleClick={() => openAndCheckoutButtonsHandler(false, item)} title={t('Open Without CheckOut')} type={BUTTON_PRIMARY} />
                                            <ButtonComponent buttonId='open-with-checkout-button' handleClick={() => openAndCheckoutButtonsHandler(true, item)} title={t('Open With CheckOut')} type={BUTTON_PRIMARY} />
                                        </Box>
                                    {/* )} */}
                                </Box>
                            ) : (
                                <Box className="slider-view">
                                    {(item.isCodPaymentPending) ? (
                                        <CustomSliderComponent
                                            label={t('swipeToPay')}
                                            overlayText={t('initiatingPayment')}
                                            onSlideDone={() => initiateCodPayment(item)}
                                            extraClass={'slider cod-slider'}
                                        />
                                    ) : (
                                        <CustomSliderComponent
                                            bankDetails={`${item.locker_door?.door_no}`}
                                            onSlideDone={() => openAndCheckoutButtonsHandler(false, item)}
                                            extraClass={'slider'}
                                        />
                                    )}
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </Paper>
        )
    );
};