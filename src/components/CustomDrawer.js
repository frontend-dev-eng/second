import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Typography, CircularProgress, Box, Divider,
  Paper,
  } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SUPPORT_ICON, DARK_SUPPORT_ICON, TERM_ICON, ABOUT_ICON, DARK_ABOUT_ICON, LOGOUT_ICON, DARK_LOGOUT_ICON, DARK_TEAM_ICON, USER_ICON, USER_DELETE_ICON, DARK_USER_DELETE_ICON, CloseIcon } from "../assets/constants/Icons";
import { LUGGAGE_USE_CASE, BUTTON_PRIMARY, BUTTON_WARNING, SUCCESS, TOAST_SUCCESS, HIVEBOARD } from "../assets/constants/Constants";
import {MENU_DRAWER, ABOUT, FREQUENTLY_ASKED_QUESTIONS, TERMS_AND_CONDITIONS, CONTACT_US, PRIVACY_POLICY, SUPPORT, HOME, LOGIN, ASSIGNED_LOCKERS} from '../assets/constants/PageList';
import ShowToast from "./ToastComponent";
import { useTranslation } from 'react-i18next';
import { APP_YELLOW_GREEN_COLOR, APP_LAVENDAR_GREY_COLOR, APP_DARK_PURPLE_COLOR, APP_WHITE_COLOR, APP_ENGLISH_VIOLET_COLOR } from '../assets/constants/Colors';
import CustomDialog from './CustomDialog';
import { getSecureItemFromSpecificStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, LS_CUSTOMER, USER_INFO } from '../assets/constants/BrowserStorageKeys';
import { deleteUserAccount } from '../api/api';
import { getPageNameUsingPath, getPathForNextPage, clearLocalStorageForUser } from '../lib/Utils';
import MainHeader from './MainHeader';
import packageJson from '../../package.json';

