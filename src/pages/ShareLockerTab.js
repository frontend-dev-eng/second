import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { RemoveCircleOutline as RemoveIcon, Share as ShareIcon } from '@mui/icons-material';
import ShowToast from "../components/ToastComponent";
import { BUTTON_SECONDARY, BUTTON_WARNING, TOAST_WARN } from "../assets/constants/Constants";
import { useTranslation } from 'react-i18next';
import ButtonComponent from "../components/ButtonComponent";
import { NO_SHARE_ICON } from '../assets/constants/Icons';
import CustomDialog from '../components/CustomDialog';

const ShareLockerTab = ({ navigation, maxShare, Outside_asnmt_sharing, Type, Sharing, ActivityList = [] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [sharedUsers, setSharedUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [owner, setOwner] = useState(null);
  const theme = useTheme()
  const colorScheme = theme.palette.mode
  const { t } = useTranslation();

  const onPressHandler = () => {
    if (maxShare !== null && sharedUsers.length >= maxShare) {
      ShowToast(t('maximum_share_exceeded'), TOAST_WARN);
    } else {
      navigation.navigate('SelectUser', { Outside_asnmt_sharing, Type, Sharing });
    }
  };

  const openModal = (title, id) => {
    setModalTitle(title);
    setUserId(id);
    setModalVisible(true);
  };

  const getSharedUserList = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const domain = localStorage.getItem('domain');
      const lockerBank = localStorage.getItem('lockerbank_id');
      const lockerUnit = localStorage.getItem('lockerUnit');

      if (accessToken && domain) {
        const response = "" //await updatedManageShareList(accessToken, domain, lockerBank, lockerUnit);
        if (response) {
          setOwner(response.owner);
          localStorage.setItem('LockerOwner', JSON.stringify(response.owner.user_id));
          if (response.shared_users_list) {
            setSharedUsers(response.shared_users_list);
            localStorage.setItem('shared_users_list', JSON.stringify(response.shared_users_list));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching shared user list', error);
    }
  };

  const deleteUserFromShared = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const domain = localStorage.getItem('domain');
      const lockerBank = localStorage.getItem('lockerbank_id');
      const lockerUnit = localStorage.getItem('lockerUnit');

      if (accessToken && domain) {
        //await deleteUserFromShareList(accessToken, domain, lockerBank, lockerUnit, userId);
        setModalVisible(false);
        getSharedUserList();
      }
    } catch (error) {
      console.error('Error removing user from share list', error);
    }
  };

  useEffect(() => {
    const sharedUsers = [
      {
        user_id: 101,
        name: "Sandip Wandre",
        email: "sandip@fonzel.com",
        phone_number: "9876543210",
        owner: {
          user_id: 100,
          name: "Sumit Hoskalle",
          email: "sumit@gmail.com",
          phone_number: "8956237412",
       }
      }
    ]
    setSharedUsers(sharedUsers) // test purpose
    setOwner(sharedUsers[0].owner); //test purpose
    // getSharedUserList();
    // const unsubscribe = navigation.addListener('focus', getSharedUserList);
    // return unsubscribe;
  }, [navigation]);

  const closeDialog = () => {
    setModalVisible(false)
  }

  return (
    <Box className="shareLockerContainer">
      <Box className="shareLockerBlock">
        <Typography className='shareTitle' color={theme.palette.text.primary}>{t('shareTitle')}</Typography>
        {sharedUsers && (
          <ButtonComponent handleClick={onPressHandler} title={t('shareBtnText')} startIcon={<ShareIcon />} variant={'text'} customClass='share-text'/>
        )}
      </Box>
        <CustomDialog
        dialogVisible={modalVisible}
        onClose={closeDialog}
        dialogContentText={t('unSharedWithText', { modalTitle: modalTitle })}
        handleCancel={closeDialog}
        handleAccept={deleteUserFromShared}
        buttonOneTitle={t('button_cancel')}
        buttonTwoTitle={t('unshareBtnText')}
        buttonProps={{buttonOne : {type : BUTTON_SECONDARY},buttonTwo : {type : BUTTON_WARNING}}}
        />

      {sharedUsers ? (
        <>
          {sharedUsers.length > 0 && owner && (
            <Box key={owner.user_id} className="listItem">
              <Box className="multipleShareRow">
                <Box className="userView">
                  <Typography className='userName'>{owner.name[0]}</Typography>
                </Box>
                <Box className='multipleShareColumn'>
                  <Typography className='name'>{owner.name}</Typography>
                  <Typography className='info'>{owner.email}</Typography>
                  <Typography className='info'>{owner.phone_number}</Typography>
                </Box>
              </Box>
              <Typography className='isOwner'>{t('ownerText')}</Typography>
            </Box>
          )}
          {sharedUsers.map(user => (
            <Box key={user.user_id} className="listItem">
              <Box className="multipleShareRow">
                <Box className="userView">
                  <Typography className='userName'>{user.name[0]}</Typography>
                </Box>
                <Box className='multipleShareColumn'>
                  <Typography className='name'>{user.name}</Typography>
                  <Typography className='info'>{user.email}</Typography>
                  <Typography className='info'>{user.phone_number}</Typography>
                </Box>
              </Box>
              <IconButton
                edge="end"
                onClick={() => openModal(user.name, user.user_id)}
                className='removeIcon'
              >
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
        </>
      ) : (
        <CircularProgress />
      )}
      {sharedUsers.length === 0 && (
        <Box className="shareTextStyle">
          <NO_SHARE_ICON />
          <Typography className='noShareText'>{t('notShareText')}</Typography>
          <Typography className='shareWithText'>{t('shareWithText')}</Typography>
          <ButtonComponent handleClick={onPressHandler} title={t('shareBtnText')} />
        </Box>
      )}
    </Box>
  );
};

export default ShareLockerTab;