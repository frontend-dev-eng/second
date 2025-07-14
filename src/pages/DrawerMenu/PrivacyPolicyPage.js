import { Box } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

const PrivacyPolicyPage = () => {
const {t} = useTranslation();

  return (
    <Box className='privacy_policy_page'>
    <Box className='main-container'>
        <Box className='main'>
            <Box dangerouslySetInnerHTML={{__html: t('privacyPolicyContent')}}/>
        </Box>
    </Box>
</Box>
  )
}

export default PrivacyPolicyPage