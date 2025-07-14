import React, { useState } from 'react';
import { Box, Typography, IconButton, Paper, useTheme } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { DYNAMIC_LOCKER, PERSONAL_LOCKER, PARCEL_ICON, TEAM_LOCKER } from '../assets/constants/Icons';
import ShowToast from "../components/ToastComponent";
import { TOAST_ERROR, TOAST_WARN } from "../assets/constants/Constants";
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { ShowTimer } from '../components/ShowTimer';
import CustomSliderComponent from './CustomSliderComponent';

export const LockerItem = ({
    item,
    selectSlider,
    onPress,
    token,
    itemData,
    selectedItem,
    ListType,
    LoadersetON,
    LoadersetOFF
}) => {
    const history = useHistory();
    const { t } = useTranslation();
    const assignmentSetting = item?.locker_assignment?.settings_util || [];
    const TYPE = item.assignment_type;
    const assignment_name = item?.locker_assignment?.name;
    const LockerType =
        ListType === 'SHARE' ? 'shared' : TYPE === 'team' ? 'team' : '';
    const device_token = token;
    const hardware_Id = item?.locker_unit_details[0]?.hardware_id;
    const hub_Id = item?.locker_unit_details[0]?.hub_id;
    const lockerBankId = item?.locker_bank;
    const Sharing = assignmentSetting?.sharing_allowed || false;
    const SharingCount = assignmentSetting?.max_user_shares || null;
    const self_release_allowed = assignmentSetting?.self_release_allowed || false;
    const self_release = self_release_allowed || false;
    const outside_asnmt_sharing = assignmentSetting?.outside_asnmt_sharing || false;
    const theme = useTheme()

    const allocation_confirmation_period = item?.allocation_confirmation_period
        ? item.allocation_confirmation_period.length > 0
            ? item.allocation_confirmation_period[0].should_access_in
            : null
        : null;
    const usges = item?.anti_claim_usage_duration
        ? item.anti_claim_usage_duration.length > 0
            ? item.anti_claim_usage_duration[0].will_open_in
            : null
        : null;
    let AssignmentDate =
        item.assigmnent_date && item.assigmnent_date.split('.')[0] + '';
    let Status = item?.openstatus;
    let ReleaseTime = ''; // Removed TimerDeadline for simplicity
    const isBlockedLocker = item?.is_blocked || false;
    // const isBlockedLocker =  true

    const [showSlider, setShowSlider] = useState(true)


    const handleIconClick = (event) => {
        event.stopPropagation(); // Prevent triggering other click events
        setShowSlider(false); // Hide the slider when IconButton is clicked
        shareLocker(); // Call the shareLocker function
    };

    const openLockerUnit = async () => {
        try {
            history.push('/open-locker', {
                locker_unit: item.locker_unit,
                locker_bank_details: item.locker_bank_details,
                is_already_opened_once : item.is_already_opened_once
            });
            // LoadersetON();
            // const domain = localStorage.getItem('domain');
            // const lockerBankId = localStorage.getItem('lockerbank_id');
            // const accessToken = localStorage.getItem('token');
            // const lockerUnit = item?.locker_unit;

            // if (domain && lockerBankId && accessToken && lockerUnit) {
            //     ShowToast(t('locker_opening'), TOAST_SUCCESS);
            //     const response ="" //await openLocker(domain, lockerBankId, lockerUnit, accessToken);
            //     if (response) {
            //         history.push('/OpenLocker', {
            //             locker_unit: lockerUnit,
            //             lockerbank_Id: lockerBankId,
            //             lockerType: response.assignment_type,
            //             OpenOnce: response.is_already_opened_once
            //         });
            //         LoadersetOFF();
            //     } else {
            //         LoadersetOFF();
            //     }
            // }
        } catch (error) {
            LoadersetOFF();
            ShowToast(t('locker_open_error'), TOAST_ERROR);
            console.error('Error in LockerComponent.js open Locker:', error);
        }
    };

    const shareLocker = async () => {
        if (isBlockedLocker) {
            ShowToast(t('lockerBlockText'), TOAST_WARN);
        } else {
            try {
                const accessToken = localStorage.getItem('token');
                const domain = localStorage.getItem('domain');
                LoadersetON();
                if (accessToken && domain) {
                    if (item?.locker_unit && lockerBankId) {
                        LoadersetON();
                        const res = "" // LockerOpenInfo(accessToken,domain,lockerBankId,item?.locker_unit,LockerType);
                        if (res) {
                            if (res?.assigned) {
                                LoadersetOFF();
                                history.push('/locker-more-options', {
                                    lockerUnit: item.locker_unit,
                                    location: item.locker_bank_details['location'],
                                    name: item.locker_bank_details['name'],
                                    lockerBankId: item.locker_bank,
                                    type: item.assignment_type,
                                    team_count: item.team_member_count_details,
                                    assign: item.assigmnent_date,
                                    lockerBankToken: item.locker_bank_details['device_fcm_token'],
                                    hub_Id: hub_Id,
                                    hardware_Id: hardware_Id,
                                    device_token: device_token,
                                    sharing: Sharing,
                                    maxShare: SharingCount,
                                    autorelease_time: ReleaseTime,
                                    self_release: self_release,
                                    outside_asnmt_sharing: outside_asnmt_sharing,
                                    lockerType: LockerType,
                                    transaction_id: item.transaction_id
                                });
                            } else {
                                LoadersetOFF();
                                ShowToast(t('locker_owner_error'), TOAST_WARN);
                            }
                        } else {
                            LoadersetOFF();
                        }
                    } else {
                        LoadersetOFF();
                        ShowToast(t('locker_not_found'), TOAST_WARN);

                    }
                } else {
                    LoadersetOFF();
                    ShowToast(t('invalid_lockerOpen_cred'), TOAST_ERROR);
                }
            } catch (error) {
                LoadersetOFF();
                console.error(error);
            }
        }
    };

    return (
        <Paper className='LockerWrapper'>
            <Box component="button" onClick={onPress} className='lockerContainer'>
                <Box className={`listItem ${isBlockedLocker ? 'list-item-blocked' : null}`}>
                    <Box className="content">
                        <Box className="imageGroup">
                            {item.assignment_type === 'dynamic' && (
                                <>
                                    <DYNAMIC_LOCKER />
                                    {ReleaseTime != undefined && <ShowTimer ExitTime={ReleaseTime} />}
                                </>
                            )}

                            {item.assignment_type === 'personal' && (<PERSONAL_LOCKER />)}
                            {item.assignment_type === 'parcel' && (<PARCEL_ICON />)}

                            {item.assignment_type == 'team' && (
                                <>
                                    <TEAM_LOCKER />
                                    <Typography className="badgeCount">{item.team_member_count_details}</Typography>
                                </>
                            )}

                        </Box>
                        <Box className="contentInfo">
                            <Typography className={isBlockedLocker ? "lockerLocationBlock" : "lockerLocation"}>{assignment_name}</Typography>
                            <Typography className={isBlockedLocker ? "lockerTitleBlock" : "lockerTitle"}>{item.locker_bank_details.name}-{item.locker_unit}</Typography>
                            <Typography className={isBlockedLocker ? "lockerLocationBlock" : "lockerLocation"}>{item.locker_bank_details.location}</Typography>
                            <Typography className={isBlockedLocker ? "lockerLocationBlock" : "lockerLocation"}>{item.locker_bank_details.awb_number}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <IconButton onClick={handleIconClick}>
                            <MoreVert />
                        </IconButton>
                    </Box>

                    {selectSlider && showSlider &&
                        (isBlockedLocker ? (
                            ShowToast(t('lockerBlockText'), TOAST_WARN)
                        ) : (
                            <Box className="openLockerSlider">
                                <CustomSliderComponent
                                    bankDetails={`${item.locker_bank_details.location} > ${item.locker_bank_details.name} - ${item.locker_unit}`}
                                    onSlideDone={openLockerUnit}
                                />
                            </Box>
                        ))}
                </Box>
            </Box>
        </Paper>
    );
};