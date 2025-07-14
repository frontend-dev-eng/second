import { Box, Typography } from '@mui/material'
import React from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { QrCodeFinderIcon } from '../assets/constants/Icons';
import { useTranslation } from 'react-i18next';

const CustomQRCodeReader = ({handleOnScan,handleOnError,scanType}) => {
  const {t} = useTranslation()
  console.log(`scanType: ${scanType}`);
  const barcodeFormats = [
    "aztec",
    "code_128",
    "code_39",
    "code_93",
    "codabar",
    "databar",
    "databar_expanded",
    "data_matrix",
    "dx_film_edge",
    "ean_13",
    "ean_8",
    "itf",
    "maxi_code",
    "micro_qr_code",
    "pdf417",
    "qr_code",
    "rm_qr_code",
    "upc_a",
    "upc_e",
    "linear_codes",
    "matrix_codes",
    "unknown"
  ];


  return (
    <Box className="qr-container">
        <Scanner
            className="qr-code-reader"
            scanDelay={500}
            components={{finder: false}}
            formats={barcodeFormats}
            onScan={(data) => handleOnScan(data)}
            onError={(error) => handleOnError(error)} 
        />
      {scanType &&
      <Typography className="camera-frame-overlay">
        {t('qrCodeReadWarning')}
      </Typography>}
      <Box className="custom-finder">
        <QrCodeFinderIcon />
      </Box>
    </Box>
  )
}

export default CustomQRCodeReader
