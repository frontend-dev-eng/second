import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import {AddBoxOutlined, Circle, InstallMobileRounded, IosShareRounded} from '@mui/icons-material';
import { DuroltLogoIcon, QrCodeIcon } from '../assets/constants/Icons';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '../components/ButtonComponent';
import { CustomBoxInput } from '../components/CustomBoxInput';
import ShowToast from '../components/ToastComponent';
import { useHistory } from 'react-router-dom';
import { ALPHANUM_REGEX, BUTTON_PRIMARY, BUTTON_WARNING, SUCCESS, TOAST_ERROR } from '../assets/constants/Constants';
import {ACCESS_LOCKER_BANK, HOME, ASSIGNMENT_SELECTION, LOGIN} from '../assets/constants/PageList';
import { useTheme } from '@mui/material';
import CustomQRCodeReader from '../components/CustomQRCodeReader';
import { checkIfAssignmentIsProperlyConfigured, checkAvailableAuthOptions, extractBase64FromUrl, extractDomain, isValidDomainAndLockerBankId, setDomainAndLockerBankIdInLocalStorage, getPathForNextPage } from '../lib/Utils';
import { storeSecureItemInSpecifiedStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS } from '../assets/constants/BrowserStorageKeys';
import { getDomainAndLockerBankIdFromShortCode, getTenantAndAssignmentSettings } from '../api/api';
import CustomDialog from '../components/CustomDialog';
import packageJson from '../../package.json';

