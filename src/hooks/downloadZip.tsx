import { useMutation } from "@tanstack/react-query";
import { DownloadZip } from "../apis/zip";
import { toast } from "react-toastify";

export const useDownloadZip = () => {
  return useMutation({
    mutationFn: DownloadZip,

    onSuccess: (data) => {
      window.open(data.data.downloadUrl);
    },
    onError: () => {
      toast.error("다운로드에 실패했습니다.");
    },
  });
};
