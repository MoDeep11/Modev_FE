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
  ProjectDetailResponse,
  FileContent
} from "./type";

export const createProject = async (payload: ProjectPayload): Promise<ProjectResponse> => {
  const response = await api.post<ProjectResponse>("/projects", payload);
  return response.data;
};

export const updateProject = async ({ projectId, data }: UpdateProjectPayload): Promise<ProjectResponse> => {
  const response = await api.patch<ProjectResponse>(`/projects/${projectId}/stacks`, data);
  return response.data;
};

export const getDevFields = async (): Promise<FieldsResponse> => {
  const response = await api.get<FieldsResponse>("/catalog/fields");
  return response.data;
};

export const getDevStacks = async (fieldIds: string[], keyword?: string): Promise<StacksResponse> => {
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
  keyword?: string
): Promise<DependenciesResponse> => {
  const response = await api.get<DependenciesResponse>("/catalog/dependencies", { 
    params: {
      stackIds: stackIds.join(","), 
      ...(keyword ? { keyword } : {}),
    },
  });
  return response.data;
};

export const getProjectDetail = async (projectId: string): Promise<ProjectMetadataResponse> => {
  const response = await api.get<ProjectMetadataResponse>(`/projects/${projectId}`);
  return response.data;
};

export const updateProjectMetadata = async (
  projectId: string,
  payload: { projectName: string; description: string }
): Promise<ProjectMetadataResponse> => {
  const response = await api.patch<ProjectMetadataResponse>(
    `/projects/${projectId}/metadata`,
    payload
  );
  return response.data;
};

export const getFileContent = async (
  projectId: string,
  filePath: string
): Promise<FileContent> => {
  const response = await api.get<FileContent>(`/projects/${projectId}/files`, {
    params: { filePath },
  });
  return response.data;
};

export const generateAIStructure = async (projectId: string): Promise<any> => {
  const response = await api.post("/projects/structures", { projectId });
  return response.data;
};