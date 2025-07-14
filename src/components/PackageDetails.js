import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const PackageDetails = (props) => {
    const {t} = useTranslation()
    const { clientRef, assignTime } = props
    
  return (
    <Box className="parcel-details">
            <img className="durolt-logo" src={require("../assets/images/CourierBox.jpg")} alt={t('durolt_logo')} />
            <Box className="text-view">
              <Typography variant='subtitle2' className='parcel-details-text'>
                {clientRef}
              </Typography>
              <Typography variant='subtitle2' className='parcel-details-subtext'>
                {t("assignTime")}{" : "}{assignTime}
              </Typography>
            </Box>
          </Box>
  )
}
