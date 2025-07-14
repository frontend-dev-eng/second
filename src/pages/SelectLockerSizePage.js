import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import CircularProgressLoader from "../components/CircularProgressLoader";
import ShowToast from "../components/ToastComponent";
import { NO_SIZE, TOAST_ERROR, TOAST_WARN } from "../assets/constants/Constants";
import { useTranslation } from 'react-i18next';
import ButtonComponent from "../components/ButtonComponent";

const SelectLockerSizePage = () => {
    const history = useHistory();
    const location = useLocation();
    const [filterSizes, setFilterSizes] = useState([]);
    const { t } = useTranslation();

    const data = [{ "dimension": "W None\" × H None\" × L None\"", "free_units": ["501", "502", "504"], "name": "Small", "size": "S" },
    { "dimension": "W None\" × H None\" × L None\"", "free_units": ["503"], "name": "Medium", "size": "M" }
    ];

    useEffect(() => {
        setFilterSizes(data);
        const unSubscribe = () => {
            const usecase = "" //getAssignmentSetting('parcel') ? 'parcel' : 'dynamic';
            localStorage.setItem('usecase', usecase);
            getLockerSizesList();
        };
        unSubscribe();
    }, [location]);

    const getLockerSizesList = async () => {
        try {
            const domain = localStorage.getItem('domain');
            const value = localStorage.getItem('lockerbank_id');
            const accessToken = localStorage.getItem('token');
            const assignmentId = localStorage.getItem('assignment_id');
            if (domain !== null && value !== null) {
                const res = "" //await getLockerBankDetails(domain, value, accessToken);
                if (res) {
                    const filteredAssignmentData = res.assignment_data.filter(
                        (assignment) => assignment.id === assignmentId
                    );

                    const lockerSizeData = {
                        ...res,
                        assignment_data: filteredAssignmentData
                    };
                    localStorage.setItem('lockerbank_name', lockerSizeData?.bank_name);

                    let remainingSizes = lockerSizeData.assignment_data[0].available_sizes?.filter(item => (
                        item.name !== null &&
                        item.name !== '' &&
                        item.size !== null &&
                        item.size !== ''
                    ));

                    if (remainingSizes !== undefined && remainingSizes?.length > 0) {
                        if (remainingSizes.length === 1 && remainingSizes[0]['size'] !== undefined && remainingSizes[0]['size'] == NO_SIZE) {
                            assignLocker(remainingSizes[0]);
                        } else {
                            setFilterSizes(remainingSizes);
                        }
                    } else {
                        ShowToast(t('locker_size_unavailable'), TOAST_WARN);
                        setTimeout(() => {
                            history.push('/dashboard');
                        }, 20);
                    }
                } else {
                    ShowToast(t('sizes_notFound'), TOAST_WARN);
                    setTimeout(() => {
                        history.push('/dashboard');
                    }, 20);
                }
            }
        } catch (e) {
            ShowToast(t('sizes_notFound'), TOAST_ERROR);
            setTimeout(() => {
                history.push('/dashboard');
            }, 20);
            console.log('Error token', e);
        }
    };

    const navigateToDropParcel = async (lockerSize) => {
        history.push('/select-parcel-user', {
            state: { sizes: [lockerSize], SelectedSizeOption: lockerSize.size }
        });
    };

    const assignDynamicLocker = (lockerSize) => {
        // if (getAssignmentSetting('any_available')) {
        //     history.push('/assign-locker', {
        //         state: { size: lockerSize.size }
        //     });
        // } else {
        //     history.push('/locker-layout-list-view', {
        //         state: { usecase: 'dynamic', sizes: [lockerSize], SelectedSizeOption: lockerSize.size }
        //     });
        // }
    };

    const assignLocker = async (lockerSize) => {
        // if (getAssignmentSetting('parcel')) {
        //     navigateToDropParcel(lockerSize);
        // } else {
        //     assignDynamicLocker(lockerSize);
        // }
    };

    return (
        <Box className='select-locker-size-page'>
            <Box className='main-container'>
                <Box className='main'>
                    {filterSizes.length > 0 ? (
                        <Box>
                            {filterSizes.map((item, index) => (
                                <Box className="assignmentListStyle">
                                    <ButtonComponent handleClick={() => assignLocker(item)} title={item.name.toUpperCase()} />
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <CircularProgressLoader message={t('ScreenLoading')} />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default SelectLockerSizePage;