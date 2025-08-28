import axios from "axios";
import { getAuthToken } from "./AuthService";

const API_URL = "https://craftconnect-skp2.onrender.com/api";

// Get all reviews submitted by the customer
export const getCustomerReviews = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.get(`${API_URL}/reviews/customer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.reviews;
  } catch (error) {
    console.error("Error fetching customer reviews:", error);
    throw error;
  }
};

// Get a specific review by ID
export const getReviewById = async (reviewId) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.get(`${API_URL}/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.review;
  } catch (error) {
    console.error("Error fetching review details:", error);
    throw error;
  }
};