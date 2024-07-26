import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { payNowRequest, payNowSuccess, payNowFailure } from './paymentSlice';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const paymentLoading = useSelector(state => state.payment.paymentLoading);
  const paymentError = useSelector(state => state.payment.paymentError);

  const handlePayment = () => {
    // Dispatch action to start payment request
    dispatch(payNowRequest());

    // Simulate payment process
    setTimeout(() => {
      // Simulated success
      dispatch(payNowSuccess());
    }, 2000);
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={handlePayment} disabled={paymentLoading}>
        {paymentLoading ? 'Processing...' : 'Pay Now'}
      </button>
      {paymentError && <p>Error: {paymentError}</p>}
    </div>
  );
};

export default PaymentPage;
