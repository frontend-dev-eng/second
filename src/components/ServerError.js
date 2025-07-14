import React from 'react';
import { Box, Typography } from '@mui/material';
import ButtonComponent from "../components/ButtonComponent";
import { useTranslation } from 'react-i18next';
import { DUROLT_LOGO_FADE_ICON } from '../assets/constants/Icons';

const ServerError = ({ message, message2, callback, TimeoutUi }) => {
    const { t } = useTranslation();

    return (
        <Box className="server-error">
            <Box className='errorMessageText' sx={{ marginTop: TimeoutUi ? 5 : 10 }}>
                <Box className='errorMessageText'>
                    <DUROLT_LOGO_FADE_ICON />
                    <Typography className='serverMainErrorText' sx = {{paddingTop : TimeoutUi ? 0 : 57}}>{message ? message : ''}</Typography>
                    <Typography className='serverSubErrorText'>{message2 ? message2 : ''}</Typography>
                    {callback && (
                        <ButtonComponent handleClick={callback} title={t('button_try_again')} />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ServerError;