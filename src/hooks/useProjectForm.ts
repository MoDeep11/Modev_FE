import { useMutation } from "@tanstack/react-query";
import { createProject, updateProject } from "../apis/project/index";
import type { ProjectPayload } from "../apis/project/type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

type ErrorResponse = {
  code?: string;
  message?: string;
};

export const useProjectForm = (projectId?: string) => {
  const navigate = useNavigate();
  const SESSION_KEY = "projectForm";
  const isModify = Boolean(projectId);

  const saveStepData = (stepData: Partial<ProjectPayload>) => {
    const savedForm = sessionStorage.getItem(SESSION_KEY);
    const currentForm = savedForm ? JSON.parse(savedForm) : {};
    
    const updatedForm = { ...currentForm, ...stepData };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(updatedForm));
  };

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success("프로젝트 설계 시작");
      sessionStorage.removeItem(SESSION_KEY); 
      navigate("/main"); 
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || "프로젝트 생성 중 오류가 발생했습니다.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success("프로젝트 수정이 완료");
      sessionStorage.removeItem(SESSION_KEY); 
      navigate("/project-detail"); 
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || "프로젝트 수정 중 오류가 발생했습니다.");
    },
  });

  const submitFinalProject = (step4Data: Partial<ProjectPayload>) => {
    const savedForm = sessionStorage.getItem(SESSION_KEY);
    const currentForm = savedForm ? JSON.parse(savedForm) : {};
    
    const finalForm = { ...currentForm, ...step4Data } as ProjectPayload;

    if (isModify && projectId) {
      updateMutation.mutate({ projectId, data: finalForm });
    } else {
      createMutation.mutate(finalForm);
    }
  };

  return {
    saveStepData,
    submitFinalProject,
    isPending: createMutation.isPending || updateMutation.isPending,
  };
};