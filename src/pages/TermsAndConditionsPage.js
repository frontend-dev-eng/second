import React from 'react';
import { Typography, Link, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TermsAndConditionsPage = () => {
    const { t } = useTranslation();
    return (
        <Box className="term-and-condition-page">
            <Box className='main-container'>
                <Box className='main'>
                    {t('termsAndConditionsContent') !== 'termsAndConditionsContent' ?
                    <Box dangerouslySetInnerHTML={{__html: t('termsAndConditionsContent')}}/> :
                    <>
                     <Box className="section">
                        <Typography variant="h5" className="title">
                            {t('terms_title_text')}
                        </Typography>
                        <Typography className="paraText">{t('welcome_text')}</Typography>
                        <Typography className="paraText">
                            {t('terms_para_one')}
                            <Link href={t('durolt_link')}>
                                {t('weblink_text')}
                            </Link>
                        </Typography>
                        <Typography className="paraText">{t('terms_para_two')}</Typography>
                        <Typography className="paraText">{t('terms_para_three')}</Typography>
                    </Box>
                    <Box className="section">
                        <Typography variant="h5" className="title">
                            {t('cookies_text')}
                        </Typography>
                        <Typography className="paraText">{t('cookies_para_one')}</Typography>
                        <Typography className="paraText">{t('cookies_para_two')}</Typography>
                    </Box>
                    <Box className="section">
                        <Typography variant="h5" className="title">
                            {t('license_text')}
                        </Typography>
                        <Typography className="paraText">{t('license_para_one')}</Typography>
                        <Typography className="paraText">
                            {t('must_not_text')}:
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('license_sub_point_one')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('license_sub_point_two')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('license_sub_point_three')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('license_sub_point_four')}
                        </Typography>
                        <Typography className="paraText">{t('license_para_two')}</Typography>
                        <Typography className="paraText">{t('license_para_three')}</Typography>
                        <Typography className="paraText">{t('license_para_four')}</Typography>
                        <Typography className="paraText">
                            {t('license_warrant_text')}:
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('warrant_subpoint_one')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('warrant_subpoint_two')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('warrant_subpoint_three')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('warrant_subpoint_four')}
                        </Typography>
                        <Typography className="paraText">{t('license_para_five')}</Typography>
                    </Box>
                    <Box className="section">
                        <Typography variant="h5" className="title">
                            {t('hyperlink_title')}
                        </Typography>
                        <Typography className="paraText">
                            {t('hyperlink_following_title')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('hyperlink_subpoint_one')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('hyperlink_subpoint_two')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('hyperlink_subpoint_three')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('hyperlink_subpoint_four')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('hyperlink_subpoint_five')}
                        </Typography>
                        <Typography className="paraText">{t('hyperlink_para_one')}</Typography>
                        <Typography className="paraText">{t('hyperlink_para_two')}</Typography>
                        <Typography className="paraText listItem">
                            - {t('org_type_subpoint_one')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('org_type_subpoint_two')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('org_type_subpoint_three')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('org_type_subpoint_four')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('org_type_subpoint_five')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('org_type_subpoint_six')}
                        </Typography>
                        <Typography className="paraText">{t('org_type_para_one')}</Typography>
                        <Typography className="paraText">{t('org_type_para_two')}</Typography>
                        <Typography className="paraText">{t('org_type_para_three')}</Typography>
                        <Typography className="paraText">{t('org_hyperlink_web_title')}</Typography>
                        <Typography className="paraText listItem">
                            - {t('hyperlink_web_subpoint_one')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('hyperlink_web_subpoint_two')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('hyperlinl_web_subpoint_three')}
                        </Typography>
                        <Typography className="paraText">{t('noUseWarning')}</Typography>
                    </Box>
                    <Box className="section">
                        <Typography variant="h5" className="title">
                            {t('iframeText')}
                        </Typography>
                        <Typography className="paraText">{t('iframeParaOne')}</Typography>
                    </Box>
                    <Box className="section">
                        <Typography variant="h5" className="title">
                            {t('contentLiabilityTitle')}
                        </Typography>
                        <Typography className="paraText">{t('contentLiabilityParaOne')}</Typography>
                    </Box>
                    <Box className="section">
                        <Typography variant="h5" className="title">
                            {t('privacyTitle')}
                        </Typography>
                        <Typography className="paraText">{t('privacyPara')}</Typography>
                    </Box>
                    <Box className="section">
                        <Typography variant="h5" className="title">
                            {t('reservationRightTitle')}
                        </Typography>
                        <Typography className="paraText">{t('reservationRightPara')}</Typography>
                    </Box>
                    <Box className="section">
                        <Typography variant="h5" className="title">
                            {t('linkRemovalTitle')}
                        </Typography>
                        <Typography className="paraText">{t('linkRemovalParaOne')}</Typography>
                        <Typography className="paraText">{t('linkRemovalParaTwo')}</Typography>
                    </Box>
                    <Box className="section">
                        <Typography variant="h5" className="title">
                            {t('disclaimerTitle')}
                        </Typography>
                        <Typography className="paraText">{t('disclaimerParaOne')}</Typography>
                        <Typography className="paraText listItem">
                            - {t('disclaimerSubpointOne')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('disclaimerSubPointTwo')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('disclaimerSubPointThree')}
                        </Typography>
                        <Typography className="paraText listItem">
                            - {t('disclaimerSubPointFour')}
                        </Typography>
                        <Typography className="paraText">{t('disclaimerParaTwo')}</Typography>
                        <Typography className="paraText">{t('disclaimerParaThree')}</Typography>
                    </Box>
                    </>}
                </Box>
            </Box>

        </Box>
    );
};

export default TermsAndConditionsPage;
