import { Box, IconButton } from '@mui/material'
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react'

const BackIconHeader = () => {
    const history = useHistory();
    const { t } = useTranslation();


    const onPressHandler = () => {
        // Temporary changes for verification successful page back handler. Need to update later.
        if (history.location.pathname === '/verification-successful') {
            history.push({
                pathname: '/equipment-grid'
            });
        }
        else {
            history.goBack();
        }
    };

    return (
        <Box className='back-header'>
            <Box className='main-container'>
                <Box className='main'>
                    <Box className='back-header-container'>
                        <IconButton edge="start" color="inherit" onClick={onPressHandler} aria-label="back">
                            {t('backArrowBlackIcon') !== 'backArrowBlackIcon' ? <img className='back-image' src={t('backArrowBlackIcon')} alt='back' /> : <></>}
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default BackIconHeader