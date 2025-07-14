import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Box, Divider, IconButton, Modal, Typography} from '@mui/material';
import {ChevronRightRounded, CloseRounded, NotificationsNoneRounded} from '@mui/icons-material';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, PAYMENT_GATEWAY_REFERENCE, PAYMENT_REFERENCE_ID, SELECTED_EQUPMNENT, USER_INFO} from '../assets/constants/BrowserStorageKeys';
import {getSecureItemFromSpecificStorage, storeSecureItemInSpecifiedStorage} from '../lib/BrowserStorageAccessMiddleware';
import { useTranslation } from 'react-i18next';
import { CustomTextInput } from '../components/CustomTextInput';
import { ERROR, REDIRECT, SUCCESS, TOAST_ERROR, BUTTON_SECONDARY, TOAST_SUCCESS } from '../assets/constants/Constants';
import {ACCESS_LOCKER_BANK, HOME, LANDING, EQUIPMENT_GRID, EQUIPMENT_DETAILS, EXTERNAL_PAYMENT_GATEWAY, SUCCESS_PAGE, CANCEL_OR_ERROR_PAGE, PAYMENT_DETAILS_VERIFIED} from '../assets/constants/PageList';
import { prePaymentRegistration } from '../lib/BackendUtils';
import ShowToast from '../components/ToastComponent';
import { handleNotifyUserForProduct, productRentInitiate } from '../api/api';
import { getPathForNextPage, getMinAndMaxPriceObjects, scrollSmoothlyToPageTop } from '../lib/Utils';
import ButtonComponent from '../components/ButtonComponent';
import CircularProgressLoader from '../components/CircularProgressLoader';

