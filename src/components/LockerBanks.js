import React from 'react'
import { FAVOURITE_ICON, LOCKER_ICON, UnFavouriteIcon } from '../assets/constants/Icons'
import { Box, Typography, ListItem, List } from '@mui/material'
import { APP_GREY_COLOR, APP_TEA_GREEN_COLOR } from '../assets/constants/Colors'

export const LockerBanks = (props) => {
    const { lockerBank } = props
    return (
        <List key={lockerBank?.id}>
            <ListItem
                className="list-item"
            // onClick={navigateToSubLocations}
            >
                <Box className="initial-view" sx={{ backgroundColor: lockerBank?.locker_bank_status == 'active' ? APP_TEA_GREEN_COLOR : APP_GREY_COLOR }}>
                    <LOCKER_ICON />
                </Box>
                <Box className="title-view">
                    <Typography variant="h6" className="item-title-text">
                        {lockerBank?.name}
                    </Typography>
                </Box>
                <Box className="favourite-view" onClick={() => { }}>
                    {lockerBank?.is_favourite ? <FAVOURITE_ICON /> : <UnFavouriteIcon />}
                </Box>
            </ListItem>
        </List>
    )
}
