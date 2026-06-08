import { useMutation } from "@tanstack/react-query";
import { CreateUser } from "../../../apis/auth/index";

export const useSignup = () => {
  return useMutation({
    mutationFn: CreateUser,

    onSuccess: (data) => {
      alert("회원가입이 완료되었습니다! 인증 이메일을 확인해 주세요.");
    },

    onError: (error: any) => {
      const errorCode = error.response?.data?.code;
      if (errorCode === "EMAIL_ALREADY_EXISTS") alert("중복 이메일입니다");
      else if (errorCode === "INVALID_PASSWORD_FORMAT")
        alert("비밀번호가 형식에 맞지 않습니다");
      else if (errorCode === "PASSWORD_MISMATCH")
        alert("비밀번호가 불일치합니다");
      else alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};
