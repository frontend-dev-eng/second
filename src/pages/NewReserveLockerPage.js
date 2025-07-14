import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomQRCodeReader from "../components/CustomQRCodeReader";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../components/ButtonComponent";
import Favourites from "../components/Favourites";
import { useLocation,useHistory } from "react-router-dom";
import ShowToast from "../components/ToastComponent";
import { BUTTON_PRIMARY, BUTTON_SECONDARY, PENDING, SUCCESS, TOAST_ERROR } from "../assets/constants/Constants";
import CustomDialog from '../components/CustomDialog';
import { getSecureItemFromSpecificStorage } from "../lib/BrowserStorageAccessMiddleware";
import { LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS } from "../assets/constants/BrowserStorageKeys";
import { getAssignedLockerList, openLocker } from "../api/api";

const NewReserveLockerPage = (props) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const settings = getSecureItemFromSpecificStorage(LOCAL_STORAGE,LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
  const {scan_barcode,scan_qr_code,hasPendingLockers} = location.state


  useEffect(() => {
    const unblock = history.listen((location, action) => {
      if (action === 'POP') {
        navigateToHomeScreen();
      }
    });

    return () => {
      unblock();
    };
  }, [history]);

  const redirectToDropParcel = (response,isOpened) => {
    history.push('/drop-parcel', {
      open_locker_by_scan_barcode: settings?.usecase_settings?.open_locker_by_scan_barcode?.value,
      locker_bank_details: response.data[0].locker_bank,
      is_already_opened_once: response.data[0].is_already_opened_once,
      locker_unit_details: response.data[0]?.locker_door,
      clientRef : response.data[0].client_ref,
      pickupUserDetails: response.data[0].user,
      isOpened : isOpened,
      hasPendingLockers: hasPendingLockers,
      assignTime: response.data[0].assigned_date,
      status: response.data[0].status,
      headerTitle: response.data[0] === PENDING ? t('dropParcel') : t('pickupParcel'),
      ref_id: response.data[0].ref_id
    });
  };

  const qrReaderScanHandler = async (qrCodeData) => {
    try {
      if (qrCodeData && qrCodeData.length > 0) {
        let rawValue = qrCodeData[0].rawValue
        if (scan_barcode) {
          const response = await getLockerInfo(rawValue);  //call api to search based on rawvalue eg. client_ref
          if (response?.status === SUCCESS) {
            if (settings?.usecase_settings?.open_locker_by_scan_barcode?.value) {
              let refId = response?.data[0]?.ref_id
              const openLockerResponse = await openLocker(refId);
              if (openLockerResponse?.status === SUCCESS) {
                redirectToDropParcel(response, true);
              }
            } else {
              redirectToDropParcel(response, false);
            }
          } else {
            ShowToast(t('barcodeNotFound'), TOAST_ERROR)
          }
        } else {
          //Navigate to create new user or navigate to reserve locker
        }
      } else {
        ShowToast(t('pleaseScanAgain'), TOAST_ERROR)
      }
    } catch (error) {
      console.error("NewReserveLockerPage.js - qrReaderScanHandler", error)
    }
  }

  const getLockerInfo = async (searchText) => {
    try {
      if (settings) {
        return await getAssignedLockerList(settings.id, searchText);
      }
    } catch (error) {
      console.error('Error in NewReserveLockerPage getLockerInfo = ', error);
    }
  }

  const hideModal = () => {
    setShowModal(false)
  }

  const handleRetakeScan = () => {
    setShowModal(false)
  }

  const qrReaderErrorHandler = (error) => {
    console.error("Error on QR Code",error)

  }

  const handleSelectLockerBankToReserve = () => {
    props.history.push({pathname : '/select-zone'})
  }

  const navigateToHomeScreen = () => {
    history.push('/home-screen');
  }

  return (
    <Container className="new-reserve-locker-page" maxWidth="xs" disableGutters={true}>
      <Box className="main">
        <Box>
          <CustomQRCodeReader handleOnScan={qrReaderScanHandler} handleOnError={qrReaderErrorHandler} scanType={scan_qr_code}/>
          {scan_barcode && <Typography className="barcode-scan-text">
            {t('barcodeReadWarning')}
          </Typography>}
        </Box>
        {!settings?.usecase_settings?.verify_with_barcode_pwa && <Box className="bottom-container">
        {settings?.usecase_settings?.show_find_and_reserve_pwa?.value && <Typography className="or-text">{t('or')}</Typography>}
        {settings?.usecase_settings?.show_find_and_reserve_pwa?.value && <ButtonComponent
          handleClick={handleSelectLockerBankToReserve}
          title={t("button_find_and_reserve")}
        />}
        {settings?.usecase_settings?.show_favourites?.value &&
        <Box> 
          <Typography className="favourites-text">{t('favourites')}</Typography>
          <Favourites isMaxHeightShouldShrink={true}/>
        </Box>}
        </Box>}
      </Box>
      <CustomDialog
        dialogVisible={showModal} 
        onClose={hideModal} 
        dialogTitle={t('page_title_error')}
        dialogContentText={t('rescanQRWarning')}
        handleCancel={hideModal} 
        handleAccept={handleRetakeScan} 
        buttonOneTitle={t('button_cancel')}
        buttonTwoTitle={t('button_retake')}
        buttonProps={{buttonOne : {type : BUTTON_SECONDARY},buttonTwo : {type : BUTTON_PRIMARY}}}
      />
      {
        scan_barcode && (
          <Box className="button">
            <ButtonComponent handleClick={navigateToHomeScreen} title={t("goToMyLocker")} />
          </Box>
        )
      }
    </Container>
  );
};

export default NewReserveLockerPage;
