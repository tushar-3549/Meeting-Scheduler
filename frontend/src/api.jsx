import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

// Signup a new user
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup/`, userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Login an existing user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Create a new meeting
export const createMeeting = async (meetingData) => {

  try {
    const response = await axios.post(
      `${API_URL}/create_meeting/`,
      meetingData,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating meeting:", error);
    throw error;
  }
};

// Add participant to a meeting
export const addParticipant = async (participantData) => {
  try {
    const response = await axios.post(
      `${API_URL}/add_participant/`,
      participantData,
    );
    return response.data;
  } catch (error) {
    console.error("Error adding participant:", error);
    throw error;
  }
};

// Bulk add participants from CSV
export const bulkAddParticipants = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/bulk_add_participants/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error bulk adding participants:", error);
    throw error;
  }
};

// Export meeting as ICS file

export const exportICS = async (meetingId) => {
  try {
    const response = await axios.get(`${API_URL}/export_ics/${meetingId}/`);
    return response.data.ics_file;
  } catch (error) {
    console.error("Error exporting ICS file:", error);
    throw error;
  }
};
