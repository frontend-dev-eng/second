import { CloseRounded } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { act } from 'react'
import { CustomTextInput } from '../../components/CustomTextInput'
import { formatExpiryDate, formatValue } from '../../lib/Utils'
import InputMask from 'react-input-mask'
import { MaskedInput } from '../../components/MaskedInput'
import ButtonComponent from '../../components/ButtonComponent'
import { BUTTON_SECONDARY, CARD_NUMBER_MASK, EXPIRY_DATE_MASK } from '../../assets/constants/Constants'

const AccountDetailsPage = () => {
    const [cardNumber, setCardNumber] = React.useState('5234 3366 6363 3636');
    const [expiryDate, setExpiryDate] = React.useState('10/24');
    const [cvv, setCvv] = React.useState('123');
    const [cardHolderName, setCardHolderName] = React.useState('Kunal Soni');
    const [isEditable, setIsEditable] = React.useState(false);


    const handleSetCardNumber = (event) => {
        setCardNumber(event.target.value);
    }

    const handleSetExpiryDate = (event) => {
        const actualValue = event.target.value
        setExpiryDate(actualValue);
    }

    const handleSetCvv = (event) => {
        setCvv(event.target.value);
    }

    const handleSetCardHolderName = (event) => {
        setCardHolderName(event.target.value);
    }

    const handleEditCardDetails = () => {
        setIsEditable(true);
    }

    return (
        <Box className='account-details-page'>
            <Box className='main-container'>
                <Box className='main'>
                    <Box className="round-and-initial-container">
                        <Box className="round-shape">
                            <Typography className="initial">KS</Typography>
                        </Box>
                    </Box>
                    <Box className='card-details-container'>
                        <Box className='title-and-close-button'>
                            <Typography className='pricing-info-title'>Card Details</Typography>
                            <IconButton className='close-button' onClick={() => { }}>
                                <CloseRounded />
                            </IconButton>
                        </Box>
                        <Typography className='card-details-text'>All your rentals will be charged on this saved card details</Typography>
                        <Box className='card-input-container'>
                            <MaskedInput
                                mask={CARD_NUMBER_MASK}
                                className={'card-number-input'}
                                inputId='card-number-input'
                                editable={isEditable}
                                placeholder="Enter Card Number"
                                value={cardNumber}
                                onChange={handleSetCardNumber}
                                placeholderClass={'card-placeholder'}
                            />
                            <Box className="cvv-and-expiry-input-container">
                                <MaskedInput
                                    mask={EXPIRY_DATE_MASK}
                                    className={'card-number-input'}
                                    inputId='expiry-date-input'
                                    placeholder="MM/YY"
                                    editable={isEditable}
                                    value={expiryDate}
                                    onChange={handleSetExpiryDate}
                                    placeholderClass={'card-placeholder'}
                                />
                                <CustomTextInput
                                    className={'card-number-input'}
                                    inputId='cvv-input'
                                    placeholder="CVV"
                                    inputMode='numeric'
                                    editable={isEditable}
                                    type={'password'}
                                    maxLength={4}
                                    value={cvv}
                                    onChange={handleSetCvv}
                                    placeholderClass={'card-placeholder'}
                                />
                            </Box>
                            <CustomTextInput
                                className={'card-number-input'}
                                inputId='card-holder-name-input'
                                placeholder="Card Holder Name"
                                editable={isEditable}
                                value={cardHolderName}
                                onChange={handleSetCardHolderName}
                                placeholderClass={'card-placeholder'}
                            />
                        </Box>
                    </Box>
                    <Box className='edit-card-details-container'>
                        <ButtonComponent buttonId='edit-card-details-button' handleClick={handleEditCardDetails} title={"Edit Card Details"} customClass='edit-card-details-button' type={BUTTON_SECONDARY} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AccountDetailsPage