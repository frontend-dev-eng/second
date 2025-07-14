import React, {useState} from 'react';
import {Box, Grid, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {PDFDownloadLink, Document, Page, Text, Image, View, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import {BUTTON_SECONDARY} from '../assets/constants/Constants';
import ButtonComponent from '../components/ButtonComponent';

const InvoicePage = () => {
    const {t} = useTranslation();
    const transcactionNumber = 'XXXXXXXXXXXXXXXXXX';
    const rentedItem = 'Playstation 5';
    const rentalStartDateAndTime = '17th September 2024, 10.00 AM';
    const rentalEndDateAndTime = '17th September 2024, 06.00 PM';
    const totalRentalTime = '6 hours';
    const totalRentalCharge = 'AED 35.00';

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            fontSize: '12pt'
        },
        invoiceDetails: {
            borderWidth: '1pt',
            borderStyle: 'solid',
            borderColor: '#D3D3D3',
            borderRadius: '8pt',
            marginVertical: '24pt',
            display: 'flex',
            alignItems: 'center'
        },
        invoiceDetailsSection: {
            width: '448pt',
            padding: '24pt',
            borderBottomWidth: '1pt',
            borderBottomStyle: 'solid',
            borderBottomColor: '#D3D3D3',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        section2InfoRow: {
            marginBottom: '12pt',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        section2LeftItem: {
            width: '200pt',
            paddingLeft: '40pt',
        },
        section2RightItem: {
            minWidth: '200pt',
        },
        appLogo: {
            width: '48pt',
            marginBottom: '24pt'
        },
        thankYouHeading: {
            marginBottom: '8pt',
            fontSize: '24pt',
            fontWeight: 'bold'
        }
    });

    const InvoicePdf = () => (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.invoiceDetails}>
                    <View style={styles.invoiceDetailsSection}>
                        <Image style={styles.appLogo} src={t('appHeaderLogo')} />
                        <Text>HOMI Technologies</Text>
                        <Text>TRN Number: {transcactionNumber}</Text>
                        <Text>Email: support@homitech.com</Text>
                    </View>
                    <View style={styles.invoiceDetailsSection}>
                        <View style={styles.section2InfoRow}>
                            <Text style={styles.section2LeftItem}>Rented Item</Text>
                            <Text style={styles.section2RightItem}>{rentedItem}</Text>
                        </View>
                        <View style={styles.section2InfoRow}>
                            <Text style={styles.section2LeftItem}>Start Date & Time</Text>
                            <Text style={styles.section2RightItem}>{rentalStartDateAndTime}</Text>
                        </View>
                        <View style={styles.section2InfoRow}>
                            <Text style={styles.section2LeftItem}>End Date & Time</Text>
                            <Text style={styles.section2RightItem}>{rentalEndDateAndTime}</Text>
                        </View>
                        <View style={styles.section2InfoRow}>
                            <Text style={styles.section2LeftItem}>Total Time Used</Text>
                            <Text style={styles.section2RightItem}>{totalRentalTime}</Text>
                        </View>
                        <View style={[styles.section2InfoRow, {marginBottom: 0}]}>
                            <Text style={styles.section2LeftItem}>Total Rental Charge</Text>
                            <Text style={styles.section2RightItem}>{totalRentalCharge}</Text>
                        </View>
                    </View>
                    <View style={styles.invoiceDetailsSection}></View>
                    <View style={styles.invoiceDetailsSection}>
                        <Text style={styles.thankYouHeading}>Thank you</Text>
                        <Text>HOMI Technologies</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );

    return (
        <Box className='invoice-page'>
            <Box className='main-container'>
                <Box className='main'>
                    <Typography className='invoice-details-heading'>Invoice Details</Typography>
                    <Typography className='invoice-details-text'>Below is the invoice for your recent transaction</Typography>
                    <Box className='invoice-details'>
                        <Box className='invoice-details-section section-1'>
                            <img className='app-logo' src={t('appHeaderLogo')} alt='Homi Logo' />
                            <Typography className=''>HOMI Technologies</Typography>
                            <Typography className=''>TRN Number: {transcactionNumber}</Typography>
                            <Typography className=''>Email: support@homitech.com</Typography>
                        </Box>
                        <Box className='invoice-details-section section-2'>
                            <Grid container className='invoice-details-grid-container'>
                                <Grid item xs={5} className='grid-item left'>Rented Item</Grid>
                                <Grid item xs={7} className='grid-item right'>{rentedItem}</Grid>
                                <Grid item xs={5} className='grid-item left'>Start Date & Time</Grid>
                                <Grid item xs={7} className='grid-item right'>{rentalStartDateAndTime}</Grid>
                                <Grid item xs={5} className='grid-item left'>End Date & Time</Grid>
                                <Grid item xs={7} className='grid-item right'>{rentalEndDateAndTime}</Grid>
                                <Grid item xs={5} className='grid-item left'>Total Time Used</Grid>
                                <Grid item xs={7} className='grid-item right'>{totalRentalTime}</Grid>
                                <Grid item xs={5} className='grid-item left'>Total Rental Charge</Grid>
                                <Grid item xs={7} className='grid-item right'>{totalRentalCharge}</Grid>
                            </Grid>
                        </Box>
                        <Box className='invoice-details-section section-3'>
                            <Box className='social-media-icon'></Box>
                            <Box className='social-media-icon'></Box>
                            <Box className='social-media-icon'></Box>
                        </Box>
                        <Box className='invoice-details-section section-4'>
                            <Typography className='thank-you-heading'>Thank you</Typography>
                            <Typography className='company-name'>HOMI Technologies</Typography>
                        </Box>
                    </Box>
                    <PDFViewer><InvoicePdf /></PDFViewer>
                    <Box className='buttons-container'>
                        <ButtonComponent buttonId='download-invoice-button' handleClick={() => console.log('download invoice button clicked')} title={t('Download Invoice')} type={BUTTON_SECONDARY} />
                        <ButtonComponent buttonId='go-to-homepage-button' handleClick={() => console.log('go to homepage button clicked')} title={t('goToHomeBtnText')} type={BUTTON_SECONDARY} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default InvoicePage;