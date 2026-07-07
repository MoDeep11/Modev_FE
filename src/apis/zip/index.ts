import { api } from "..";
import type { DownloadZipProps } from "./type";

export const newDownloadZip = async ({ projectId }: DownloadZipProps) => {
  const response = await api.post(`/projects/structures/${projectId}/download`);

  const { downloadUrl, fileName } = response.data.data;

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  return response.data;
};

export const DownloadZip = async ({ projectId }: DownloadZipProps) => {
  const { data } = await api.post(`/projects/${projectId}/download`);

  const { downloadUrl, fileName } = data.data;

  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  return data;
};
