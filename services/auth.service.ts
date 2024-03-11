import { tesloApi } from "@/api/tesloApi";
import { AxiosError } from "axios";

interface LoginResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

export class AuthService {
  static login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("An error occurred while trying to login");
    }
  };

  static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.get<LoginResponse>(`/auth/check-status`);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Unauthorized access");
    }
  };
}
