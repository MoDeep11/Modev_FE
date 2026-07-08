import { api } from "..";
import type {
  ProjectPayload,
  ProjectResponse,
  UpdateProjectPayload,
  FieldsResponse,
  StacksResponse,
  DependenciesResponse,
  ProjectMetadataResponse,
  StructureStatusResponse,
  FileContent,
} from "./type";

export const createProject = async (
  payload: ProjectPayload,
): Promise<ProjectResponse> => {
  const response = await api.post<ProjectResponse>("/projects", payload);
  return response.data;
};

// ✅ 명세서 기준: body는 fieldIds/stackIds/dependencyIds 3개만, 응답은 {success,data:{projectId,status},error}
export const updateProject = async ({
  projectId,
  data,
}: UpdateProjectPayload): Promise<StructureStatusResponse> => {
  const response = await api.patch<StructureStatusResponse>(
    `/projects/${projectId}/stacks`,
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
      params: {
        stackIds: stackIds.join(","),
        ...(keyword ? { keyword } : {}),
      },
    },
  );
  return response.data;
};

export const getProjectDetail = async (
  projectId: string,
): Promise<ProjectMetadataResponse> => {
  const response = await api.get<ProjectMetadataResponse>(
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

export const getFileContent = async (
  projectId: string,
  filePath: string,
): Promise<FileContent> => {
  const response = await api.get<FileContent>(
    `/projects/structures/${projectId}/files`,
    {
      params: { filePath },
    },
  );

  return response.data;
};

export const generateAIStructure = async (
  projectId: string,
): Promise<StructureStatusResponse> => {
  const response = await api.post<StructureStatusResponse>(
    "/projects/structures",
    { projectId },
  );
  return response.data;
};

export const getStructureStatus = async (
  projectId: string,
): Promise<StructureStatusResponse> => {
  const response = await api.get<StructureStatusResponse>(
    `/projects/structures/${projectId}`,
  );
  return response.data;
};
