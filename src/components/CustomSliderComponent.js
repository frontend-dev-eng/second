import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import SlideButton from 'react-slide-button';
import { CHEVRONS_RIGHT } from '../assets/constants/Icons';
import { useTranslation } from 'react-i18next';


const CustomSliderComponent = ({ bankDetails = null, onSlideDone,extraClass,label,overlayText = null}) => {
    const { t } = useTranslation();
    const [reset,setReset] = useState(0)

    /**
     * Handles the reset functionality of the slider component.
     * 
     * @returns {Promise<void>} A promise that resolves when the reset is complete.
     */
    const handleReset = async () => {
        setTimeout(() => {
            setReset(reset + 1)
        }, 500);
        onSlideDone(); // Start handleClick execution
    }

    return (
        <SlideButton
            mainText={
                <Box className='swipeBtn'>
                    <Typography className='swipeText'>{label ? label : t('swipeBtnText')}</Typography>
                    <Typography className='lockerText'>
                        {bankDetails}
                    </Typography>
                </Box>
            }
            overlayText={overlayText ? overlayText : t('button_open_locker')}
            reset={reset}
            caret={<CHEVRONS_RIGHT/>}
            classList={`slide-button ${extraClass}`}
            overlayClassList="slide-button-overlay"
            caretClassList="slide-button-caret custom-caret-color"
            minSlideWidth={0.8}
            minSlideVelocity={1}
            onSlideDone={handleReset}
        />)
}

export default CustomSliderComponent;