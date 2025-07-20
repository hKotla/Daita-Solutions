import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`Response received:`, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Company data
  async getCompany() {
    try {
      const response = await api.get('/company');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch company information');
    }
  },

  // Services data
  async getServices() {
    try {
      const response = await api.get('/services');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch services');
    }
  },

  // Team data
  async getTeam() {
    try {
      const response = await api.get('/team');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch team information');
    }
  },

  // Testimonials data
  async getTestimonials() {
    try {
      const response = await api.get('/testimonials');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch testimonials');
    }
  },

  // Case studies data
  async getCaseStudies() {
    try {
      const response = await api.get('/case-studies');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch case studies');
    }
  },

  // Contact data
  async getContact() {
    try {
      const response = await api.get('/contact');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch contact information');
    }
  },

  // Submit contact message
  async submitContactMessage(messageData) {
    try {
      const response = await api.post('/contact/message', messageData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.detail || 'Failed to submit message');
      }
      throw new Error('Failed to submit message');
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw new Error('Backend service unavailable');
    }
  }
};

export default apiService;