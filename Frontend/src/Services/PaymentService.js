import axios from "axios";
import { getAuthToken } from "./AuthService";

const API_URL = "https://craftconnect-skp2.onrender.com/api";

// Create a payment order for a booking
export const createPaymentOrder = async (bookingId, amount) => {
  try {
    const response = await axios.post(
      `${API_URL}/payments/create-order`,
      { bookingId, amount },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error creating payment order" };
  }
};

// Verify payment after Razorpay callback
export const verifyPayment = async (bookingId, paymentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/payments/verify`,
      {
        bookingId,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_signature: paymentData.razorpay_signature,
      },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error verifying payment" };
  }
};

// Request work completion verification (called by professional)
export const requestWorkCompletion = async (bookingId) => {
  try {
    const response = await axios.post(
      `${API_URL}/payments/request-completion`,
      { bookingId },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Error requesting work completion" }
    );
  }
};

// Verify OTP and release payment (called by customer)
export const verifyWorkCompletion = async (bookingId, otp) => {
  try {
    const response = await axios.post(
      `${API_URL}/payments/verify-completion`,
      { bookingId, otp },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Error verifying work completion" }
    );
  }
};

// Get payment details for a booking
export const getPaymentDetails = async (bookingId) => {
  try {
    const response = await axios.get(
      `${API_URL}/payments/details/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching payment details" };
  }
};

// Initiate payout to professional after work completion
export const initiatePayout = async (bookingId) => {
  try {
    const response = await axios.post(
      `${API_URL}/payments/initiate-payout`,
      { bookingId },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error initiating payout" };
  }
};
