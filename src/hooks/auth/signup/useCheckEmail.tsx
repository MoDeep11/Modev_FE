import { useMutation } from "@tanstack/react-query";
import { EmailCheck } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const useCheckEmail = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: EmailCheck,

    onSuccess: () => {
      alert("이메일이 인증되었습니다");
      navigate("/login");
    },

    onError: (error: AxiosError<any>) => {
      const errorCode = error.response?.data?.code;
      if (errorCode === "VERIFY_TOKEN_EXPIRED")
        alert("인증 링크가 만료되었습니다");
      else if (errorCode === "VERIFY_TOKEN_INVALID")
        alert("유효하지 않은 토큰입니다");
      else if (errorCode === "ALREADY_VERIFIED")
        alert("이미 인증된 계정입니다");
      else alert("이메일 확인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};
