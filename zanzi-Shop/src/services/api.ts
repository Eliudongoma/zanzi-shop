import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ResponseType<T> {
  message: string;
  data: T;
}

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export class ApiService<T> {
  constructor(private endpoint: string) {}
  //Get ALL
  async getAll(config?: AxiosRequestConfig): Promise<T[]> {
    try {
      const response: AxiosResponse<T[]> = await api.get(this.endpoint, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  //Get By
  async getById(id: string, config?: AxiosRequestConfig): Promise<T> {
    try {
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
  async create(data: T, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
    try {
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
    config?: AxiosRequestConfig
  ): Promise<ResponseType<T>> {
    try {
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
  async delete(id: string, config?: AxiosRequestConfig): Promise<void> {
    try {
      await api.delete(`${this.endpoint}${id}`, config);
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
