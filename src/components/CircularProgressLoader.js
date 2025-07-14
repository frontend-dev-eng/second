import React from 'react';
import { Box, Typography, useTheme, CircularProgress } from '@mui/material';
import { APP_ENGLISH_VIOLET_COLOR, APP_WHITE_COLOR } from '../assets/constants/Colors';

const CircularProgressLoader = ({ message }) => {
    const theme = useTheme();
    const colorScheme = theme.palette.mode;

    return (
        <Box className="pleaseWaitMainView">
            <Box className="pleaseWaitSubView">
                <CircularProgress className='loader'/>
                <Typography className="pleaseWaitText"> {message}</Typography>
            </Box>
        </Box>
    );
};

export default CircularProgressLoader;