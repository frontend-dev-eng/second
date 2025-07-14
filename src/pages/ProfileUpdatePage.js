import React, { useEffect, useState } from 'react';
import { TextField, Modal, Typography, Box, IconButton, Avatar, FormControl, useTheme, RadioGroup, FormControlLabel, Radio, Autocomplete, Input, makeStyles, Paper } from '@mui/material';
import ShowToast from "../components/ToastComponent";
import { TOAST_ERROR, TOAST_WARN } from "../assets/constants/Constants";
import { useTranslation } from 'react-i18next';
import ButtonComponent from "../components/ButtonComponent";
import { DARK_CLOSE_ICON, ButtonFloatingIcon } from "../assets/constants/Icons";
import CircularProgressLoader from "../components/CircularProgressLoader";
import CustomMobileInput from '../components/CustomMobileInput';
import { CustomTextInput } from '../components/CustomTextInput';
import CustomQRCodeReader from '../components/CustomQRCodeReader';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    paddingBottom: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
};

const ProfileUpdatePage = () => {
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalOneVisible, setModalOneVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [tempMobile, setTempMobile] = useState(null);
    const [tempEmail, setTempEmail] = useState(null);
    const [image, setImage] = useState(null);
    const [selCountryLength, setSelCountryLength] = useState(0)
    const [companyList, setCompanyList] = useState([{
        value: 'Durolt',
        label: 'Durolt',
    },
    {
        value: 'Chetan',
        label: 'Chetan',
    }
]);
// const [companyList, setCompanyList] = useState([]);
    const [scan, setScan] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [imageOption] = useState([
        { key: '1', label: 'Camera' },
        { key: '2', label: 'Gallery' }
    ]);
    const theme = useTheme();
    const colorScheme = theme.palette.mode;

 


    useEffect(() => {
        // fetchUserDetails();
        // fetchCompanyList().then(setCompanyList);
    }, []);

    const fetchUserDetails = () => {
        const isGuest = localStorage.getItem('Is_Guest');
        const userInfo = localStorage.getItem('userInfo');

        if (isGuest && userInfo === null) {
            setScan(true);
            // getFCMToken();
        } else {
            setMobile(userInfo.mobile_number);
            setEmail(userInfo.email);
            setFirstName(userInfo.first_name);
            setLastName(userInfo.last_name);
            setCompanyName(userInfo.user_company);
            setImage(userInfo.profile_pic);
            setTempMobile(userInfo.mobile_number);
            setTempEmail(userInfo.email);
        }
    };

    const fetchCompanyList = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            const domain = localStorage.getItem('domain');
            const lockerBankId = localStorage.getItem('lockerbank_id');

            if (accessToken && domain && lockerBankId) {
                const data = "" // await getCompanyList(accessToken, domain, lockerBankId);
                if (data) {
                    const tempList = data.results.map(item => ({
                        label: item.name,
                        value: item.id
                    }));
                    setCompanyList(tempList);
                }
            }
        } catch (error) {
            console.log('Fetch company list error:', error);
        }
    };


    const handleUpdateProfile = async () => {
        if (validation()) {
            try {
                setLoading(true);
                //await profileUpdate({ firstName, lastName, mobile, email, companyName, image });
                setLoading(false);
                setModalVisible(true);
                setTimeout(() => setModalVisible(false), 2000);
            } catch (error) {
                console.error('Profile update error:', error);
                setLoading(false);
            }
        }
    };

    const validation = () => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if (!firstName) {
            ShowToast(t('FirstNameError'), TOAST_WARN);
            return false;
        } else if (!mobile) {
            ShowToast(t('LoginPhoneError'), TOAST_WARN);
            return false;
        }
        else if(selCountryLength !== mobile.length){
            ShowToast(t('OTPSentPhoneFailed'), TOAST_ERROR);
            return false
        }
         else if (!email) {
            ShowToast(t('LoginEmailError'), TOAST_WARN);
            return false;
        } else if (!emailRegex.test(email)) {
            ShowToast(t('OTPSentEmailFailed'), TOAST_ERROR);
            return false;
        }
        return true;
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(URL.createObjectURL(file));
        }
    };

    const hideModal = () => {
        setModalOneVisible(false);
    };

    const profileImageHandler = () => {
        setModalOneVisible(true);
    };

    const onSelect = (key) => {
        setSelectedOption(key);
    };

    const profilePicHandler = () => {
        setModalOneVisible(false);
        const input = document.getElementById('imageInput');
        if (selectedOption === '1') {
            input.setAttribute('capture', 'user');
        } else {
            input.removeAttribute('capture');
        }
        input.click();
    };

    const qrReaderErrorHandler = (error) => {
        this.setState({
            isLoading: false,
            loadingMessage: "",
            showQRCodeReader: false
        }, () => {
            ShowToast(this.props.t('error_msg_error_while_opening_qr_reader'), TOAST_ERROR);
        });
    }

    const qrReaderScanHandler = (qrCodeData) => {
        if (qrCodeData) {
            console.log('qr code data: ', qrCodeData)
        }
    }

    const onPressHandlerOne = () => {
        setScan(true)
    };

    const handleSetMobile = (value,country,e) => {
        setSelCountryLength(country.format.length)
        setMobile(e.target.value);
    }

    return (
        <Box className='profile-update-page'>
            <Box className='main-container'>
                <Box className='main'>
                    {!scan ?
                        <Box className='container'>
                            <Box className="ProfileImage">
                                <Avatar src={image} sx={{ width: 130, height: 130 }} />
                                <IconButton onClick={profileImageHandler} className="iconContainer">
                                    <ButtonFloatingIcon />
                                </IconButton>
                            </Box>
                            <Input
                                type='file'
                                id="imageInput"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <form className="form" noValidate>
                                <CustomTextInput
                                    className={'input'}
                                    placeholder={t('firstName')}
                                    value={firstName}
                                    margin='normal'
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                  <CustomTextInput
                                    className={'input'}
                                    placeholder={t('lastName')}
                                    value={lastName}
                                    margin='normal'
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <Box className="custom-input-view">
                                <CustomMobileInput
                                    handleSetMobile={handleSetMobile}
                                    value={mobile}
                                    placeholder={t('lastName')}
                                    handleKeyDown={handleUpdateProfile}
                                    isContainerClass={true}
                                />
                                </Box>
                                <CustomTextInput
                                    className={'input'}
                                    value={email}
                                    placeholder={t('enterEmailAddress')}
                                    margin='normal'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Box className="scanQRbutton">
                                    <ButtonComponent handleClick={onPressHandlerOne} title={t("scanQRTabOneTitle")} />
                                </Box>
                                <FormControl fullWidth className="input">
                                    <Autocomplete
                                        className='autocomplete-dark-theme'
                                        options={companyList}
                                        noOptionsText="No Company Found"
                                        value={companyList.find((option) => option.value === companyName) || null}
                                        onChange={(event, selectedOption) => setCompanyName(selectedOption?.value || '')}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params}  
                                        InputProps={{
                                            ...params.InputProps,
                                            className: 'placeholder-color'
                                          }}
                                        placeholder='Select Company'/>}
                                    />
                                </FormControl>
                                <ButtonComponent handleClick={handleUpdateProfile} title={t("saveChangesBtn")} />
                            </form>
                        </Box>
                        :
                        <Box className='container'>
                            <CustomQRCodeReader handleOnScan={qrReaderScanHandler} handleOnError={qrReaderScanHandler}/>
                        </Box>
                    }

                    <Modal
                        open={modalVisible}
                        onClose={() => setModalVisible(false)}
                    >
                        <Box sx={style}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                <IconButton onClick={() => setModalVisible(false)}>
                                    <DARK_CLOSE_ICON />
                                </IconButton>
                            </Box>
                            <Typography sx={{ lineHeight: 2, fontSize: 20, fontFamily: 'SFProText-Semibold' }}>
                                {t('profileDetails')}
                            </Typography>
                            <Typography sx={{ lineHeight: 2, fontSize: 22, fontFamily: 'SFProDisplay-Semibold' }}>
                                {t('profileUpdateSuccess')}
                            </Typography>
                        </Box>
                    </Modal>

                    <Modal
                        open={modalOneVisible}
                        onClose={hideModal}
                    >
                        <Box sx={style}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Typography sx={{ fontSize: 20, fontFamily: 'SFProText-Semibold', paddingLeft: 10 }}>
                                    {t('imageOption')}
                                </Typography>
                                <IconButton onClick={hideModal}>
                                    <DARK_CLOSE_ICON width={25} height={25} />
                                </IconButton>
                            </Box>
                            <RadioGroup
                                value={selectedOption}
                                onChange={(e) => onSelect(e.target.value)}
                                sx={{ width: '100%', paddingLeft: 2 }}
                            >
                                {imageOption.map((option) => (
                                    <FormControlLabel
                                        key={option.key}
                                        value={option.key}
                                        control={<Radio />}
                                        label={option.label}
                                        sx={{ marginBottom: 1 }}
                                    />
                                ))}
                            </RadioGroup>
                            <ButtonComponent handleClick={profilePicHandler} title={t("nextBtnText")} />
                        </Box>
                    </Modal>

                    {loading && (<CircularProgressLoader message ={t('ScreenLoading')} />)}

                </Box>
            </Box>
        </Box>
    );
};

export default ProfileUpdatePage;