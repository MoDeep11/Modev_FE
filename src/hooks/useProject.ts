import { useQuery } from "@tanstack/react-query";
import { getProjectDetail, getFileContent } from "../apis/project/index";

export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
  });
};

export const useFileContent = (projectId: string, filePath: string) => {
  return useQuery({
    queryKey: ["fileContent", projectId, filePath],
    queryFn: () => getFileContent(projectId, filePath),
    enabled: !!projectId && !!filePath,
  });
};
