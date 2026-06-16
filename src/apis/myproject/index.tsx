import { api } from "..";
import type { GetProjectsParams, GetProjectsResponse } from "./type";

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
