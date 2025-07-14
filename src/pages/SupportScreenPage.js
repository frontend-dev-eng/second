import React from 'react';
import { Box, Typography, Link, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SupportScreenPage = () => {
    const { t } = useTranslation();
    const theme = useTheme()
    const colorScheme = theme.palette.mode

    return (
        <Box className='support-screen-page'>
            <Box className='main-container'>
                <Box className='main'>
                    <Box className="container">
                        <Box className="linkingGroup">
                            <Typography className='title' sx={{color : theme.palette.text.primary}}>{t('sendEmailText')}</Typography>
                            <Link href="mailto:support@durolt.com"> {t('supportWeblink')}</Link>
                            <Typography className='title' sx={{color : theme.palette.text.primary}}>{t('suggesstionsText')}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SupportScreenPage;