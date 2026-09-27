import axios from 'axios';
import { config } from '@/config';

// Base axios instance for real API calls
export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Safe error handling — never expose backend errors to consumers directly
    const message =
      error.response?.status === 404
        ? 'Resource not found.'
        : error.response?.status >= 500
        ? 'A server error occurred. Please try again later.'
        : 'Unable to complete the request. Please try again.';
    return Promise.reject(new Error(message));
  }
);

// Utility to simulate API delay in mock mode (for realistic UX testing)
export function simulateDelay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const USE_MOCK = config.useMockData;
