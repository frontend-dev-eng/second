import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { ZONE_ICON } from '../assets/constants/Icons'

const SubLocationOnePage = (props) => {

const sublocations = [
    {
        "id": 2,
        "name": "14th Floor",
        "level": 1
    },
    {
        "id": 17,
        "name": "15th Floor",
        "level": 1
    },
    {
        "id": 20,
        "name": "16th Floor",
        "level": 1
    }
]

const navigateToSubLocations = () => {
    try {
      props.history.push({pathname : "/sublocation-two"});
    } catch (error) {
      console.error("SubLocationOnePage.js - navigateToSubLocations",error)
    }
  }

    return (
        <Container className="sublocation-one-page" maxWidth="xs">
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

export default SubLocationOnePage
