import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  useTheme,
  Badge} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { getFormatDate, getFormatTime } from '../components/TimeAndDateFormate';
import { useTranslation } from 'react-i18next';
import { LOCK_RED_ICON, LOCKED_ICON, DYNAMIC_LOCKER, PERSONAL_LOCKER, PARCEL_ICON, TEAM_LOCKER } from '../assets/constants/Icons';
import {ShowTimer} from '../components/ShowTimer';

const LockerDetails = ({
  lockerUnit,
  lockerBankId,
  location,
  type,
  name,
  count,
  assign,
  autorelease_time,
  lockerType,
  transactionId
}) => {
  const [logs, setLogs] = useState('dynamic');
  const history = useHistory();
  const { t } = useTranslation();
  const theme = useTheme();
  const colorScheme = theme.palette.mode;

  let assignTimestamp = getFormatTime(assign);
  let assignDaystamp = getFormatDate(assign);

  let lockerAssignTime = `${assignDaystamp} ${assignTimestamp}`;
  localStorage.setItem('lockerbank_name', name);

  const activityList = () => {
    try {
      const domain = localStorage.getItem('domain');
      const accessToken = localStorage.getItem('token');

      if (lockerUnit && lockerBankId) {
        // getAcitivityLogsList(domain, accessToken, transactionId)
        //   .then(res => {
        //     if (res && res.logs) {
        //       const openLogs = res.logs.filter(log => log.transaction_type === 'open' || log.transaction_type === 'close');
        //       if (openLogs.length > 0) {
        //         setLogs(openLogs[0]?.transaction_type || 'close');
        //       } else {
        //         setLogs('close');
        //       }
        //     }
        //   })
        //   .catch(err => {
        //     console.error('Error fetching activity logs:', err);
        //   });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    activityList();
  }, []);

  return (
    <Container disableGutters>
      <Box className="mainWrapper" sx={{ backgroundColor: theme.palette.background.primary}}>
        {logs === 'open' ? (
          <Box className="lockerIcon">
            <LOCK_RED_ICON />
            <Typography className='lockerStatusText' >{t('openBtnText')}</Typography>
          </Box>
        ) : (
          <Box className="lockerIcon lockedIcon">
            <LOCKED_ICON />
            <Typography className='lockerStatusText closeIconText'>{t('closeBtnText')}</Typography>
          </Box>
        )}
      </Box>
      <Box className="lockerDetailsBlock" sx={{ backgroundColor: colorScheme === 'dark' ? '#3F3356' : '#fff' }}>
        <Box className="lockerInfo">
          <Box className="lockerPosition">
            {type === 'personal' && (<PERSONAL_LOCKER />)}
            {type === 'team' && (
              <Box className="imageGroup">
                <TEAM_LOCKER />
                <Badge badgeContent={7} color="secondary" className='badge'>
                  <Typography className='badgeCount'>{count}</Typography>
                </Badge>
              </Box>

            )}
            {type === 'dynamic' && (<DYNAMIC_LOCKER />)}
            {type === 'parcel' && (<PARCEL_ICON />)}
          </Box>
          <Box className="lockerdetails">
            <Typography className='lockerTitle' color={theme.palette.text.primary}> {name} &gt; {lockerUnit}</Typography>
            <Typography className='lockerLocation' color={theme.palette.text.primary}>{location}</Typography>
            <Typography className='lockerText' color={theme.palette.text.primary}>{t('assignTime')}: {lockerAssignTime}</Typography>
            {type === 'dynamic' && autorelease_time && (
              <Typography className='lockerText' color={colorScheme === 'dark' ? '#fff' : '#000'}>
                {t('autoRelease')} : {autorelease_time}
              </Typography>
            )}
          </Box>
        </Box>
        {type === 'dynamic' && autorelease_time && (
          <Box className="imageGroup">
            <ShowTimer ExitTime={autorelease_time} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LockerDetails;