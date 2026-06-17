import { api } from "..";
import type {
  GetProjectsParams,
  GetProjectsResponse,
  DeleteProjectProps,
} from "./type";

export const getMyProjects = async (
  params?: GetProjectsParams,
): Promise<GetProjectsResponse> => {
  const response = await api.get<GetProjectsResponse>(`/projects`, {
    params: {
      ...params,
      keyword: params?.keyword?.trim() || undefined,
    },
  });
  return response.data;
};

export const deleteProject = async ({ projectId }: DeleteProjectProps) => {
  const response = await api.delete(`/projects/${projectId}`);
  return response;
};
