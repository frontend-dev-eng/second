import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CircularProgressLoader from './CircularProgressLoader';

const StripePayCheckout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const checkoutUrl = location.state?.checkoutUrl || '';
  const { t } = useTranslation();

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  return (
    <Box>
      {isLoading && (
        <CircularProgressLoader message={t('initiating_transaction_please_wait')} />
      )}
    </Box>
  );
};

export default StripePayCheckout;