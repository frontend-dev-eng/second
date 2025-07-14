import React, {useState, useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import { SUCCESS, TOAST_SUCCESS, TOAST_ERROR, BUTTON_PRIMARY } from '../assets/constants/Constants';
import { getSecureItemFromSpecificStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, LS_LOCKER_BANK_INFO, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS } from '../assets/constants/BrowserStorageKeys';
import {PARCEL_ICON} from '../assets/constants/Icons';
import {SWIPE_TO_OPEN_LOCKER, LOCKER_OPENED} from '../assets/constants/PageList';
import { getPathForNextPage, verifyUserProximity } from '../lib/Utils';
import {openLocker, releaseLockerOfPickUpUser} from '../api/api';
import CustomDialog from '../components/CustomDialog';
import CustomSliderComponent from '../components/CustomSliderComponent';
import CircularProgressLoader from '../components/CircularProgressLoader';
import ShowToast from '../components/ToastComponent';

const SwipeToOpenPage = () => {
    const history = useHistory();
    const {t} = useTranslation();
    const lockerBankInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_LOCKER_BANK_INFO);
    const { lockerUnitDetails } = history.location?.state;
    // console.log('locker unit details 1: ', lockerUnitDetails);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [userProximityError, setUserProximityError] = useState('');
    const [isUserProximityErrorModalVisible, setIsUserProximityErrorModalVisible] = useState(false);
    const { assignedLocker } = history.location?.state;
    const tenantAndAssignmentSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE,LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
    const isGeoFencingEnabled = tenantAndAssignmentSettings?.is_geofencing;
    const lockerBankLatitude = lockerUnitDetails?.locker_bank?.latitude ? lockerUnitDetails?.locker_bank?.latitude : lockerBankInfo.latitude;
    const lockerBankLongitude = lockerUnitDetails?.locker_bank?.longitude ? lockerUnitDetails?.locker_bank?.longitude : lockerBankInfo.longitude;
    console.log('lat and lng: ', lockerBankLatitude, lockerBankLongitude);
    const canOpenLockerAutomaticallyWhenPageLoads = tenantAndAssignmentSettings?.usecase_settings?.skip_swipe_to_open?.value;
    const isOpenWithCheckoutAfterOverstayPayment = sessionStorage.getItem('isOpenWithCheckoutAfterOverstayPayment');
    // console.log('isOpenWithCheckoutAfterOverstayPayment', isOpenWithCheckoutAfterOverstayPayment);
    // console.log('assigned locker: ', assignedLocker);
    // console.log('tna: ', tenantAndAssignmentSettings);
    
    useEffect(() => {
        if (canOpenLockerAutomaticallyWhenPageLoads) {
            if (isOpenWithCheckoutAfterOverstayPayment) {
                openLockerAndThenCheckout();
            }
            else {
                slideToOpenButtonHandler();
            }
        }
        else {
            setIsLoading(false);
        }
    }, []);

    const slideToOpenButtonHandler = async () => {
        setLoadingMessage(t('opening_locker_please_wait'));
        setIsLoading(true);
        
        if (isGeoFencingEnabled) {
            const maxAllowedDistanceInMeters = tenantAndAssignmentSettings?.geofencing_radius;
            const isUserNearbyLockerBank = await verifyUserProximity({latitude: lockerBankLatitude, longitude: lockerBankLongitude}, maxAllowedDistanceInMeters);

            if ( !isUserNearbyLockerBank.isNearby ) {
                setLoadingMessage('');
                setIsLoading(false);
                setUserProximityError(isUserNearbyLockerBank.message);
                setIsUserProximityErrorModalVisible(true);

                return;
            }
        }

        try {
            const openLockerResponse = await openLocker(lockerUnitDetails?.ref_id);
            if (openLockerResponse.status === SUCCESS) {
                ShowToast(openLockerResponse.message, TOAST_SUCCESS);
                history.replace({
                    pathname: getPathForNextPage(SWIPE_TO_OPEN_LOCKER, LOCKER_OPENED),
                    state: {
                        lockerUnitDetails
                    }
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error while opening locker: ', error);
        }
    };

    const openLockerAndThenCheckout = async () => {
        setLoadingMessage(t('opening_locker_please_wait'));
        setIsLoading(true);

        sessionStorage.removeItem('isOpenWithCheckoutAfterOverstayPayment');

        if (isGeoFencingEnabled) {
            const maxAllowedDistanceInMeters = tenantAndAssignmentSettings?.geofencing_radius;
            const isUserNearbyLockerBank = await verifyUserProximity({latitude: lockerBankLatitude, longitude: lockerBankLongitude}, maxAllowedDistanceInMeters);

            if ( !isUserNearbyLockerBank.isNearby ) {
                setLoadingMessage('');
                setIsLoading(false);
                setUserProximityError(isUserNearbyLockerBank.message);
                setIsUserProximityErrorModalVisible(true);

                return;
            }
        }

        try {
            const openLockerResponse = await openLocker(lockerUnitDetails?.ref_id);

            if (openLockerResponse?.status === SUCCESS) {
                setLoadingMessage('Checkout in progress. Please wait');

                const releaseLockerResponse = await releaseLockerOfPickUpUser(lockerUnitDetails?.ref_id);

                if (releaseLockerResponse?.status === SUCCESS) {
                    ShowToast(releaseLockerResponse?.message, TOAST_SUCCESS);
                    setIsLoading(false);
                    history.push({
                        pathname: getPathForNextPage(SWIPE_TO_OPEN_LOCKER, LOCKER_OPENED),
                        state: {
                            lockerUnitDetails
                        }
                    });
                }
            }
        } catch (error) {
            ShowToast('Error during open with checkout.', TOAST_ERROR);
            console.error('Error during open with checkout: ', error);
            setIsLoading(false);

            history.push({
                pathname: '/home-screen',
            });
        }
    }

    return (
        <Box className='swipe-to-open-page'>
            <Box className='main-container'>
                {isLoading && (
                    <Box className='main'>
                        <CircularProgressLoader message={loadingMessage} />
                    </Box>
                )}
                {(!isLoading) && (
                    <Box className='main'>
                        <Box className='locker-icon-container'>
                            <PARCEL_ICON />
                        </Box>
                        <Typography className='locker-bank-name'>{lockerUnitDetails?.locker_bank?.name}</Typography>
                        <Typography className='locker-unit'>{lockerUnitDetails?.locker_door?.door_no}</Typography>
                        <Box className='slide-to-open-button-container'>
                            <CustomSliderComponent
                                onSlideDone={slideToOpenButtonHandler}
                                extraClass={'slide-to-open-button'}
                            />
                        </Box>
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

export default SwipeToOpenPage;