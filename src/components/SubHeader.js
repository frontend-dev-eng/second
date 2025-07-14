import React from 'react';
import { Typography, IconButton, useTheme, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { MENU_BACK_ICON, DARK_MENU_BACK_ICON } from "../assets/constants/Icons";
// import { getIntervalValue } from '../../api/APIConst';
import { useTranslation } from 'react-i18next';
import { APP_ENGLISH_VIOLET_COLOR, APP_WHITE_COLOR } from '../assets/constants/Colors';
import { PENDING, ASSIGNED, RETURN } from '../assets/constants/Constants';

const SubHeader = ({ title, alertback, hide, condition }) => {
    const history = useHistory();
    const theme = useTheme();
    const { t } = useTranslation();
    const colorScheme = theme.palette.mode;


    const getPageTitle = (path) => {
        // if (condition?.status === PENDING) {
        //     return t('dropParcel');
        // } else if (condition?.status === ASSIGNED || condition?.status === RETURN) {
        //     return t('pickupParcel');
        // } else if (condition?.scan_qr_code) {
        //     return t('scanQRCode')
        // } else if (condition?.scan_barcode) {
        //     return t('scanBarcode')
        // }

        switch (path) {
            case "/about-screen":
                return t('aboutText');
            case "/support-screen":
                return t('supportText');
            case "/change-pin":
                return t('changePIN');
            case "/forget-pin":
                return t('forgetPINText');
            case "/team-locker":
                return t('teamLockerText');
            case "/personal-locker":
                return t('personalLockerText');
            case "/terms-and-conditions":
                return t('termAndconditionText');
            case "/organisation-list":
                return t('organizationListText');
            case "/my-lockers":
                return t('page_title_my_lockers');
            case "/select-locker-bank":
                return t('selectLockerBankText');
            case "/select-zone":
                return t('selectZoneText');
            case "/new-reserve-locker":
                if (condition?.scan_qr_code) {
                    return t('scanQRCode');
                }
                else if (condition?.scan_barcode) {
                    return t('scanBarcode');
                }
                return t('acessLockerText');
            case "/select-user":
                return t('selectUserText');
            case "/profile-update":
                return t('profileUpdateText');
            case "/connect-mobile":
                return t('linkPhoneText');
            case "/parcel-details":
                return t('parcelDetailsText');
            case "/assignments":
                return t('Select Assignment');
            case "/drop-parcel":
                if (condition?.status === ASSIGNED || condition?.status === RETURN) {
                    return t('pickupParcel')
                }
                return t('dropParcel');
            case "/notification":
                return t('notificationTitleText');
            case "/locker-list":
                return t('lockerListText');
            case "/locker-layout":
                return t('lockerLayoutText');
            case "/select-locker-size":
                return t('page_title_locker_size');
            case "/locker-more-options":
                return t('lockerDetailsText');
            case "/assign-locker":
                return t('assignLockerTitleText');
            case "/open-locker":
                return t('openLockerText');
            case "/open-parcel":
                return t('openParcelText');
            case "/payment-details":
                return t('paymentDetailsText');
            case "/payment-completion":
                return t('paymentCompletionText');
            case "/locker-size":
                return t('lockerSizeText');
            case "/select-unit":
                return t('Select Unit');
            case "/swipe-to-open":
                return t('Swipe To Open');
            case "/locker-opened":
                return t('Locker Opened');
            case "/sublocation-one":
                return t('subLocationText');
            case "/sublocation-two":
                return t('subLocationText');
            case "/sublocation-three":
                return t('subLocationText');
            case "/account-details":
                return t('accountDetailsText');
            case "/my-rented-products":
                return t('myRentedProductsText');
            case "/faq":
                return t('faqText');
            case "/contact-us":
                return t('contactUsText');
            case "/privacy-policy":
                return t('privacyPolicyText');
            default:
                return "";
        }
    }

    const createTwoButtonAlert = () => {
        if (window.confirm(t('transaction_cancel'))) {
            history.push('/ReleaseParcelLoader')
        }
    };

    const onPressHandler = () => {
        if (alertback === true) {
            createTwoButtonAlert();
            //   clearInterval(getIntervalValue());
        } else {
            history.goBack();
            //   clearInterval(getIntervalValue());
        }
    };

    return (
        <Box className='sub-header header-container'>
            {!hide && (
                <IconButton id='back-button' edge="start" color="inherit" onClick={onPressHandler} aria-label="back">
                    {(t('backArrowWhiteIcon') !== 'backArrowWhiteIcon') ? (
                        <img className='back-image' src={t('backArrowWhiteIcon')} alt='back' />
                    ) : (
                        <Box className='back-icon-and-title'>
                            {colorScheme === 'dark' ? <DARK_MENU_BACK_ICON /> : <MENU_BACK_ICON />}
                            <Typography className='back-title' color="inherit"> {t('backBtnText')} </Typography>
                        </Box>
                    )}
                </IconButton>
            )}
            <Typography className='header-title' color={colorScheme === 'dark' ? APP_WHITE_COLOR : APP_ENGLISH_VIOLET_COLOR}> {getPageTitle(title)} </Typography>
        </Box>
    );
};

export default SubHeader;