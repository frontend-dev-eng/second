import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useTheme } from '@mui/material'
import React from 'react'
import ButtonComponent from './ButtonComponent'
import { useTranslation } from 'react-i18next'
import { APP_ENGLISH_VIOLET_COLOR, APP_WHITE_COLOR } from '../assets/constants/Colors'

const CustomDialog = ({dialogId = '', dialogVisible,onClose,handleCancel,handleAccept,children = null,dialogTitle = null,dialogContentText = null,buttonOneTitle = null,buttonTwoTitle = null,buttonProps = null}) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const colorScheme = theme.palette.mode

    return (
            <Dialog id={dialogId} open={dialogVisible} onClose={onClose}
                fullWidth={true} maxWidth="xs" className='custom-dialog'>
                {dialogTitle ?
                <DialogTitle className='dialog-title' sx={{backgroundColor : colorScheme == 'dark' ? APP_ENGLISH_VIOLET_COLOR : APP_WHITE_COLOR}}>
                {dialogTitle}
                 </DialogTitle> : null}
                <DialogContent sx={{backgroundColor : colorScheme == 'dark' ? APP_ENGLISH_VIOLET_COLOR : APP_WHITE_COLOR}}>
                {dialogContentText ? <DialogContentText className='dialog-content-text'> 
                {dialogContentText}
                </DialogContentText>: null}
                {children ? children() : null}
                </DialogContent>
                <DialogActions sx={{backgroundColor : colorScheme == 'dark' ? APP_ENGLISH_VIOLET_COLOR : APP_WHITE_COLOR}}>
                    {buttonOneTitle ?  <ButtonComponent buttonId={`${dialogId}-button-one`} handleClick={handleCancel}  title={buttonOneTitle} type={buttonProps? buttonProps.buttonOne.type : null} variant={buttonProps?.buttonOne?.variant} customClass={buttonProps?.buttonOne?.customClass} /> : null}
                    {buttonTwoTitle ? <ButtonComponent buttonId={`${dialogId}-button-two`} handleClick={handleAccept} title={buttonTwoTitle} type={buttonProps? buttonProps.buttonTwo.type : null} /> : null}
                </DialogActions>
            </Dialog>
    )
}

export default CustomDialog;
