import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getAuth } from "firebase/auth";

interface ResponseType<T> {
  message: string;
  data: T;
}

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export class ApiService<T> {
  constructor(private endpoint: string) {}

  private async getToken(): Promise<string | null>{
    const auth = getAuth();
    const user = auth.currentUser;
    if(!user) return null;
    return await user.getIdToken();
  }
  //Get ALL
  async getAll(signal?: AbortSignal): Promise<T[]> {
    try {
      const token = await this.getToken();
      const config: AxiosRequestConfig = { signal, headers:token ? {Authorization: `Bearer ${token}`} : {}};
      const response: AxiosResponse<T[]> = await api.get(this.endpoint, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  //Get By
  async getById(id: string,signal?: AbortSignal): Promise<T> {
    try {
      const token = await this.getToken();
      const config: AxiosRequestConfig = { signal, headers:token ? {Authorization: `Bearer ${token}`} : {}};
      const response: AxiosResponse<T> = await api.get(
        `${this.endpoint}${id}`,
        config
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  //Create
  async create(data: T, signal?: AbortSignal): Promise<ResponseType<T>> {
    try {
      const token = await this.getToken();
      const config: AxiosRequestConfig = { signal, headers:token ? {Authorization: `Bearer ${token}`} : {}};
            const response: AxiosResponse<ResponseType<T>> = await api.post(
        this.endpoint,
        data,
        config
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  //Update
  async update(
    id: string,
    data: Partial<T>,
    signal?: AbortSignal
  ): Promise<ResponseType<T>> {
    try {
      const token = await this.getToken();
      const config: AxiosRequestConfig = { signal, headers:token ? {Authorization: `Bearer ${token}`} : {}};
      const response: AxiosResponse<ResponseType<T>> = await api.put(
        `${this.endpoint}${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  //Delete
  async delete(id: string, signal?: AbortSignal): Promise<ResponseType<T>> {
    try {
      const token = await this.getToken();
      const config: AxiosRequestConfig = { signal, headers:token ? {Authorization: `Bearer ${token}`} : {}};
      const response = await api.delete(`${this.endpoint}${id}`, config);
      return response.data
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
}
