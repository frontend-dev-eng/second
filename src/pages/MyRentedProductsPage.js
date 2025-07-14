import { Box, Divider, Radio, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EquipmentCard from '../components/EquipmentCard';
import { useHistory } from 'react-router-dom';
import ButtonComponent from '../components/ButtonComponent';
import CustomDialog from '../components/CustomDialog';
import { ASSIGNED, BUTTON_SECONDARY, BUTTON_WARNING, SUCCESS, TOAST_ERROR } from '../assets/constants/Constants';
import {HOME, LANDING, ASSIGNED_LOCKERS, MY_RENTED_PRODUCTS, LOCKER_OPENED} from '../assets/constants/PageList';
import { useTranslation } from 'react-i18next';
import { getAssignedLockerList, openLockerDoor } from '../api/api';
import { getSecureItemFromSpecificStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS } from '../assets/constants/BrowserStorageKeys';
import { getPathForNextPage, calculateTimeDifference, verifyUserProximity } from '../lib/Utils';
import ShowToast from '../components/ToastComponent';
import CircularProgressLoader from '../components/CircularProgressLoader';

const MyRentedProductsPage = () => {
    const [loadingMessage, setLoadingMessage] = useState('Loading. Please wait.');
    const [isLoading, setIsLoading] = useState(false);
    const [userProximityError, setUserProximityError] = useState('');
    const [isUserProximityErrorModalVisible, setIsUserProximityErrorModalVisible] = useState(false);
    const [myRentedProductsList, setMyRentedProductsList] = useState([]);
    const assignmentSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
    const isGeoFencingEnabled = assignmentSettings?.is_geofencing;
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [isEndRentalConfirmationModalVisible, setIsEndRentalConfirmationModalVisible] = useState(false);
    const [elapsedTimes, setElapsedTimes] = useState({});
    const history = useHistory();
    const {t} = useTranslation()
    const [isSingleBlocked, setIsSingleBlocked] = useState(false);

    useEffect(() => {
        fetchEquipmentsList();
    }, []);

    useEffect(() => {
        if (myRentedProductsList.length > 0) {
            const intervalId = setInterval(() => {
                updateElapsedTimes();
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [myRentedProductsList]);

    const updateElapsedTimes = () => {
        const updatedElapsedTimes = { ...elapsedTimes };
        myRentedProductsList.forEach((equipment) => {
            const id = equipment?.product?.id;
            updatedElapsedTimes[id] = calculateTimeDifference(equipment?.assigned_date, 'elapsed');
        });
        setElapsedTimes(updatedElapsedTimes);
    };

    const fetchEquipmentsList = async () => {
        // Make the API call to fetch the equipments list and store the list in the following variable.
        setLoadingMessage("Getting Rented Equipments List");
        setIsLoading(true);

        try {
            const response = await getAssignedLockerList(assignmentSettings?.id)
            console.log(`response at fetchEquipmentsList function in MyRentedProduct Page`, response);
            if(response?.status === SUCCESS){
                // setIsLoading(false);
                // setLoadingMessage('');
                // if(response?.data?.length === 1){
                //     setSelectedEquipment(response?.data[0]);
                // }
                // setMyRentedProductsList(response?.data);
                const equipmentList = response?.data || [];
                setMyRentedProductsList(equipmentList);
                if (equipmentList.length === 1) {
                    const singleEquipment = equipmentList[0];
                    setSelectedEquipment(singleEquipment);
                    setIsSingleBlocked(singleEquipment?.locker_door?.is_blocked || false);
                } else {
                    setIsSingleBlocked(false);
                }
            }
        } catch (error) {
            console.error("Error fetching equipments list: ", error);
        }finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    };
    
    const endRentalButtonHandler = () => {
        if (myRentedProductsList?.length > 1 && !selectedEquipment) {
            ShowToast(t('selectProductWarning'), TOAST_ERROR);
        }
        else {
            setIsEndRentalConfirmationModalVisible(true);
        }
    }

    const openLockerAndProceedToEndProductRental = async () => {
        setIsEndRentalConfirmationModalVisible(false);
        setLoadingMessage(t('opening_locker_please_wait'));
        setIsLoading(true);

        if (isGeoFencingEnabled) {
            const maxAllowedDistanceInMeters = assignmentSettings?.geofencing_radius;
            const isUserNearbyLockerBank = await verifyUserProximity({latitude: selectedEquipment?.locker_bank?.latitude, longitude: selectedEquipment?.locker_bank?.longitude}, maxAllowedDistanceInMeters);

            if ( !isUserNearbyLockerBank.isNearby ) {
                setLoadingMessage('');
                setIsLoading(false);
                setUserProximityError(isUserNearbyLockerBank.message);
                setIsUserProximityErrorModalVisible(true);

                return;
            }
        }

        const refId = selectedEquipment?.ref_id;
        if (refId) {
            const response = await openLockerDoor(refId);
            if (response.status === SUCCESS) {
                history.push({ pathname: getPathForNextPage(MY_RENTED_PRODUCTS, LOCKER_OPENED), state: { lockerResponse: selectedEquipment } });
            }
        }
    }

    const rentNewProductButtonHandler = () => {
        history.push(getPathForNextPage(MY_RENTED_PRODUCTS, HOME));
    }

    const handleSelectEquipment = (selectedItem) => {
        if (selectedItem?.locker_door?.is_blocked) {
                ShowToast('Locker is blocked. Please contact admin.', TOAST_ERROR);
                return;
        }
        console.log("sele",selectedItem)
        setSelectedEquipment(selectedItem);
    }


    return (
        <Box className='my-rented-products-page'>
            <Box className='main-container'> 
                {
                isLoading ? 
                   <Box className="main">
                        <CircularProgressLoader message={loadingMessage} />
                    </Box>
                    :
                    myRentedProductsList?.length > 0 ? (
                    <Box className='main'>
                        {myRentedProductsList?.map((equipment, equipmentIndex) => {
                            const isSelected = selectedEquipment?.product?.id === equipment?.product?.id;
                            return (
                            <Box className='equipment-category' key={equipment?.product?.id}
                            onClick={() => handleSelectEquipment(equipment)} 
                            sx={{ cursor: 'pointer' }} >

                                {myRentedProductsList?.length > 1 && (
                                    <Radio
                                        checked={isSelected}
                                        value={equipment?.product?.id}
                                        className='radio-button'
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'A' }}
                                        onChange={() => handleSelectEquipment(equipment)} 
                                    />
                                    )}

                                <EquipmentCard
                                    equipment={equipment}
                                    key={equipment.locker_door.id}
                                    title={equipment.product?.title}
                                    description={equipment.product?.short_description}
                                    image={equipment?.product?.product_image_array[0]}
                                    isRentedByUser={!equipment.product?.availability && equipment?.status === ASSIGNED}
                                    elapsedTime={elapsedTimes[equipment?.product?.id] || '0.00'}
                                />
                                {/* {equipmentIndex !== (category.equipments.length - 1) && ( */}
                                <Divider />
                                {/* )} */}
                            </Box>
                            )})}

                        <Box className='end-rental-and-rent-new-product-container'>
                             {isSingleBlocked ? (
                                    <ButtonComponent
                                    buttonId="end-rental-products-button"
                                    handleClick={endRentalButtonHandler}
                                    title={t('endRentalBtnText')}
                                    customClass="end-rental-and-return-button disable-single-blocked"
                                    variant="outlined"
                                    />
                                    
                                ) : (
                                    <ButtonComponent
                                    buttonId="end-rental-products-button"
                                    handleClick={endRentalButtonHandler}
                                    title={t('endRentalBtnText')}
                                    customClass="end-rental-and-return-button"
                                    variant="outlined"
                                    />
                                )
                            }

                            <ButtonComponent buttonId='rent-new-product-button' handleClick={rentNewProductButtonHandler} title={t('rentNewProductBtnText')} customClass='rent-new-product-button' type={BUTTON_SECONDARY} />
                        </Box>
                        <CustomDialog
                            dialogId='end-rental-confirmation-dialog'
                            dialogVisible={isEndRentalConfirmationModalVisible}
                            onClose={() => setIsEndRentalConfirmationModalVisible(false)}
                            handleCancel={() => setIsEndRentalConfirmationModalVisible(false)}
                            handleAccept={openLockerAndProceedToEndProductRental}
                            dialogTitle={t('confirm_end_rental')}
                            dialogContentText={t('are_you_sure_to_open_locker_and_end_rental')}
                            buttonOneTitle={t('button_cancel')}
                            buttonTwoTitle={t('yesBtnText')}
                            buttonProps={{buttonOne: {variant: 'outlined', customClass: 'cancel-button'}, buttonTwo: {type: BUTTON_WARNING}}}
                        />
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
                    ) :(
                        <Box className='main'>
                            <Typography className='assignText'>{t('notAssignLockerText')}</Typography>
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}

export default MyRentedProductsPage