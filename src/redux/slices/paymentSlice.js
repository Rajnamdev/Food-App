import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentLoading: false,
  paymentError: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    payNowRequest: (state) => {
      state.paymentLoading = true;
      state.paymentError = null;
    },
    payNowSuccess: (state) => {
      state.paymentLoading = false;
    },
    payNowFailure: (state, action) => {
      state.paymentLoading = false;
      state.paymentError = action.payload;
    },
  },
});

export const { payNowRequest, payNowSuccess, payNowFailure } = paymentSlice.actions;

export default paymentSlice.reducer;
