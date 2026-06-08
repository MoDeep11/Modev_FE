import { api } from "..";
import type { SignupProps, EmailCheckProps, EmailReSendProps } from "./type";

export const CreateUser = async ({
  email,
  password,
  passwordConfirm,
}: SignupProps) => {
  try {
    const response = await api.post(`/auth/signup`, {
      email,
      password,
      passwordConfirm,
    });
    return response.data;
  } catch (error: any) {
    const errorData = error.response?.data?.code;

    if (errorData === "EMAIL_ALREADY_EXISTS") {
      alert("중복 이메일입니다");
    } else if (errorData === "INVALID_PASSWORD_FORMAT") {
      alert("비밀번호가 형식에 맞지 않습니다");
    } else if (errorData === "PASSWORD_MISMATCH") {
      alert("비밀번호가 불일치합니다");
    } else {
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
    throw error;
  }
};

export const EmailCheck = async ({ token }: EmailCheckProps) => {
  try {
    const response = await api.post(`/auth/email/verify`, {
      token,
    });
    return response.data;
  } catch (error: any) {
    const errorData = error.response?.data?.code;

    if (errorData === "VERIFY_TOKEN_EXPIRED") {
      alert("인증 링크가 만료되었습니다");
    } else if (errorData === "VERIFY_TOKEN_INVALID") {
      alert("유효하지 않은 토큰입니다");
    } else if (errorData === "ALREADY_VERIFIE") {
      alert("이미 인증된 계정입니다");
    } else {
      alert("이메일 확인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
    throw error;
  }
};

export const EmailReSend = async ({ email }: EmailReSendProps) => {
  try {
    const response = await api.post(`/auth/email/resend`, {
      email,
    });
    return response.data;
  } catch (error: any) {
    const errorData = error.response?.data?.code;

    if (errorData === "ALREADY_VERIFIED") {
      alert("이미 인증된 계정입니다");
    } else if (errorData === "RESEND_RATE_LIMIT") {
      alert("재발송 횟수가 초과되었습니다");
    } else {
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
    throw error;
  }
};
