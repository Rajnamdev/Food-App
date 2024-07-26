import React from 'react';
import Razorpay from 'razorpay';
import { useFirebase } from './context/Firebase';


// const firebase = useFirebase()
const RazorpayButton = ({ amount, currency, name, description, onSuccess, onError }) => {
  const { putData } = useFirebase(); // Access the putData function from the FirebaseProvider

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_oRJqUKDmAoidKG', // Replace with your Razorpay API key
      amount: amount * 100, // Amount in paise (INR)
      currency: currency || 'INR',
      name: name || 'Dev TEAM',
      description: description || 'Purchase Description',
      handler: function(response) {
        if (onSuccess) {
          onSuccess(response);
          // Save payment data to Firebase after successful payment
          savePaymentData(response);
        }
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      notes: {
        // Optional notes
      },
      theme: {
        color: '#F37254', // Customize color
      },
      modal: {
        ondismiss: function() {
          if (onError) {
            onError(new Error('Payment cancelled by user'));
          }
        },
      },
    };
    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  // Function to save payment data to Firebase
  const savePaymentData = (response) => {
    const paymentData = {
      paymentId: response.razorpay_payment_id,
      orderId: response.razorpay_order_id,
      signature: response.razorpay_signature,
      amount: amount,
      currency: currency,
      timestamp: new Date().toISOString(),
    };
    // Put payment data to Firebase
    putData('payments/' + response.razorpay_payment_id, paymentData)
      .then(() => console.log('Payment data saved to Firebase'))
      .catch((error) => console.error('Error saving payment data:', error));
  };

  return (
    <button onClick={handlePayment}>Pay Now</button>
  );
};

export default RazorpayButton;
