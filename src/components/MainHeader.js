import React, { useEffect, useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { APP_ENGLISH_VIOLET_COLOR, APP_WHITE_COLOR } from '../assets/constants/Colors';
import { HAMBERGER_ICON, DARK_HAMBERGER_ICON, NOTIFICATION, DARK_NOTIFICATION, CloseIcon } from "../assets/constants/Icons";
import { useTranslation } from 'react-i18next';
import { MAIN_HEADER_LEFT_ICON, MAIN_HEADER_RIGHT_ICON } from '../assets/constants/Constants';
import {LANDING, HOME, EQUIPMENT_GRID, MENU_DRAWER, CUSTOM_DRAWER, CHAT_SUPPORT} from '../assets/constants/PageList';
import {getPageNameUsingPath, getPathForNextPage} from '../lib/Utils';
// import {getClientLogo} from '../../api/authAPI';

const MainHeader = ({ isDrawerOpened }) => {
    const [clientLogo, setClientLogo] = useState('');
    const history = useHistory();
    const theme = useTheme();
    const { t } = useTranslation();
    const colorScheme = theme.palette.mode;

    const openMenu = () => {
        history.push( getPathForNextPage( getPageNameUsingPath(history.location.pathname), MENU_DRAWER ), { isDrawerOpened: true } );
    };

    const openDashboard = () => {
        // history.push('/home-screen');
    };

    const getTenantLogo = async () => {
        try {
            const domain = localStorage.getItem('domain'); // domain : xyz.abc.in
            if (domain) {
                const response = "" //await getClientLogo(domain);
                if (response) {
                    const logo = response.data.main_logo || '';
                    setClientLogo(logo);
                }
            }
        } catch (error) {
            console.error('getTenantLogo error==', error);
        }
    };

    useEffect(() => {
        getTenantLogo();
    }, []);

    const handleNavigateToNotification = () => {
        // history.push('/notification') //Commented the code as notification functionality is not implemented
    }

    const handleOpenChatSupport = () => {
        history.push(getPathForNextPage(EQUIPMENT_GRID, CHAT_SUPPORT));
    }

    const handleCloseDrawer = () => {
        window.history.back();
    };

    return (
        <Box className='main-header-page'>
            <Box className='main-container'>
                <Box className='main' sx={{ backgroundColor: colorScheme === 'dark' ? APP_ENGLISH_VIOLET_COLOR : APP_WHITE_COLOR }}>
                    <Box className={`header ${colorScheme == 'dark' ? 'dark-header' : null}`}>
                        {isDrawerOpened ? (
                            <IconButton onClick={handleCloseDrawer}>
                                <img className={`header-left-icon header-cancel-icon ${colorScheme === 'dark' ? 'dark' : ""}`} src={t('cancelIcon') !== 'cancelIcon' ? t('cancelIcon') : require('../assets/images/cancel.png')} alt="Icon" />
                            </IconButton> 
                        ) : (
                            t('mainHeaderLeftIcon') !== MAIN_HEADER_LEFT_ICON ? (
                                <IconButton onClick={openMenu}>
                                    <img className='header-left-icon' src={t('mainHeaderLeftIcon')} alt="Icon" />
                                </IconButton> 
                            ) : (
                                <IconButton onClick={openMenu}>
                                    {colorScheme === 'dark' ? <DARK_HAMBERGER_ICON /> : <HAMBERGER_ICON />}
                                </IconButton>
                            )
                        )}
                        <Box className="header-contain">
                            <Box className="header-content">
                                <IconButton onClick={openDashboard}>
                                    {t("appHeaderLogo") !== "appHeaderLogo" ? (
                                        <img className="app-header-logo" src={t('appHeaderLogo')} alt="App Logo" />
                                    ) : (
                                        <img className="logo" src={require("../assets/images/durolt_app_logo.png")} alt={t('durolt_logo')} />
                                    )}
                                </IconButton>
                            </Box>
                        </Box>
                        {t('mainHeaderRightIcon') !== MAIN_HEADER_RIGHT_ICON ? (
                            <IconButton onClick={handleOpenChatSupport}>
                                <img className='header-right-icon' src={t('mainHeaderRightIcon')} alt="Icon" />
                            </IconButton>
                        ) : (
                            <IconButton onClick={handleNavigateToNotification}>
                                {colorScheme === 'dark' ? <DARK_NOTIFICATION /> : <NOTIFICATION />}
                            </IconButton>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>

    );
};

export default MainHeader;