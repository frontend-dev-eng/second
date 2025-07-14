import { Box } from '@mui/material'
import React, { useState } from 'react'
import SpinnerLoader from '../components/SpinnerLoader'

const ChatBoatPage = () => {
    const [isLoading,setIsLoading] = useState(true)

    const hideLoader = () => {
        setIsLoading(false)
    }

    return (
        <Box className='chat-bot-page'>
            {isLoading && <SpinnerLoader/> }
            <iframe src='https://d2etkzygzif0yx.cloudfront.net/index.html' onLoad={hideLoader} className='chat-support-container'/>}
        </Box>
    )
}

export default ChatBoatPage