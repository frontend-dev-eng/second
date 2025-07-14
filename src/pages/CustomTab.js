import React, { useEffect, useState } from 'react';
import { Container, Box, Tabs, Tab, useTheme } from '@mui/material';
import ShareLockerTab from '../pages/ShareLockerTab';
import ActivityLogsTab from '../pages/ActivityLogsTab';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CustomTab = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const theme = useTheme()

  // const {
  //   lockerUnit, location: lockerLocation, type, name, lockerBankId, team_count, assign,
  //   lockerBankToken, hubId, hardwareId, deviceToken, autorelease_time,
  //   sharing, maxShare, self_release, outside_asnmt_sharing, lockerType, transaction_id
  // } = location.state || {};

  const [activityList, setActivityList] = useState([]);
  const [servertimeout, setServertimeout] = useState(false);
  const [message, setMessage] = useState({ maintext: '', subtext: '' });
  const [tabValue, setTabValue] = useState(0);

  const lockerUnit = "501";
  const type = "dynamic";
  const lockerBankId = "3";
  const lockerType = "dynamic";
  const lockerBankToken = "1"
  const self_release = true
  const sharing = true;
  const maxShare = "0"
  const outside_asnmt_sharing = false;
  const deviceToken = "1234";
  const hubId = "1";
  const hardwareId = "1";
  const name = "pudo"

  useEffect(() => {
    // Save data in localStorage
    localStorage.setItem('lockerUnit', lockerUnit);
    localStorage.setItem('lockerbank_id', lockerBankId);
    localStorage.setItem('lockerbank_name', name);
    localStorage.setItem('LockerBankToken1', lockerBankToken);
    localStorage.setItem('DeviceToken1', deviceToken);
    localStorage.setItem('HubID1', hubId);
    localStorage.setItem('HardwareID1', hardwareId);
    localStorage.setItem('Self_release1', self_release);
    localStorage.setItem('LockerType1', type);
    localStorage.setItem('LockerType2', lockerType);

    getList();
  }, [lockerUnit, lockerBankId, name, lockerBankToken, deviceToken, hubId, hardwareId, self_release, type, lockerType]);

  const getList = async () => {
    // Mocked response for testing purposes
    const res = { "logs": [{ "user": "sandip Wandre", "transaction_type": "close", "created_at": "2024-06-18T10:36:43.83" }, { "user": "sandip Wandre", "transaction_type": "open", "created_at": "2024-06-20T10:36:43.83" }] };
    if (res.logs !== undefined) {
      const openLogs = res.logs.filter(log =>
        (log.transaction_type === 'open' || log.transaction_type === 'close') && log.created_at != null
      );
      setActivityList(openLogs);
      setServertimeout(false);
    } else {
      setMessage({ maintext: t('InternalServerText') });
      setServertimeout(true);
      setActivityList([]);
    }
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReleaseTabClick = () => {
    history.push('/release-locker', {
      lockerUnit,
      lockerBankId,
      type,
      lockerBankToken,
      deviceToken,
      hubId,
      hardwareId,
      self_release,
      lockerType
    });
  };

  return (
    <Container disableGutters>
      <Box>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          classes={{ indicator: 'indicatorStyle' }}
          className="tabBarStyle" sx={{backgroundColor : theme.palette.background.primary}}>
          {type === 'dynamic' && lockerType !== 'shared' && (sharing === true || sharing === 'true') && (
            <Tab className='tabBarLabel' label="Share" />
          )}
          <Tab className='tabBarLabel' label="Activities" />
          <Tab className='tabBarLabel releaseTabLabel' label="Release" onClick={handleReleaseTabClick} />
        </Tabs>
      </Box>
      <Box>
        {type === 'dynamic' && lockerType !== 'shared' && (sharing === true || sharing === 'true') && tabValue === 0 && (
          <ShareLockerTab
            navigation={history}
            maxShare={maxShare}
            Outside_asnmt_sharing={outside_asnmt_sharing}
            Type={type}
            Sharing={sharing}
          />
        )}
        {(type !== 'dynamic' || lockerType === 'shared' || sharing !== true) && tabValue === 0 && (
          <ActivityLogsTab
            navigation={history}
            ActivityList={activityList}
            GetList={getList}
            servertimeout={servertimeout}
            message={message}
          />
        )}
        {tabValue === 1 && (
          <ActivityLogsTab
            navigation={history}
            ActivityList={activityList}
            GetList={getList}
            servertimeout={servertimeout}
            message={message}
          />
        )}
      </Box>
    </Container>
  );
};

export default CustomTab;