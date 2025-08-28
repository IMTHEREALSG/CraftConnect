import axios from "axios";
import { getAuthToken } from "./AuthService";

const API_URL = "https://craftconnect-skp2.onrender.com/api/bookings";

// Get user bookings (for customer or professional)
export const getUserBookings = async (userType) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.get(`${API_URL}/user/${userType}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Get booking details by ID
export const getBookingById = async (bookingId) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.get(`${API_URL}/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.post(`${API_URL}/create`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.put(
      `${API_URL}/${bookingId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

// Send OTP for work completion verification (called by professional)
export const sendWorkCompletionOTP = async (bookingId) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.post(
      `${API_URL}/send-completion-otp`,
      { bookingId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending completion OTP:", error);
    // Extract more detailed error information from the response if available
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message || error.response.data.error || "Unknown server error";
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Mark booking as done with OTP verification (called by professional)
export const markBookingAsDone = async (bookingId, otp) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.post(
      `${API_URL}/mark-done`,
      { bookingId, otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error marking booking as done:", error);
    throw error;
  }
};

// Submit a review for a completed booking (called by customer)
export const submitReview = async (bookingId, rating, comment) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.post(
      `${API_URL}/submit-review`,
      { bookingId, rating, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};
