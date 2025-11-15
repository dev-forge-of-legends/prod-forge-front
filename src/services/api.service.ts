import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthService } from "./auth.service";

// Use proxy in development, environment variable in production

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

class ApiService {
  private api = axios.create({
    baseURL: API_ENDPOINT,
  });

  constructor() {
    // Add request interceptor to automatically add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = AuthService.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle token expiration
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        // const originalRequest = error.config;

        // If token expired (401) and we haven't already tried to refresh
        // if (error.response?.status === 401 && !originalRequest._retry) {
        //   originalRequest._retry = true;

        //   const refreshSuccess = await AuthService.refreshAccessToken();

        //   if (refreshSuccess) {
        //     // Retry the original request with new token
        //     const newToken = AuthService.getAccessToken();
        //     originalRequest.headers.Authorization = `Bearer ${newToken}`;
        //     return this.api(originalRequest);
        //   } else {
        //     // Refresh failed, redirect to home
        //     AuthService.logout();
        //     // window.location.href = "/";
        //   }
        // }

        return Promise.reject(error.response.data || error.message);
      }
    );
  }

  public async request<T = any>(
    url: string,
    options: {
      method?: AxiosRequestConfig["method"];
      data?: any;
      requireAuth?: boolean;
      headers?: Record<string, string>;
    } = {}
  ): Promise<AxiosResponse<T>> {
    const {
      method = "GET",
      data = null,
      requireAuth = false,
      headers = {},
    } = options;

    const config: AxiosRequestConfig = {
      url,
      method,
      data,
      headers: {
        ...headers,
      },
    };

    // If this is a public request, remove auth header
    if (!requireAuth) {
      config.headers = {
        ...config.headers,
        Authorization: undefined,
      };
    }

    return this.api(config);
  }

  public async publicRequest<T = any>(
    url: string,
    method: AxiosRequestConfig["method"] = "GET",
    data: any = null
  ): Promise<AxiosResponse<T>> {
    return this.request<T>(url, { method, data, requireAuth: false });
  }

  public async privateRequest<T = any>(
    url: string,
    method: AxiosRequestConfig["method"] = "GET",
    data: any = null
  ): Promise<AxiosResponse<T>> {
    return this.request<T>(url, { method, data, requireAuth: true });
  }
}

export const apiService = new ApiService();
  