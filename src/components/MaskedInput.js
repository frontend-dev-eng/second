import { TextField, Typography } from '@mui/material';
import React from 'react'
import InputMask, { ReactInputMask } from 'react-input-mask';
import { ENTER } from '../assets/constants/Constants';

export const MaskedInput = ({ value, onChange, type, className, inputId = '', placeholder, multiline = false, handleKeyDown, autoFocus = false, variant = 'outlined', rows = 0,inputProps = {},margin = 'none',required = true,onEmpty,hasError, maxLength,disabled,errorMessage = null,placeholderClass = null,inputMode = 'text',mask,editable = true}) => {
  
  const handleKeyEvents = (event) => {
    if(event.key === ENTER){
        if(!disabled){
          handleKeyDown();
          event.target.blur()
        }
    }
  };

  console.log("ssss")

  return (
    <InputMask mask={mask} maskChar="" value={value} onChange={onChange}>
    {(inputProps) => 
    <TextField
      className={`input-container ${className}`}
      id={inputId}
      fullWidth
      margin={margin}
      variant={variant}
      type={type}
      autoFocus={autoFocus}
      onEmptied={onEmpty}
      placeholder={placeholder}
      InputProps={{...inputProps, className: placeholderClass || 'placeholder-color',readOnly : !editable}}
      multiline={multiline}
      rows={rows}
      inputProps={{maxLength: maxLength}}
      error={hasError}
      required={required}
      onKeyDown={(event) => handleKeyEvents(event)}
      inputMode={inputMode}
    />}
    </InputMask>
  )
}
