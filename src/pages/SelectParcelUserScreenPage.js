import { Box, Container, List, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import ShowToast from '../components/ToastComponent';
import { TOAST_ERROR } from '../assets/constants/Constants';
import CustomSearchBar from '../components/CustomSearchBar';
import { SearchIcon } from '../assets/constants/Icons';


const res = [
    {
        "USER_EXISTS": {
            "user_id": 9,
            "username": "chetan123",
            "email": "chetan.k@fonzel.com",
            "first_name": "Chetan",
            "last_name": "Kharche",
            "phone": "8452899552",
            "is_active": true,
            "user_type": [
                {
                    "user_type": "Web User",
                    "user_type_id": 1,
                    "user_type_slug": "web_user"
                },
                {
                    "user_type": "Locker Bank Configurator",
                    "user_type_id": 3,
                    "user_type_slug": "locker_bank_admin"
                }
            ],
            "user_type_array": [
                1,
                3
            ],
            "password": "pbkdf2_sha256$320$0vRG5PO5mA0mVeT3QQSFjX$yADvHTVA1O9NLyD+eicv0Apj3lTe6zjIv/IwOeNdiwE=",
            "device_token": "ehRJCqBLSLG7RacrZJxdbe:APA91bG8zfewCgOrFwsWmNQTWRr5XLLeH1qQgmAkQj2MmziNV6efnGoIh2dbRGB47ccbk6hDqT7U9LdF5YtmkMjwPO1-C66XckDc_i3dD0JG_480oEc8SIHZ6MO4hSCFw-7zjtfmFuxz",
            "face_image_id": "ab4233a0-c4e6-4082-b03f-3392e975e1e5",
            "password_history": [
                {
                    "date_created": "2024-03-27T15:56:14.687000",
                    "password": "pbkdf2_sha256$320$Cg0H7G502xSFi2IyEk5ZNr$JTOR2Q93TJU09vrwjvCIbU8mAj6QWxW/5WC1uruBWu8=",
                    "user_id": 9,
                    "is_current": false
                },
                {
                    "date_created": "2024-04-30T12:02:22.526000",
                    "password": "pbkdf2_sha256$320$UGD3g9cs5VOWsK4JNhatRk$45vkE5uufKfhEbwm8+BQ9XpCmAzFnPpIzWFpz/3eykU=",
                    "user_id": 9,
                    "raw_password": "User@123",
                    "is_current": true
                }
            ],
            "linked_devices": [
                {
                    "device_id": "092f17ba0b0b849d",
                    "device_type": "Android",
                    "registered_on": "2024-04-30T13:37:53.975000",
                    "linking_method": "Mobile Number/Email Id "
                },
                {
                    "device_id": "268500642f7eff3d",
                    "device_type": "Android",
                    "registered_on": "2024-05-02T12:33:35.630000",
                    "linking_method": "Mobile Number/Email Id "
                }
            ],
            "favorite_locker_banks": [
                "4"
            ],
            "company_details": {}
        }
    }
]

const SelectParcelUserScreenPage = (props) => {
    const [userDetails, setUserDetails] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { t } = useTranslation()

    const handleSearchUser = () => {
        try {
            if(searchText.trim() == ""){
            ShowToast(t('emptyInputError'), TOAST_ERROR);
            }
            else if(searchText.includes("C".toLowerCase())){
                setUserDetails(res)
            }
        } catch (error) {
            console.error("SelectUserScreenPage.js - handleSearchUser", error)
        }
    }

    const selectUserAndNavigate = (user) => {
        try {
            props.history.push({pathname : '/parcel-details',state : {
                pickupUserDetails : user
            }})
        } catch (error) {
            console.error("SelectParcelUserScreenPage.js - selectUserAndNavigate",error)
        }
    }

    const handleSearchText = (e) => {
        setSearchText(e.target.value.trim())
    }

    return (
        <Container className='select-user-screen-page' maxWidth="xs"
        >
            <CustomSearchBar 
                onChange={handleSearchText} 
                placeholder={t('searchUserText')} 
                handleSearchUser={handleSearchUser}
                icon={<SearchIcon/>}
            />
            {userDetails !== undefined && userDetails.length > 0 ?
                userDetails.map((ele, index) => {
                    let user = ele?.USER_EXISTS;
                    return (
                        < List key={index} >
                            <ListItem
                                className="listItem"
                                onClick={()=> selectUserAndNavigate(user)}
                            >
                                <Box className="initial-view">
                                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                        {user?.first_name.substring(0, 1)}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" className="itemTitle">
                                        {user?.first_name + " " + user.last_name}
                                    </Typography>
                                    <Typography variant="subtitle1" className="itemTitle">
                                        {user?.email}
                                    </Typography>
                                    <Typography variant="subtitle1" className="itemTitle">
                                        {user?.phone}
                                    </Typography>
                                    <Typography variant="subtitle1" className="itemTitle">
                                        {user?.company_details?.name}
                                    </Typography>

                                </Box>
                            </ListItem>
                        </List>
                    )
                })
                : null}
        </Container >
    )
}

export default SelectParcelUserScreenPage;
