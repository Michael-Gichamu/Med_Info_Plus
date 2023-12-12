import { ILoginData, IsignupData } from "../types/auth.types";
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
import { apiDomain } from "../utils/api";

import { Client, Account, ID } from "appwrite";

export const client = new Client()
  .setEndpoint(apiDomain)
  .setProject("655129254787cb88f723"); // Your project ID

const account = new Account(client);

export const signup = async (user: SignUpFormData) => {
  try {
    const { name, email, password } = user;

    const response = await account.create(ID.unique(), email, password, name);
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export const login = async (user: ILoginData) => {
  try {
    const response = await account.createEmailSession(
      user.email,
      user.password
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const logout = async () => {
  try {
    const resp = await account.deleteSession("current");
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const isLogged = async () => {
  try {
    const resp = await account.get();
    return resp;
  } catch (error) {
    console.log(error);
  }
};
