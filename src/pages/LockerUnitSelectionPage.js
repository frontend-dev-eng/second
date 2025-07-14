import React, {useState} from 'react';
import {Box, Button, FormControl, Typography} from '@mui/material';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {SUCCESS} from '../assets/constants/Constants';
import {LOCKER_UNIT_SELECTION, OPEN_LOCKER} from '../assets/constants/PageList';
import {reserveLocker} from '../api/api';
import {getPathForNextPage} from '../lib/Utils';
import ButtonComponent from '../components/ButtonComponent';
import CircularProgressLoader from '../components/CircularProgressLoader';
import ShowToast from '../components/ToastComponent';

const LockerUnitSelectionPage = () => {
    const history = useHistory();
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const { lockerBankId, assignmentSlug, userId, selectedLockerSize } = history.location?.state;
    const [selectedLockerUnit, setSelectedLockerUnit] = useState({id: null, door_no: ''});
    // console.log('selected locker size: ', selectedLockerSize);

    const reserveSelectedLocker = async () => {
        setIsLoading(true);
        try {
            const reserveLockerResponse = await reserveLocker(assignmentSlug, lockerBankId, userId, selectedLockerSize.code, selectedLockerUnit.id);
            if (reserveLockerResponse.status === SUCCESS) {
                const lockerUnitDetails = {
                    ref_id: reserveLockerResponse?.data?.transaction_id,
                    is_already_opened_once: false,
                    locker_bank: {
                        name: reserveLockerResponse?.data?.locker_bank_name
                    },
                    locker_door: {
                        door_no: reserveLockerResponse?.data?.door_no
                    }
                };

                history.replace({
                    pathname: getPathForNextPage(LOCKER_UNIT_SELECTION, OPEN_LOCKER),
                    state: {
                        lockerUnitDetails
                        // assignedLocker: response.data
                    }
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error while reserving locker: ', error);
        }
    };

    return (
        <Box className='locker-unit-selection-page'>
            <Box className='main-container'>
                {isLoading && (
                    <Box className='main'>
                        <CircularProgressLoader message={t('Reserving Locker. Please Wait.')} />
                    </Box>
                )}
                {(!isLoading) && (
                    <Box className='main'>
                        <Typography variant='h3' className='selected-locker-size'>{selectedLockerSize.name}</Typography>
                        <Box className='locker-unit-list'>
                            {selectedLockerSize?.free_doors.map((item, index) => (
                                <Button className={(selectedLockerUnit.id === item.id) ? 'locker-unit selected-unit': 'locker-unit'} key={index} disableRipple={true} onClick={() => setSelectedLockerUnit(item)}>Locker - {item.door_no}</Button>
                            ))}
                        </Box>
                        <Box className='reserve-locker-button-container'>
                            <ButtonComponent buttonId='reserve-locker' title={selectedLockerUnit.id === null ? 'Reserve Locker' : `Reserve Locker - ${selectedLockerUnit.door_no}`} disabled={selectedLockerUnit.id === null} handleClick={reserveSelectedLocker} />
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default LockerUnitSelectionPage;