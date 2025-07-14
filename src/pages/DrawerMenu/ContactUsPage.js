import { Box } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

const ContactUsPage = () => {
    const {t} = useTranslation();

  return (
    <Box className='contact-us-page'>
    <Box className='main-container'>
        <Box className='main'>
            <Box dangerouslySetInnerHTML={{__html: t('contactUsContent')}}/>
        </Box>
    </Box>
</Box>
  )
}

export default ContactUsPage