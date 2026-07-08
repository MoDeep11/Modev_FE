import { api } from "..";
import type {
  ProjectPayload,
  ProjectResponse,
  UpdateProjectPayload,
  FieldsResponse,
  StacksResponse,
  DependenciesResponse,
  ProjectMetadataResponse,
  ProjectDetail,
  FileContent,
} from "./type";

export const createProject = async (
  payload: ProjectPayload,
): Promise<ProjectResponse> => {
  const response = await api.post<ProjectResponse>("/projects", payload);
  return response.data;
};

export const updateProject = async ({
  projectId,
  data,
}: UpdateProjectPayload): Promise<ProjectResponse> => {
  const response = await api.put<ProjectResponse>(
    `/projects/${projectId}`,
    data,
  );
  return response.data;
};

export const getDevFields = async (): Promise<FieldsResponse> => {
  const response = await api.get<FieldsResponse>("/catalog/fields");
  return response.data;
};

export const getDevStacks = async (
  fieldIds: string[],
  keyword?: string,
): Promise<StacksResponse> => {
  const response = await api.get<StacksResponse>("/catalog/stacks", {
    params: {
      fieldIds: fieldIds.join(","),
      ...(keyword ? { keyword } : {}),
    },
  });
  return response.data;
};

export const getProjectDependencies = async (
  stackIds: string[],
  keyword?: string,
): Promise<DependenciesResponse> => {
  const response = await api.get<DependenciesResponse>(
    "/catalog/dependencies",
    {
      // ✅ /projects/dependencies -> /catalog/dependencies (명세서 기준)
      params: {
        stackIds: stackIds.join(","), // ✅ 필수 파라미터, 콤마 구분 문자열로 전달 (명세서 기준)
        ...(keyword ? { keyword } : {}),
      },
    },
  );
  return response.data;
};

export const getProjectDetail = async (
  projectId: string,
): Promise<ProjectResponse> => {
  const response = await api.get<ProjectResponse>(
    `/projects/${projectId}`,
  );
  return response.data;
};

export const updateProjectMetadata = async (
  projectId: string,
  payload: { projectName: string; description: string },
): Promise<ProjectMetadataResponse> => {
  const response = await api.patch<ProjectMetadataResponse>(
    `/projects/${projectId}/metadata`,
    payload,
  );
  return response.data;
};

export const getProject = async (projectId: string): Promise<ProjectDetail> => {
  const response = await api.get<any>(`/projects/${projectId}`);
  return response.data?.data ?? response.data;
};

export const getFileContent = async (
  projectId: string,
  filePath: string,
): Promise<FileContent> => {
  const response = await api.get<any>(`/projects/${projectId}/files`, {
    params: { filePath },
  });
  return response.data?.data ?? response.data;
};

export const generateAIStructure = async (
  projectId: string,
): Promise<{ projectId: string; status: string }> => {
  const response = await api.post<{
    success: boolean;
    data: { projectId: string; status: string };
    error: string | null;
  }>("/projects/structures", { projectId });
  return response.data.data;
};
