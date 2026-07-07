import { useQuery } from "@tanstack/react-query";
import { getProjectStatus, getFileContent } from "../apis/newproject";

export const useProjectStatus = (projectId: string) => {
  return useQuery({
    queryKey: ["projectStatus", projectId],
    queryFn: () => getProjectStatus(projectId),
    enabled: !!projectId,
  });
};

export const useFileContent = (projectId: number, filePath: string) => {
  return useQuery({
    queryKey: ["fileContent", projectId, filePath],
    queryFn: () => getFileContent({ projectId, filePath }),
    enabled: Number.isFinite(projectId) && projectId > 0 && !!filePath,
  });
};
