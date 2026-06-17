import { useQuery } from "@tanstack/react-query";
import { getProjectStatus, getFileContent } from "../apis/newproject";
import type { GetFileContentProps } from "../apis/newproject/type";

export const useProjectStatus = (projectId: number) => {
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
    enabled: !!filePath,
  });
};
