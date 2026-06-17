import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  emailCheck,
  emailSend,
  createUser,
  loginUser,
  logoutUser,
} from "../apis/auth/index";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type ErrorResponse = {
  code?: string;
  message?: string;
};

export const useSendEmail = () => {
  return useMutation({
    mutationFn: emailSend,

    onSuccess: () => {
      toast.success("이메일이 발송되었습니다!");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const errorCode = getErrorCode(error);
      if (errorCode === "ALREADY_VERIFIED")
        toast.error("이미 인증된 계정입니다");
      else if (errorCode === "RESEND_RATE_LIMIT")
        toast.error("재발송 횟수가 초과되었습니다");
      else
        toast.error(
          "이메일 재전송 중 오류가 발생했습니다.",
        );
    },
  });
};

const getErrorCode = (error: AxiosError<ErrorResponse>) =>
  error.response?.data?.code;

export const useCheckEmail = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: emailCheck,

    onSuccess: () => {
      toast.success("이메일이 인증되었습니다!");
      navigate("/login");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const errorCode = getErrorCode(error);
      if (errorCode === "VERIFY_TOKEN_EXPIRED")
        toast.error("인증 링크가 만료되었습니다");
      else if (errorCode === "VERIFY_TOKEN_INVALID")
        toast.error("유효하지 않은 토큰입니다");
      else if (errorCode === "ALREADY_VERIFIED")
        toast.error("이미 인증된 계정입니다");
      else toast.error("오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createUser,

    onSuccess: (_, variables) => {
      toast.success("회원가입이 완료되었습니다!");
      navigate("/", { state: { email: variables.email } });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const errorCode = getErrorCode(error);
      if (errorCode === "EMAIL_ALREADY_EXISTS")
        toast.error("중복 이메일입니다");
      else if (errorCode === "INVALID_PASSWORD_FORMAT")
        toast.error("비밀번호가 형식에 맞지 않습니다");
      else if (errorCode === "PASSWORD_MISMATCH")
        toast.error("비밀번호가 불일치합니다");
      else toast.error("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      toast.success("로그인 성공!");
      navigate("/main");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorCode = getErrorCode(error);
      if (errorCode === "INVALID_CREDENTIALS")
        toast.error("이메일 또는 비밀번호가 불일치합니다.");
      else if (errorCode === "ACCOUNT_LOCKED")
        toast.error("나중에 다시 시도하십시오");
      else if (errorCode === "EMAIL_NOT_VERIFIED")
        toast.error("이메일 미인증 계정입니다.");
      else toast.error("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      localStorage.removeItem("accessToken");
      queryClient.clear();
      toast.success("로그아웃 성공!");
      navigate("/");
    },

    onError: () => {
      toast.error("로그아웃 중 오류가 발생했습니다.");
    },
  });
};
