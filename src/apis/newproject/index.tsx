import { api } from "..";
import type {
  GetFileContentProps,
  GetFileContentResponse,
  GetProjectStatusResponse,
} from "./type";

export const getProjectStatus = async (
  projectId: string,
): Promise<GetProjectStatusResponse> => {
  const response = await api.get(`/projects/structures/${projectId}`);
  return response.data.data;
};

export const getFileContent = async ({
  projectId,
  filePath,
}: GetFileContentProps): Promise<GetFileContentResponse> => {
  const response = await api.get(`/projects/structures/${projectId}/files`, {
    params: { filePath },
  });
  return response.data.data;
};
