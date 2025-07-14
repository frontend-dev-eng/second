import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NO_INTERNET_ICON } from '../assets/constants/Icons';

const ConnectionLost = () => {
    const [dialogOpen, setDialogOpen] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        if (navigator.onLine) {
          setDialogOpen(false);
        }
      }, []);

    const handleClose = () => {
        if (navigator.onLine) {
            setDialogOpen(false);
        } else {
            setDialogOpen(true);
        }
    };

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleClose}
            aria-labelledby="connection-lost-dialog"
            classes={{ paper: 'custom-dialog-paper' }}
        >
            <DialogTitle className='assign-text'>{t('connectionLostText')}</DialogTitle>
            <DialogContent>
                <NO_INTERNET_ICON />
                <Typography className='assign-para'>{t('connectionLostInfo')}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary"> {t('button_try_again')}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConnectionLost;