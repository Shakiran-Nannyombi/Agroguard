import { ApiResponse, ApiError, Farmer, CropData } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || 'An error occurred');
  }
  return response.json();
};

export const api = {
  farmers: {
    register: async (farmerData: Omit<Farmer, 'id' | 'status'>): Promise<ApiResponse<Farmer>> => {
      const response = await fetch(`${API_BASE_URL}/farmers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(farmerData),
      });
      return handleResponse<Farmer>(response);
    },

    getAll: async (): Promise<ApiResponse<Farmer[]>> => {
      const response = await fetch(`${API_BASE_URL}/farmers`);
      return handleResponse<Farmer[]>(response);
    },

    getById: async (id: string): Promise<ApiResponse<Farmer>> => {
      const response = await fetch(`${API_BASE_URL}/farmers/${id}`);
      return handleResponse<Farmer>(response);
    },
  },

  crops: {
    getMonitoringData: async (): Promise<ApiResponse<CropData[]>> => {
      const response = await fetch(`${API_BASE_URL}/crops/monitoring`);
      return handleResponse<CropData[]>(response);
    },

    getFarmerCrops: async (farmerId: string): Promise<ApiResponse<CropData[]>> => {
      const response = await fetch(`${API_BASE_URL}/crops/farmer/${farmerId}`);
      return handleResponse<CropData[]>(response);
    },
  },
}; 