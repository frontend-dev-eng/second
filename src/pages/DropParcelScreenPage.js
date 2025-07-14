import { Box, Container, Divider, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { getFormatDate, getFormatTime, getPathForNextPage } from '../lib/Utils';
import { LOCK_ICON, LOCKER_OPEN_ICON } from '../assets/constants/Icons';
import { getSecureItemFromSpecificStorage, storeSecureItemInSpecifiedStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, OPERATION_ID } from '../assets/constants/BrowserStorageKeys';
import CustomSliderComponent from '../components/CustomSliderComponent';
import ButtonComponent from '../components/ButtonComponent';
import { useHistory } from 'react-router-dom';
import { PickupUserDetails } from '../components/PickupUserDetails';
import { PackageDetails } from '../components/PackageDetails';
import { ADD_ANOTHER, ASSIGNED, BUTTON_PRIMARY, BUTTON_WARNING, CLOSED, DONE, DOOR_NOT_CLOSED, ECONNABORTED, LB_NOT_RESPOND, LB_OFFLINE, MAX_RETRIES_FOR_CLOSE_ACTIVITY, PENDING, PUSH, RETURN, SUCCESS, TOAST_ERROR, TOAST_SUCCESS } from '../assets/constants/Constants';
import {HOME, LANDING, DROP_AND_PICKUP_PARCEL} from '../assets/constants/PageList';
import { cancelDropOffTransaction, checkClosedLockerDoorStatus, dropParcel, openLocker, releaseLockerOfPickUpUser } from '../api/api';
import ShowToast from '../components/ToastComponent';
import CircularProgressLoader from '../components/CircularProgressLoader';
import CustomDialog from '../components/CustomDialog';
import { CustomTextInput } from '../components/CustomTextInput';

const DropParcelScreenPage = (props) => {
  const [pickupUserDetails] = useState(props.history.location?.state?.pickupUserDetails)
  const [assignTime, setAssignTime] = useState()
  const [isLockerOpened, setIsLockerOpened] = useState(false)
  const { t } = useTranslation()
  const history = useHistory()
  const { locker_bank_details, locker_unit_details, isOpened, open_locker_by_scan_barcode, status, ref_id, clientRef, hasPendingLockers } =
    props.history.location.state;
  const [pendingLockersCount, setPendingLockersCount] = useState(hasPendingLockers?.length)
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const hasRunRef = useRef(false);
  const assignmentSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
  const navigateAction = props.history.action
  const [modalVisible, setModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [cancelReason,setCancelReason] = useState('')
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
  const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(true);
  const [isAddAnotherButtonDisabled,setIsAddAnotherButtonDisabled] = useState(true)
  const [warningMessage, setWarningMessage] = useState('');
  const [exceedRetryLimit, setExceedRetryLimit] = useState(false)
  const [retryCount, setRetryCount] = useState(0);
  const maxTries = MAX_RETRIES_FOR_CLOSE_ACTIVITY

  const getParcelDetails = () => {
    try {
      const assignedTime = props.history.location?.state?.assignTime
      let assignTimestamp = getFormatTime(assignedTime);
      let assignDaystamp = getFormatDate(assignedTime);
      let lockerAssignTime = assignDaystamp + " " + assignTimestamp;
      setAssignTime(lockerAssignTime)
    } catch (error) {
      console.error("DropParcelScreenPage.js - getParcelDetails", error)
    }
  }

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

  const navigateToHomeScreen = () => {
    history.push(getPathForNextPage(DROP_AND_PICKUP_PARCEL, HOME));
  }



  useEffect(() => {
    if (!hasRunRef.current) {
        getParcelDetails();
        if(navigateAction === PUSH && isOpened) handleLockerOperationAfterOpenLocker();
        hasRunRef.current = true;
    }
  }, []);

  /**
   * Handles the operation after opening the locker.
   * If the status is PENDING, it calls the handleDropParcel function.
   * If the status is ASSIGNED, it calls an API to pickup the parcel.
   */
  const handleLockerOperationAfterOpenLocker = (isLockerOpened = false) => {
    if ((status === PENDING || status === ASSIGNED || status === RETURN) && (isOpened || isLockerOpened)) {
      if(status === ASSIGNED){
        setIsDoneButtonDisabled(false)
      }
      handleCheckCloseDoorStatus()
    }
  }

  const enableDoneAndCancelButton = () => {
    setIsCancelButtonDisabled(false)
    setIsDoneButtonDisabled(false)
    setIsAddAnotherButtonDisabled(false)
  }

  const handleCheckCloseDoorStatus = async () => {
    try {
      setLoadingMessage(t('checkingLockerDoorStatus'))
      setShowLoader(true)
      const response = await checkClosedLockerDoorStatus(ref_id, CLOSED);
      if (response?.status === SUCCESS) {
        if(status === ASSIGNED || status === RETURN){
          handleReleaseLockerOfPickUpUser()
        } else {
          enableDoneAndCancelButton()
          setShowLoader(false)
        }
      } else {
        setShowLoader(false)
      }
    } catch (error) {
      setShowLoader(false)
      let errorMessage = error?.response?.data?.message
      if (error?.code === ECONNABORTED || errorMessage === DOOR_NOT_CLOSED || errorMessage === LB_NOT_RESPOND || errorMessage === LB_OFFLINE) {
        setWarningMessage(t('doorCloseWarning'))
        if (error?.code === ECONNABORTED || errorMessage === LB_NOT_RESPOND || errorMessage === LB_OFFLINE || ((status === ASSIGNED || status === RETURN) && errorMessage === DOOR_NOT_CLOSED)) {
          setRetryCount(prevRetryCount => {
            const newRetryCount = prevRetryCount + 1;
            if (newRetryCount > maxTries) {
              enableDoneAndCancelButton()
              setWarningMessage(t('closeDoorIssueAndContactAdmin'));
              setExceedRetryLimit(true)
            }
            return newRetryCount;
          });
        }
        setWarningModalVisible(true)
      } else {
        enableDoneAndCancelButton()
      }
      console.error("DropParcelScreenPage.js - handleCheckCloseDoorStatus", error)
    }
  }

  /**
   * Handles the drop parcel action.
   * 
   * @async
   * @function handleDropParcel
   * @returns {Promise<void>} A promise that resolves when the drop parcel action is completed.
   * @throws {Error} If an error occurs during the drop parcel action.
   */
  const handleDropParcel = async (btnAction) => {
    try {
      if (ref_id) {
        setLoadingMessage(t('pleaseWaitText'));
        setShowLoader(true);
        const response = await dropParcel(ref_id);
        if (response.status === SUCCESS) {
          setPendingLockersCount(pendingLockersCount - 1)
          storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, OPERATION_ID, response?.data?.operation_id)
          setShowLoader(false);
          ShowToast(response.message, TOAST_SUCCESS);
          if (btnAction === DONE) {
            history.push(getPathForNextPage(DROP_AND_PICKUP_PARCEL, HOME))
          } else if (btnAction === ADD_ANOTHER) {
            if (assignmentSettings?.usecase_settings?.verify_with_barcode_pwa?.value) {
              history.push('/new-reserve-locker',{scan_barcode : true,hasPendingLockers})
            } else {
              history.goBack()
            }
          }
        }
      }
    } catch (error) {
      setShowLoader(false);
      console.error("handleDropParcel Error=", error)
    }
  }

  const handleReleaseLockerOfPickUpUser = async () => {
    try {
      if (ref_id) {
        setShowLoader(true);
        const response = await releaseLockerOfPickUpUser(ref_id);
        if (response.status === SUCCESS) {
          ShowToast(response.message, TOAST_SUCCESS);
          storeSecureItemInSpecifiedStorage(LOCAL_STORAGE, OPERATION_ID, response?.data?.operation_id)
          setShowLoader(false);
          history.push(getPathForNextPage(DROP_AND_PICKUP_PARCEL, HOME))
        }else{
          setShowLoader(false);
        }
      }
    } catch (error) {
      setShowLoader(false);
      console.error("handleReleaseLockerOfPickUpUser Error=", error)
    }
  }


  const handleOnDone = () => {
    if (status === PENDING) {
      handleDropParcel(DONE)
    }else if (status === ASSIGNED || status === RETURN) {
      handleReleaseLockerOfPickUpUser()
    }else {
      history.push(getPathForNextPage(DROP_AND_PICKUP_PARCEL, HOME))
    }
  }

  /**
   * Handles the action to show the modal by setting the modal visibility to true.
   */
  const handleShowModal = () => {
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
    setIsTextAreaVisible(false);
    setErrorMessage('')
    setCancelReason('')
  }

  const handleRecheckCloseDoorStatus = () => {
    setWarningModalVisible(false);
    if (!exceedRetryLimit) {
      handleCheckCloseDoorStatus()
    }
  }

  const hideWarningModal = () => {
    setWarningModalVisible(false);
  }

  const handleEnableCommentBoxForReason = () => {
    setIsTextAreaVisible(true);
  }

  const handleCancelTransaction = async () => {
    try {
      if (cancelReason?.trim() === '') {
        setErrorMessage(t('requiredFieldError'))
        return;
      }
      const response = await cancelDropOffTransaction(ref_id, cancelReason.trim());
      setShowLoader(true);
      if (response?.status === SUCCESS) {
        setCancelReason('')
        setShowLoader(false);
        ShowToast(response.message, TOAST_SUCCESS);
        history.push(getPathForNextPage(DROP_AND_PICKUP_PARCEL, HOME))
      }
    } catch (error) {
      setShowLoader(false);
      console.error("DropParcelScreenPage.js - handleCancelTransaction", error)
    }
  }

  const handleAddAnotherParcel = () => {
    handleDropParcel(ADD_ANOTHER)
  }

  const openSelectedLocker = async () => {
    try {
      setLoadingMessage(t('opening_locker_please_wait'));
      setShowLoader(true);
      const response = await openLocker(ref_id);
      if(response){
        setIsLockerOpened(true);
        setShowLoader(false);
        handleLockerOperationAfterOpenLocker(true)
        ShowToast(response.message, TOAST_SUCCESS);
      } else {
        setShowLoader(false);
        ShowToast(response.message, TOAST_ERROR);
      }
    } catch (error) {
      setShowLoader(false);
      console.error("DropParcelScreenPage.js - openSelectedLocker",error)
    }
  }

  const handleSetComment = (e) => {
    setCancelReason(e.target.value)
    setErrorMessage('')
  }


  const renderDialogContent = () => {
    return (
        <CustomTextInput
            placeholder={t('cancelTransactionPlaceholder')}
            value={cancelReason}
            onChange={handleSetComment}
            multiline
            fullWidth
            hasError={!!errorMessage}
            rows={4}
            errorMessage={errorMessage}
        />
    );
};

  return (
    <Container className='drop-parcel-screen-page' maxWidth="xs">
      <Box className="main-container">
        <Box className="top-container">
          {status === PENDING ?
            <PackageDetails clientRef={clientRef} assignTime={assignTime} /> :
            <PickupUserDetails pickupUserDetails={pickupUserDetails} />}
          <Divider className='divider'>{status === PENDING ? t('toText') : t('fromText')}</Divider>
          {status === PENDING ?
            <PickupUserDetails pickupUserDetails={pickupUserDetails} />
            : <PackageDetails clientRef={clientRef} assignTime={assignTime} />}
        </Box>
        <Box>
          <Box className="bottom-container">
            {isOpened || open_locker_by_scan_barcode || isLockerOpened ? <LOCKER_OPEN_ICON className='locker-open-icon' /> : <LOCK_ICON className='locked-icon' />}
            <Box className="locker-door-details">
              <Typography variant="h6" className='initial-text'>
                {locker_unit_details?.door_number_prefix}
              </Typography>
              <Typography variant="h6" className="locker-text">
                {t('lockerText')}
              </Typography>
              <Typography variant="h6" className={`locker-no ${isOpened || open_locker_by_scan_barcode || isLockerOpened ? 'door-text-red' : ''}`}>
                {locker_unit_details?.door_no}
              </Typography>
              <Typography className='locker-door-text'>
                {isOpened || open_locker_by_scan_barcode || isLockerOpened ? t('closeDoorText') : t('openDoorText')}
              </Typography>
            </Box>
            {isOpened || open_locker_by_scan_barcode || isLockerOpened ?
              <>
                <Box className="button-view">
                  <Box className="done-and-cancel-btn">
                    <ButtonComponent handleClick={handleOnDone} title={t('doneBtnText')} disabled={isDoneButtonDisabled} />
                    {(status === PENDING) && (isOpened || open_locker_by_scan_barcode || isLockerOpened) && <ButtonComponent handleClick={handleShowModal} title={t('button_cancel')} customClass='warning' disabled={isCancelButtonDisabled} />}
                  </Box>
                </Box>
                {(status === PENDING && pendingLockersCount > 1) &&
                  <ButtonComponent handleClick={handleAddAnotherParcel} title={t('addMorParcel')} customClass='add-another-parcel' disabled={isAddAnotherButtonDisabled}/>
                }
              </>
              :
              <CustomSliderComponent
                bankDetails={`${locker_bank_details?.location.name}${" > "}${locker_bank_details?.name}${" > "}${locker_unit_details?.door_no}`}
                onSlideDone={openSelectedLocker}
              />}
          </Box>
        </Box>
      </Box>
      {showLoader && (<CircularProgressLoader message={loadingMessage} />)}
      <CustomDialog
            dialogVisible={modalVisible}
            onClose={null}
            handleCancel={hideModal}
            handleAccept={isTextAreaVisible ? handleCancelTransaction : handleEnableCommentBoxForReason}
            children={isTextAreaVisible ? renderDialogContent : null}
            dialogTitle={t('confirmText')}
            dialogContentText={isTextAreaVisible ? t('cancelTransactionText') : t('cancelTransactionPrompt')}
            buttonOneTitle={t('noText')}
            buttonTwoTitle={isTextAreaVisible ? t('submit_btn') : t('yesBtnText')}
            buttonProps={{ buttonOne: { type: BUTTON_WARNING }, buttonTwo: { type: BUTTON_PRIMARY } }}
          />
      <CustomDialog
        dialogVisible={warningModalVisible}
        onClose={null}
        handleCancel={hideWarningModal}
        handleAccept={handleRecheckCloseDoorStatus}
        dialogTitle={t('warningText')}
        dialogContentText={warningMessage}
        buttonTwoTitle={t('button_ok')}
        buttonProps={{ buttonTwo: { type: BUTTON_PRIMARY } }}
      />
    </Container>
  )
}

export default DropParcelScreenPage;
