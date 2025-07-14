import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const AboutScreenPage = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const appVersion = '1.0.0'; // Replace with actual app version logic if needed

    return (
        <Box className='about-screen-page'>
            <Box className='main-container'>
                <Box className='main'>
                    {t('aboutContent') !== 'aboutContent' ?
                    <Box dangerouslySetInnerHTML={{__html: t('aboutContent')}}/> :
                    <>
                    <Box className="container-about">
                        <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
                            {t('welcome_text')}
                        </Typography>
                        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                            {t('app_version_text')} {appVersion}
                        </Typography>
                    </Box>

                    <Box className="linking_group">
                        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                            {t('know_more_text')}
                        </Typography>
                        <Link href="https://durolt.com/" color="primary">
                            {t('weblink_text')}
                        </Link>
                    </Box>
                        </>}
                </Box>
            </Box>
        </Box>
    );
};

export default AboutScreenPage;