import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { getFormatTime, getFormatDate } from '../components/TimeAndDateFormate';
import { NOTIFICATION_ICON, LOCK_RED_ICON, LOCKED_ICON, SINGLE_LOCKER_RED, SINGLE_LOCKER_GREEN } from "../assets/constants/Icons";
import { useTranslation } from 'react-i18next';
import ButtonComponent from "../components/ButtonComponent";
import CircularProgressLoader from "../components/CircularProgressLoader";
import { useHistory } from 'react-router-dom';

const Notifications = () => {
    const [data, setData] = useState(''); 
    const { t } = useTranslation();
    const history = useHistory();
    const backToHome = () => {
        history.push('/dashboard')
    };

    const GET_NOTIFICATION = async () => {
        try {
            const UID = localStorage.getItem('User_id');
            const domain = localStorage.getItem('domain');

            if (UID && domain) {
                const res = "" //await getEventNotification(domain, UID);

                if (res && res.logs) {
                    const FilterArray = res.logs.filter(log => log.timestamp != null);
                      setData(FilterArray);
                } else {
                    setData(null);
                }
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };


    useEffect(() => {
        const notificationListener = async (e) => {
            if (e.Eventnotification) {
                await GET_NOTIFICATION();
            }
        };

        window.addEventListener('NOTIFICATION', notificationListener);

        GET_NOTIFICATION();

        return () => {
            window.removeEventListener('NOTIFICATION', notificationListener);
        };
    }, []);

    const renderItem = (item) => {
        let Types = '';
        if (item?.type === 'OPEN') {
            Types = 'Opened';
        }
        if (item?.type === 'CLOSE') {
            Types = 'Closed';
        }
        if (item?.type === 'RESERVE') {
            Types = 'Reserved';
        }
        if (item?.type === 'RELEASE') {
            Types = 'Released';
        }
    
        let DateAndTime = item?.timestamp?.$date ? new Date(item.timestamp.$date) : '';
        let Activity_Time = item?.type
            ? DateAndTime
                ? getFormatDate(DateAndTime) + '  ' + getFormatTime(DateAndTime)
                : ''
            : '';
        
        const iconMap = {
            OPEN: <LOCK_RED_ICON />,
            CLOSE: <LOCKED_ICON />,
            RESERVE: <SINGLE_LOCKER_RED />,
            RELEASE: <SINGLE_LOCKER_GREEN />,
        };
    
        return (
            <Box className='activityView'>
                <Box className='notificationList'>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Box className='flexView'>
                                    <Typography className='Action'>{`Locker ${Types}`}</Typography>
                                    <Box className="icon-style">
                                        {iconMap[item?.type]}
                                    </Box>
                                    <Typography className='logTime'>{Activity_Time}</Typography>
                                </Box>
                            }
                            secondary={
                                <Box className='flexView'>
                                   {(item.type === 'OPEN' || item.type === 'CLOSE') && (<Typography className='userName responsiveFont'>{item?.username}</Typography>)} 
                                   { (item.type === 'RESERVE' || item.type === 'RELEASE') && (<Typography className='userName responsiveFont'>{item?.locker_bank}</Typography> )} 
                                    <Typography className='description responsiveFont'>{`Locker Unit ${item.locker_door} is ${Types} ${item.locker_bank !== '' ? 'from ' + item.locker_bank : ''}`}</Typography>
                                </Box>
                            }
                        />
                    </ListItem>
                </Box>
            </Box>
        );
    };
    
    return (
        <Box className='notification-page'>
            <Box className='main-container'>
                <Box className='main'>
                    {
                        data ? (
                            data.length > 0 ? (
                                <Box>
                                    <List>
                                        {data.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {renderItem(item)}
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </Box>
                            ) : (
                                <Box className='container'>
                                    <NOTIFICATION_ICON />
                                    <Typography variant="h6" className='assignText'> {t('notificationText')} </Typography>
                                    <Typography variant="body2" className='assignPara'> {t('notificationInfo')} </Typography>
                                    <ButtonComponent handleClick={backToHome} title={t("notificationBtnText")} />
                                </Box>
                            )
                        ) : (
                            <CircularProgressLoader message={t('ScreenLoading')} />
                        )
                    }
                </Box>
            </Box>
        </Box>

    );
};

export default Notifications;