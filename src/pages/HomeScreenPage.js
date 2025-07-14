import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import MyLockeListPage from '../pages/MyLockeListPage';
import { useTranslation } from 'react-i18next';
import Favourites from "../components/Favourites";
import { getSecureItemFromSpecificStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS } from '../assets/constants/BrowserStorageKeys';
import {scrollSmoothlyToPageTop} from '../lib/Utils';

const HomeScreenPage = () => {
    const { t } = useTranslation();
    const [tabValue, setTabValue] = useState(0);
    const assignmentSetting = getSecureItemFromSpecificStorage(LOCAL_STORAGE,LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS)

    useEffect(() => {
        scrollSmoothlyToPageTop();
    }, []);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box className='home-screen-page'>
            <Box className='main-container'>
                <Box className='main'>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        classes={{ indicator: `indicatorStyle ${!assignmentSetting?.usecase_settings?.show_favourites?.value && 'indicator-full-width'}`}}
                        className="tabBarStyle">
                        <Tab className={`tabBarLabel ${assignmentSetting?.usecase_settings?.show_favourites?.value ? "" : 'single-tab' }`} label={t('page_title_my_lockers')} />
                        {assignmentSetting?.usecase_settings?.show_favourites?.value && <Tab className='tabBarLabel favoriteTabLabel' label={t('favoritesText')} />}
                    </Tabs>
                    <Box className="homescreenTabs">
                    {tabValue === 0 && (<MyLockeListPage />)}
                    {tabValue === 1 && (<Favourites />)}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HomeScreenPage;