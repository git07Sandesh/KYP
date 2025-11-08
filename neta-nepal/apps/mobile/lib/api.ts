import axios from 'axios';

// Configuration for API calls
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Methods
export const candidatesAPI = {
  getAll: (params?: { page?: number; limit?: number; sortBy?: string; order?: string; partyId?: string }) => 
    api.get('/candidates', { params }),
  
  getById: (id: string) => 
    api.get(`/candidates/${id}`),
  
  getPromises: (id: string) => 
    api.get(`/candidates/${id}/promises`),
  
  getWorks: (id: string) => 
    api.get(`/candidates/${id}/works`),
  
  getCases: (id: string) => 
    api.get(`/candidates/${id}/cases`),
};

export const searchAPI = {
  search: (query: string, type: 'candidates' | 'parties' | 'constituencies' = 'candidates') =>
    api.get('/search', { params: { q: query, type } }),
};

export const rankingsAPI = {
  getRankings: (category: 'TOP_IMPACT' | 'CLEANEST_RECORDS' | 'HIGHEST_FULFILLMENT' | 'MOST_POPULAR') =>
    api.get('/rankings', { params: { category } }),
};

export const partiesAPI = {
  getAll: () => api.get('/parties'),
};

export const compareAPI = {
  compare: (ids: string[]) => 
    api.post('/compare', { candidateIds: ids }),
};

export default api;
