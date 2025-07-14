import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { RADIO_CHECKED_ICON, RADIO_UNCHECKED_ICON } from '../assets/constants/Icons'

const LockerItem = (props) => {
  const { locker, selectSlider, onPress } = props
  return (
    <List key={locker} className='locker-list'>
      <ListItem className='locker-content' onClick={onPress}>
        <ListItemText className='locker-number' primary={`Locker ${locker}`} />
        {selectSlider ? (
          <RADIO_CHECKED_ICON />
        ) : (
          <RADIO_UNCHECKED_ICON />
        )}
      </ListItem>
    </List>
  )
}

export default LockerItem
