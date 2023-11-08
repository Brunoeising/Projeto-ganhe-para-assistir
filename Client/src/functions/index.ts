import { User } from "../../@types";
import { UserResponse } from "../services/http/UserServices/@types";
import { UserServices } from "../services/http/UserServices/UserServices";

export const saveUserInMongo = async (username: string, wallet: string) => {
  try {
    const response = await UserServices.create({
      username,
      wallet,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserAndNFTInfoByWallet = async (
  wallet: string
): Promise<UserResponse | undefined> => {
  const res = await UserServices.getUser(wallet);
  if (!res) return undefined;
  return res;
};

export const checkIfUserAlreadyRegistred = async (wallet: string) => {
  try {
    const res = await UserServices.getUserInfo(wallet);
    if (res) return true;
  } catch (error) {
    return false;
  }
};
