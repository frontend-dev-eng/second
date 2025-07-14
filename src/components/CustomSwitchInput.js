import { Box } from '@mui/material';
import React from 'react'
import CustomMobileInput from './CustomMobileInput';
import { useTranslation } from 'react-i18next';
import ButtonComponent from './ButtonComponent';
import { CustomTextInput } from './CustomTextInput';

export const CustomSwitchInput = ({ isMobile = false, mobile, email, handleSetMobile, toggleInput, handleSetEmail, validation,error,disabled,hasSwitchedAuthMethod,enableTabs}) => {
    const { t } = useTranslation()
    
    return (
        <Box className="inputContainer">
            {isMobile ?
                <CustomMobileInput
                    handleSetMobile={handleSetMobile}
                    value={mobile}
                    handleKeyDown={validation}
                    hasError={error}
                    disabled={disabled}
                /> :
                <CustomTextInput
                    className="emailInput"
                    autoFocus={true}
                    variant="outlined"
                    placeholder={t('enterEmailAddress')}
                    type='email'
                    onChange={handleSetEmail}
                    value={email}
                    handleKeyDown={validation}
                    hasError={error}
                    disabled={disabled}
                />
                }
                {/* {hasSwitchedAuthMethod && !enableTabs && <ButtonComponent handleClick={toggleInput} title={isMobile ? t('UseEmailText') : t('UseMobileText')} variant={'text'} customClass='button'/>} */}
        </Box>
    )
}
