import { api } from "..";
import type {
  SignupProps,
  EmailCheckProps,
  EmailSendProps,
  LoginProps,
} from "./type";

export const createUser = async ({
  email,
  password,
  passwordConfirm,
}: SignupProps) => {
  const response = await api.post(`/auth/signup`, {
    email,
    password,
    passwordConfirm,
  });
  return response.data;
};

export const emailCheck = async ({ token }: EmailCheckProps) => {
  const response = await api.post(`/auth/email/verify`, {
    token,
  });
  return response.data;
};

export const emailSend = async ({ email }: EmailSendProps) => {
  const response = await api.post(`/auth/email/resend`, {
    email,
  });
  return response.data;
};

export const loginUser = async ({ email, password }: LoginProps) => {
  const response = await api.post(`/auth/login`, {
    email,
    password,
  });

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post(`/auth/logout`);
  return response.data;
};
