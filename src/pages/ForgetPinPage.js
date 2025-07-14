import React, { useState, useEffect } from 'react';
import { Typography, Modal, Box } from '@mui/material';
import ShowToast from "../components/ToastComponent";
import { REGEXP_EMAIL, TOAST_ERROR, TOAST_WARN } from "../assets/constants/Constants";
import { useTranslation } from 'react-i18next';
import { SUCCESS_PIN } from "../assets/constants/Icons";
import ButtonComponent from "../components/ButtonComponent";
import { CustomSwitchInput } from '../components/CustomSwitchInput';

const ForgetPinPage = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({
    email: '',
    mobile: ''
  });
  const [sendButtonBottom, setSendButtonBottom] = useState(30);
  const [isMobile, setIsMobile] = useState(false);
  const [type, setType] = useState('Email');
  const [selCountryLength, setSelCountryLength] = useState(0)
  const { t } = useTranslation();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  useEffect(() => {
    const handleKeyboardShow = (event) => {
      setSendButtonBottom(event.target.scrollHeight);
    };

    const handleKeyboardHide = () => {
      setSendButtonBottom(30);
    };

    window.addEventListener('focusin', handleKeyboardShow);
    window.addEventListener('focusout', handleKeyboardHide);

    return () => {
      window.removeEventListener('focusin', handleKeyboardShow);
      window.removeEventListener('focusout', handleKeyboardHide);
    };
  }, []);

  const validation = () => {

    const isMobileValid = () => {
        if (user.mobile.trim() === '') {
            ShowToast(t('LoginPhoneError'), TOAST_WARN);
            return false;
        }
        else if(selCountryLength !== user.mobile.length){
          ShowToast(t('OTPSentPhoneFailed'), TOAST_ERROR);
          return false
        }
        return true;
    };

    const isEmailValid = () => {
        if (user.email.trim() === '') {
            ShowToast(t('LoginEmailError'), TOAST_WARN);
            return false;
        } else if (!REGEXP_EMAIL.test(user.email.trim())) {
            ShowToast(t('OTPSentEmailFailed'), TOAST_ERROR);
            return false;
        }
        return true;
    };
    if (type === 'Mobile') {
        if (isMobileValid()) {
          ForgetPINRequest();
        }
    } else if (isEmailValid()) {
      ForgetPINRequest();
    }
};

  const ForgetPINRequest = async () => {
    try {
      const domain = localStorage.getItem('domain');
      if (!domain) {
        throw new Error('Domain not found in local storage');
      }
      
        setModalVisible(true);
        //await forgetPIN(user, domain);

        setTimeout(() => {
          setModalVisible(false);
          props.history.push('/change-pin');
        }, 5000);
    } catch (error) {
      console.error('ForgetPINRequest Error:', error);
      ShowToast(t('request_failed'), TOAST_ERROR);
    }
  };

    const handleSetEmail = (value) => {
      setUser({ ...user, email: value });
    }

    const handleSetMobile = (value,country,e) => {
      setSelCountryLength(country.format.length)
      setUser({ ...user, mobile: e.target.value });
    }

    const toggleInput = () => {
      setUser({ email: '', mobile: '' });
      setIsMobile(!isMobile);
      setType(isMobile ? 'Email' : 'Mobile');
    };


    return (
      <Box className='change-pin-page'>
        <Box className='main-container'>
          <Box className='main'>
            <CustomSwitchInput
              isMobile={isMobile}
              mobile={user?.mobile}
              email={user?.email}
              handleSetMobile={handleSetMobile}
              handleSetEmail={handleSetEmail}
              toggleInput={toggleInput}
            />
            <Box className="btnView" style={{ bottom: sendButtonBottom }}>
              <ButtonComponent handleClick={validation} title={t('submit_btn')} />
            </Box>
            <Modal
              open={modalVisible}
              onClose={() => props.history.push("/home")}
            >
              <Box sx={style}>
                <Typography sx={{ fontSize: 20, lineHeight: 5 }}>{t('forgetPIN')}</Typography>
                <SUCCESS_PIN />
                <Typography sx={{ fontSize: 20, paddingTop: 5 }}>{t('pinSentSuccessMsg')}</Typography>
              </Box>
            </Modal>
          </Box>
        </Box>
      </Box>
    );
  };

  export default ForgetPinPage;
