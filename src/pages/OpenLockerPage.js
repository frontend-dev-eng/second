import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Badge,
  useTheme,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import TimerDeadline from '../components/TimerDeadline';
import ShowToast from '../components/ToastComponent';
import { BUTTON_SECONDARY, BUTTON_WARNING, TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS } from "../assets/constants/Constants";
import { useTranslation } from 'react-i18next';
import {
  DYNAMIC_LOCKER,
  LOCKER_OPEN_ICON,
  NO_INTERNET_ICON,
  PARCEL_ICON,
  PERSONAL_LOCKER,
  TEAM_LOCKER,
} from '../assets/constants/Icons';
import { ShowTimer } from '../components/ShowTimer';
import { getFormatDate, getFormatTime } from '../components/TimeAndDateFormate';
import ButtonComponent from "../components/ButtonComponent";
import { CustomTextInput } from '../components/CustomTextInput';
import CustomDialog from '../components/CustomDialog';

const OpenLockerPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [releaseMsg, setReleaseMsg] = useState('');
  const [reserveTime, setReserveTime] = useState('');
  const [releaseTime, setReleaseTime] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const theme = useTheme()
  // const {locker_unit, lockerbank_Id, device_Token, lockerType, OpenOnce, type} =
  // location.state;

  const locker_unit = "805";
  const OpenOnce = true;

  useEffect(() => {
    getLockerInfo();
  }, []);

  const getLockerInfo = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const domain = localStorage.getItem('domain');

      if (accessToken && domain) {
        const res = null; // Replace with actual API call
        if (res) {
          localStorage.setItem('lockerbank_name', res?.locker_bank_details.name);

          const assignTimestamp = getFormatTime(res?.assignment_date);
          const assignDaystamp = getFormatDate(res?.assignment_date);
          const lockerAssignTime = `${assignDaystamp} ${assignTimestamp}`;
          setReserveTime(lockerAssignTime);

          const allocationConfirmationPeriod = res.allocation_confirmation_period?.[0]?.should_access_in ?? null;
          const antiClaimUsageDuration = res.anti_claim_usage_duration?.[0]?.will_open_in ?? null;
          const AssignmentDate = res?.assignment_date.split('.')[0] ?? '';
          const ReleaseTime = TimerDeadline(AssignmentDate, antiClaimUsageDuration, allocationConfirmationPeriod, 'Opened');
          setReleaseTime(ReleaseTime);
        }
      }
    } catch (error) {
      console.log('Error fetching locker details:', error);
    }
  };

  const releaseLocker = async () => {
    setLoading(true);
    ShowToast(t('locker_release_wait_Text'), TOAST_INFO);
    try {
      const accessToken = localStorage.getItem('token');
      const domain = localStorage.getItem('domain');

      if (accessToken && domain) {
        const response = null; // Replace with actual API call
        if (response) {
          ShowToast(t('locker_success'), TOAST_SUCCESS);
          setDialogOpen(false);
          history.push('/dashboard');
        } else {
          ShowToast(t('locker_release_fail'), TOAST_ERROR);
          history.push('/dashboard');
        }
      }
    } catch (e) {
      console.error('Error in releasing locker:', e);
    } finally {
      setLoading(false);
    }
  };

  const onPressHandler = () => {
    history.push('/home-screen');
  };

  const renderLockerIcon = () => {
    switch (lockerData?.assignment_type?.toLowerCase()) {
      case 'personal':
        return <PERSONAL_LOCKER />;
      case 'team':
        return (
          <Box className="imageGroup">
            <TEAM_LOCKER />
            <Badge badgeContent={lockerData?.team_member_count_details || ''} color='success' className='badge' />
          </Box>
        );
      case 'dynamic':
        return (
          <Box className="imageGroup">
            <DYNAMIC_LOCKER />
            {releaseTime && <ShowTimer ExitTime={releaseTime} />}
          </Box>
        );
      case 'parcel':
        return <PARCEL_ICON />;
      default:
        return null;
    }
  };

  const requestToRelease = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const domain = localStorage.getItem('domain');

      if (accessToken !== null && domain !== null) {
        // releaseLocker(
        //   accessToken,
        //   domain,
        //   lockerbank_Id,
        //   locker_unit,
        //   releaseMsg,
        // )
        // .then(response => {
        //   Toaster(response.message);

        //   setModalVisible(!modalVisible);

        //   setReleaseMsg('');
        //   navigation.navigate('Dashboard');
        // })
        // .catch(err => {
        //   console.log(err);
        // });
      }
    } catch (e) {
      console.log('Error token', e);
    }
  };

  const Team_release = async (setDialogOpen, lockerbank_Id, locker_unit) => {
    try {
      const domain = localStorage.getItem('domain');
      const userID = localStorage.getItem('User_id');
      const accessToken = localStorage.getItem('token');
      const bank_Name = localStorage.getItem('lockerbank_name');

      if (domain && userID && accessToken && bank_Name) {
        //await releaseUserTeamLocker(domain, lockerbank_Id, locker_unit, userID);
        const response = "" //await releaseDynamicLocker(accessToken, domain, lockerbank_Id, locker_unit);
        if (response) {
          setDialogOpen(false);
          history.push('Dashboard');
          // sendNotification();
        } else {
          history.push('Dashboard');
        }
      } else {
        console.error('Missing required data in localStorage');
      }
    } catch (error) {
      console.error('Error in Team_release:', error);
    }
  };


  const getAssignmentSetting = (key) => {
    const ListAssignment = [
      { self_release_allowed: true },
      { locker_release_msg: "Locker released message" }
    ];

    for (const item of ListAssignment) {
      if (item.hasOwnProperty(key)) {
        return item[key];
      }
    }
    return false;
  };


  const lockerData ={
    assignment_type: 'team',
    team_member_count_details: 10,
    locker_bank_details: {
      name: "Test Locker bank",
      location: "Mumbai East"
    },
    locker_unit_details: {
      prefix: 'P'
    }
  };
  const self_rele = true

  const renderDialogContent = () => {
    return (
      <CustomTextInput
        placeholder="Comment"
        value={releaseMsg}
        onChange={(e) => setReleaseMsg(e.target.value)}
        multiline
        rows={4}
      />
    )
  }

  return (
    <Box className='open-locker-page'>
      <Box className='main-container'>
        <Box className='main'>
          {lockerData ? (
            <>
              <Box className="lockerContainer" sx={{backgroundColor : theme.palette.background.primary}}>
                <Box className="lockerInfo">
                  <Box>
                    {renderLockerIcon()}
                  </Box>
                  <Box className="lockerdetails">
                    <Typography className='lockerTitle'>{lockerData?.locker_bank_details.name} {'>'} {locker_unit}</Typography>
                    <Typography className='lockerLocation'>{lockerData?.locker_bank_details.location}</Typography>
                    <Typography className='lockerText'>{t('reserveText')}: {reserveTime}</Typography>
                    {releaseTime && <Typography className='lockerText'>{t('autoRelease')}: {releaseTime}</Typography>}
                  </Box>
                </Box>
                <Typography className='openText'>{t('openText')}</Typography>
              </Box>

              <Box className="lockerBlock">
                <Box className="lockerSubBlock"><LOCKER_OPEN_ICON className='locker-open-icon'/></Box>
                <Typography className='lockerPrefix'>{lockerData?.locker_unit_details.prefix}</Typography>
                <Typography className='lockerNumber'>{locker_unit}</Typography>
              </Box>
              <Typography className='closeText'>{t('closeDoorText')}</Typography>

              {lockerData?.assignment_type.toLowerCase() === 'parcel' && (
                <>
                  <Typography className="releaseText">{t('releaseWarningText')}</Typography>
                  <ButtonComponent handleClick={releaseLocker} title={loading ? <CircularProgress size={24} /> : t('doneBtnText')} />
                </>
              )}

              {(lockerData?.assignment_type.toLowerCase() === 'dynamic' ||
                lockerData?.assignment_type.toLowerCase() === 'personal' ||
                lockerData?.assignment_type.toLowerCase() === 'team') && (
                  <Box className="btngroup">
                    <ButtonComponent handleClick={onPressHandler} title={loading ? <CircularProgress size={24} /> : t('doneBtnText')} />
                    {OpenOnce && (
                      <ButtonComponent handleClick={() => setDialogOpen(true)} title={t('button_release')} type={BUTTON_WARNING} />
                    )}
                  </Box>
                )}
              <CustomDialog
                dialogVisible={dialogOpen}
                onClose={() => setDialogOpen(false)}
                handleCancel={() => setDialogOpen(false)}
                handleAccept={releaseLocker}
                children={!self_rele ? renderDialogContent : null}
                dialogTitle={self_rele ? t('releaseLockerText') : null}
                dialogContentText={self_rele?  t('releaseWarningText') : t('requestReleaseLockerText')}
                buttonOneTitle={t('button_cancel')}
                buttonTwoTitle={self_rele ? t('button_release') : t('sendBtnText')}
                buttonProps={{"buttonOne" : {type : BUTTON_SECONDARY},"buttonTwo" : {type : BUTTON_WARNING}}}
              />
            </>
          ) : (
            <Box className="connectivityContainer">
              <NO_INTERNET_ICON/>
              <Typography className="sorryText">{t('sorryText')}</Typography>
              <Typography className="connectivityFailureText">
                {t('connectivityFailureText')}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OpenLockerPage;