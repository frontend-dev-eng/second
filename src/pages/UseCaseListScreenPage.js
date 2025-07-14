import { Box, Container } from '@mui/material'
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import {BUTTON_PRIMARY, TOAST_SUCCESS} from '../assets/constants/Constants';
import {ASSIGNMENT_SELECTION, LOGIN} from '../assets/constants/PageList';
import {checkIfAssignmentIsProperlyConfigured, getPathForNextPage} from '../lib/Utils';
import ButtonComponent from '../components/ButtonComponent';
import CustomDialog from '../components/CustomDialog';
import ShowToast from '../components/ToastComponent';

/*
const response = {
    "id": 1,
    "bank_name": "Chetan Test",
    "bank_location": "Durolt Test",
    "assignment_data": [
        {
            "id": "65c1e52f95f4b5eba178c7ac",
            "name": "C- Staff",
            "lockers_allowed": 70,
            "is_active": true,
            "user_group_id": 2,
            "locker_group_id": 1707206130,
            "use_case": "dynamic_locker",
            "any_available": true,
            "select_manual": false,
            "assignment_settings": {
                "dynamic_locker": true,
                "personal_locker": false,
                "team_locker": false,
                "parcel": false,
                "visitor": false,
                "gym_locker": false,
                "luggage": false,
                "pudo": false,
                "linking_mob_dev_via_badge": false,
                "self_register": true,
                "set_as_default_group": false,
                "unknown_user_badge": false,
                "allow_pin_login": true,
                "self_release_allowed": true,
                "sharing_allowed": false,
                "max_user_shares": 0,
                "outside_asnmt_sharing": false,
                "is_guest_allowed": false,
                "face_authentication_access": false,
                "hide_parcel_details_screeen": false,
                "verify_with_otp": true,
                "otpless": false,
                "pick_up_parcel_details": false,
                "name": true,
                "company_name": false,
                "mobile_no": false,
                "email": false,
                "rfid": true,
                "drop_with_pin": false,
                "pick_up_with_pin": false,
                "select_manual": false,
                "any_available": true,
                "usb_enabled": false,
                "locker_action_after_release": false,
                "no_release_before_action": 0,
                "keep_locker_after_release_min": 0,
                "after_locker_release": "",
                "locker_release_msg": "",
                "drop_box_for_customer": "",
                "drop_box_for_HL_user": "",
                "approval_required": false,
                "approval_waiting_time": 300,
                "assignment_team": "65c1db23c991c23b3a6a1321"
            },
            "available_sizes": [
                {
                    "size": "M",
                    "name": "Medium",
                    "dimension": "W None\" × H None\" × L None\"",
                    "free_units": [
                        "121"
                    ]
                }
            ],
            "count_free_units": 1
        },
        {
            "id": "65c1e5ba95f4b5eba178c875",
            "name": "C - Parcel",
            "lockers_allowed": 2,
            "is_active": true,
            "user_group_id": 3,
            "locker_group_id": 1707206130,
            "use_case": "parcel",
            "any_available": true,
            "select_manual": false,
            "assignment_settings": {
                "dynamic_locker": false,
                "personal_locker": false,
                "team_locker": false,
                "parcel": true,
                "visitor": false,
                "gym_locker": false,
                "luggage": false,
                "pudo": false,
                "linking_mob_dev_via_badge": false,
                "self_register": true,
                "set_as_default_group": false,
                "unknown_user_badge": false,
                "allow_pin_login": true,
                "self_release_allowed": false,
                "sharing_allowed": false,
                "max_user_shares": 0,
                "outside_asnmt_sharing": false,
                "is_guest_allowed": true,
                "face_authentication_access": true,
                "hide_parcel_details_screeen": true,
                "verify_with_otp": true,
                "otpless": false,
                "pick_up_parcel_details": true,
                "name": true,
                "company_name": false,
                "mobile_no": true,
                "email": true,
                "rfid": false,
                "drop_with_pin": false,
                "pick_up_with_pin": false,
                "select_manual": false,
                "any_available": true,
                "verify_with_qrcode": true,
                "verify_with_fingerprint": false,
                "usb_enabled": false,
                "locker_action_after_release": false,
                "no_release_before_action": 0,
                "keep_locker_after_release_min": 0,
                "after_locker_release": "",
                "locker_release_msg": "",
                "drop_box_for_customer": "",
                "drop_box_for_HL_user": "",
                "approval_required": false,
                "approval_waiting_time": 120,
                "assignment_team": "65c1db23c991c23b3a6a1321"
            },
            "available_sizes": [
                {
                    "size": "M",
                    "name": "Medium",
                    "dimension": "W None\" × H None\" × L None\"",
                    "free_units": [
                        "121"
                    ]
                }
            ],
            "count_free_units": 1
        }
    ]
}
*/

const UseCaseListScreenPage = () => {
  	const history = useHistory();
  	const {t} = useTranslation();
  	const {tenantAndAssignmentSettings} = history.location?.state;
  	const assignmentList = tenantAndAssignmentSettings?.locker_assignments;
	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [dialogContentText, setDialogContentText] = useState('');
  	// const [assignmentList, setAssignmentList] = useState([]);

  /*
    useEffect(() => {
        getLockerBankAssignmentData()
    }, [])
    


    const getLockerBankAssignmentData = () => {
        let lockerBankAssignmentData = response
        if (lockerBankAssignmentData) {
            let remainingAssignmentData = lockerBankAssignmentData.assignment_data.filter(item => (
                item.count_free_units > 0
            ));
            if (remainingAssignmentData.length === 0) {
                // navigateToNewReserveLockerScreen();
            }
            if (remainingAssignmentData.length === 1) {
                // navigateToSelectLockerSize(remainingAssignmentData[0])
            }
            // AsyncStorage.setItem('lockerbank_usecase_count', JSON.stringify(remainingAssignmentData.length));
            setAssignmentList(remainingAssignmentData);
        }
    }
  */

	const showErrorDialog = (dialogContentText) => {
		setDialogContentText(dialogContentText);
		setIsDialogVisible(true);
	}

	const assignmentSelectionHandler = async (assignment, selectedAssignmentIndex) => {
		const isAssignmentProperlyConfigured = await checkIfAssignmentIsProperlyConfigured(tenantAndAssignmentSettings, selectedAssignmentIndex);

		if ( isAssignmentProperlyConfigured === true ) {
			ShowToast(`"${assignment.name.toUpperCase()}" assignment is selected.`, TOAST_SUCCESS);
            history.push({
				pathname: getPathForNextPage(ASSIGNMENT_SELECTION, LOGIN)
			});
		}
		else {
			showErrorDialog( t(isAssignmentProperlyConfigured?.errorMessage) );
		}
	}

  	return (
    	<Box className='assignment-selection-page'>
    		<Box className='main-container'>
        		<Box className='main'>
                    {assignmentList.map((assignment, index) => (
                        <ButtonComponent
                            key={index}
                            buttonId={`assignment-${index}`}
                            title={assignment.name.toUpperCase()}
                            handleClick={() => assignmentSelectionHandler(assignment, index)}
                        />
                    ))}
                    <CustomDialog
                        dialogId='error-dialog'
                        dialogVisible={isDialogVisible}
                        dialogTitle={t('page_title_error')}
                        dialogContentText={dialogContentText}
                        buttonTwoTitle={t('button_ok')}
                        buttonProps={{ buttonTwo: {type: BUTTON_PRIMARY } }}
                        handleAccept={() => setIsDialogVisible(false)}
                    />
                </Box>
    		</Box>
  		</Box>
  	)
}

export default UseCaseListScreenPage

