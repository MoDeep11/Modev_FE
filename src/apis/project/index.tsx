import { api } from "..";
import type { ProjectDetail, FileContent } from "./type";

export const getProject = async (projectId: string): Promise<ProjectDetail> => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};

export const getFileContent = async (
  projectId: string,
  filePath: string,
): Promise<FileContent> => {
  const response = await api.get(`/projects/${projectId}/files`, {
    params: { filePath },
  });
  return response.data;
};
