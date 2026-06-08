import { api } from "..";
import type { SignupProps, EmailCheckProps, EmailReSendProps } from "./type";

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

export const EmailReSend = async ({ email }: EmailReSendProps) => {
  const response = await api.post(`/auth/email/resend`, {
    email,
  });
  return response.data;
};
