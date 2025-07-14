import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Circle, NotificationsNoneRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const EquipmentCard = ({equipment,key, title, description, image, availability, notifyMeButtonHandler, isRentedByUser,elapsedTime,showNotifyMeButton }) => {
    const {t} = useTranslation();
    const isBlockedLocker = equipment?.locker_door?.is_blocked;

    return (
        <Card className={`equipment-card ${isBlockedLocker ? "equipment-item-blocked" : ""}`}>
            <CardContent className='card-content content-col-1'>
                <CardMedia 
                    component='img'
                    image={image}
                    alt='Product Image'
                    className='equipment-image'
                />
            </CardContent>
            <CardContent className='card-content content-col-2'>
                <Typography className='equipment-title'>{title}</Typography>
                <Typography className='equipment-description'>{description}</Typography>
                {isRentedByUser ? <Box className='timer-indicator-container'>
                    <Box className='timer-indicator'>
                        <Typography className='timer-text'>{t('timeElapsedLabel')} {elapsedTime}</Typography>
                    </Box>
                </Box> :
                    (availability ? (
                        <Box className='availability-indicator-container'>
                            <Box className='availability-indicator available'>
                                <Circle className='circle-icon' />
                                <Typography className='availability-text'>{t('availableBtnLabel')}</Typography>
                            </Box>
                        </Box>
                    ) : (
                        <Box className='availability-indicator-container'>
                            <Box className='availability-indicator not-available'>
                                <Circle className='circle-icon' />
                                <Typography className='availability-text'>{showNotifyMeButton ? t('notAvailableBtnLabel') : t('rented_by_me_btn_label')}</Typography>
                            </Box>
                            {showNotifyMeButton ? 
                            <Button
                                className='notify-me-button'
                                disableRipple={true}
                                startIcon={<NotificationsNoneRounded className='notification-icon' />}
                                onClick={notifyMeButtonHandler}
                            >{t('notifyMeBtnLabel')}</Button> : null}
                        </Box>
                    ))}
            </CardContent>
        </Card>
    );
};

export default EquipmentCard;