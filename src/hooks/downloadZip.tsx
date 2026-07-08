import { useMutation } from "@tanstack/react-query";
import { newDownloadZip, DownloadZip } from "../apis/zip";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useNewDownloadZip = () => {
  return useMutation({
    mutationFn: newDownloadZip,
    

    onSuccess: (res) => {
      const url = res.data?.downloadUrl;
      const fileName = res.data?.fileName ?? "project.zip";
      if (!url) {
        toast.error("다운로드 URL을 가져오지 못했습니다.");
        return;
      }
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    },

    onError: () => {
      toast.error("다운로드에 실패했습니다.");
    },
  });
};

export const useDownloadZip = () => {
  return useMutation({
    mutationFn: DownloadZip,

    onSuccess: (res) => {
      const url = res.data?.downloadUrl;
      const fileName = res.data?.fileName ?? "project.zip";
      if (!url) {
        toast.error("다운로드 URL을 가져오지 못했습니다.");
        return;
      }
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    },

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
