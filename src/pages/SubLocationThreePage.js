import { Box, Container, List, ListItem,Typography } from '@mui/material'
import React from 'react'
import { ZONE_ICON } from '../assets/constants/Icons'

const SubLocationThreePage = (props) => {

    const sublocations = [
        {
            "id": 2,
            "name": "14th Floor A",
            "level": 1
        },
        {
            "id": 17,
            "name": "15th Floor B",
            "level": 1
        },
        {
            "id": 20,
            "name": "16th Floor C",
            "level": 1
        }
    ]

    const navigateToSubLocations = () => {
        try {
          props.history.push({pathname : "/select-locker-bank"});
        } catch (error) {
          console.error("SubLocationThreePage.js - navigateToSubLocations",error)
        }
      }


  return (
    <Container className="sublocation-three-page" maxWidth="xs">
            <Box className="main-container">
                <Box>
                    {sublocations !== undefined && sublocations.length > 0 ? (
                        sublocations.map((root, index) => (
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

export default SubLocationThreePage
