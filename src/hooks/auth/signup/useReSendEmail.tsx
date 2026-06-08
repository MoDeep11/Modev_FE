import { useMutation } from "@tanstack/react-query";
import { EmailReSend } from "../../../apis/auth";

export const useReSendEmail = () => {
  return useMutation({
    mutationFn: EmailReSend,

    onSuccess: (data) => {
      alert("이메일이 재발송되었습니다");
    },

    onError: (error: any) => {
      const errorCode = error.response?.data?.code;
      if (errorCode === "ALREADY_VERIFIED") alert("이미 인증된 계정입니다");
      else if (errorCode === "RESEND_RATE_LIMIT")
        alert("재발송 횟수가 초과되었습니다");
      else alert("이메일 재전송 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};
