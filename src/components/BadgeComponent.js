import { Box, Typography } from '@mui/material'
import React from 'react'

export const BadgeComponent = (props) => {
    const {badgeContent, primaryText,secondaryText,badgeContainer} = props

  return (
    <Box className="badge-container">
    <Box className="content-view">
        <Box className={`badge ${badgeContainer}`}>
            <Typography className="badge-content" color="white">
                {badgeContent}
            </Typography>
        </Box>
        <Box>
            <Typography className='primary-text'>
                {primaryText}
            </Typography>
            {secondaryText !== "" &&
            <Typography className='secondary-text'>
                {secondaryText}
            </Typography>}
    </Box>
    </Box>
</Box>
  )
}
