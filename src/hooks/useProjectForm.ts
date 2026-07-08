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
    onSuccess: (data) => {
      console.log("📡 Create response:", data);

      // 💡 서버 응답 구조(data.data.projectId 등)에 맞게 생성된 ID를 추출합니다.
      const newProjectId = sessionStorage.getItem(currentProjectId);
      console.log("🆔 Extracted projectId:", newProjectId);

      toast.success(
        `프로젝트가 성공적으로 생성되었습니다! ID: ${newProjectId}`,
      );
      sessionStorage.removeItem(SESSION_KEY);

      // 💡 생성된 ID를 가지고 생성 과정 페이지로 이동합니다.
      if (newProjectId) {
        navigate(`/build-progress/${newProjectId}`);
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message ||
          "프로젝트 생성 중 오류가 발생했습니다.",
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success("프로젝트 수정이 완료");
      sessionStorage.removeItem(SESSION_KEY);
      navigate(`/project-detail:${id}`);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message ||
          "프로젝트 수정 중 오류가 발생했습니다.",
      );
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
