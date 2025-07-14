import { Box, Container, List, ListItem, Typography, useTheme} from '@mui/material'
import React from 'react'
import { ZONE_ICON } from '../assets/constants/Icons'

const SelectZone = (props) => {

    const rootLocations = [
        {
            "id": 2,
            "name": "Dev Test",
            "level": 0
        }
    ]

  const navigateToSubLocations = () => {
    try {
      props.history.push({pathname : "/sublocation-one"});
    } catch (error) {
      console.error("SelectZone.js - navigateToSubLocations",error)
    }
  }

  return (

    <Container className="select-zone" maxWidth="xs">
    <Box className="main-container">
      <Box>
        {rootLocations !== undefined && rootLocations.length > 0 ? (
          rootLocations.map((root, index) => (
            <List key={index}>
              <ListItem
                className="listItem"
                onClick={navigateToSubLocations}
              >
                <ZONE_ICON />
                <Typography variant="h6" className="itemTitle">
                  {root?.name}
                </Typography>
              </ListItem>
            </List>
          ))
        ) : (
          <></>
        )}
      </Box>
    </Box>
  </Container>
  )
}

export default SelectZone
