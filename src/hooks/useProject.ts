import { useQuery } from "@tanstack/react-query";
import { getProject, getFileContent } from "../apis/project/index";

export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
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
