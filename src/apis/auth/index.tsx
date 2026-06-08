import { api } from "..";
import type {
  SignupProps,
  EmailCheckProps,
  EmailSendProps,
  LoginProps,
} from "./type";

export const CreateUser = async ({
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

export const EmailCheck = async ({ token }: EmailCheckProps) => {
  const response = await api.post(`/auth/email/verify`, {
    token,
  });
  return response.data;
};

export const EmailSend = async ({ email }: EmailSendProps) => {
  const response = await api.post(`/auth/email/resend`, {
    email,
  });
  return response.data;
};

export const LoginUser = async ({ email, password }: LoginProps) => {
  const response = await api.post(`/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const LogoutUser = async () => {
  const response = await api.post(`/auth/logout`, {});
  return response.data;
};
