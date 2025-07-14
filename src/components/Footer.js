import React from "react";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import Select from "react-select";
import {DEFAULT_LANGUAGE_ENGLISH, LANGUAGE_OPTIONS} from "../assets/constants/LanguageOptions";
import { Container,Box,Typography, useTheme } from "@mui/material";

const defaultLanguage = DEFAULT_LANGUAGE_ENGLISH;

const Footer = () => {
    const { t } = useTranslation()
    const theme = useTheme();

    if (!global.selectedLanguage) {
        const previouslySelectedLanguage = JSON.parse(localStorage.getItem("selectedLanguage"));
        global.selectedLanguage = previouslySelectedLanguage ? previouslySelectedLanguage : defaultLanguage;
        localStorage.setItem("selectedLanguage", JSON.stringify(global.selectedLanguage));
        i18n.changeLanguage(global.selectedLanguage.value);
    }
        return (
            <Container className="footer-style">
                <Box className="footer">
                    <Box className="language-selector-dropdown-container">
                        <Typography className="title language-selector-dropdown-title">{t('select_language')}</Typography>
                            <Select
                                className="react-select language-selector"
                                classNamePrefix="language-selector"
                                isSearchable={false}
                                menuPlacement="top"
                                tabIndex={-1}
                                isRtl={false}
                                isDisabled={false}
                                value={global.selectedLanguage}
                                onChange={(event) => {
                                    localStorage.setItem("selectedLanguage", JSON.stringify(event));
                                    global.selectedLanguage = event;
                                    i18n.changeLanguage(event.value);
                                }}
                            styles={{
                               control: provided => ({ ...provided, backgroundColor: theme.palette.background.default, color: theme.palette.text.primary}), menu: provided => ({ ...provided, backgroundColor: theme.palette.background.default, color: theme.palette.text.primary})}}
                                options={LANGUAGE_OPTIONS}
                            />
                    </Box>
                </Box>
            </Container>
        );
}

export default Footer;