import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { getFormatDate, getFormatTime } from '../components/TimeAndDateFormate';
import { useTranslation } from 'react-i18next';
import { LOCKER_OPEN_ICON } from '../assets/constants/Icons';
import ButtonComponent from "../components/ButtonComponent";

const OpenParcelPage = () => {
    const history = useHistory();
    // const { lockerPrefix, owner_name, owner_title, owner_email, owner_no } = location.state || {};
    const lockerPrefix = "L";
    const owner_name = "User Name";
    const owner_title = "Mr";
    const owner_email = "user@gmail.com"
    const owner_no = "9856231230";


    const [parcelID, setParcelID] = useState();
    const [parcelDesc, setParcelDesc] = useState();
    const [prefix, setPrefix] = useState();
    const [hardwareID, setHardwareID] = useState();
    const [hubID, setHubID] = useState();
    const [bankFCM, setBankFCM] = useState();
    const [lockerUnit, setLockerUnit] = useState();
    const [locationState, setLocationState] = useState();
    const [bankName, setBankName] = useState();
    const [bankID, setBankID] = useState();
    const [assignTime, setAssignTime] = useState();
    const [imagePath, setImagePath] = useState();
    const [loader, setLoader] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        getParcelDetails();
        getParcelAvailability();
    }, []);

    const getParcelAvailability = async () => {
        try {
            const domain = localStorage.getItem('domain');
            const token = localStorage.getItem('token');
            const lockerBankId = localStorage.getItem('lockerbank_id');
            if (domain && token && lockerBankId) {
                const response = "" //await getAvailableParcelLockers(domain, lockerBankId, token);
                if (response && response.locker_units.length > 0) {
                    setButtonVisible(true);
                }
            }
        } catch (error) {
            console.log('Lockerslist error=', error);
        }
    };

    const getParcelDetails = async () => {
        try {
            const parcel_ID = localStorage.getItem('parcelID');
            const parcel_Desc = localStorage.getItem('parcelDesc');
            const lockerPrefix = localStorage.getItem('locker_unit_prefix');
            const hardwareID = localStorage.getItem('hardware_id');
            const hubID = localStorage.getItem('hub_id');
            const LockerBankFCM = localStorage.getItem('device_fcm_token');
            const lockerUnit = localStorage.getItem('locker_unit');
            const bank_location = localStorage.getItem('locker_bank_location');
            const bank_Name = localStorage.getItem('locker_bank_name');
            const assign_Time = localStorage.getItem('assignTime');
            const imageUrl = localStorage.getItem('parcelImage');
            const lockerBankID = localStorage.getItem('lockerbank_id');

            setImagePath(imageUrl);

            let assignTimestamp = getFormatTime(assign_Time);
            let assignDaystamp = getFormatDate(assign_Time);
            let lockerAssignTime = `${assignDaystamp} ${assignTimestamp}`;

            // setParcelID(parcel_ID);
            // setParcelDesc(parcel_Desc);
            // setBankFCM(LockerBankFCM);
            // setPrefix(lockerPrefix);
            // setLockerUnit(lockerUnit);
            // setBankName(bank_Name);
            // setLocationState(bank_location);
            // setAssignTime(lockerAssignTime);
            // setBankID(lockerBankID);

            setParcelID("123456");
            setParcelDesc("Amazon courier");
            setBankFCM("FCMLockerBank");
            setPrefix("P");
            setLockerUnit("404");
            setBankName("Test Locker bank");
            setLocationState("Pune");
            setAssignTime("2024-06-14T10:36:43.834000");
            setBankID("4");

            if (hardwareID && hubID) {
                setHardwareID(hardwareID);
                setHubID(hubID);
            }
        } catch (error) {
            console.log('error:', error);
        }
    };

    const addMoreParcel = () => {
        setTimeout(() => {
            history.push('/select-locker-size', { is_scan: true });
        }, 200);
    };

    const onPressHandler = () => {
        history.push('/home-screen');
    };

    return (
        <Box className='open-parcel-page'>
            <Box className='main-container'>
                <Box className='main'>
                    <Box className="lockerContainer" sx={{backgroundColor:'red'}}>
                        <Box className="lockerInfo">
                            <img
                                className="profileImage"
                                src={
                                    imagePath !== 'NoImage' && imagePath !== null
                                        ? imagePath
                                        : require('../assets/images/CourierBox.jpg')}
                                alt="Parcel"
                            />
                            <Box className="parcelDetails">
                                <Typography className='lockerTitle'>{parcelID}</Typography>
                                {parcelDesc && (
                                    <Typography className='descText'>{t('descText')}: {parcelDesc}</Typography>
                                )}
                                <Typography className='lockerText'>{t('assignTime')}: {assignTime}</Typography>
                                <Typography className='lockerText'>{t('autoRelease')}{': -:-'}</Typography>
                            </Box>
                        </Box>

                        <Box className='dividerMainContainer'>
                            <Box className='horizontalLine' />
                            <Box className='textContainer'>
                                <Typography className='toText'>{t('toText')}</Typography>
                            </Box>
                            <Box className='horizontalLine' />
                        </Box>

                        <Box className="userBlock">
                            <Box className="userInfo">
                                <Box className='userView'>
                                    <Typography className='userTitle'>{owner_title}</Typography>
                                </Box>
                                <Box className="userDetails">
                                    <Typography className='name'>{owner_name}</Typography>
                                    <Typography className='info'>{owner_email}</Typography>
                                    <Typography className='info'>{owner_no}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="lockerDetails">
                        <LOCKER_OPEN_ICON/>
                        <Typography className='lockerPrefix'>{lockerPrefix}</Typography>
                        <Typography className='lockerNumber'>{lockerUnit}</Typography>

                    </Box>
                    <Typography className="closeText">{t('closeDoorText')}</Typography>
                    <Box className="buttonContainer">
                        <ButtonComponent handleClick={onPressHandler} title={loader ? <CircularProgress size={24} /> : t('doneBtnText')} />
                        {!buttonVisible && ( <ButtonComponent handleClick={addMoreParcel} title={t('addMorParcel')} />)}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default OpenParcelPage;