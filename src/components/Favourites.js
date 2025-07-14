import { Box, List, Typography, ListItem, useTheme } from '@mui/material'
import React from 'react'
import { FAVOURITE_ICON } from '../assets/constants/Icons'
import { useTranslation } from 'react-i18next';

const Favourites = ({isMaxHeightShouldShrink}) => {
  const { t } = useTranslation();
  const theme = useTheme()
  const colorScheme = theme.palette.mode

  const favourites = [
    {
      "id": 4,
      "name": "Durolt UAT",
      "location": "Dev Test",
      "locker_bank_status": "inactive"
    },
    {
      "id": 5,
      "name": "Chetan Test",
      "location": "Dev Test",
      "locker_bank_status": "inactive"
    },
    {
      "id": 6,
      "name": "Durolt UAT",
      "location": "Dev Test",
      "locker_bank_status": "inactive"
    },
    {
      "id": 7,
      "name": "Chetan Test",
      "location": "Dev Test",
      "locker_bank_status": "inactive"
    },
    {
      "id": 7,
      "name": "Chetan Test",
      "location": "Dev Test",
      "locker_bank_status": "inactive"
    },
    {
      "id": 7,
      "name": "Chetan Test",
      "location": "Dev Test",
      "locker_bank_status": "inactive"
    },
    {
      "id": 6,
      "name": "Durolt UAT",
      "location": "Dev Test",
      "locker_bank_status": "inactive"
    },
    {
      "id": 7,
      "name": "Chetan Test",
      "location": "Dev Test",
      "locker_bank_status": "inactive"
    },
    {
      "id": 7,
      "name": "Chetan Test",
      "location": "Dev Test",
      "locker_bank_status": "inactive"
    },
    {
      "id": 7,
      "name": "Chetan Test",
      "location": "Dev Test",
      "locker_bank_status": "inactive"
    }
  ]


  return (
    <Box className={`favourites ${isMaxHeightShouldShrink && 'fav-max-height'}`}>
      {favourites !== undefined && favourites.length > 0 ? (
        favourites.map((ele, index) => (
          <List key={index} >
            <ListItem
              className="listItem"
              onClick={() => {}}
            >
              <Box className="initial-view">
                <Typography variant="h6" className="initial-text">
                  {ele?.name.substring(0, 1)}
                </Typography>
              </Box>
              <Typography variant="h6" className='bank-name'>
                {ele?.name}
              </Typography>

              <Box className="favourite-view" onClick={() => {}}>
                <FAVOURITE_ICON />
              </Box>
            </ListItem>
          </List>
        ))
      ) : (
        <Typography className={`noFavoritesText ${colorScheme == 'dark' ? 'dark-no-fav-text' : ""} `}>{t('noFavouritesBanks')}</Typography>
      )}
    </Box>
  )
}

export default Favourites