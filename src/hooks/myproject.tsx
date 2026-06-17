import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyProjects } from "../apis/myproject";
import type { GetProjectsParams } from "../apis/myproject/type";
import { deleteProject } from "../apis/myproject";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useMyProjects = (params?: GetProjectsParams) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getMyProjects(params),
  });
};

type ErrorResponse = {
  code?: string;
  message?: string;
};

const getErrorCode = (error: AxiosError<ErrorResponse>) =>
  error.response?.data?.code;

export const useDeleteMyProject = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success("삭제되었습니다!");
      navigate("/myproject");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorCode = getErrorCode(error);
      if (errorCode === "NOT_FOUND") {
        toast.error("프로젝트를 찾을 수 없습니다.");
      } else if (errorCode === "FORBIDDEN") {
        toast.error("잘못된 접근입니다.");
      } else {
        toast.error("삭제에 실패했습니다.");
      }
    },
  });
};
