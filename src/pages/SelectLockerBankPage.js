import { Box, Container, Typography, useTheme } from '@mui/material'
import React from 'react'
import { LockerBanks } from '../components/LockerBanks'
import { useTranslation } from 'react-i18next'

const SelectLockerBankPage = () => {
    const theme = useTheme()
    const colorScheme = theme.palette.mode
    const {t} = useTranslation()

    const lockerBanks = [
        {
            "name": "AIR-14F-ZONE1-B7-B8",
            "id": "6",
            "locker_bank_status": "active",
            "is_favourite": true
        },
        {
            "name": "AIR-14F-ZONE1-B2",
            "id": "2",
            "locker_bank_status": "active",
            "is_favourite": false
        },
        {
            "name": "AIR-14F-ZONE1-B3",
            "id": "62",
            "locker_bank_status": "active",
            "is_favourite": false
        },
        {
            "name": "AIR-14F-ZONE1-B5-B6",
            "id": "79",
            "locker_bank_status": "inactive",
            "is_favourite": true
        },
        {
            "name": "AIR-14F-ZONE1-B4",
            "id": "77",
            "locker_bank_status": "active",
            "is_favourite": false
        },
        {
            "name": "AIR-14F-ZONE1-B1",
            "id": "149",
            "locker_bank_status": "active",
            "is_favourite": false
        },
        {
            "name": "AIR-14F-ZONE1-B1",
            "id": "150",
            "locker_bank_status": "active",
            "is_favourite": true
        },
        {
            "name": "AIR-14F-ZONE1-B1",
            "id": "151",
            "locker_bank_status": "active",
            "is_favourite": true
        }
    ]
    
    // const lockerBanks = [
        
    // ]
    

    return (
        <Container className="select-locker-bank-page" maxWidth="xs">
            <Box className="main-container">
                    {lockerBanks !== undefined && lockerBanks.length > 0 ? (
                        lockerBanks.map((locker) => (
                            <LockerBanks lockerBank={locker}/>
                        ))
                    ) : (
                        <Typography className={`no-locker-bank-text ${colorScheme == 'dark' ? 'dark-text' : ""} `}>{t('noAvailableLockerBanks')}</Typography>
                    )}
            </Box>
        </Container>
    )
}

export default SelectLockerBankPage