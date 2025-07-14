import CryptoJS from 'crypto-js';

const VerifyRazorpaySignature = (paymentGatewayResponse,razorpaySecretkey) => {
    
  const verifySignature = (razorpay_order_id, razorpay_payment_id, razorpay_signature, secret) => {
    const generatedSignature = CryptoJS.HmacSHA256(
      `${razorpay_order_id}|${razorpay_payment_id}`,
      secret
    ).toString(CryptoJS.enc.Hex);

    return generatedSignature === razorpay_signature;
  };

  const isVerified = verifySignature(
    paymentGatewayResponse.razorpay_order_id,
    paymentGatewayResponse.razorpay_payment_id,
    paymentGatewayResponse.razorpay_signature,
    razorpaySecretkey
  );

  return isVerified;
};

export default VerifyRazorpaySignature;