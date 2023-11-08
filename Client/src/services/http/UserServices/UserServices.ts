import { UserResponse, UserServicesTypes } from "./@types";
import api from "../../api";

export const UserServices: UserServicesTypes = {
  create: async (userBody) => {
    try {
      const response = await api.post(`/user`, userBody);
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  },
  getUser: async (wallet) => {
    try {
      const response = await api.get(`/user/${wallet}`);

      const data = await response.data;
      const token = data.token.split(".")[1];

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      const buff = Buffer.from(token, "base64");
      const decoded: UserResponse = JSON.parse(buff.toString("ascii"));

      return decoded;
    } catch (error: any) {
      delete api.defaults.headers.common["Authorization"];
      throw new Error(error);
    }
  },
  getUserInfo: async (wallet) => {
    try {
      const response = await api.get(`/user/info/${wallet}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  },
};
