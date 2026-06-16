import { api } from "..";
import type { GetProjectsParams, GetProjectsResponse } from "./type";

export const getProjects = async (
  searchParams: GetProjectsParams,
): Promise<GetProjectsResponse> => {
  const response = await api.get(`/projects`, {
    params: searchParams,
  });

  return response.data;
};