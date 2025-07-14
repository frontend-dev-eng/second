import React, { useState, useEffect } from 'react';
import { Typography, Box, Modal } from '@mui/material';
import ShowToast from "../components/ToastComponent";
import { TOAST_ERROR } from "../assets/constants/Constants";
import { useTranslation } from 'react-i18next';
import { SUCCESS_PIN } from "../assets/constants/Icons";
import ButtonComponent from "../components/ButtonComponent";
import { CustomTextInput } from '../components/CustomTextInput';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const ChangePinPage = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pin, setPIN] = useState('');
    const [newPIN, setNewPIN] = useState('');
    const [confirmNewPIN, setConfirmNewPIN] = useState('');
    const [sendButtonBottom, setSendButtonBottom] = useState(30);
    const { t } = useTranslation();

    useEffect(() => {
        const handleKeyboardShow = (event) => {
            setSendButtonBottom(event.target.scrollHeight);
        };

        const handleKeyboardHide = () => {
            setSendButtonBottom(30);
        };

        window.addEventListener('focusin', handleKeyboardShow);
        window.addEventListener('focusout', handleKeyboardHide);

        return () => {
            window.removeEventListener('focusin', handleKeyboardShow);
            window.removeEventListener('focusout', handleKeyboardHide);
        };
    }, []);

    const ForgetPINScreen = () => {
        props.history.push("/forget-pin");
    };

    const changePINCode = () => {
        const PINRegx = /^\d{4}$/;

        if (newPIN.trim() === '' || pin.trim() === '' || confirmNewPIN.trim() === '') {
            ShowToast(t('all_credentials_error'), TOAST_ERROR);
        } else if (!PINRegx.test(pin) || !PINRegx.test(newPIN) || !PINRegx.test(confirmNewPIN)) {
            ShowToast(t('pin_error'), TOAST_ERROR);
        } else if (newPIN !== confirmNewPIN) {
            ShowToast(t('pin_mismatch_error'), TOAST_ERROR);
        } else {
            updatePIN();
        }
    };

    const updatePIN = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            const domain = localStorage.getItem('domain');

            if (accessToken && domain) {
                try {
                    const res = ""; // await changePIN(pin, newPIN, confirmNewPIN, accessToken, domain);
                    if (res) {
                        setModalVisible(true);
                        setTimeout(() => {
                            setModalVisible(false);
                            props.history.push("/home");
                        }, 2000);
                        setPIN('');
                        setNewPIN('');
                        setConfirmNewPIN('');
                    }
                } catch (err) {
                    console.log('changePIN error =', err);
                }
            }
        } catch (e) {
            console.log('Error changePIN try catch', e);
        }
    };

    return (
        <Box className='change-pin-page'>
            <Box className='main-container'>
                <Box className='main'>
                    <Box className="inputView">
                        <CustomTextInput
                            className={'input'}
                            placeholder={t('currenPIN')}
                            value={pin}
                            onChange={(e) => setPIN(e.target.value.replace(/[^\d]/g, ''))}
                            type="tel"
                            autoFocus={true}
                        />
                        <Box sx={{display : 'flex',justifyContent : 'flex-end'}}>
                            <ButtonComponent handleClick={ForgetPINScreen} title={t('forgetPIN')} variant='text' customClass="forgetPINText" />
                        </Box>
                        <CustomTextInput
                            className={'input'}
                            placeholder={t('newPIN')}
                            value={newPIN}
                            onChange={(e) => setNewPIN(e.target.value.replace(/[^\d]/g, ''))}
                            type="tel"  
                        />
                        <CustomTextInput
                            className={'input'}
                            placeholder={t('reEnterPIN')}
                            value={confirmNewPIN}
                            onChange={(e) => setConfirmNewPIN(e.target.value.replace(/[^\d]/g, ''))}
                            type="tel"
                        />
                    </Box>
                    <Box className="btnView" style={{ bottom: sendButtonBottom }}>
                        <ButtonComponent handleClick={changePINCode} title={t('saveChangesBtn')} />
                    </Box>
                    <Modal
                        open={modalVisible}
                        onClose={() => props.history.push("/home")}
                    >
                        <Box sx={style}>
                            <Typography sx={{ fontSize: 20, lineHeight: 5 }}>{t('changePIN')}</Typography>
                            <SUCCESS_PIN />
                            <Typography sx={{ fontSize: 20, lineHeight: 5 }}>{t('pinChangeSuccess')}</Typography>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Box>
    );
};

export default ChangePinPage;
