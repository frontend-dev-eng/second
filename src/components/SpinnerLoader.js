import { Box } from '@mui/material';
import React from 'react';

const SpinnerLoader = ({ message }) => {

    return (
        <Box className="spinner-loader-container">
                <Box className='loader'/>
        </Box>
    );
};

export default SpinnerLoader;