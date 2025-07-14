import React from 'react';
import { Box } from '@mui/material';
import LockerDetails from './LockerDetails';
import CustomTab from '../pages/CustomTab';
import { useLocation, useHistory } from 'react-router-dom';

const LockersMoreOptions = () => {
  const history = useHistory();


  const lockerUnit = "501";
  const location = "Mumbai";
  const type = "dynamic";
  const lockerBankId = "3";
  const team_count = "2";
  const lockerType = "dynamic";
  const name = "pudo"
  const assign = "2024-06-14T10:36:43.83"
  const lockerBankToken = "1"
  const hub_Id = "1"
  const hardware_Id = "1"
  const device_token = "1"
  const self_release = true
  const sharing = true;
  const maxShare = "0"
  const outside_asnmt_sharing = false;
  const transaction_id = "386c1f3b-9";
  const autorelease_time = "2024-06-20T10:36:43.83";

  return (
    <Box className='locker-more-option'>
      <Box className='main-container'>
        <LockerDetails
          navigation={history}
          lockerUnit={lockerUnit}
          location={location}
          type={type}
          name={name}
          lockerBankId={lockerBankId}
          count={team_count}
          assign={assign}
          autorelease_time={autorelease_time}
          sharing={sharing}
          self_release={self_release}
          lockerType={lockerType}
          transactionId={transaction_id}
        />
        <CustomTab
          navigation={history}
          lockerUnit={lockerUnit}
          type={type}
          lockerBankId={lockerBankId}
          lockerBankToken={lockerBankToken}
          deviceToken={device_token}
          hubId={hub_Id}
          hardwareId={hardware_Id}
          sharing={sharing}
          maxShare={maxShare}
          name={name}
          self_release={self_release}
          outside_asnmt_sharing={outside_asnmt_sharing}
          lockerType={lockerType}
          transactionId={transaction_id}
        />
      </Box>
    </Box>
  );
};

export default LockersMoreOptions;