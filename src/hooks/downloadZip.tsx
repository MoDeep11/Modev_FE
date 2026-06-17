import { useMutation } from "@tanstack/react-query";
import { newDownloadZip, DownloadZip } from "../apis/zip";
import { toast } from "react-toastify";

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

    onError: () => {
      toast.error("다운로드에 실패했습니다.");
    },
  });
};
