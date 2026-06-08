import { useMutation } from "@tanstack/react-query";
import { CreateUser } from "../apis/auth/index";

export const useSignup = () => {
  return useMutation({
    mutationFn: CreateUser,

    onSuccess: (data) => {
      alert("회원가입이 완료되었습니다! 인증 이메일을 확인해 주세요.");
    },

    onError: (error: any) => {
      console.log("React Query에서 잡은 에러:", error);
    },
  });
};
