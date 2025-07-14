import React from 'react'
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { ENTER } from '../assets/constants/Constants';
import useGeoLocation from "react-ipgeolocation";

const CustomMobileInput = ({handleSetMobile,value,handleKeyDown,hasError,disabled}) => {
    const { t } = useTranslation();
    const location = useGeoLocation();

    const handleKeyEvents = (event) => {
        if(event.key === ENTER){
            if(!disabled){
                handleKeyDown();
                event.target.blur()
            }
        }
    };

    return (
        <PhoneInput
        country={location?.country || 'in'}
        value={value}
        containerClass='container'
        inputClass={`phoneInput ${hasError ? 'error-border' : ''}`}
        dropdownClass='dropdown'
        dropdownStyle={{color : 'black'}}
        specialLabel=''
        placeholder={t('enterMobileNumber')}
        onChange={handleSetMobile}
        countryCodeEditable={false}
        onKeyDown={(event) => handleKeyEvents(event)}
        />
  )
}

export default CustomMobileInput;
