import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Box, Divider, Typography} from '@mui/material';
import {LocationOnOutlined, SpaceDashboardOutlined} from '@mui/icons-material';
import {SESSION_STORAGE} from '../assets/constants/BrowserStorageKeys';
import {getSecureItemFromSpecificStorage} from '../lib/BrowserStorageAccessMiddleware';
import ButtonComponent from '../components/ButtonComponent';
import { BUTTON_SECONDARY, SUCCESS, TOAST_SUCCESS } from '../assets/constants/Constants';
import {HOME, LANDING, PAYMENT_SUCCESSFUL, INVOICE} from '../assets/constants/PageList';
import { getPathForNextPage } from '../lib/Utils';
import { useTranslation } from 'react-i18next';
import { releaseLockerOfPickUpUser } from '../api/api';
import ShowToast from '../components/ToastComponent';

const PaymentSuccessfulPage = () => {
    const history = useHistory();
    const {t} = useTranslation();
    const equipment = getSecureItemFromSpecificStorage(SESSION_STORAGE, 'selEqp');

    useEffect(() => {
        const unblock = history.listen((location, action) => {
          if (action === 'POP') {
            history.push(getPathForNextPage(PAYMENT_SUCCESSFUL, HOME));
          }
        });
    
        return () => {
          unblock();
        };
      }, [history]);

    const releaseLockerAfterReturn = async () => {
        try {
            console.log("redirecting to equipment grid",equipment);
            const refId = equipment?.ref_id;
            if(refId){
                const response = await releaseLockerOfPickUpUser(refId);
                if(response.status === SUCCESS){
                }
            }
        } catch (error) {
            console.error('Error while releasing locker:', error);
        }
    }

    useEffect(() => {
        releaseLockerAfterReturn();
    },[])

    const handleNavigateToHomePage = () => {
        history.push(getPathForNextPage(PAYMENT_SUCCESSFUL, HOME));
    }

    console.log("equipment from Payment Successful Page : ", equipment);
    return (
        <Box className='payment-successful-page'>
            <Box className='main-container'>
                <Box className='main'>
                    <Box className='img-container'>
                        <img className='payment-successful-img' src={require('../assets/images/person_with_circled_checkmark.png')} alt='Payment Successful Image' />
                    </Box>
                    <Box className='title-and-description-container'>
                        <Typography className='title'>{t('paymentSuccessText')}</Typography>
                        <Typography className='description'>{t('paymentSuccessFeedbackText')}</Typography>
                    </Box>
                    <Divider id='payment-title-and-rental-info-divider' />
                    <Box className='product-rental-info-container'>
                        <Box className='info-container'>
                            <Box className='icon-container'>
                                <SpaceDashboardOutlined className='product-info-icon' />
                            </Box>
                            <Box className='title-and-value-container'>
                                <Box className='title'>{t('productRentedText')}</Box>
                                <Box className='value'>{equipment?.product?.title}</Box>
                            </Box>
                        </Box>
                        <Box className='info-container'>
                            <Box className='icon-container'>
                                <LocationOnOutlined className='product-info-icon' />
                            </Box>
                            <Box className='title-and-value-container'>
                                <Box className='title'>{t('unitLocationText')}</Box>
                                <Box className='value'>{equipment?.locker_bank?.location?.name}</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className='go-to-home-button-container'>
                    <ButtonComponent buttonId='go-to-home-button' handleClick={handleNavigateToHomePage} title={t('goToHomeBtnText')} customClass='go-to-home-button' type={BUTTON_SECONDARY} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PaymentSuccessfulPage;