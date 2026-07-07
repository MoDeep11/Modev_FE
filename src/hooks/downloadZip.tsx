import { useMutation } from "@tanstack/react-query";
import { newDownloadZip, DownloadZip } from "../apis/zip";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useNewDownloadZip = () => {
  return useMutation({
    mutationFn: newDownloadZip,

    onError: () => {
      toast.error("다운로드에 실패했습니다.");
    },
  });
};

export const useDownloadZip = () => {
  return useMutation({
    mutationFn: DownloadZip,

    onError: (error: AxiosError<any>) => {
      const code = error.response?.data?.error?.code;

      if (code === "PROJECT_NOT_COMPLETED") {
        toast.error("프로젝트 생성이 완료된 후 다운로드할 수 있습니다.");
        return;
      }

      toast.error("다운로드에 실패했습니다.");
    },
  });
};
