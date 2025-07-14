import React, { useState, useEffect } from 'react';
import {Box,Modal,Typography} from '@mui/material';
import { osVersion, mobileModel, deviceType, isTablet } from 'react-device-detect';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import ShowToast from "../components/ToastComponent";
import { TOAST_ERROR } from "../assets/constants/Constants";
import { SUCCESS_PIN } from "../assets/constants/Icons";
import { useTranslation } from 'react-i18next';
import CircularProgressLoader from "../components/CircularProgressLoader";
import CustomQRCodeReader from '../components/CustomQRCodeReader';

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
    borderRadius: 5
};


const ConnectMobilePage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(false);
    const history = useHistory();
    const { t } = useTranslation();

    useEffect(() => {
        const backAction = () => {
            //   clearInterval(getIntervalValue());
        };

        window.addEventListener('beforeunload', backAction);

        return () => window.removeEventListener('beforeunload', backAction);
    }, []);

    const onSuccess = e => {
        if(e){
            setShowLoader(true);
            const base64regex =
                /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
            function isBase64(str) {
                if (str === '' || str.trim() === '') {
                    return false;
                }
                try {
                    return base64regex.test(str) && /^[\x00-\x7F]*$/.test(str);
                } catch (err) {
                    return false;
                }
            }
    
            if (isBase64(e.data)) {
                const scanResult = "" //base64.decode(e.data);
                const newResult = JSON.parse(scanResult);
    
                if (newResult) {
                    isObject(newResult);
                }
    
                function isObject(val) {
                    if (typeof val === 'object') {
                        const Domain = newResult['domain'];
                        const QRString = newResult['linking_key'];
    
                        if (QRString !== null && QRString !== undefined) {
                            if (Domain !== null) {
                                const domain = extractDomain(Domain);
                                localStorage.setItem('domain', domain);
                            }
                            getDeviceLinked(QRString);
                        } else {
                            ShowToast(t('qrcode_linkphone_error'), TOAST_ERROR);
                            navigateToLoginScreen();
                        }
                    } else {
                        ShowToast(t('phone_link_error'), TOAST_ERROR);
                        navigateToLoginScreen();
                    }
                }
            } else {
                ShowToast(t('incorrect_qrcode'), TOAST_ERROR);
                navigateToLoginScreen();
            }
        }
    };

    const extractDomain = (url) => {
        url = url.replace(/(^\w+:|^)\/\//, '');
        const parts = url.split('/');
        return parts[0];
    };

    const getDeviceLinked = async QRString => {
        setShowLoader(false);
        try {
            setLoaderVisible(true);
            const domain = localStorage.getItem('domain');
            const deviceId = uuidv4();
            const deviceModel = mobileModel;
            const deviceOSVersion = osVersion;
            const appVersion = '1.0.0'; // Assuming static app version
            const device_type = deviceType;
            const is_tablet = isTablet;
            const fcmToken = 'dummy_fcm_token'
            
            const deviceData = {
                linking_key: QRString,
                env: "",//App,
                device_id: deviceId,
                device_model: deviceModel,
                os_version: deviceOSVersion,
                app_version: appVersion,
                device_type: device_type,
                is_tablet: is_tablet,
                device_fcm: fcmToken
            };

            if (domain !== null) {
                const response = "" //await linkMyPhone(domain, deviceData);
                if (response) {
                    localStorage.setItem('User_id', JSON.stringify(response.user_id));
                    localStorage.setItem('lockerbank_id', JSON.stringify(response.bank_id));
                    localStorage.setItem('token', response.accesstoken);
                    localStorage.setItem('userInfo', JSON.stringify(response));
                    let user = '';
                    if (response.email != null && response.email !== '') {
                        user = response.email;
                    } else if (response.mobile_number != null && response.mobile_number !== '') {
                        user = response.mobile_number;
                    } else {
                        user = response.username;
                    }
                    localStorage.setItem('user', user);
                    setModalVisible(true);
                    navigateToDashboard();
                    setTimeout(() => {
                        setLoaderVisible(false);
                        setModalVisible(false);
                    }, 2000);
                } else {
                    setLoaderVisible(false);
                    navigateToLoginScreen();
                }
            }
        } catch (error) {
            setLoaderVisible(false);
            navigateToLoginScreen();
            console.error('connect Mobile catch Error while link device:', error);
        }
    };

    const navigateToLoginScreen = () => {
        setTimeout(() => {
            history.push('/login')
        }, 3000);
    }

    const navigateToDashboard = () => {
        setTimeout(() => {
            history.push('/dashboard')
        }, 2000);
    }

    const onScanError = (error) => {
        console.log("errro",error)
    }

    return (
        <Box className='connect-mobile-page'>
            <Box className='main-container'>
                <Box className='main'>
                    <Box className='container'>
                        <CustomQRCodeReader handleOnScan={onSuccess} handleOnError={onScanError}/>
                    </Box>
                    {showLoader && (<CircularProgressLoader message ={t('pleaseWaitText')} />)}
                    <Typography variant="h6" sx={{ mt: 2 }}>{t('scanQRTabOneTitle')}</Typography>
                    {loaderVisible && (<CircularProgressLoader message ={t('linkingYourDevice')} />)}
                    <Modal
                        open={modalVisible}
                        onClose={navigateToDashboard}
                    >
                        <Box sx={style}>
                            <Typography sx={{ padding: 2 }}>{t('linkPhoneText')}</Typography>
                            <SUCCESS_PIN />
                            <Typography sx={{ padding: 2 }}>{t('phoneConnectedText')}</Typography>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Box>
    );
};

export default ConnectMobilePage;