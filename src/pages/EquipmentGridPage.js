import React, {useState, useEffect,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {Box, Divider, Typography} from '@mui/material';
import CircularProgressLoader from '../components/CircularProgressLoader';
import EquipmentCard from '../components/EquipmentCard';
import { getAssignedLockerList, getProductsList, handleNotifyUserForProduct } from '../api/api';
import { getSecureItemFromSpecificStorage } from '../lib/BrowserStorageAccessMiddleware';
import { LOCAL_STORAGE, LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS, USER_INFO, SS_REDIRECTED_FROM_LOGIN } from '../assets/constants/BrowserStorageKeys';
import { SUCCESS, TOAST_SUCCESS } from '../assets/constants/Constants';
import {LANDING, EQUIPMENT_GRID, EQUIPMENT_DETAILS, ASSIGNED_LOCKERS} from '../assets/constants/PageList';
import {getPathForNextPage, scrollSmoothlyToPageTop} from '../lib/Utils';
import ShowToast from '../components/ToastComponent';
import { useTranslation } from 'react-i18next';
import SpinnerLoader from '../components/SpinnerLoader';

const EquipmentGridPage = () => {
	const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [categorisedEquipmentsList, setCategorisedEquipmentsList] = useState([]);
    const assignmentSettings = getSecureItemFromSpecificStorage(LOCAL_STORAGE,LS_TENANT_ASSIGNMENT_LOCKER_BANK_SETTINGS);
    const userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE,USER_INFO)
    const {t} = useTranslation();

    useEffect(() => {
        scrollSmoothlyToPageTop();
        getRentedEquipmentsCountAndThenFetchEquipmentsList();
    }, []);

    const getRentedEquipmentsCountAndThenFetchEquipmentsList = async () => {
        if (sessionStorage.getItem(SS_REDIRECTED_FROM_LOGIN)) {
            sessionStorage.removeItem(SS_REDIRECTED_FROM_LOGIN);

            const isRentedEquipmentsCountGreaterThanZero = await checkIfRentedEquipmentsCountIsGreaterThanZero();

            if (isRentedEquipmentsCountGreaterThanZero) {
                setIsLoading(false);
                history.push(getPathForNextPage(EQUIPMENT_GRID, ASSIGNED_LOCKERS));
                return;
            }
        }

        await fetchEquipmentsList();
    }

    const checkIfRentedEquipmentsCountIsGreaterThanZero = async () => {
        try {
            const response = await getAssignedLockerList(assignmentSettings?.id);

            if ((response?.status === SUCCESS) && (response?.data?.length > 0)) {
                return true;
            }
        }
        catch (error) {
            console.error("Error fetching rented equipments list: ", error);
        }
        
        return false;
    }

    const fetchEquipmentsList = async () => {
        // Make the API call to fetch the equipments list and store the list in the following variable.
        try {
            let assignmentSlug = assignmentSettings?.slug;
            const response = await getProductsList(assignmentSlug);
            console.log(`response from the fetchEquipmentsList function`,response);
            if(response.status === SUCCESS){
                setIsLoading(false)
                const equipmentsList = response?.data
                console.log("equipmentsList",equipmentsList)
                const categorisedList = categoriseFetchedEquipments(equipmentsList);
                setCategorisedEquipmentsList(categorisedList);
            }else{
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.error("Error in fetchEquipmentList API",error)
        }
    };

    const categoriseFetchedEquipments = (equipmentsList) => {
        // Loop through the fetched list, group the equipments by category and return categorised list.

        const categorisedList = [];

        equipmentsList.forEach((equipment) => {
            let doesCategoryOfCurrentEquipmentExistInCategorisedList = false;

            categorisedList?.forEach((categoryObjectWithEquipmentsArray) => {
                if (categoryObjectWithEquipmentsArray.category === equipment.category) {
                    categoryObjectWithEquipmentsArray.equipments.push(equipment);
                    doesCategoryOfCurrentEquipmentExistInCategorisedList = true;
                }
            });

            if (!doesCategoryOfCurrentEquipmentExistInCategorisedList) {
                const newCategoryObject = {
                    category: equipment.category,
                    equipments: [equipment]
                };

                categorisedList.push(newCategoryObject);
            };
        });

        return categorisedList;
    };

	const navigateToEquipmentDetails = (equipment) => {
		history.push({
			pathname: getPathForNextPage(EQUIPMENT_GRID, EQUIPMENT_DETAILS),
			state: {
				selectedEquipment: equipment
			}
		});
	}

	const notifyMeButtonHandler = async (event,equipment) => {
        try {
            // Stop navigation to equipment details when clicked on notify me button
            event.stopPropagation();
            let assignmentSlug = assignmentSettings?.slug;
            const response = await handleNotifyUserForProduct(assignmentSlug,equipment?.id)
            if(response?.status === SUCCESS){
                ShowToast(t('notifySuccessMessage'), TOAST_SUCCESS);
            }
        } catch (error) {
            console.error('Error in notifyMeButtonHandler: ', error);
        }
	}

    return (
        <Box className='equipment-grid-page'>
            <Box className='main-container'>
                {isLoading ? (
                        <SpinnerLoader/>
                ) : (
                    <Box className='main'>
                        <Typography className='welcome-heading'>{t('welcomeText')}</Typography>
                        <Typography className='choose-and-rent-text'>{t('productListSubheading')}</Typography>
                        {categorisedEquipmentsList.length > 0 ? categorisedEquipmentsList.map((category, categoryIndex) => (
                            <Box className='equipment-category' key={categoryIndex}>
                                <Typography className='category-title'>{category.category}</Typography>
                                {category.equipments.map((equipment, equipmentIndex) => {
                                    console.log("equipment",equipment);
                                    const isEquipmentCardBlocked = equipment?.door_details?.is_blocked;
                                    console.log("isEquipmentCardBlocked",isEquipmentCardBlocked)
                                    
                                    // If the equipment card is blocked, skip rendering it 
                                    if (isEquipmentCardBlocked) {
                                        return null; 
                                        // Skip rendering this equipment card
                                    }
                                   return(
                                     <Box 
                                    key={equipmentIndex}
                                    onClick={() => navigateToEquipmentDetails(equipment)}
                                    >
                                        <EquipmentCard
                                            isBlocked={isEquipmentCardBlocked}
                                            title={equipment?.title}
                                            description={equipment?.short_description}
                                            image={equipment.product_image_array[0]}
											availability={equipment.availability}
                                            showNotifyMeButton={userInfo?.id !== equipment?.user_id}
											notifyMeButtonHandler={(event)=> notifyMeButtonHandler(event,equipment)}
                                        />
										{equipmentIndex !== (category.equipments.length - 1) && (
											<Divider />
										)}
                                    </Box>
                                   )
})}
                            </Box>
                        )) :
                                <Box className="no-product-warning-container">
                                    <Typography className='no-product-warning-text'>{t('noProductAddedWarning')}</Typography>
                                </Box>
                            }
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default EquipmentGridPage;