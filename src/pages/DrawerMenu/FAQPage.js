import { Box } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const FAQPage = () => {
    const { t } = useTranslation();

    return (
        <Box className="faq-page">
            <iframe src={t('faqHtmlContent')} loading='eager' className='faq-container' />
        </Box>
    )
}

export default FAQPage