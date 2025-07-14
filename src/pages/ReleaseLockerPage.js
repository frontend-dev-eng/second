import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShowToast from "../components/ToastComponent";
import { BUTTON_SECONDARY, BUTTON_WARNING, TOAST_ERROR } from "../assets/constants/Constants";
import CircularProgressLoader from "../components/CircularProgressLoader";
import { CustomTextInput } from '../components/CustomTextInput';
import CustomDialog from '../components/CustomDialog';

const ReleaseLockerPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const history = useHistory();

    const [dialogVisible, setDialogVisible] = useState(true);
    const [releaseMsg, setReleaseMsg] = useState('');
    const [shareOwner, setShareOwner] = useState('');
    const [userID, setUserId] = useState('');
    const [loader, setLoader] = useState(false);
    const [parcelShareList, setParcelShareList] = useState([]);
    const [lockerReleaseMsg, setLockerReleaseMsg] = useState('');

    const fetchInitialData = useCallback(async () => {
        const lockerReleaseMsg = ""; // await getAssignmentSetting('locker_release_msg');
        setLockerReleaseMsg(lockerReleaseMsg);
        setShareOwner(localStorage.getItem('LockerOwner'));
        setUserId(localStorage.getItem('User_id'));
        setParcelShareList(JSON.parse(localStorage.getItem('shared_users_list')));
    }, []);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const closeDialog = () => {
        history.push('/locker-more-options');
        setDialogVisible(false);
    };

    const handleRelease = async (releaseFunction) => {
        setLoader(true);
        try {
            await releaseFunction();
            setDialogVisible(false);
            // sendNotification();
            history.push('/locker-more-options');
        } catch (error) {
            console.error('Error during release:', error);
            ShowToast(t('release_fail'), TOAST_ERROR);
            setLoader(false);
        }
    };

    const requestToRelease = async () => {
        const accessToken = localStorage.getItem('token');
        const domain = localStorage.getItem('domain');
        if (!accessToken || !domain) throw new Error('Access token or domain not found');
        // return releaseLockerAPI(accessToken, domain, LockerBankId, LockerUnit, releaseMsg);
    };

    const releaseDynamicLocker = async () => {
        const accessToken = localStorage.getItem('token');
        const domain = localStorage.getItem('domain');
        if (!accessToken || !domain) throw new Error('Access token or domain not found');
        // return releaseDynamicLockerAPI(accessToken, domain, LockerBankId, LockerUnit, LockerType.toLowerCase());
    };

    const releaseLockerUnit = async () => {
        const accessToken = localStorage.getItem('token');
        const domain = localStorage.getItem('domain');
        if (!accessToken || !domain) throw new Error('Access token or domain not found');
        // return releaseLockerUnit(accessToken, domain, LockerBankId, lockerUnit);
    };

    const releaseUserTeamLocker = async () => {
        const domain = localStorage.getItem('domain');
        const userID = localStorage.getItem('User_id');
        // return releaseUserTeamLocker(domain, LockerBankId, lockerUnit, userID);
    };

    const changeSharedLockerOwner = async () => {
        const accessToken = localStorage.getItem('token');
        const domain = localStorage.getItem('domain');
        if (!accessToken || !domain) throw new Error('Access token or domain not found');
        // await changeSharedLockerOwnerAPI(accessToken, domain, LockerBankId, LockerUnit);
        setDialogVisible(false);
        // sendNotification();
        history.push('/locker-more-options');
    };

    const releaseDynamicDialog = async () => {
        if (!loader) {
            const isParcelShared = parcelShareList && Object.keys(parcelShareList).length >= 1;
            const releaseFn = isParcelShared && userID !== shareOwner ? releaseDynamicLocker : releaseLockerUnit;
            await handleRelease(releaseFn);
        }
    };

    const releaseDialog = async () => {
        await handleRelease(requestToRelease);
    };

    const renderDialogContent = () => {
        return (
            <CustomTextInput
                placeholder={t('commentText')}
                value={releaseMsg}
                onChange={(e) => setReleaseMsg(e.target.value)}
                multiline
                fullWidth
                rows={4}
            />
        );
    };

    const self_rele = false

    return (
        <Box className='release-locker-page'>
            <Box className='main-container'>
                <Box className='main'>
                    {loader ? (
                        <CircularProgressLoader message={t('releasing_locker_please_wait', { userID })} />
                    ) : (
                        <CustomDialog
                        dialogVisible={dialogVisible}
                        onClose={closeDialog}
                        handleCancel={closeDialog}
                        handleAccept={releaseDialog}
                        children={!self_rele ? renderDialogContent : null}
                        dialogTitle={self_rele ? t('releaseLockerText') : null}
                        dialogContentText={self_rele?  t('releaseWarningText') : t('requestReleaseLockerText')}
                        buttonOneTitle={t('button_cancel')}
                        buttonTwoTitle={self_rele ? t('button_release') : t('sendBtnText')}
                        buttonProps={{"buttonOne" : {type : BUTTON_SECONDARY},"buttonTwo" : {type : BUTTON_WARNING}}}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ReleaseLockerPage;