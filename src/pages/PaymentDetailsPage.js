import React, {useState, useEffect, useRef} from "react";
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Box} from '@mui/material';
import {SUCCESS, RAZORPAY_PAYMENT_GATEWAY_SOURCE, RAZORPAY_LANGUAGE_MAP, TOAST_ERROR, TOAST_INFO, TOAST_WARN} from "../assets/constants/Constants";
import {PAYMENT_GATEWAY, SUCCESS_PAGE, CANCEL_OR_ERROR_PAGE} from '../assets/constants/PageList';
import {LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK, SESSION_STORAGE, SS_PAYMENT_GATEWAY, SS_PAYMENT_GATEWAY_ACCESS_KEY} from '../assets/constants/BrowserStorageKeys';
import {getSecureItemFromSpecificStorage, removeSecureItemFromSpecificStorage} from '../lib/BrowserStorageAccessMiddleware';
import {cancelDropOffTransaction} from '../api/api';
import {postPaymentSaveTransaction} from "../lib/BackendUtils";
import CircularProgressLoader from "../components/CircularProgressLoader";
import VerifyRazorpaySignature from "../components/VerifyRazorpaySignature";
import ShowToast from "../components/ToastComponent";
import { getPathForNextPage, retrieveISOCodeOfPreviouslySelectedLanguageFromLocalStorage } from "../lib/Utils";

