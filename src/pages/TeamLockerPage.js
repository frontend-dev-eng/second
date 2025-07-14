import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    useTheme
} from '@mui/material';
import ShowToast from "../components/ToastComponent";
import { TOAST_ERROR, TOAST_SUCCESS } from "../assets/constants/Constants";
import { useTranslation } from 'react-i18next';
import ButtonComponent from "../components/ButtonComponent";
import { CustomTextInput } from '../components/CustomTextInput';

const TeamLockerPage = ({ history }) => {
    const [releaseMsg, setReleaseMsg] = useState('');
    const [sendButtonBottom, setSendButtonBottom] = useState(30);
    const { t } = useTranslation();

    useEffect(() => {
        const handleKeyboardShow = (event) => {
            setSendButtonBottom(event.endCoordinates.height);
        };

        const handleKeyboardHide = () => {
            setSendButtonBottom(30);
        };

        window.addEventListener('keyboardDidShow', handleKeyboardShow);
        window.addEventListener('keyboardDidHide', handleKeyboardHide);

        return () => {
            window.removeEventListener('keyboardDidShow', handleKeyboardShow);
            window.removeEventListener('keyboardDidHide', handleKeyboardHide);
        };
    }, []);

    const assignLocker = () => {
        requestToAssign();
    };

    const requestToAssign = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            const domain = localStorage.getItem('domain');

            if (accessToken && domain) {
                try {
                    const response = "" //await requestToAssignment('team', releaseMsg, domain, accessToken);
                    ShowToast(response.message, TOAST_SUCCESS);
                    setReleaseMsg('');
                    history.push('/home');
                } catch (err) {
                    ShowToast(t('incorrect_credentials_new'), TOAST_ERROR);
                    console.log('requestToAssignment team locker error api catch', err);
                }
            }
        } catch (e) {
            ShowToast(t('try_again_text'), TOAST_ERROR);
            console.log('Error token', e);
        }
    };

    const theme = useTheme();
    return (
        <Box className='team-locker-page'>
            <Box className='main-container'>
                <Box className='main'>
                    <Box className='container'>
                        <Typography className="title" color="textPrimary">{t('requestTeamLocker')}</Typography>
                        <CustomTextInput
                        className={'commentBox'}
                        placeholder={t('commentText')}
                        value={releaseMsg}
                        onChange={(e) => setReleaseMsg(e.target.value.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, ''))}
                        multiline={false}
                        />
                        <ButtonComponent handleClick={assignLocker} title={t("sendBtnText")} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TeamLockerPage;