const CustomDrawer = (props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const theme = useTheme();
  const colorScheme = theme.palette.mode;
  const tenantAndAssignmentSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [loaderdisabled, setLoaderDisabled] = useState(false);
  const [info, setInfo] = useState({});
  const {isDrawerOpened} = props.location.state || false;
  const sideDrawerOptions = t('sideDrawer') !== 'sideDrawer' ? t('sideDrawer') : null;



  useEffect (() => {
    getUserInfo();
  },[])

  const getUserInfo = async () => {
    try {
      const getUserInfo = await getSecureItemFromSpecificStorage(LOCAL_STORAGE, USER_INFO);
      if (getUserInfo) {
        setInfo(getUserInfo);
      }
      
      // const GestFlag = localStorage.getItem('Is_Guest');
      // setGestparcel(GestFlag === 'true');
      // const accessToken = localStorage.getItem('token');
      // const domain = localStorage.getItem('domain');

      // if (accessToken && domain) {
      //   try {
      //     const data = ""; //await getProfileInfo(accessToken, domain);
      //     if (data) {
      //       localStorage.setItem('userInfo', JSON.stringify(data));
      //       setInfo(data);
      //       localStorage.setItem('User_id', JSON.stringify(data.id));
      //       if (data.email) {
      //         localStorage.setItem('user', data.email);
      //       } else if (data.mobile_number) {
      //         const phone = data.mobile_number.slice(-10);
      //         localStorage.setItem('user', phone);
      //       }
      //     }
      //   } catch (err) {
      //     console.error('getProfileInfo custom drawer error: ', err);
      //   }
      // }
    } catch (e) {
      console.error('getProfileInfo custom drawer catch', e);
    }
  };


  /**
   * Handles the logout functionality.
   * Clears user information and tokens from local storage.
   * Redirects the user to the login page.
   * @returns {null} Returns null if any required data is missing.
   * @throws {Error} Throws an error if there is an issue clearing app data.
   */
  const handleLogout = async () => {
    try {
      clearLocalStorageForUser(getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_CUSTOMER))
      ShowToast(t('success_msg_successfully_logged_out'), TOAST_SUCCESS);
      props.history.replace( getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_CUSTOMER) === HIVEBOARD ? '/login-page' : '/');//getPathForNextPage(MENU_DRAWER, LOGOUT));
    } catch (error) {
      setLoaderDisabled(false);
      console.error('Error clearing app data.', error);
    }
  };



  const cancelLogout = () => {
    setModalVisible(false);
  };

  const openDeleteAccountModal = async () => {
      try {
        setDeleteModalVisible(true);
      } catch (error) {
        console.error('Error clearing app data.', error);
      }
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  }

  const handleDeleteAccount = async () => {
    try {
      setDeleteModalVisible(false);
      const response = await deleteUserAccount();
      if(response.status === SUCCESS){
        ShowToast(t('successAccountDeleted'),TOAST_SUCCESS)
        clearLocalStorageForUser()
        props.history.replace('/');
      }
    } catch (error) {
      console.error("CustomDrawer.js - handleDeleteAccount", error);
    }
  }



  const handleCloseDrawer = () => {
    window.history.back();
  };

  const navigateToProfileUpdate = () => {
    // props.history.push('/profile-update') // Currently commented for blue dart use case
  }



  const MenuList = ({ menuItem }) => {
    return (
      <List sx={{ backgroundColor: colorScheme == 'dark' ? APP_ENGLISH_VIOLET_COLOR : APP_WHITE_COLOR }}>
        <ListItem className='redio' component={Button} onClick={() => navigateToDrawerMenu(menuItem)}>
          {menuItem?.icon ? <ListItemIcon> {menuItem?.icon} </ListItemIcon> : ""}
          <span style={{textTransform: 'none', color: "#222222", fontFamily: 'Poppins-Medium', fontSize: '16px',fontWeight : '500'}}>{menuItem?.label}</span>
        </ListItem>
        <Divider className="divider" />
      </List>
    )
  }

  const navigateToDrawerMenu = (menuItem) => {
    switch (menuItem?.label) {
      case 'My Rented Products':
        history.push(getPathForNextPage(MENU_DRAWER, ASSIGNED_LOCKERS));
        break;
      case 'About Homi':
        history.push(getPathForNextPage(MENU_DRAWER, ABOUT));
        break;
      case 'FAQs':
        history.push(getPathForNextPage(MENU_DRAWER, FREQUENTLY_ASKED_QUESTIONS));
        break;
      case 'Terms and Conditions':
        history.push(getPathForNextPage(MENU_DRAWER, TERMS_AND_CONDITIONS));
        break;
      case 'Log Out':
        setModalVisible(true)
        break;
      case "Contact Us":
        history.push(getPathForNextPage(MENU_DRAWER, CONTACT_US));
        break;
      case "Privacy Policy":
        history.push(getPathForNextPage(MENU_DRAWER, PRIVACY_POLICY));
        break;
      default:
        console.log("No match found")
        break;
    }
  }

  return (
    <Box className='sidebar-container'>
    <Box className='main-container'>
      <Box className='main'>
        <Drawer
          anchor="left"
          open={true}
          onClose={handleCloseDrawer}
          className='MuiDrawer-paper'
          >
          <MainHeader isDrawerOpened={isDrawerOpened}/>
          <Box className="profileContent">
            {!sideDrawerOptions ?
            <>
            <Box className="profileInfo" sx={{display:'flex', flexDirection:'row',alignItems:'center', backgroundColor:APP_DARK_PURPLE_COLOR}}>
              <Box className="profileImage" sx={{paddingLeft:2}} onClick= {navigateToProfileUpdate}> <USER_ICON /></Box> 
              <Box className="profileInfoView" sx={{padding:3, maxWidth: 300}}>
                <Typography className="profileName" variant="body1" sx ={{color: APP_YELLOW_GREEN_COLOR, fontFamily:'SFProDisplay-Bold'}}>{info?.username}</Typography>
                <Typography className="profileEmail" variant="body2" color="textSecondary" sx={{color: APP_LAVENDAR_GREY_COLOR, fontFamily:'SFProText-Regular', wordWrap: 'break-word'}}>{info?.email}</Typography>
                <Typography className="contact" variant="body2" color="textSecondary" sx={{color: APP_LAVENDAR_GREY_COLOR, fontFamily:'SFProText-Regular'}}>{info?.mobile_number}</Typography>
                <Typography className="contact" variant="body2" color="textSecondary" sx={{color: APP_LAVENDAR_GREY_COLOR, fontFamily:'SFProText-Regular'}}>{info?.user_company}</Typography>
              </Box>
            </Box>
            <Divider className="divider" />
            </>
            : ""}
            { sideDrawerOptions ? sideDrawerOptions?.drawerMenuList?.length > 0 && sideDrawerOptions?.drawerMenuList?.map(item => (
               <MenuList menuItem={item} key={item?.id} />
            )) :
            <>
            <List>
              <ListItem component={Button} onClick={() => history.push(getPathForNextPage(MENU_DRAWER, SUPPORT))}>
                <ListItemIcon> {colorScheme === 'light' ? <SUPPORT_ICON /> : <DARK_SUPPORT_ICON />} </ListItemIcon>
                <ListItemText primary={t('supportText')} sx={{textTransform:'none', color: colorScheme == 'dark' ? APP_WHITE_COLOR : APP_DARK_PURPLE_COLOR}} />
              </ListItem>

              <ListItem component={Button} onClick={() => {tenantAndAssignmentSettings?.usecase === LUGGAGE_USE_CASE ? window.open(getPathForNextPage(MENU_DRAWER, TERMS_AND_CONDITIONS), '_blank') : history.push(getPathForNextPage(MENU_DRAWER, TERMS_AND_CONDITIONS))}}>
                <ListItemIcon> {colorScheme === 'light' ? <TERM_ICON /> : <DARK_TEAM_ICON/> }</ListItemIcon>
                <ListItemText primary={t('termsText')} sx={{textTransform:'none', color: colorScheme == 'dark' ? APP_WHITE_COLOR : APP_DARK_PURPLE_COLOR}} />
              </ListItem>

              <ListItem component={Button} onClick={() => history.push(getPathForNextPage(MENU_DRAWER, ABOUT))}>
                <ListItemIcon> {colorScheme === 'light' ? <ABOUT_ICON /> : <DARK_ABOUT_ICON /> } </ListItemIcon>
                <ListItemText primary={t('aboutText')} sx={{textTransform:'none', color: colorScheme == 'dark' ? APP_WHITE_COLOR : APP_DARK_PURPLE_COLOR}} />
              </ListItem>

              <ListItem component={Button} onClick={openDeleteAccountModal}>
                <ListItemIcon> {colorScheme === 'light' ? <USER_DELETE_ICON /> : <DARK_USER_DELETE_ICON /> } </ListItemIcon>
                <ListItemText primary={t('deleteAccountText')} sx={{textTransform:'none', color: colorScheme == 'dark' ? APP_WHITE_COLOR : APP_DARK_PURPLE_COLOR}} />
              </ListItem>

              <ListItem component={Button} onClick={() => setModalVisible(true)}>
                <ListItemIcon> {colorScheme === 'light' ? <LOGOUT_ICON /> : <DARK_LOGOUT_ICON /> } </ListItemIcon>
                <ListItemText primary={t('button_logout')} sx={{textTransform:'none', color: colorScheme == 'dark' ? APP_WHITE_COLOR : APP_DARK_PURPLE_COLOR}} />
              </ListItem>
            </List>
            <Divider className="divider" />
            <Typography variant="body1" className="versionName">{t('appVersionText')} {process.env.REACT_APP_RELEASE_VERSION}</Typography>
            </>}
          </Box>
        </Drawer>
        <CustomDialog
          dialogVisible={modalVisible}
          onClose={cancelLogout}
          handleCancel={cancelLogout}
          handleAccept={handleLogout}
          dialogTitle={t('button_logout')}
          dialogContentText={t('are_you_sure_to_logout')}
          buttonOneTitle={t('button_cancel')}
          buttonTwoTitle={t('yesBtnText')}
          buttonProps={{buttonOne : {variant : "outlined",customClass : "cancel-button"},buttonTwo : {type : BUTTON_WARNING}}}
        />
         <CustomDialog
          dialogVisible={deleteModalVisible}
          onClose={() => this.setState({showBookingConfirmationModal: false})}
          handleCancel={closeDeleteModal}
          handleAccept={handleDeleteAccount}
          dialogTitle={t('confirmText')}
          dialogContentText={t('alert_delete_account_msg')}
          buttonOneTitle={t('button_cancel')}
          buttonTwoTitle={t('yesBtnText')}
          buttonProps={{buttonOne : {type : BUTTON_WARNING },buttonTwo : {type : BUTTON_PRIMARY}}}
        />
        {loaderdisabled && (
          <Box className="loaderOuterView">
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  </Box>
  );
};

export default CustomDrawer;