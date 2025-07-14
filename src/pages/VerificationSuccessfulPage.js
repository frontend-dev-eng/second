import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Box, Divider, Typography} from '@mui/material';
import {LocationOnOutlined, SpaceDashboardOutlined} from '@mui/icons-material';
import { LOCAL_STORAGE, LS_LOCKER_BANK_INFO, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, PAYMENT_GATEWAY_REFERENCE, PAYMENT_REFERENCE_ID, SELECTED_EQUPMNENT } from '../assets/constants/BrowserStorageKeys';
import {getSecureItemFromSpecificStorage} from '../lib/BrowserStorageAccessMiddleware';
import CustomSliderComponent from '../components/CustomSliderComponent';
import { getSessionStatus, openLockerDoor, rentProductAndReserveLocker } from '../api/api';
import { ERROR, SUCCESS, TOAST_ERROR, TOAST_SUCCESS, BUTTON_WARNING } from '../assets/constants/Constants';
import {HOME, LANDING, EQUIPMENT_DETAILS, PAYMENT_DETAILS_VERIFIED, LOCKER_OPENED} from '../assets/constants/PageList';
import { getPathForNextPage, verifyUserProximity } from '../lib/Utils';
import CircularProgressLoader from '../components/CircularProgressLoader';
import { useTranslation } from 'react-i18next';
import CustomDialog from '../components/CustomDialog';
import ShowToast from '../components/ToastComponent';

const VerificationSuccessfulPage = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const lockerBankInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_LOCKER_BANK_INFO);
    const [loadingMessage, setLoadingMessage] = useState('Loading. Please wait.');
    const [isLoading, setIsLoading] = useState(false);
    const [userProximityError, setUserProximityError] = useState('');
    const [isUserProximityErrorModalVisible, setIsUserProximityErrorModalVisible] = useState(false);
    const payment_gateway_reference = getSecureItemFromSpecificStorage(LOCAL_STORAGE, PAYMENT_GATEWAY_REFERENCE);
    const payment_reference_id = getSecureItemFromSpecificStorage(LOCAL_STORAGE, PAYMENT_REFERENCE_ID);
    const equipment = getSecureItemFromSpecificStorage(LOCAL_STORAGE, SELECTED_EQUPMNENT);
    const assignmentSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE,LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
    const isGeoFencingEnabled = assignmentSettings?.is_geofencing;

    useEffect(()=> {
        getPaymentSessionStatus();
    }, [])

    const getPaymentSessionStatus = async () => {
        try {
            setIsLoading(true);
            if(payment_gateway_reference && payment_reference_id){
                const response = await getSessionStatus(payment_gateway_reference, payment_reference_id);
                if(response.status === SUCCESS){
                    setIsLoading(false); 
                } else if (response.status === ERROR) {
                    ShowToast(t(response.message), TOAST_ERROR);
                    navigateToEquipmentDetails(equipment);
                } 
            }
        } catch (error){
            console.info("Error in getPaymentSessionStatus :", error);
            ShowToast("Failed to verify the payment status.", TOAST_ERROR);
            navigateToEquipmentDetails(equipment);
        } finally {
            setIsLoading(false);
        }
    }

    const slideToOpenButtonHandler = async () => {
        try {
            await proceedToRentProduct();
        } catch (error) {
            console.error('Error while opening locker:', error);
        }
    }

    useEffect(() => {
        const unblock = history.listen((location, action) => {
          if (action === 'POP') {
            history.push(getPathForNextPage(PAYMENT_DETAILS_VERIFIED, HOME));
          }
        });
    
        return () => {
          unblock();
        };
      }, [history]);


    const navigateToEquipmentDetails = (equipment) => {
		history.push({
			pathname: getPathForNextPage(PAYMENT_DETAILS_VERIFIED, EQUIPMENT_DETAILS),
			state: {
				selectedEquipment: equipment
			}
		});
	}

    const proceedToRentProduct = async  () => {
        setLoadingMessage(t('opening_locker_please_wait'));
        setIsLoading(true);

        if (isGeoFencingEnabled) {
            const maxAllowedDistanceInMeters = assignmentSettings?.geofencing_radius;
            const isUserNearbyLockerBank = await verifyUserProximity({latitude: lockerBankInfo.latitude, longitude: lockerBankInfo.longitude}, maxAllowedDistanceInMeters);

            if ( !isUserNearbyLockerBank.isNearby ) {
                setLoadingMessage('');
                setIsLoading(false);
                setUserProximityError(isUserNearbyLockerBank.message);
                setIsUserProximityErrorModalVisible(true);

                return;
            }
        }

        let assignmentSlug = assignmentSettings?.slug;
        const response = await rentProductAndReserveLocker(assignmentSlug, equipment?.id, equipment?.pricing_info[0].id, payment_reference_id );

        if (response.status === SUCCESS) {
            const lockerResponse = response?.data;
            ShowToast(t('productRentedSuccessMsg', TOAST_SUCCESS));

            const openLockerResponse = await openLockerDoor(lockerResponse.ref_id);

            if (openLockerResponse.status === SUCCESS) {
                setIsLoading(false);
                history.push({pathname : getPathForNextPage(PAYMENT_DETAILS_VERIFIED, LOCKER_OPENED),state : {lockerResponse : lockerResponse}});
            }
        } else {
            setIsLoading(false);
            navigateToEquipmentDetails(equipment);
        }
    }

    return (
        <Box className='verification-successful-page'>
            <Box className='main-container'>
                {isLoading && (
                    <Box className="main">
                        <CircularProgressLoader message={loadingMessage} />
                    </Box>
                )}
                {!isLoading && (
                <Box className='main'>
                    <Box className='img-container'>
                        <img className='verification-successful-img' src={require('../assets/images/person_with_circled_checkmark.png')} alt='Verification Successful Image' />
                    </Box>
                    <Box className='title-and-description-container'>
                        <Typography className='title'>{t('verificationSuccessText')}</Typography>
                        <Typography className='description'>{t('verificationSuccessSubheading')}</Typography>
                    </Box>
                    <Divider id='verification-title-and-rental-info-divider' />
                    <Box className='product-rental-info-container'>
                        <Box className='info-container'>
                            <Box className='icon-container'>
                                <SpaceDashboardOutlined className='product-info-icon' />
                            </Box>
                            <Box className='title-and-value-container'>
                                <Box className='title'>{t('productRentedText')}</Box>
                                <Box className='value'>{equipment?.title}</Box>
                            </Box>
                        </Box>
                        <Box className='info-container'>
                            <Box className='icon-container'>
                                <LocationOnOutlined className='product-info-icon' />
                            </Box>
                            <Box className='title-and-value-container'>
                                <Box className='title'>{t('unitLocationText')}</Box>
                                <Box className='value'>{equipment?.door_details?.locker_bank_details?.bank_name}</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="slide-to-open-button-container">
                        <CustomSliderComponent
                            label={t('slideToOpenText')}
                            bankDetails={null}
                            overlayText={" "}
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
                        buttonProps={{buttonOne: {type: BUTTON_WARNING}}}
                    />
                </Box>
                )}
            </Box>
        </Box>
    );
};

export default VerificationSuccessfulPage;