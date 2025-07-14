import { Box, TextField } from '@mui/material';
import React from 'react'
import { BACKSPACE, ENTER } from '../assets/constants/Constants';

export const CustomBoxInput = ({inputValue,handleChange,inputRefs,error,handleSubmitEvent,disabled,customClass = null}) => {

  const handleKeyDown = (event, index) => {
    if (event.key === BACKSPACE) {
      handleChange({ target: { value: '' } }, index);
        if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
    if(event.key === ENTER ){
      if(!disabled){
        handleSubmitEvent()
        event.target.blur()
      }
    }
  };
    return (
      <Box className="custom-box-input">
        {inputValue.map((value, index) => (
          <TextField
            key={index}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            inputRef={(el) => (inputRefs.current[index] = el)}
            className="input"
            value={value}
            error={error}
            inputProps={{maxLength : 1,className : customClass || "placeholder-color"}}
          />
        ))}
      </Box>
    );
  };

