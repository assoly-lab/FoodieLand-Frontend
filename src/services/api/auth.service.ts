import { api } from '@/lib/axios';
import type {AuthResponse, SignInCredentials}  from '@/types/shared/Auth';

export const authService = {
  
  register: async (userData: FormData): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', userData);
    return data
  },
  
  signIn: async (credentials: SignInCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  signOut: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/refresh-token');
    return data;
  }
};
