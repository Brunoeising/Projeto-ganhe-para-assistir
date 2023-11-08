import { NFT, User, UserBody, UserRegisterResponse } from "../../../../@types";

export type UserResponse = {
  user: User;
  NFT: NFT;
  iat: number;
  exp: number;
};

export type UserServicesTypes = {
  create: (userBody: UserBody) => Promise<UserRegisterResponse>;
  getUser: (wallet: string) => Promise<UserResponse>;
  getUserInfo: (wallet: string) => Promise<User>;
};
