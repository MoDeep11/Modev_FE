import { api } from "..";
import type { DownloadZipProps, DownloadZipResponse } from "./type";

export const newDownloadZip = async ({
  projectId,
}: DownloadZipProps): Promise<DownloadZipResponse> => {
  const response = await api.post<DownloadZipResponse>(
    `/projects/structures/${projectId}/download`,
  );
  return response.data;
};

export const DownloadZip = async ({
  projectId,
}: DownloadZipProps): Promise<DownloadZipResponse> => {
  const response = await api.post<DownloadZipResponse>(
    `/projects/${projectId}/download`,
  );
  return response.data;
};
