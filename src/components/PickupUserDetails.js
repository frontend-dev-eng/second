import { Box, Typography } from '@mui/material'
import React from 'react'

export const PickupUserDetails = (props) => {
    const { pickupUserDetails } = props
    return (
        <Box className="pickup-user-details">
            <Box className="initial-view">
                <Typography variant="h6" className='initial-text'>
                    {pickupUserDetails?.username.substring(0, 1).toUpperCase()}
                </Typography>
            </Box>

            <Box className="text-view">
                {pickupUserDetails?.first_name && pickupUserDetails?.last_name ?
                    <Typography variant='subtitle2' className='user-details'>
                        {pickupUserDetails?.first_name + " " + pickupUserDetails?.last_name}
                    </Typography> : null}
                <Typography variant='subtitle2' className='user-details'>
                    {pickupUserDetails?.email}
                </Typography>
                <Typography variant='subtitle2' className='user-details'>
                    {pickupUserDetails?.mobile_number}
                </Typography>
            </Box>
        </Box>
    )
}
