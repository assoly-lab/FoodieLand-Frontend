import axios from 'axios';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { store } from '@/store/store';

interface FailedRequestPromise {
  resolve: (value: InternalAxiosRequestConfig) => void; 
  reject: (reason?: AxiosError) => void; 
}

const baseURL = import.meta.env.VITE_API_URL;
export const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let failedRequestsQueue: Array<FailedRequestPromise> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedRequestsQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      // @ts-expect-error: We know 'token' is available when 'error' is null in this context
      prom.resolve(token);
    }
  });
  failedRequestsQueue = [];
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const { token } = state.auth;

    if (config.headers) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config!;
    if (status === 401 && !originalRequest.url?.includes('/auth/')) {
      if (isRefreshing) {
        return new Promise<InternalAxiosRequestConfig>((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        }).then(config => {
          config.headers.Authorization = originalRequest.headers.Authorization;
          return api(config);
        }).catch(err => {
          return Promise.reject(err);
        });
      }
      isRefreshing = true;
      return new Promise<AxiosResponse>((resolve, reject) => {
        const refreshAndRetry = async () => {
          try {
            const response = await axios.post(`${baseURL}/auth/refresh-token`, null, { withCredentials: true });
            const newToken = response.data.accessToken;

            if (newToken) {
              store.dispatch({ type: 'auth/signIn/fulfilled', payload: { token: newToken, user: response.data.user } });
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              processQueue(null, newToken);
              resolve(api(originalRequest));
            } else {
              processQueue(new Error('Refresh failed') as AxiosError, null);
              store.dispatch({ type: 'auth/signOut/fulfilled' });
              window.location.pathname = '/signin';
              reject(error);
            }
          } catch (refreshError) {
            processQueue(refreshError as AxiosError, null);
            store.dispatch({ type: 'auth/signOut/fulfilled' });
            window.location.pathname = '/signin';
            reject(error);
          } finally {
            isRefreshing = false;
          }
        };
        refreshAndRetry();
      });
    }
    
    else if (status === 401) {
       store.dispatch({ type: 'auth/signOut/fulfilled' });
       if (window.location.pathname !== '/signin') {
          toast.error('Session expired. Please sign in again.');
       }
    }
    else {
      const errorData = error.response?.data as { message: string; error?: string; };
      const message = errorData?.message || errorData?.error || 'An error occurred';
      console.error(message);
    }
    
    return Promise.reject(error);
  },
);