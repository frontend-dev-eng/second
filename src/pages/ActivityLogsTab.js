import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, useTheme, CircularProgress } from '@mui/material';
import { getFormatDate, getFormatTime } from '../components/TimeAndDateFormate';
import { useTranslation } from 'react-i18next';
import { LOCK_RED_ICON, LOCKED_ICON, NEW_LOCKER_ICON } from '../assets/constants/Icons';
import ServerError from '../components/ServerError';
import CircularProgressLoader from "../components/CircularProgressLoader";

const ActivityLogsTab = ({ ActivityList, GetList, servertimeout, message }) => {
  const [activityList, setActivityList] = useState(ActivityList);
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    setActivityList(ActivityList);
  }, [ActivityList]);

  const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    GetList();
    wait(2000).then(() => setRefreshing(false));
  }, [GetList]);

  let lastDate = "";

  const ItemList = ({ item }) => {
    const dateTime = typeof item.created_at === "string" ? item.created_at : item.created_at.$date;
    const activityTime = getFormatTime(dateTime);
    const activityDate = getFormatDate(dateTime);

    const isNewDate = lastDate !== activityDate;
    if (isNewDate) lastDate = activityDate;

    return (
      <>
        {isNewDate && (
          <Box className="activityContainer">
            <Typography className='logDate'>{activityDate}</Typography>
            <Box className="activityDate" />
          </Box>
        )}
        <Box className='activityView'>
          <Typography className='logUserName'>{item.user}</Typography>
          <Box className="flexView">
            {item.transaction_type === "open" ? <LOCK_RED_ICON /> : <LOCKED_ICON />}
            <Typography className='logTime'>{activityTime}</Typography>
          </Box>
        </Box>
      </>
    );
  };

  if (servertimeout) {
    return (
      <ServerError message={message?.maintext} callback={onRefresh} />
    );
  }

  if (activityList === undefined) {
    return (
      <Box className="logsNotAvailableBlock">
        <CircularProgressLoader message={t('fetchingActivitytext')} />
      </Box>
    )
  }

  if (activityList.length === 0) {
    return (
      <Box className="logsNotAvailableBlock">
        <NEW_LOCKER_ICON />
        <Typography className='NoLockerText'>{t('logsNotAvailableText')}</Typography>
      </Box>
    );
  }

  return (
    <Box className="activityViewWrap">
      <Box>
        {activityList.map((item, index) => (
          <ItemList key={index} item={item} />
        ))}
      </Box>
      {refreshing && <CircularProgress />}
    </Box>
  );
};

export default ActivityLogsTab;