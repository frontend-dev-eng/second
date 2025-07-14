import { Box, Container, List, ListItem, Typography, useTheme } from '@mui/material'
import React from 'react'
import { ZONE_ICON } from '../assets/constants/Icons'

const SubLocationTwoPage = (props) => {
    const theme = useTheme();

const sublocations = [
    {
        "id": 7,
        "name": "Test Zone",
        "level": 2
    },
    {
        "id": 3,
        "name": "Zone 01",
        "level": 2
    },
    {
        "id": 4,
        "name": "Zone 02",
        "level": 2
    }
]

const navigateToSubLocations = () => {
    try {
      props.history.push({pathname : "/sublocation-three"});
    } catch (error) {
      console.error("SubLocationTwoPage.js - navigateToSubLocations",error)
    }
  }

  return (
    <Container className="sublocation-two-page" maxWidth="xs">
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

export default SubLocationTwoPage
