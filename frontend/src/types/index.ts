export interface Farmer {
  id: string;
  name: string;
  phone: string;
  district: string;
  subCounty?: string;
  crop: string;
  language: 'english' | 'luganda' | 'runyankole' | 'ateso' | 'acholi';
  status: 'active' | 'inactive';
}

export interface CropData {
  id: number;
  farmerId: string;
  farmerName: string;
  location: string;
  crop: string;
  ndviValue: number;
  soilMoisture: number;
  healthStatus: 'Excellent' | 'Healthy' | 'At Risk' | 'Poor';
  riskLevel: 'Low' | 'Medium' | 'High';
  lastUpdated: string;
  recommendations: string[];
  area: string;
}

export type FormField = 'name' | 'phone' | 'district' | 'subCounty' | 'crop' | 'language';

export interface FormData {
  name: string;
  phone: string;
  district: string;
  subCounty: string;
  crop: string;
  language: Farmer['language'];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
} 