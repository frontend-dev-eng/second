import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PARCEL_ICON } from '../assets/constants/Icons'
import { useTranslation } from 'react-i18next'
import ButtonComponent from '../components/ButtonComponent'
import ShowToast from '../components/ToastComponent'
import { TOAST_ERROR } from '../assets/constants/Constants'
import { storeSecureItemInSpecifiedStorage } from '../lib/BrowserStorageAccessMiddleware'
import { LB_LOCATION, LOCAL_STORAGE } from '../assets/constants/BrowserStorageKeys'
import { CustomTextInput } from '../components/CustomTextInput'


const response = {
    "openstatus": "Not Opened",
    "locker_bank_name": "Chetan Test",
    "locker_unit": "120",
    "locker_bank_id": 1,
    "assignment_type": "parcel",
    "device_fcm_token": "f-GhY1LATW2cDWRQ2oXWTj:APA91bF5yeim_VNjTst8lsEtRaIVXK-5OjVW3ny9Nfvxni_brxzDbR56SxaCC4xB_bpW1V3OcamSiBGxepaQFoHxIaMlgGD6c_i-7oyzOdcGd3UhRIkaukEV7UbLl5aO5Q3cUv_e3LzB",
    "locker_bank_location": "Durolt Test",
    "locker_unit_prefix": "CT",
    "hardware_id": "1",
    "hub_id": "1",
    "hub_data": "",
    "is_configured": true,
    "status": "occupied",
    "assignment_timestamp": "2024-06-05T11:16:38.411559",
    "size": "Small",
    "transaction_id": "e26d8f28-0",
    "message": "Locker 'Chetan Test-120' is successfully assigned to user '81'"
}

const ParcelDetailsScreenPage = (props) => {
    const [ParcelLockerDetails, setParcelLockerDetails] = useState();
    const [parcelID, setparcelID] = useState('');
    const [description, setDescription] = useState('');

    const { t } = useTranslation()

    useEffect(() => {
        getParcelLocker()
    }, [])


    const getParcelLocker = () => {
        try {
            setParcelLockerDetails(response)
        } catch (error) {
            console.error("ParcelDetailsScreenPage.js - getParcelLocker", error)
        }
    }


    const validations = () => {
        if (parcelID.trim() === '') {
            ShowToast(t('emptyParcelIdError'), TOAST_ERROR)
        } else {
            handleSubmitParcelDetails()
        }
    }


    const handleSubmitParcelDetails = () => {
        try {
            storeSecureItemInSpecifiedStorage(LOCAL_STORAGE,LB_LOCATION,ParcelLockerDetails?.locker_bank_location)
            props.history.push({
                pathname: '/drop-parcel', state: {
                    parcelId : parcelID,
                    description : description,
                    assignTime : ParcelLockerDetails?.assignment_timestamp,
                    pickupUserDetails : props.history.location?.state?.pickupUserDetails
                }
            })
        } catch (error) {
            console.error("ParcelDetailsScreenPage.js - handleSubmitParcelDetails", error)
        }
    }


    return (
        <Container className='parcel-details-screen-page' maxWidth="xs">
            <Box className="main-container">
                <Box className="top-container">
                    <PARCEL_ICON />
                    <Box className="bank-details-view">
                        <Typography variant='subtitle1' className='locker-bank-detail-text'>
                            {ParcelLockerDetails?.locker_bank_location}{" > "}{ParcelLockerDetails?.locker_bank_name}{" > "}{ParcelLockerDetails?.locker_unit}
                        </Typography>
                        <Typography variant='subtitle2' className='locker-bank-location'>
                            {ParcelLockerDetails?.locker_bank_location}
                        </Typography>
                    </Box>
                </Box>
                <Box className='parcel-details-text-view'>
                    <Typography variant='h4'>
                        {t('parcelDetailsText')}
                    </Typography>
                    {/* <Box className="camera-view">
                    <Box className="icon-view" sx={{display : 'flex',alignSelf : 'center'}}>
                    <CAMERA_ICON/>
                    </Box>
                    <Typography variant='subtitle1' className='take-photo-text'>{t('takePhotoText')}</Typography>
                </Box> */}
                </Box>
                <Box className="input-view">
                    <CustomTextInput
                        className={'input'}
                        placeholder={t('parcelIdText')}
                        value={parcelID}
                        onChange={(e) => setparcelID(e.target.value.trim())}
                        />
                    <CustomTextInput
                        className={'input'}
                        placeholder={t('descriptionText')}
                        value={description}
                        multiline
                        rows={5}
                        type={'text'}
                        onChange={(e) => setDescription(e.target.value.trim())}
                    />
                </Box>
                <ButtonComponent
                    handleClick={validations}
                    title={t("button_next").toUpperCase()}
                />
            </Box>
        </Container>
    )
}
export default ParcelDetailsScreenPage 
