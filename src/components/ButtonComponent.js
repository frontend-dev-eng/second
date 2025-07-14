import { Box, Button, CircularProgress } from "@mui/material";
import { BUTTON_PRIMARY } from "../assets/constants/Constants";
import { useState } from "react";

const ButtonComponent = ({title,handleClick, startIcon, type = BUTTON_PRIMARY, disabled = false, variant = 'contained', customClass = "", buttonId = "",endIcon = null}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = async () => {
    setIsLoading(true);
    const handleClickPromise = handleClick(); // Start handleClick execution
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 2000)); // Create a 2-second delay
    await Promise.all([handleClickPromise, timeoutPromise]); // Wait for both to complete
    setIsLoading(false);
  };

  
  return(
    <Box component="section" className={variant === 'contained' ? `button-container ${customClass}` : `button-container` }>
      <Button 
        className={`button ${customClass} ${type} ${disabled || isLoading ? "disabled-button" : ""}`} 
        id={buttonId}
        size="large" 
        variant={variant} 
        onClick={onClickHandler} 
        startIcon={isLoading ? <CircularProgress size={24} /> : startIcon}
        endIcon={endIcon}
        disabled={disabled || isLoading}
        >
        {!isLoading && title}
      </Button>
    </Box>

  ) 
};
export default ButtonComponent;