const PaymentDetailsPage = () => {
    const history = useHistory();
    const {t} = useTranslation();
    const isPaymentGatewayInvoked = useRef(false);
    const domain = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_DOMAIN_AND_LOCKER_BANK)?.domain;
    const paymentGatewaySource = getSecureItemFromSpecificStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY);
    const paymentGatewayAccessKey = getSecureItemFromSpecificStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY_ACCESS_KEY);
    //removeSecureItemFromSpecificStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY);
    //removeSecureItemFromSpecificStorage(SESSION_STORAGE, SS_PAYMENT_GATEWAY_ACCESS_KEY);

    if ( (!isPaymentGatewayInvoked.current) && ((!paymentGatewaySource) || (!paymentGatewayAccessKey)) ) {
        history.replace({
            pathname: getPathForNextPage(PAYMENT_GATEWAY, CANCEL_OR_ERROR_PAGE)
        });
    }

    const lockerUnitDetails = history.location.state?.lockerUnitDetails;
    const lockerData = history.location.state?.lockerData;
    const isLockerReservedTillSuccessfulPayment = history.location.state?.isLockerReservedTillSuccessfulPayment;
    const isOverstayPayment = history.location.state?.isOverstayPayment;
    const selectedBookingSlotForOverstayPayment = history.location.state?.selectedBookingSlotForOverstayPayment;
    const hasPendingLockers = history.location.state?.hasPendingLockers;
    const currentReferenceId = history.location.state?.currentReferenceId;
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    const razorpayPaymentDetails = {};

    if (paymentGatewaySource === 'razorpay') {
        razorpayPaymentDetails.keyId = lockerData.assignment.payment_gateway[0].key_id;
        razorpayPaymentDetails.keySecret = lockerData.assignment.payment_gateway[0].key_secret;
        razorpayPaymentDetails.amount = lockerData.payment_records[0].amount;
        razorpayPaymentDetails.currency = lockerData.assignment.payment_gateway[0].currency;
        razorpayPaymentDetails.name = lockerData.assignment.payment_gateway[0].business_name;
        razorpayPaymentDetails.description = 'Razorpay transaction';
        razorpayPaymentDetails.image = lockerData.assignment.payment_gateway[0].payment_image;
        razorpayPaymentDetails.orderId = paymentGatewayAccessKey;
        razorpayPaymentDetails.prefill = {
            email: lockerData.user.email ? lockerData.user.email : '',
            contact: lockerData.user.mobile_number ? lockerData.user.mobile_number : ''
        };
        razorpayPaymentDetails.notes = {
            tenant: domain,
            lockerBankName: lockerData.locker_bank.name,
            lockerBankLocation: lockerData.locker_bank.location.name,
            paymentPlatform: 'PWA'
        };
        razorpayPaymentDetails.theme = {
            color: lockerData.assignment.payment_gateway[0].theme_color
        };
        razorpayPaymentDetails.config = {
            display: {
                language: RAZORPAY_LANGUAGE_MAP[retrieveISOCodeOfPreviouslySelectedLanguageFromLocalStorage()]
            }
        };
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.onPaymentGatewayResponse = (paymentGatewayResponse) => onPaymentGatewayResponse(paymentGatewayResponse);
        window.onPaymentGatewayClose = onPaymentGatewayClose;

        if ( !isPaymentGatewayInvoked.current ) {
            isPaymentGatewayInvoked.current = true;
            constructAndAppendPaymentGatewayScriptElement();
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            delete window.onPaymentGatewayResponse;
            delete window.onPaymentGatewayClose;
        };
    }, []);

    const handleBeforeUnload = (e) => {
        const message = t('warning_msg_do_not_reload_or_close_tab');
        e.returnValue = message;
        return message;
    };

    const constructAndAppendPaymentGatewayScriptElement = () => {
        const paymentGatewayContainerElement = document.getElementById('payment-gateway-container');
        const paymentGatewayScriptElement = document.createElement("script");
        paymentGatewayScriptElement.id = 'payment-gateway';

        if (paymentGatewaySource === 'razorpay') {
            paymentGatewayScriptElement.src = RAZORPAY_PAYMENT_GATEWAY_SOURCE;
        }

        paymentGatewayContainerElement.appendChild(paymentGatewayScriptElement);
        paymentGatewayScriptElement.onload = () => {
            if (paymentGatewaySource === 'razorpay') {
                constructAndAppendRazorpayPaymentGatewayInvokerScriptElement();
            }
        }
    };

    const constructAndAppendRazorpayPaymentGatewayInvokerScriptElement = () => {
        const razorpayPaymentGatewayContainerElement = document.getElementById('payment-gateway-container');
        const razorpayPaymentGatewayInvokerScriptElement = document.createElement("script");
        razorpayPaymentGatewayInvokerScriptElement.id = 'payment-gateway-invoker';

        const partialTextContent1 = `var options = {
            "key": "${razorpayPaymentDetails.keyId}",
            "amount": "${razorpayPaymentDetails.amount}", // optional 
            "currency": "${razorpayPaymentDetails.currency}",
            "name": "${razorpayPaymentDetails.name}", // client specific
            "description": "${razorpayPaymentDetails.description}",
            "image": "${razorpayPaymentDetails.image}", //client specific
            "order_id": "${razorpayPaymentDetails.orderId}", //must
            "handler": function (response){
                window.onPaymentGatewayResponse(response);
            },
            "prefill": {
                "email": "${razorpayPaymentDetails.prefill.email}", 
                "contact": "${razorpayPaymentDetails.prefill.contact}",
            },
            "notes": {
                "tenant": "${razorpayPaymentDetails.notes.tenant}",
                "lockerBankName": "${razorpayPaymentDetails.notes.lockerBankName}",
                "lockerBankLocation": "${razorpayPaymentDetails.notes.lockerBankLocation}",
                "paymentPlatform": "${razorpayPaymentDetails.notes.paymentPlatform}"
            },
            "theme": {
                "color": "${razorpayPaymentDetails.theme.color}",
            },
            "config": {
                "display": {
                    "language": "${razorpayPaymentDetails.config.display.language}"
                }
            },
            "timeout": "360",
            "method": {
                "netbanking": true,
                "card": true,
                "upi": true,
                "wallet": false,
                "emi": false,
                "paylater": false,
            },
            "modal": {
                "ondismiss": function(){
                    window.onPaymentGatewayClose();
                },
            }
        };`;
        const partialTextContent2 = `var rzp1 = new Razorpay(options);`;
        const partialTextContent3 = `rzp1.on('payment.failed', function (response){
            window.onPaymentGatewayResponse(response);
        });`;
        const partialTextContent4 = `rzp1.open();`; 
        razorpayPaymentGatewayInvokerScriptElement.textContent = partialTextContent1 + partialTextContent2 + partialTextContent3 + partialTextContent4;

        razorpayPaymentGatewayContainerElement.appendChild(razorpayPaymentGatewayInvokerScriptElement);
    };

    const onPaymentGatewayClose = () => {
        if (isLockerReservedTillSuccessfulPayment) {
            cancelTransactionAndReleasePreviouslyReservedLocker();
        }
        else {
            ShowToast(t('info_msg_payment_cancelled_by_user'), TOAST_ERROR);
            history.replace(getPathForNextPage(PAYMENT_GATEWAY, CANCEL_OR_ERROR_PAGE));
        }
    };

    const onPaymentGatewayResponse = (paymentGatewayResponse) => {
        if (paymentGatewayResponse) {
            if (paymentGatewaySource === 'razorpay') {
                savePostPaymentTransactionDetailsAfterRazorpayPaymentGatewayResponse(paymentGatewayResponse);
            } 
        }
    };

    const savePostPaymentTransactionDetailsAfterRazorpayPaymentGatewayResponse = async (paymentGatewayResponse) => {
        if (paymentGatewayResponse.error) {
            const error = paymentGatewayResponse.error;
            console.error("Payment Error:", error);
            return;
        }

        document.getElementById("payment-gateway-invoker").remove();

        const verifyPaymentGatewayResponse = VerifyRazorpaySignature(paymentGatewayResponse, razorpayPaymentDetails.keySecret);
        if (verifyPaymentGatewayResponse) {
            const body = {
                payment_reference_id : currentReferenceId,
                payment_id : paymentGatewayResponse.razorpay_payment_id,
                order_id : paymentGatewayResponse.razorpay_order_id,
                payment_signature : paymentGatewayResponse.razorpay_signature
            };

            if (isOverstayPayment) {
                body.door_size_payment_slab = selectedBookingSlotForOverstayPayment.id;
            }

            let response = await postPaymentSaveTransaction(body);

            if (response?.status === SUCCESS) {
                history.replace({
                    pathname: getPathForNextPage(PAYMENT_GATEWAY, SUCCESS_PAGE),
                    state: {
                        lockerUnitDetails,
                        locker_bank_details: lockerData?.locker_bank,
                        is_already_opened_once: lockerData?.is_already_opened_once,
                        locker_unit_details: lockerData?.locker_door,
                        clientRef : lockerData?.client_ref,
                        hasPendingLockers,
                        pickupUserDetails: lockerData?.user,
                        assignTime: lockerData?.assigned_date,
                        status: lockerData?.status,
                        headerTitle: t('pickupParcel'),
                        ref_id: lockerData?.ref_id
                    }
                })
            } else {
                ShowToast(t('error_msg_transaction_successful_but_unable_to_verify'), TOAST_INFO);
                history.replace(getPathForNextPage(PAYMENT_GATEWAY, CANCEL_OR_ERROR_PAGE));

            }
        } else {
            ShowToast(t('error_msg_transaction_failed_try_again'), TOAST_ERROR);
        }
    };

    const cancelTransactionAndReleasePreviouslyReservedLocker = async () => {
        setLoadingMessage('Cancelling transaction. Please wait.');
        setIsLoading(true);

        try {
            const cancelReservationResponse = await cancelDropOffTransaction(lockerUnitDetails.ref_id, 'Cancel luggage locker reservation: User cancelled payment.');

            if (cancelReservationResponse?.status === SUCCESS) {
                ShowToast('Reservation cancelled.', TOAST_WARN);

                history.replace({
                    pathname: getPathForNextPage(PAYMENT_GATEWAY, CANCEL_OR_ERROR_PAGE)
                });
            }
        } catch (error) {
            console.error('Error while cancelling reservation: ', error);

            history.replace({
                pathname: getPathForNextPage(PAYMENT_GATEWAY, CANCEL_OR_ERROR_PAGE)
            });
        }
        finally {
            setIsLoading(false);
            setLoadingMessage('');
        }

    };

    return (
        <Box className="payment-details-page">
            <Box className="main-container">
                {isLoading ? (
                    <Box className="main">
                        <CircularProgressLoader message={loadingMessage} />
                    </Box>
                ) : (
                    <Box className="main">
                        <Box id="payment-gateway-container"></Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default PaymentDetailsPage;