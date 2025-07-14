import React, { useEffect, useRef, useState } from 'react';
import {useTranslation} from "react-i18next";
import {BUTTON_PRIMARY, SUCCESS, TOAST_ERROR, HIVEBOARD} from "../assets/constants/Constants";
import {QR_CODE_LANDING, HOME, ASSIGNMENT_SELECTION, LOGIN} from '../assets/constants/PageList';
import {LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS} from "../assets/constants/BrowserStorageKeys";
import {storeSecureItemInSpecifiedStorage} from "../lib/BrowserStorageAccessMiddleware";
import { checkIfAssignmentIsProperlyConfigured, getPathForNextPage, checkAvailableAuthOptions, isValidDomainAndLockerBankId, setDomainAndLockerBankIdInLocalStorage } from "../lib/Utils";
import { useHistory, useParams } from 'react-router-dom';
import { getTenantAndAssignmentSettings } from '../api/api';
import ShowToast from '../components/ToastComponent';
import CustomDialog from '../components/CustomDialog';
import { Box } from '@mui/material';
import CircularProgressLoader from '../components/CircularProgressLoader';

const LandingPage = () => {
    const history = useHistory();
    const { domainAndLockerBankInfoInBase64 } = useParams();
    const {t} = useTranslation();
    const initialRender = useRef(true);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogContentText, setDialogContentText] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const validateDomainAndLockerBankId = async () => {
        try {
            let domainAndLockerBankInformation = window.atob(domainAndLockerBankInfoInBase64);
            if (isValidDomainAndLockerBankId(domainAndLockerBankInfoInBase64)) {
                const domainAndLockerBankInfoObject = JSON.parse(domainAndLockerBankInformation);
                setDomainAndLockerBankIdInLocalStorage(domainAndLockerBankInfoObject);
                setIsLoading(true);
                const response = await getTenantAndAssignmentSettings(domainAndLockerBankInfoObject?.lockerBankId)
                // console.log('response: ', response);
                if(response.status === SUCCESS){
                    setIsLoading(false);
                    if (response?.data?.locker_assignments.length > 1) {
                        history.replace({
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
                                pathname: getPathForNextPage(QR_CODE_LANDING, LOGIN)
                            });
                        }
                        else {
                            setDialogContentText( t(isAssignmentProperlyConfigured?.errorMessage) );
                            setDialogVisible(true);
                        }
                    }
                    else {
                        setDialogContentText( t('noLockerAssignments') );
                        setDialogVisible(true);
                    }
                    /*
                    let lockerAssignmentSettings = response?.data?.locker_assignments;
                    let usecaseSettings = lockerAssignmentSettings[0]?.usecase_settings;
                    let pwaEnabled = lockerAssignmentSettings[0]?.usecase_settings?.pwa?.value;
                    setIsLoading(false);
                    if(lockerAssignmentSettings && lockerAssignmentSettings?.length > 0){
                        if (lockerAssignmentSettings && lockerAssignmentSettings[0]?.is_active) {
                            if (pwaEnabled) {
                                if(checkAvailableAuthOptions(usecaseSettings)){
                                    storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, lockerAssignmentSettings[0]);
                                    storePageFlowInLocalStorageForCurrentUseCase(lockerAssignmentSettings[0]?.usecase);
                                    history.push(getPathForNextPage(QR_CODE_LANDING, LOGIN));
                                }else{
                                    setDialogContentText(t('noAuthOptionsAvailable'));
                                    setDialogVisible(true);
                                }
                            } else {
                                setDialogContentText(t('pwaAppDisabled'));
                                setDialogVisible(true);
                            }
                        } else {
                            setDialogContentText(t('inactiveAssignment'));
                            setDialogVisible(true);
                        }
                    }else{
                        setDialogContentText(t('noLockerAssignments'));
                        setDialogVisible(true);
                    }
                    */
                }
            } else {
                localStorage.clear();
                setIsLoading(false);
                ShowToast(t('error_msg_scanned_qr_not_valid'), TOAST_ERROR);
                history.push({ pathname: '/' });
            }
        } catch (error) {
            setIsLoading(false);
            localStorage.clear();
            console.error("LandingPage.js - validateDomainAndLockerBankId", error);
            history.push({ pathname: '/' });
        }
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            validateDomainAndLockerBankId();
        }
    }, [domainAndLockerBankInfoInBase64, history]);

    const handleRedirectToHomePage = () => {
        setDialogVisible(false);
        history.push('/');
    }

    return (
        <Box>
            <CustomDialog
                dialogVisible={dialogVisible}
                handleAccept={handleRedirectToHomePage}
                dialogTitle={t('page_title_error')}
                dialogContentText={t(dialogContentText)}
                buttonTwoTitle={t('goToHomePage')}
                buttonProps={{ buttonTwo: { type: BUTTON_PRIMARY } }}
            />
            {isLoading && (<CircularProgressLoader message={t('pleaseWaitText')} />)}
        </Box>
    );
}

export default LandingPage