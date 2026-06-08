import { api } from "..";
import type { SignupProps } from "./type";

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
