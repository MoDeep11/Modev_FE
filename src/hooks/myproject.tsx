import { useQuery } from "@tanstack/react-query";
import { getMyProjects } from "../apis/myproject";
import type { GetProjectsParams } from "../apis/myproject/type";

export const useMyProjects = (params?: GetProjectsParams) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getMyProjects(params),
  });
};
