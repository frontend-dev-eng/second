import { Box, Divider, IconButton, Modal, Typography } from '@mui/material'
import React, { useRef, useState, useEffect } from 'react'
import ButtonComponent from '../components/ButtonComponent'
import { BUTTON_SECONDARY, ERROR, REDIRECT, SUCCESS, TOAST_ERROR } from '../assets/constants/Constants'
import {ACCESS_LOCKER_BANK, HOME, ASSIGNED_LOCKERS, CAPTURE_PRODUCT_IMAGE, CAPTURE_EQUIPMENT_IMAGE, PAYMENT_SUCCESSFUL} from '../assets/constants/PageList';
import { ChevronRightRounded, CloseRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { FaCameraRotate } from "react-icons/fa6";
import { useHistory } from 'react-router-dom';
import ShowToast from '../components/ToastComponent'
import { storeSecureItemInSpecifiedStorage } from '../lib/BrowserStorageAccessMiddleware'
import { SESSION_STORAGE } from '../assets/constants/BrowserStorageKeys'
import { getPathForNextPage, calculateTimeDifference, getMinAndMaxPriceObjects } from '../lib/Utils'
import { capturePayment } from '../api/api'

const TakeProductPhotoPage = () => {
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [facingMode, setFacingMode] = useState('environment');
    const [rentalConst, setRentalConst] = useState('');
    const [rentalCurrency, setRentalCurrency] = useState('');
    const {t} = useTranslation();
    const history = useHistory();
    const {lockerResponse} = history?.location?.state;
    const [elapsedTime, setElapsedTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    storeSecureItemInSpecifiedStorage(SESSION_STORAGE, 'selEqp',lockerResponse);
    
    const captureImageButtonHandler = () => {
        setIsCameraOpen(true);
        setCapturedImage(null);
        startCamera();
    }
    
    const minAndMaxPriceObjects = getMinAndMaxPriceObjects(lockerResponse?.product);
    const pricing_help = `<h2>Rental Rates</h2> Cost will be calculated on slab basis, up to a maximum of ${minAndMaxPriceObjects?.max?.rent_price} ${minAndMaxPriceObjects?.max?.currency} for ${minAndMaxPriceObjects?.max?.rent_minute} ${minAndMaxPriceObjects?.max?.duration}. <br/><br/><h2>When will you be charged?</h2>When you return the rented item, we will calculate how long you used it and charge you accordingly.`
    const videoRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const capture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0);
        const imageSrc = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageSrc);
        closeCamera()
    };

    const closeCamera = () => {
        videoRef.current.srcObject.getTracks().forEach(function (track) {
            track.stop();
            setIsCameraOpen(false);
        });
    };

    const makeFinalPayment = async () => {
        const finalAmount = await calculatePostPayment(lockerResponse);
        console.log("finalAmount :", finalAmount);
        const paymentRecord = lockerResponse?.payment_records[0];
        const response = await capturePayment(paymentRecord?.transaction_id, finalAmount);
        if (response.status === SUCCESS) {
            history.push(getPathForNextPage(CAPTURE_PRODUCT_IMAGE, PAYMENT_SUCCESSFUL), {
                locker_bank_details: lockerResponse.locker_bank,
                is_already_opened_once: lockerResponse.is_already_opened_once,
                locker_unit_details: lockerResponse.locker_door,
                clientRef : lockerResponse.client_ref,
                pickupUserDetails: lockerResponse.user,
                assignTime: lockerResponse.assigned_date,
                status: lockerResponse.status,
                headerTitle: t('pickupParcel'),
                ref_id: lockerResponse.ref_id
            })
        } else if (response.status === ERROR) {
            ShowToast(t(response.message), TOAST_ERROR);
            history.push(getPathForNextPage(CAPTURE_PRODUCT_IMAGE, ASSIGNED_LOCKERS));
        }
        else if (response.status === REDIRECT) {
            history.push(getPathForNextPage(CAPTURE_PRODUCT_IMAGE, ACCESS_LOCKER_BANK), {
                message: t(response.message),
                messageType: TOAST_ERROR
            });
        }
    }

    const calculatePostPayment = (lockerResponse) => {
        const selectedProduct = lockerResponse.product;
        const productPrice = selectedProduct.product_price;
        const rentProductStartTime = lockerResponse?.date_created;
        const startTime = new Date(rentProductStartTime);
        const currentTime = new Date();
        
        // Calculate the duration in minutes
        const rentalDurationInMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
        console.log("Rental duration in minutes:", rentalDurationInMinutes);
    
        // Sort pricing info by rent_minute in ascending order
        const sortedPricingInfo = selectedProduct.pricing_info.sort((a, b) => a.rent_minute - b.rent_minute);
    
        // Find the first pricing tier that can cover the rental duration
        let applicablePricing = sortedPricingInfo.find(pricing => pricing.rent_minute >= rentalDurationInMinutes);
    
        if (applicablePricing) {
            // If a tier is found that covers the entire duration, use its price
            console.log(`Applicable pricing: USD ${applicablePricing.rent_price} / ${applicablePricing.rent_minute} Minutes`);
            const totalAmount = parseFloat(applicablePricing.rent_price);
            console.log(`Total bill amount: USD ${totalAmount.toFixed(2)}`);
            return totalAmount.toFixed(2);
        } else {
            // If rental duration exceeds the highest available rent_minute, use the full product price
            return productPrice;
        }
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: {width: visualViewport.width, height: visualViewport.height,facingMode}});
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    if (videoRef.current) {
                      const { videoWidth, videoHeight } = videoRef.current;
                      const aspectRatio = videoWidth / videoHeight;
                      videoRef.current.style.width = '100%';
                      videoRef.current.style.height = `${100 / aspectRatio}vw`;
                      videoRef.current.style.maxHeight = '80vh';
                      videoRef.current.style.maxWidth = `${80 * aspectRatio}vh`;
                    }
                  };
                }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const handleInitiatePayment = async () => {
        console.log("Initiate Payment Button Clicked")
        await makeFinalPayment()
    }

    const toggleFacingMode = () => {
        setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
        closeCamera();
        setIsCameraOpen(true);
        setCapturedImage(null);
        startCamera();
    };

    const calculateRentalCost = async () => {
        const rentalconst = await calculatePostPayment(lockerResponse);
        setRentalConst(rentalconst);
        setRentalCurrency(lockerResponse?.payment_records[0]?.currency);
        const time = calculateTimeDifference(lockerResponse.assigned_date);
        setElapsedTime(time);
    }

    useEffect(()=> {
        calculateRentalCost();
    },[lockerResponse])

    return (
        <Box className='take-product-photo-page'>
            <Box className='main-container'>
                <Box className='main'>
                    {isCameraOpen ?
                        <Box className='video-container'>
                            <video ref={videoRef} autoPlay height={`${visualViewport.height - 100}px`} width={'100%'} />
                            {videoRef && <Box className='button-row'>
                                <button className='capture-button' onClick={capture}>Capture</button>
                                <button className='close-button close' onClick={closeCamera}>Close</button>
                            </Box>}
                            <Box className='switch-button' onClick={toggleFacingMode}>
                            <FaCameraRotate size={30} color='white' />
                            </Box>
                        </Box> : <> <Box className='img-container'>
                            {capturedImage ? (
                                <img src={capturedImage} width={250} height={250} alt="Product" />
                            ) : (<img className='take-photo-img' src={require('../assets/images/take_photo.png')} alt='Person Icon' />)}
                        </Box>
                            <Box className='take-and-retake-btn-container'>
                                {capturedImage ?
                                    <ButtonComponent buttonId='take-photo-button' handleClick={captureImageButtonHandler} title={t('retakePhotoBtnText')} customClass='take-photo-button' type={BUTTON_SECONDARY} />:
                                    <ButtonComponent buttonId='retake-photo-button' handleClick={captureImageButtonHandler} title={t('takePhotoBtnText')} customClass='retake-photo-button' variant='outlined' /> }
                            </Box>
                            <Box className='pricing-info'>
                                <Typography className='min-price-in-words'>{`${t('rentalCostLabel')} : ${rentalCurrency} ${rentalConst}`}</Typography>
                                {
                                    elapsedTime.hours > 0 ? (
                                        <Typography className='max-price-in-words'>{`${t('totalTimeLabel')} : ${elapsedTime.hours} hour ${elapsedTime.minutes} minutes ${elapsedTime.seconds} seconds`}</Typography>
                                    ) : (
                                        <Typography className='max-price-in-words'>{`${t('totalTimeLabel')} : ${elapsedTime.minutes} minutes ${elapsedTime.seconds} seconds`}</Typography>
                                    )
                                }
                                <Box className='pricing-info-button'>
                                    <Typography className='pricing-info' onClick={() => setIsPricingModalOpen(true)}>{t('pricingInfoLabel')}</Typography>
                                    <ChevronRightRounded />
                                </Box>
                            </Box>
                        </>}
                    {capturedImage && <Box className='pay-now-button-container'>
                        <ButtonComponent buttonId='take-photo-button' handleClick={handleInitiatePayment} title={t('payNowBtnText')} customClass='pay-now-button' type={BUTTON_SECONDARY} />
                    </Box>}
                </Box>
            </Box>
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
                        {lockerResponse?.product?.pricing_info.map((priceObject, index) => (
                                <Typography key={index} className='equipment-price'>{t('uptoText')} {priceObject.rent_minute} {priceObject.duration}: {priceObject.rent_price} {priceObject.currency}</Typography>
                                ))}
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default TakeProductPhotoPage