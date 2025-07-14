import { Box, Container, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { PERSONAL_LOCKER } from "../assets/constants/Icons";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../components/ButtonComponent";

const OrganisationListPage = (props) => {
  const { t } = useTranslation();

  const organisations = [
    {
      id: 1,
      tenant: "sntsmartclient",
    },
    {
      id: 2,
      tenant: "marscoders",
    },
    {
      id: 3,
      tenant: "fonzel",
    },
    {
      id: 4,
      tenant: "durolt",
    },
  ];

  const handleClick = () => {
    try {
      props.history.push({pathname : "/new-reserve-locker"});
    } catch (error) {
      console.error("handleClick error: ", error);
    }
  };

  return (
    <Container className="organisation-list-page" maxWidth="xs">
      <Box className="box-container">
        <Box>
          {organisations !== undefined && organisations.length > 0 ? (
            organisations.map((org, index) => (
              <List key={index}>
                <ListItem
                  className="listItem"
                  onClick={() => console.log("clicked", org)}
                >
                  <PERSONAL_LOCKER />
                  <Typography variant="h6" className="itemTitle">
                    {org?.tenant}
                  </Typography>
                </ListItem>
              </List>
            ))
          ) : (
            <></>
          )}
        </Box>
        <ButtonComponent
          handleClick={handleClick}
          title={t("button_scan_qr")}
        />
      </Box>
    </Container>
  );
};

export default OrganisationListPage;
