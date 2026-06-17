import { api } from "..";
import type { DownloadZipProps } from "./type";

export const DownloadZip = async ({ projectId }: DownloadZipProps) => {
  const response = await api.post(`/projects/structures/${projectId}/download`);

  return response.data;
};
