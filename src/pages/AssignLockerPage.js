import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { getFormatDate, getFormatTime } from '../components/TimeAndDateFormate';
import { ShowTimer } from '../components/ShowTimer';
import ShowToast from "../components/ToastComponent";
import { TOAST_ERROR, TOAST_INFO } from "../assets/constants/Constants";
import CircularProgressLoader from "../components/CircularProgressLoader";
import { useTranslation } from 'react-i18next';
import { DANGER_ICON, DYNAMIC_LOCKER, LOCK_ICON, NEW_LOCKER_ICON } from '../assets/constants/Icons';
import TimerDeadline from '../components/TimerDeadline';
import CustomSliderComponent from '../components/CustomSliderComponent';

const AssignLockerScreen = () => {
    const history = useHistory();
    const location = useLocation();
    // const {size,lockerUnit } = location.state;
    const { t } = useTranslation();

    // const [LockerDetails, setLockerDetails] = useState();
    const [reserveTime, setReserveTime] = useState();
    const [deviceToken, setDeviceToken] = useState();
    const [accessTime, setAccessTime] = useState();
    const [timerOn, setTimerOn] = useState(true);
    const [sendTimerOn, setSendTimerOn] = useState(false);
    const [bankId, setBankId] = useState();
    const [secondsLeft, setSecondsLeft] = useState(15);
    const [loaderdisabled, setLoaderDisabled] = useState(false);
    const [releaseTime, setReleaseTime] = useState();

    const size = "S";
    const lockerUnit = 501;
    const LockerDetails = {
        locker_bank_name: "Test Locker bank",
        locker_unit: "501",
        locker_bank_location: "Mumbai",
        locker_unit_prefix: "L"
    }

    const getFCMToken = useCallback(async () => {
        const token = localStorage.getItem('fcm_token');
        setDeviceToken(token);
    }, []);

    const changeLEDStatus = useCallback(async (res) => {
        let notificationData = {
            title: 'Smart Locker Fonzel',
            body: 'Assigned',
            sound: 'default',
            priority: 'high',
            content_available: true,
            token: res.device_fcm_token,
            lockerUnit: res.locker_unit,
            hub_Id: res.hub_id,
            hardware_Id: res.hardware_id,
            device_token: deviceToken,
            lockerBankID: bankId,
            type: 'dynamic',
        };
        // await sendSingleDeviceNotification(notificationData);
    }, [deviceToken, bankId]);

    const getLocker = useCallback(async () => {
        try {
            const accessToken = localStorage.getItem('token');
            const domain = localStorage.getItem('domain');
            const lockerBankID = localStorage.getItem('lockerbank_id');
            const userId = localStorage.getItem('User_id');
            const assignmentId = localStorage.getItem('assignment_id');
            setBankId(lockerBankID);

            if (accessToken && domain && lockerBankID && userId && assignmentId) {
                setTimeout(async () => {
                    const reserverLockerResponse = "" //await reserveLocker(domain, userId, lockerBankID, assignmentId, lockerUnit, size, accessToken);
                    if (reserverLockerResponse) {
                        localStorage.setItem('TransactionID', reserverLockerResponse.transaction_id);
                        // setLockerDetails(res);
                        changeLEDStatus(reserverLockerResponse);
                        const assignTimestamp = getFormatTime(reserverLockerResponse.assignment_timestamp);
                        const assignDaystamp = getFormatDate(reserverLockerResponse.assignment_timestamp);
                        const lockerAssignTime = `${assignDaystamp} ${assignTimestamp}`;
                        setReserveTime(lockerAssignTime);

                        const antiClaimmingDetailsResponse = "" //await getAntiClaimmingDetails(domain, userId, lockerBankID, reserverLockerResponse.locker_unit);
                        if (antiClaimmingDetailsResponse) {
                            const allocationConfirmationPeriod = antiClaimmingDetailsResponse.allocation_confirmation_period?.[0]?.should_access_in || null;
                            if (allocationConfirmationPeriod) {
                                setAccessTime(allocationConfirmationPeriod);
                            }
                            const antiClaimUsageDuration = antiClaimmingDetailsResponse.anti_claim_usage_duration?.[0]?.will_open_in || null;
                            setReleaseTime(
                                TimerDeadline(
                                    reserverLockerResponse.assignment_timestamp,
                                    antiClaimUsageDuration,
                                    allocationConfirmationPeriod,
                                    'NotOpen'
                                ),
                            );
                        }
                    } else {
                        setTimeout(() => {
                            history.push('/dashboard');
                        }, 2000);
                    }
                }, Math.random() * 100 + 1);
            }
        } catch (e) {
            console.error('Error in getLocker:', e);
        }
    }, [changeLEDStatus, lockerUnit, size, history]);

    useEffect(() => {
        getLocker();
        getFCMToken();

        if (accessTime === 1) {
            setTimerOn(false);
            history.push('/dashboard');
        }

        if (timerOn) {
            const interval = setInterval(() => {
                setAccessTime(prev => (prev > 0 ? prev - 1 : 0));
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [timerOn, accessTime, getLocker, getFCMToken, history]);

    useEffect(() => {
        if (secondsLeft < 1) {
            setSendTimerOn(false);
            setSecondsLeft(15);
            setLoaderDisabled(false);
            ShowToast(t('Locker bank error'), TOAST_ERROR);
        }
    }, [secondsLeft]);

    const backToHome = () => {
        history.push('/dashboard');
    };

    const openLockerUnit = async () => {
        try {
            setLoaderDisabled(true);
            const domain = localStorage.getItem('domain');
            const lockerBankId = localStorage.getItem('lockerbank_id');
            const accessToken = localStorage.getItem('token');
            const lockerUnit = LockerDetails?.locker_unit;

            if (domain && lockerBankId && accessToken && lockerUnit) {
                ShowToast(t('Opening locker'), TOAST_INFO);
                const response = "" //await openLocker(domain, lockerBankId, lockerUnit, accessToken);
                if (response) {
                    history.push('/open-locker', {
                        locker_unit: lockerUnit,
                        lockerbank_Id: lockerBankId,
                        lockerType: response.assignment_type,
                        OpenOnce: response.is_already_opened_once,
                    });
                } else {
                    ShowToast(t('Error opening locker'), TOAST_ERROR);
                }
            }
        } catch (error) {
            ShowToast(t('Error opening locker'), TOAST_ERROR);
            console.error('Error in openLockerUnit:', error);
        } finally {
            setLoaderDisabled(false);
        }
    };

    return (
        <Box className='assign-locker-page'>
            <Box className='main-container'>
                <Box className='main'>
                    {LockerDetails !== undefined ? (
                        LockerDetails !== false ? (
                            LockerDetails && LockerDetails !== null ? (
                                <>
                                    <Box className="assignLockerWrapper">
                                        <Box className="lockerInfo">
                                            <Box>
                                                <DYNAMIC_LOCKER />
                                                {releaseTime && <ShowTimer ExitTime={releaseTime} />}
                                            </Box>
                                            <Box className="lockerdetails">
                                                <Typography className='lockerTitle'>{LockerDetails.locker_bank_name} {'>'} {LockerDetails.locker_unit}</Typography>
                                                <Typography className='lockerLocation'>{LockerDetails.locker_bank_location}</Typography>
                                                <Typography className='lockerText'>{t('reserveText')}: {reserveTime}</Typography>
                                                {releaseTime && <Typography className='lockerText'>{t('autoRelease')}: {releaseTime}</Typography>}
                                            </Box>
                                        </Box>
                                        <Typography className='LockedText'>{t('lockedText')}</Typography>
                                    </Box>
                                    <Box className="assignLockerBlock">
                                        <Box className="assignLockerSubBlock">
                                            <LOCK_ICON />
                                        </Box>
                                        <Typography className='lockerPrefix'>
                                            {LockerDetails.locker_unit_prefix} {LockerDetails.locker_unit}
                                        </Typography>
                                    </Box>
                                    <Typography className='lockerAssignedText'>{t('assignLockerText')}</Typography>
                                    <Button onClick={backToHome} className='backHomeText'>{t('backToHomeText')}</Button>
                                    {accessTime === undefined && (
                                        <Box className="lockerInfo">
                                            <DANGER_ICON />
                                            <Typography className='releaseText'>{t('accessLockerText', { accessTime: accessTime })}</Typography>
                                        </Box>
                                    )}
                                    <Box className="openLockerSlider">
                                        <CustomSliderComponent
                                            onSlideDone={openLockerUnit}
                                            bankDetails={`${LockerDetails.locker_bank_location} > ${LockerDetails.locker_bank_name} - ${LockerDetails.locker_unit}`}
                                        />
                                    </Box>
                                </>
                            ) : (
                                <Box className="containerView">
                                    <NEW_LOCKER_ICON />
                                    <Typography className='errorMessageText'>{t('notAvailableText')}</Typography>
                                </Box>
                            )
                        ) : (
                            <Box className="containerView">
                                <NEW_LOCKER_ICON />
                                <Typography className='errorMessageText'>{t('exceedLimitText')}</Typography>
                            </Box>
                        )
                    ) : (
                        <CircularProgressLoader message={t('lockerAssignText')} />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AssignLockerScreen;