const EquipmentDetailsPage = () => {
    const history = useHistory();
    const {selectedEquipment} = history.location.state;
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

    const [isCardDetailsModalOpen, setIsCardDetailsModalOpen] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [awaitingPrePaymentRegistrationResponse, setAwaitingPrePaymentRegistrationResponse] = useState(false);
    const {t} = useTranslation();
    // temporary code for client demo - need to remove afterwards
    // storeSecureItemInSpecifiedStorage(SESSION_STORAGE, 'selEqp', equipment);
    const assignmentSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE,LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
    const userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE,USER_INFO)
    const minAndMaxPriceObjects = getMinAndMaxPriceObjects(selectedEquipment);
    const pricing_help = `<h2>Rental Rates</h2> Cost will be calculated on slab basis, up to a maximum of ${minAndMaxPriceObjects?.max?.rent_price} ${minAndMaxPriceObjects?.max?.currency} for ${minAndMaxPriceObjects?.max?.rent_minute} ${minAndMaxPriceObjects?.max?.duration}. <br/><br/><h2>When will you be charged?</h2>When you return the rented item, we will calculate how long you used it and charge you accordingly.`

    // Product includes images row - styles - dimensions calculation
    const screenInnerWidthInPixels = (window.innerWidth > 480) ? 480 : window.innerWidth;
    const horizontalPaddingInPixels = 28 * 2; // Update left and right padding according to main-element-dimensions in mixin.scss
    const imageMarginRightInPixels = 14; // half of horizontal padding
    const imageTileWidthInPixels = (screenInnerWidthInPixels - horizontalPaddingInPixels - (imageMarginRightInPixels * 3)) / 2; // Max 2 images visible at any time
    const imageContainerWidthInPixels = (selectedEquipment?.product_includes_array.length * imageTileWidthInPixels) + ((selectedEquipment?.product_includes_array.length - 1) * imageMarginRightInPixels);

    useEffect(() => {
        scrollSmoothlyToPageTop();
        setAwaitingPrePaymentRegistrationResponse(false);
    }, []);

    const rentNowButtonHandler = async () => {
        try {
            setAwaitingPrePaymentRegistrationResponse(true);
            
            let assignmentSlug = assignmentSettings?.slug;
            const response = await productRentInitiate(assignmentSlug, selectedEquipment?.id);
            if(response.status === SUCCESS){
                const lockerResponse = response?.data;
                await makePrePaymentRegistration(lockerResponse);
            } else {
                setAwaitingPrePaymentRegistrationResponse(false);
                ShowToast(t(response.message), TOAST_ERROR);
            }
        } catch (error) {
            console.error("Failed to send OTP to phone number:", error);
        }finally {
            setAwaitingPrePaymentRegistrationResponse(false);
        }
    }

    const handleSetCardNumber = (e) => {
        setCardNumber(e.target.value);
    }

    const makePrePaymentRegistration = async (lockerResponse) => {
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        const body = {
            "payment_reference_id": lockerResponse.transaction_id,
            "payment_gateway": lockerResponse.payment_gateway,
            "locker_bank_id": selectedEquipment?.door_details?.locker_bank_details?.bank_id,
            "locker_door_number": selectedEquipment?.door_details?.door_number,
            "amount": parseInt(lockerResponse.amount),
            "currency": lockerResponse.currency,
            "success_url" : `${baseUrl}${getPathForNextPage(EXTERNAL_PAYMENT_GATEWAY, SUCCESS_PAGE)}`,
            "cancel_url" : `${baseUrl}${getPathForNextPage(EXTERNAL_PAYMENT_GATEWAY, CANCEL_OR_ERROR_PAGE)}`
        }
        const response = await prePaymentRegistration(body);
        if (response.status === SUCCESS) {
            storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, PAYMENT_GATEWAY_REFERENCE,response.data?.data?.payment_gateway_reference);
            storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, PAYMENT_REFERENCE_ID, lockerResponse.transaction_id);
            storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, SELECTED_EQUPMNENT, selectedEquipment);
            
            setAwaitingPrePaymentRegistrationResponse(false);

            const url =response.data?.data?.field_1;
            window.location.href = url;
        }
        else if (response.status === ERROR) {
            setAwaitingPrePaymentRegistrationResponse(false);
            ShowToast(t(response.message), TOAST_ERROR);
        }
        else if (response.status === REDIRECT) {
            setAwaitingPrePaymentRegistrationResponse(false);
            history.push(getPathForNextPage(EQUIPMENT_DETAILS, ACCESS_LOCKER_BANK), {
                message: t(response.message),
                messageType: TOAST_ERROR
            });
        }

        setAwaitingPrePaymentRegistrationResponse(false);
    }

    console.log("t('rentNowBtnText')", t('rentNowBtnText'));
    const notifyMeButtonHandler = async () => {
        try {
            let assignmentSlug = assignmentSettings?.slug;
            const response = await handleNotifyUserForProduct(assignmentSlug,selectedEquipment?.id)
            if(response?.status === SUCCESS){
                ShowToast(t('notifySuccessMessage'), TOAST_SUCCESS);
            }
        } catch (error) {
            console.error('Error in notifyMeButtonHandler: ', error);
        }
	}


    return (
        <Box className='equipment-details-page'>
            <Box className='main-container'>
                {awaitingPrePaymentRegistrationResponse ? (
                    <CircularProgressLoader message={t('initiating_transaction_please_wait')} />
                ) : (
                    <Box className='main'>
                        <Box className='title-and-description-container'>
                            <Typography className='title'>{selectedEquipment?.title}</Typography>
                            <Typography className='description'>{selectedEquipment?.short_description}</Typography>
                        </Box>
                        <Box className='equipment-images'>
                            <Swiper modules={[Pagination]} pagination={{clickable: true}} loop={true} className='image-carousel'>
                                {selectedEquipment?.product_image_array.map((productImage, index) => (
                                    <SwiperSlide key={index} className='image-slide'>
                                        <img src={productImage} className='equipment-image'/>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Box>
                        <Box className='pricing-info'>
                            <Typography className='min-price-in-words'>{minAndMaxPriceObjects.min.pricePerDurationInWords}</Typography>
                            <Typography className='max-price-in-words'>{minAndMaxPriceObjects.max.pricePerDurationInWords}</Typography>
                            <Box className='pricing-info-button'>
                                <Typography className='pricing-info' onClick={() => setIsPricingModalOpen(true)}>{t('pricingInfoLabel')}</Typography>
                                <ChevronRightRounded />
                            </Box>
                        </Box>
                        <Divider className='pricing-and-equipment-info-divider' />
                        <Box className='equipment-includes-info'>
                            <Typography className='title'>{t('productIncludesText')}</Typography>
                            <Box className='images-outer-container'>
                                <Box className='images-inner-container' style={{width: imageContainerWidthInPixels}}>
                                    {selectedEquipment?.product_includes_array.map((productImage, index) => (
                                        <Box
                                            key={index}
                                            className='image-wrapper'
                                            style={{
                                                width: imageTileWidthInPixels,
                                                marginRight: (index !== selectedEquipment?.product_includes_array.length - 1) ? imageMarginRightInPixels : 0
                                            }}
                                        >
                                            <img src={productImage} className='equipment-image' />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                        <Box className='help-instructions'>
                            <Typography className='title'>{t('howToUseText')}</Typography>
                            <Box className='instructions' dangerouslySetInnerHTML={{ __html: selectedEquipment?.description }} />
                        </Box>
                        {selectedEquipment?.availability ?
                            <Box className='rent-button-container'>
                            <ButtonComponent buttonId='rent-now-button' handleClick={rentNowButtonHandler} title={t('rentNowBtnText')} customClass='rent-now-button' type={BUTTON_SECONDARY} /> 
                            </Box> : 
                            userInfo?.id !== selectedEquipment?.user_id ? <Box className='notify-button-container'>
                            <ButtonComponent buttonId='notify-me-button' handleClick={notifyMeButtonHandler} title={t('notifyMeBtnLabel')} startIcon={<NotificationsNoneRounded className='notification-icon' />} customClass='notify-me-button' type={BUTTON_SECONDARY} />
                        </Box>  : null}
                        <Modal
                            open={isPricingModalOpen}
                            onClose={() => setIsPricingModalOpen(false)}
                            className='pricing-info-modal-container'
                        >
                            <Box className='pricing-info-modal-content'>
                                <Box className='title-and-close-button'>
                                    <Typography className='pricing-info-title'>{t('pricingInfoLabel')}</Typography>
                                    <IconButton className='close-button' onClick={() => setIsPricingModalOpen(false)}>
                                        <CloseRounded />
                                    </IconButton>
                                </Box>
                                <Box className='pricing-help' dangerouslySetInnerHTML={{ __html: pricing_help }} />
                                <Divider />
                                <Box className='pricing-info'>
                                    <Typography className='title'>{t('slabRatesLabel')}</Typography>
                                    {selectedEquipment?.pricing_info.map((priceObject, index) => (
                                        <Typography key={index} className='equipment-price'>{t('uptoText')} {priceObject.rent_minute} {priceObject.duration}: {priceObject.rent_price} {priceObject.currency}</Typography>
                                    ))}
                                </Box>
                            </Box>
                        </Modal>
                        <Modal
                            open={isCardDetailsModalOpen}
                            onClose={() => setIsCardDetailsModalOpen(false)}
                            className='card-info-modal-container'
                        >
                            <Box className='card-info-modal-content'>
                                <Box className='title-and-close-button'>
                                    <Typography className='card-info-title'>{t('enterCardDetailsLabel')}</Typography>
                                    <IconButton className='close-button' onClick={() => setIsCardDetailsModalOpen(false)}>
                                        <CloseRounded />
                                    </IconButton>
                                </Box>
                                <Typography className='card-help'>{t('userWarningForCardDetails')}</Typography>
                                <CustomTextInput
                                className={'card-number-input'}
                                inputId='otp-input'
                                placeholder="Enter Card Number"
                                value={cardNumber}
                                onChange={handleSetCardNumber}
                                placeholderClass={'card-placeholder'}
                                />
                                <Box className="cvv-and-expiry-input-container">
                                <CustomTextInput
                                className={'card-number-input'}
                                inputId='otp-input'
                                placeholder="MM/YY"
                                value={cardNumber}
                                onChange={handleSetCardNumber}
                                placeholderClass={'card-placeholder'}
                                />
                                <CustomTextInput
                                className={'card-number-input'}
                                inputId='otp-input'
                                placeholder="CVV"
                                value={cardNumber}
                                onChange={handleSetCardNumber}
                                placeholderClass={'card-placeholder'}
                                />
                                </Box>
                            </Box>
                        </Modal>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default EquipmentDetailsPage;