const HomePage = () => {
    const { t } = useTranslation()
    const [installAppPrompt, setInstallAppPrompt] = useState(null);
    const [showInstallAppModal, setShowInstallAppModal] = useState(false);
    const [inputValue, setInputValue] = useState(Array(6).fill(''))
    const inputRefs = useRef([]);
    const [showQRCodeReader, setShowQRCodeReader] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogContentText, setDialogContentText] = useState('');
    const history = useHistory()
    const theme = useTheme()
    const colorScheme = theme.palette.mode

    useEffect(() => {
        const handleBeforeInstallAppPrompt = (e) => {
            e.preventDefault();
            setInstallAppPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallAppPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallAppPrompt);
        };
    }, []);

    const resetInputValue = () => {
        setInputValue(Array(6).fill(''));
    };


    const handleChange = (event, index) => {
        const tempVal = [...inputValue];
        let value = event.target.value;

        // Convert to uppercase if the value is an alphabet
        if (isNaN(value) && value.length === 1) {
            value = value.toUpperCase();
        }

        
        tempVal[index] = value;
        setInputValue(tempVal);

        if (value.length === 1 && index < inputValue.length - 1) {
            inputRefs.current[index + 1].focus();
        }

        const isValid = tempVal.every(digit => digit !== '');
        const codeInput = tempVal.join('');
        let errorMessage = '';

        if (!isValid) {
            errorMessage = t('warning_msg_fill_all_inputs');
        } else if (!ALPHANUM_REGEX.test(codeInput)) {
            errorMessage = t('warning_msg_alphanum_valid_input');
        }

        setErrorMessage(errorMessage);
        setDisabled(!isValid || !ALPHANUM_REGEX.test(codeInput));
    };


    const handleSubmit = async () => {
        try {
                let codeInput = inputValue.join('')
                const responseJson = await getDomainAndLockerBankIdFromShortCode(codeInput)
                console.log("responseJson from getDomainAndLockerBankIdFromShortCode", responseJson);
                if (responseJson.status === SUCCESS) {
                    let lockerBankId = responseJson?.data?.locker_bank_id || null; // temporary locker bank id, we need an API to get the locker bank id and domain
                    let domain = extractDomain(responseJson?.data?.domain)
                    let domainAndLockerBankInfoObject = {
                        "domain": domain,
                        "lockerBankId": lockerBankId
                    }
                    console.log("domainAndLockerBankInfoObject", domainAndLockerBankInfoObject);

                    // Store the domain and locker bank id in local storage
                    setDomainAndLockerBankIdInLocalStorage(domainAndLockerBankInfoObject)
                    if (lockerBankId) {
                        getSettingsValidateAndRedirectUser(lockerBankId);

                        /*
                        const response = await getTenantAndAssignmentSettings(lockerBankId)
                        if (response.status === SUCCESS) {
                            let lockerAssignmentSettings = response?.data?.locker_assignments;
                            let usecaseSettings = lockerAssignmentSettings[0]?.usecase_settings;
                            let pwaEnabled = lockerAssignmentSettings[0]?.usecase_settings?.pwa?.value;
                            if(lockerAssignmentSettings && lockerAssignmentSettings?.length > 0){
                                if (lockerAssignmentSettings[0]?.is_active) {
                                    if (pwaEnabled) {
                                        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, lockerAssignmentSettings[0]);
                                        if(checkAvailableAuthOptions(usecaseSettings)){
                                            storePageFlowInLocalStorageForCurrentUseCase(lockerAssignmentSettings[0]?.usecase);
                                            history.push(getPathForNextPage(HOME, LOGIN));
                                        }else{
                                            resetInputValue();
                                            setDialogContentText(t('noAuthOptionsAvailable'));
                                            setDialogVisible(true)
                                        }
                                    } else {
                                        resetInputValue();
                                        setDialogContentText(t('pwaAppDisabled'));
                                        setDialogVisible(true);
                                    }
                                } else {
                                    resetInputValue();
                                    setDialogContentText(t('inactiveAssignment'));
                                    setDialogVisible(true);
                                }
                            }else{
                                resetInputValue();
                                setDialogContentText(t('noLockerAssignments'));
                                setDialogVisible(true);
                            }
                        }
                        */
                    }
                }
        } catch (error) {
            resetInputValue();
            setDisabled(true);
            console.error("HomePage.js - handleSubmitLockerId", error)
        }
    }

    const handleOpenQRCodeReader = () => {
        setShowQRCodeReader(true)
    }

    const qrReaderScanHandler = async (qrCodeData) => {
        try {
            if (qrCodeData && qrCodeData.length > 0) {
                let rawValue = qrCodeData[0]?.rawValue
                let domainAndLockerBankInfoInBase64 = extractBase64FromUrl(rawValue);
                if (isValidDomainAndLockerBankId(domainAndLockerBankInfoInBase64)) {
                    let domainAndLockerBankInformation = window.atob(domainAndLockerBankInfoInBase64);
                    const domainAndLockerBankInfoObject = JSON.parse(domainAndLockerBankInformation);
                    setDomainAndLockerBankIdInLocalStorage(domainAndLockerBankInfoObject);
                    
                    getSettingsValidateAndRedirectUser(domainAndLockerBankInfoObject?.lockerBankId);
                    /*
                    const response = await getTenantAndAssignmentSettings(domainAndLockerBankInfoObject?.lockerBankId)
                    if(response.status === SUCCESS){
                        let lockerAssignmentSettings = response?.data?.locker_assignments;
                        let usecaseSettings = lockerAssignmentSettings[0]?.usecase_settings;
                        let pwaEnabled = lockerAssignmentSettings[0]?.usecase_settings?.pwa?.value;
                        if(lockerAssignmentSettings && lockerAssignmentSettings?.length > 0){
                            if (lockerAssignmentSettings && lockerAssignmentSettings[0]?.is_active) {
                                if (pwaEnabled) {
                                    if (checkAvailableAuthOptions(usecaseSettings)) {
                                        storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, lockerAssignmentSettings[0]);
                                        storePageFlowInLocalStorageForCurrentUseCase(lockerAssignmentSettings[0]?.usecase);
                                        history.push(getPathForNextPage(HOME, LOGIN));
                                    } else {
                                        setDialogContentText(t('noAuthOptionsAvailable'));
                                        setShowQRCodeReader(false)
                                        setDialogVisible(true);
                                    }
                                } else {
                                    setDialogContentText(t('pwaAppDisabled'));
                                    setShowQRCodeReader(false)
                                    setDialogVisible(true);
                                }
                            }else{
                                setShowQRCodeReader(false)
                                setDialogContentText(t('inactiveAssignment'));
                                setDialogVisible(true);
                            }
                        }else{
                            setShowQRCodeReader(false)
                            setDialogContentText(t('noLockerAssignments'));
                            setDialogVisible(true);
                        }
                    }
                    */
                } else {
                    ShowToast(t('error_msg_scanned_qr_not_valid'), TOAST_ERROR)
                    setShowQRCodeReader(false)
                }
            } else {
                ShowToast(t('pleaseScanAgain'), TOAST_ERROR)
            }
        } catch (error) {
            console.error("NewReserveLockerPage.js - qrReaderScanHandler", error)
        }
    }

    const getSettingsValidateAndRedirectUser = async (lockerBankId) => {
        try {
            const response = await getTenantAndAssignmentSettings(lockerBankId);
            console.log("getSettingsValidateAndRedirectUser response on the Home Page", response);
            if (response.status === SUCCESS) {
                if (response?.data?.locker_assignments.length > 1) {
                    // 
                    history.push({
                        pathname: '/assignments',
                        state: {
                            tenantAndAssignmentSettings: response?.data
                        }
                    });
                }
                else if (response?.data?.locker_assignments.length === 1) {
                    const isAssignmentProperlyConfigured = await checkIfAssignmentIsProperlyConfigured(response?.data);

                    if (isAssignmentProperlyConfigured === true) {
                        history.push({
                            pathname: getPathForNextPage(ACCESS_LOCKER_BANK, LOGIN)
                        });
                    }
                    else {
                        resetInputValue();
                        setDialogContentText( t(isAssignmentProperlyConfigured?.errorMessage) );
                        setDialogVisible(true);
                    }
                }
                else {
                    resetInputValue();
                    setDialogContentText( t('noLockerAssignments') );
                    setDialogVisible(true);
                }
            }
        } catch (error) {
            resetInputValue();
            setDisabled(true);
            console.error('Error while getting settings and validation: ', error);
        }
    }

    const handleCloseModal = () => {
        setDisabled(true)
        setDialogVisible(false)
    }

    const handleInstallAppButtonClick = async () => {
        const userAgent = navigator.userAgent;
        const isAppleDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        const isSafariBrowser = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

        if (isAppleDevice && isSafariBrowser) {
            setShowInstallAppModal(true);
        }
        else if (installAppPrompt) {
            try {
                installAppPrompt.prompt();

                setInstallAppPrompt(null);
            } catch (error) {
                console.error('Install app prompt error: ', error);
            }
        }
        else if (window.matchMedia('(display-mode: standalone)').matches) {
            alert('The app is already installed');
        }
        else {
            alert('Installation not available.');
        }
    };

    const renderInstallAppModalContent = () => {
        return (
            <Box className='modal-content'>
                <Typography className='install-text'>To install the app from iOS Safari browser:</Typography>
                <Box className='instructions-list'>
                    <Typography className='instruction'>
                        1. Tap the <b>Share button</b> <IosShareRounded className='instruction-icon'/> at the bottom bar
                    </Typography>
                    <Typography className='instruction'>
                        2. In the options visible, click <b>Add to Home Screen</b> <AddBoxOutlined className='instruction-icon'/>
                    </Typography>
                    <Typography className='instruction'>
                        3. On the next dialog, click <b>Add</b>
                    </Typography>
                </Box>
            </Box>
        );
    };

    return (
        <Container className='home-page' maxWidth="xs">
            <Box className="main-container">
                {showQRCodeReader ?
                // here we are using the QR code reader component to scan the 
                // QR code if the user clicks on the scan QR code button 
                    <Box className="qr-code-reader">
                        <CustomQRCodeReader
                            handleOnScan={qrReaderScanHandler}
                        />
                        <Typography className='qr-code-heading'>
                            {t('accessLockerBankByQR')}
                        </Typography>
                        <ButtonComponent handleClick={() => setShowQRCodeReader(false)} title={t('button_cancel')} type={BUTTON_WARNING} />
                    </Box>
                    :
                    <>

                    {/* // here we are using the input box to enter the locker bank id and domain  */}
                        <Box className="logo_style">
                            <DuroltLogoIcon />
                        </Box>
                        <Typography className={`heading ${colorScheme === 'dark' ? 'dark-text' : ""}`}>
                            {t('enterLockerBankId')}
                        </Typography>
                        <Typography className='sub-heading'>
                            {t('accessLockerBankText')}
                        </Typography>
                        <Box className="input-box-view">
                            <CustomBoxInput inputValue={inputValue} handleChange={handleChange} inputRefs={inputRefs} error={!!errorMessage} 
                            handleSubmitEvent={handleSubmit} disabled={disabled} customClass='input-box-placeholder' />
                            {errorMessage && <Typography className="error-message">{errorMessage}</Typography>}

                        </Box>
                        
                        <ButtonComponent handleClick={handleSubmit} title={t('continueBtnText')} customClass='' type={disabled ? "" : 'default'} buttonId='continue-button' disabled={disabled}/>
                        <Divider className='divider'>{t('orText')}</Divider>
                        
                        <Typography className={`heading ${colorScheme === 'dark' ? 'dark-text' : ""}`}>
                            {t('button_scan_qr')}
                        </Typography>
                        
                        <Typography className='sub-heading'>
                            {t('accessLockerBankByQR')}
                        </Typography>

                        <ButtonComponent handleClick={handleOpenQRCodeReader} title={t('button_scan_qr')} endIcon={<QrCodeIcon />} type='default' customClass='scan-qr-code-btn' />
                        <ButtonComponent buttonId='install-app-button' handleClick={handleInstallAppButtonClick} title={t('Install App')} endIcon={<InstallMobileRounded />} type='default' />
                        <Typography className="version-text">
                            {t('appVersionText')} {process.env.REACT_APP_RELEASE_VERSION}
                        </Typography>
                    </>

                }

                <CustomDialog
                    dialogId='error-dialog'
                    dialogVisible={dialogVisible}
                    handleAccept={handleCloseModal}
                    dialogTitle={t('page_title_error')}
                    dialogContentText={t(dialogContentText)}
                    buttonTwoTitle={t('button_ok')}
                    buttonProps={{ buttonTwo: { type: BUTTON_PRIMARY } }}
                />
                <CustomDialog
                    dialogId='install-app-instructions-modal'
                    dialogVisible={showInstallAppModal}
                    dialogTitle={t('Install App')}
                    children={renderInstallAppModalContent}
                    buttonTwoTitle={t('button_ok')}
                    buttonProps={{buttonTwo: {type: BUTTON_PRIMARY}}}
                    handleAccept={() => setShowInstallAppModal(false)}
                    onClose={() => setShowInstallAppModal(false)}
                />
            </Box>
        </Container>
    );
}

export default HomePage;
