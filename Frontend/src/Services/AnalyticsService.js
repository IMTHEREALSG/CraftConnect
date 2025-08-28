import axios from "axios";
import { getAuthToken } from "./AuthService";

const API_URL = "https://craftconnect-skp2.onrender.com/api";

// Get analytics summary for professional dashboard
export const getProfessionalAnalyticsSummary = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.get(`${API_URL}/analytics/professional/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching analytics summary:", error);
    // Return mock data for development/demo purposes
    return {
      totalBookings: {
        count: 124,
        change: 12,
      },
      revenue: {
        amount: 3240,
        change: 8,
      },
      rating: {
        average: 4.8,
        change: 0.2,
      },
      responseRate: {
        rate: 95,
        change: 3,
      },
      recentBookings: [
        { month: 'Jan', count: 10 },
        { month: 'Feb', count: 15 },
        { month: 'Mar', count: 8 },
        { month: 'Apr', count: 12 },
        { month: 'May', count: 18 },
        { month: 'Jun', count: 14 },
      ],
      revenueData: [
        { month: 'Jan', amount: 1200 },
        { month: 'Feb', amount: 1800 },
        { month: 'Mar', count: 900 },
        { month: 'Apr', amount: 1500 },
        { month: 'May', amount: 2100 },
        { month: 'Jun', amount: 1700 },
      ],
      recentActivity: [
        { time: '2 hours ago', event: 'New booking received from John Doe' },
        { time: '4 hours ago', event: 'Completed service for Sarah Smith' },
        { time: '1 day ago', event: 'Received 5-star rating from Mike Johnson' },
        { time: '2 days ago', event: 'Updated service pricing' },
      ]
    };
  }
};

// Get booking trends data for professional
export const getBookingTrends = async (period = 'monthly') => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.get(`${API_URL}/analytics/professional/bookings`, {
      params: { period },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching booking trends:", error);
    // Return mock data for development/demo purposes
    return [
      { month: 'Jan', count: 10 },
      { month: 'Feb', count: 15 },
      { month: 'Mar', count: 8 },
      { month: 'Apr', count: 12 },
      { month: 'May', count: 18 },
      { month: 'Jun', count: 14 },
    ];
  }
};

// Get revenue analysis data for professional
export const getRevenueAnalysis = async (period = 'monthly') => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axios.get(`${API_URL}/analytics/professional/revenue`, {
      params: { period },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching revenue analysis:", error);
    // Return mock data for development/demo purposes
    return [
      { month: 'Jan', amount: 1200 },
      { month: 'Feb', amount: 1800 },
      { month: 'Mar', amount: 900 },
      { month: 'Apr', amount: 1500 },
      { month: 'May', amount: 2100 },
      { month: 'Jun', amount: 1700 },
    ];
  }
};