import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {Box, Button, Typography} from '@mui/material';
import CustomSliderComponent from '../components/CustomSliderComponent';
import {HOME, UNIT_OPENED, LANDING, LOCKER_OPENED, ASSIGNED_LOCKERS, CAPTURE_EQUIPMENT_IMAGE} from '../assets/constants/PageList';
import { getPathForNextPage, calculateTimeDifference, formatTimeInLeadingDigits } from '../lib/Utils';

const UnitOpenedPage = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const {lockerResponse} = history.location.state;
    const [elapsedTime, setElapsedTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const rentedProductsButtonHandler = () => {
        console.log('rented products button clicked');
        history.push(getPathForNextPage(UNIT_OPENED, ASSIGNED_LOCKERS));
    }

    const rentNewProductButtonHandler = () => {
        history.push(getPathForNextPage(UNIT_OPENED, HOME));
    }

    const endRentalAndReturnButtonHandler = () => {
        history.push({pathname : getPathForNextPage(UNIT_OPENED, CAPTURE_EQUIPMENT_IMAGE),state : {lockerResponse : lockerResponse}});
    }

    useEffect(() => {
        const unblock = history.listen((location, action) => {
          if (action === 'POP') {
            history.push(getPathForNextPage(UNIT_OPENED, HOME));
          }
        });
    
        return () => {
          unblock();
        };
      }, [history]);

    useEffect(() => {
        const updateElapsedTime = () => {
            const time = calculateTimeDifference(lockerResponse.assigned_date);
            setElapsedTime(time);
        };

        updateElapsedTime();
        const interval = setInterval(updateElapsedTime, 1000);
        return () => clearInterval(interval);
    }, [lockerResponse.assigned_date]);

    return (
        <Box className='unit-opened-page'>
            <Box className='main-container'>
                <Box className='main'>
                    <Box className='img-container'>
                        <img className='unit-opened-img' src={require('../assets/images/person_with_lock_and_key.png')} alt='Unit Opened Image' />
                    </Box>
                    <Box className='title-and-description-container'>
                        <Typography className='title'>{t('unitOpenedLabel')}</Typography>
                        <Typography className='description'>{t('closeDoorWarning')}</Typography>
                    </Box>
                    <Box>
                        <Box className='remaining-time-container'>
                            {
                                elapsedTime.hours > 0 && (
                                    <>
                                        <Box className='time-unit-box'>
                                            <Box className='digits'>{formatTimeInLeadingDigits(elapsedTime.hours)}</Box>
                                            <Box className='time-unit'>{t('timerInHrsLabel')}</Box>
                                        </Box>
                                        <Box className='separating-colon'>:</Box>
                                    </>
                                )
                            }
                            <Box className='time-unit-box'>
                                <Box className='digits'>{formatTimeInLeadingDigits(elapsedTime.minutes)}</Box>
                                <Box className='time-unit'>{t('timerInMinsLabel')}</Box>
                            </Box>
                            <Box className='separating-colon'>:</Box>
                            <Box className='time-unit-box'>
                                <Box className='digits'>{formatTimeInLeadingDigits(elapsedTime.seconds)}</Box>
                                <Box className='time-unit'>{t('timerInSecsLabel')}</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className='buttons-container'>
                        <Button id='rented-products-button' onClick={rentedProductsButtonHandler}>{t('rentedProductsBtnText')}</Button>
                        <Button id='rent-new-product-button' onClick={rentNewProductButtonHandler}>{t('rentNewProductBtnText')}</Button>
                    </Box>
                    <Box className='end-rental-and-return-button-container'>
                        <CustomSliderComponent
                            label={t('sliderToEndRentalText')}
                            bankDetails={null}
                            overlayText={" "}
                            onSlideDone={endRentalAndReturnButtonHandler}
                            extraClass={'end-rental-and-return-button'}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default UnitOpenedPage;