import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  CircularProgress,
  Box
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { NEW_LOCKER_ICON } from "../assets/constants/Icons";
import { useTranslation } from 'react-i18next';
import CircularProgressLoader from "../components/CircularProgressLoader";
import { NO_SIZE } from '../assets/constants/Constants';
import ButtonComponent from "../components/ButtonComponent";
import LockerItem from '../components/LockerItem';


const LockerListPage = () => {
  const [disabled, setDisabled] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const theme = useTheme();
  const history = useHistory();
  const { t } = useTranslation();

  const data = [{ "dimension": "W None\" × H None\" × L None\"", "free_units": ["501","502","504","505","506","507"], "name": "Small", "size": "S" }];
  const selectedPickupUser = '';

  const backActionHandler = useCallback(() => {
    history.push('/NewReserveLocker');
    return true;
  }, [history]);


  useEffect(() => {
    window.addEventListener('popstate', backActionHandler);
    return () => {
      window.removeEventListener('popstate', backActionHandler);
    };
  }, [backActionHandler]);

  const getParcelLocker = async (size, lockerUnit, selectedPickupUser) => {
    try {
      const response = ""; // await getLocker(size, lockerUnit, selectedPickupUser);
      await handleResponse(response);
    } catch (error) {
      console.error('Error : LockerListPage.js - getParcelLocker', error);
    }
  };

  const handleResponse = async (response, selectedPickupUser) => {
    if (response) {
      // saveParcelLockerDetailsInLocal(response);
      // await postParcelDetailsWithImage(response);
      // await changeLEDStatus(response);
      setTimeout(() => {
        setLoaderVisible(false);
        history.push('/DropParcel', {
          state: {
            name: `${selectedPickupUser.first_name} ${selectedPickupUser.last_name}`,
            email: selectedPickupUser.email,
            title: selectedPickupUser.username.substring(0, 1),
            contactNo: selectedPickupUser.phone,
            parcelUserID: selectedPickupUser.user_id,
          },
        });
      }, 1000);
    } else {
      setTimeout(() => {
        setLoaderVisible(false);
        history.push('/Dashboard');
      }, 2000);
    }
  };

  const navigateToAssign = async () => {
    const usecase = await localStorage.getItem('usecase');
    const isHidden = JSON.parse(await localStorage.getItem('isHidden'));
    if (usecase === 'parcel') {
      if (isHidden) {
        setLoaderVisible(true);
        getParcelLocker(data[0].size, selectedId, selectedPickupUser);
      } else {
        history.push('/ParcelDetails', {
          state: {
            size: data[0].size,
            lockerUnit: selectedId,
            isHidden: false,
            selectedPickupUser,
          },
        });
      }
    } else {
      history.push('/AssignLockerScreen', {
        state: {
          size: data[0].size,
          lockerUnit: selectedId,
        },
      });
    }
  };

  const handleLockerClick = (item) => {
    setSelectedId(item);
    setDisabled(false);
  };

  const navigateToLockerLayout = () => {
    history.push('/locker-layout', { state: { data, selectedPickupUser } });
  };

  return (
    <Box className='locker-list-page'>
      <Box className='main-container'>
        <Box className='main'>
          {data[0].free_units ? (
            data[0].free_units.length ? (
              loaderVisible ? (
                <CircularProgressLoader message={t('pleaseWaitText')} />
              ) : (
                <Box className="list-container">
                  <Box className="list-header">
                    <Typography className='locker-size' sx={{color : theme.palette.text.primary}}>
                      {data[0].size !== NO_SIZE && `${data[0].name}: ${data[0].free_units.length}`}
                    </Typography>
                      <Typography className='layout-text' onClick={navigateToLockerLayout}>{t('layoutText')}</Typography>
                  </Box>
                  <Box>
                      {data[0].free_units.map((item) => (
                        <LockerItem locker={item} selectSlider={item === selectedId} onPress={() => handleLockerClick(item)}/>
                      ))}
                  </Box>
                  <Box sx={{ opacity: disabled ? 0.6 : 1 }}>
                    <ButtonComponent handleClick={navigateToAssign} title={t('reserveBtnText', { SelectedLocker: selectedId })} />
                  </Box>
                </Box>
              )
            ) : (
              <Box className="container-view">
                <NEW_LOCKER_ICON />
                <Typography className='assign-para'>{t('noLockerAvailableText')}</Typography>
              </Box>
            )
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LockerListPage;
