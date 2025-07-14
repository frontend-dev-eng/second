import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import CircularProgressLoader from "../components/CircularProgressLoader";
import { useTranslation } from 'react-i18next';
import ButtonComponent from "../components/ButtonComponent";
import { APP_WHITE_COLOR, APP_YELLOW_GREEN_COLOR } from '../assets/constants/Colors';

const LockerLayoutPage = () => {
  const [lockerNumber, SetLockerNumber] = useState('');
  const [lockerLayout, setLockerLayout] = useState('');
  const [lockerBankname, setLockerBankname] = useState('PUDO');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const location = useLocation();
  const history = useHistory();
  //   const { data, selectedPickupUser } = location.state;
  const { t } = useTranslation();
  const containerRef = useRef();
  const [previousElement, setPreviousElement] = useState(null);

  const data = [{ "dimension": "W None\" × H None\" × L None\"", "free_units": ["501", "502", "504","505","506"], "name": "Small", "size": "S" }];
  const selectedPickupUser = '';

  const tableData = {
    "bank_location": "Durolt Test",
    "bank_name": "LB Pudo",
    "id": "12",
    "locker_layout": "<table id=\"table-lockerbank-layout\" cellspacing=\"5\"><tr><td rowspan=\"1\" colspan=\"1\" id=\"501\" style=\"position: relative;\">LP&nbsp;501<em style=\"color: #3F3356; position: absolute; bottom: 5px; right: 5px;\" onclick=\"open_locker_unit('501', '12','LP')\" class=\"mdi mdi-cog\" data-toggle=\"modal\" data-locker-bank=\"12\"></em><em style=\"position: absolute; bottom: 5px; right: 25px;\" class=\"mdi mdi-information-outline\"></em></td><td rowspan=\"1\" colspan=\"1\" id=\"503\" style=\"position: relative;\">LP&nbsp;503<em style=\"color: #3F3356; position: absolute; bottom: 5px; right: 5px;\" onclick=\"open_locker_unit('503', '12','LP')\" class=\"mdi mdi-cog\" data-toggle=\"modal\" data-locker-bank=\"12\"></em><em style=\"position: absolute; bottom: 5px; right: 25px;\" class=\"mdi mdi-information-outline\"></em></td></tr><tr><td rowspan=\"1\" colspan=\"1\" id=\"502\" style=\"position: relative;\">LP&nbsp;502<em style=\"color: #3F3356; position: absolute; bottom: 5px; right: 5px;\" onclick=\"open_locker_unit('502', '12','LP')\" class=\"mdi mdi-cog\" data-toggle=\"modal\" data-locker-bank=\"12\"></em><em style=\"position: absolute; bottom: 5px; right: 25px;\" class=\"mdi mdi-information-outline\"></em></td><td rowspan=\"1\" colspan=\"1\" id=\"504\" style=\"position: relative;\">LP&nbsp;504<em style=\"color: #3F3356; position: absolute; bottom: 5px; right: 5px;\" onclick=\"open_locker_unit('504', '12','LP')\" class=\"mdi mdi-cog\" data-toggle=\"modal\" data-locker-bank=\"12\"></em><em style=\"position: absolute; bottom: 5px; right: 25px;\" class=\"mdi mdi-information-outline\"></em></td></tr></table>"
  };

  useEffect(() => {
    getLockerView();
  }, []);

  const handleLocker = useCallback((event) => {
    const tdElement = event.target.closest('td.white[id]');
    if (tdElement) {
      const id = tdElement.getAttribute('id');
      if (previousElement) {
        previousElement.style.backgroundColor = APP_WHITE_COLOR;
      }
      tdElement.style.backgroundColor = APP_YELLOW_GREEN_COLOR;

      SetLockerNumber(id);
      setPreviousElement(tdElement);
    }
  }, [previousElement]);

  const showLockersList = async () => {
    const availableSizes = JSON.parse(localStorage.getItem('AvailableSizes'));
    history.push('/locker-list', { sizes: availableSizes });
  };

  const sendDataToWebView = (success, id) => {
    const element = document.getElementById(id);
    if (element && success) {
      element.classList.add('white');
    }
  };

  const freeLockerUpdate = useCallback(() => {
    try {
      const allLockers = data[0].free_units;
      if (allLockers.length > 0) {
        allLockers.forEach(locker => {
          sendDataToWebView(true, locker);
        });
      }
    } catch (error) {
      console.error('Error updating free lockers:', error);
    }
  }, [data]);

  const getLockerView = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const domain = localStorage.getItem('domain');
      const lockerBankId = localStorage.getItem('lockerbank_id');
      const lockerBankName = localStorage.getItem('lockerbank_name');
      // setLockerBankname(lockerBankName);


      // if (accessToken && domain && lockerBankId) {
      try {
        const response = ""; // await getLockerLayout(accessToken, domain, lockerBankId);
        // setLockerLayout(response.locker_layout);
        setLockerLayout(tableData.locker_layout);  // we need to remove this after actual API
        setTimeout(freeLockerUpdate, 500);
      } catch (err) {
        console.error('Error fetching locker layout:', err);
      }
      // }
    } catch (e) {
      console.error('Error getting locker view:', e);
    }
  };

  const navigateToAssign = async () => {
    const usecase = localStorage.getItem('usecase');
    const isHidden = JSON.parse(localStorage.getItem('isHidden'));

    if (usecase === 'parcel') {
      if (isHidden) {
        setLoaderVisible(true);
        getParcelLocker(data[0].size, lockerNumber, selectedPickupUser);
      } else {
        history.push('parcel-details', {
          size: data[0].size,
          lockerUnit: lockerNumber,
          isHidden: false,
          selectedPickupUser
        });
      }
    } else {
      history.push('assign-locker', {
        size: data[0].size,
        lockerUnit: lockerNumber
      });
    }
  };

  const getParcelLocker = async (size, lockerUnit, selectedPickupUser) => {
    try {
      const response = ""; // await getLocker(size, lockerUnit, selectedPickupUser);
      await handleResponse(response, selectedPickupUser);
    } catch (error) {
      console.error('Error getting parcel locker:', error);
    }
  };

  const handleResponse = async (response, selectedPickupUser) => {
    if (response) {
      // saveParcelLockerDetailsInLocal(response);
      // await postParcelDetailsWithImage(response);
      // await changeLEDStatus(response);
      setTimeout(() => {
        setLoaderVisible(false);
        history.push('drop-parcel', {
          name: `${selectedPickupUser.first_name} ${selectedPickupUser.last_name}`,
          email: selectedPickupUser.email,
          title: selectedPickupUser.username[0],
          contactNo: selectedPickupUser.phone,
          parcelUserID: selectedPickupUser.user_id
        });
      }, 1000);
    } else {
      setTimeout(() => {
        setLoaderVisible(false);
        history.push('dashboard');
      }, 2000);
    }
  };

  const html = `
    <html>
      <head>
        <style>
          table { width: 100%; height: 100%; border-collapse: separate; }
          td { height: 106px; border: 1px solid #D0C9D6; text-align: center; padding: 30px; color: #1A051D; font-size: 16px; line-height: 20px; font-weight: 500; }
          .white { color: #1A051D; border: 1px solid #669F00; background-color: #FFFFFF; }
        </style>
      </head>
      <body>
        ${lockerLayout}
      </body>
    </html>
  `;

  return loaderVisible ? (
    <CircularProgressLoader message={t('pleaseWaitText')} />
  ) : (
    <Box className='locker-layout-page'>
      <Box className='main-container'>
        <Box className='main'>
          <Box className="list-header">
            <Typography className='lockerView'>{lockerBankname}</Typography>
            <Typography className='lockerView' onClick={showLockersList}> {t('listViewText')}</Typography>
          </Box>
          <Paper className='responsiveImageStyle'>
            <Box onClick={handleLocker} className="content" ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
          </Paper>
          <Box>
            <Grid container>
              <Grid item >
                <Box className="flexRow">
                  <Box className="colorStatus available" bgcolor="#FFFFFF"></Box>
                  <Typography className='availableText'>{t('availableText')}</Typography>
                </Box>
              </Grid>
              <Grid item >
                <Box className="flexRow">
                  <Box className="colorStatus unavailable" bgcolor="#ECE9F1"></Box>
                  <Typography className='availableText'>{t('unavailableText')}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ opacity: lockerNumber == '' ? 0.5 : 1 }}>
            <ButtonComponent handleClick={navigateToAssign} title={t('confirmLockerText', { SelectedLocker: lockerNumber })} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LockerLayoutPage;