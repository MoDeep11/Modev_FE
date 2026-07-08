export interface DownloadZipProps {
  projectId: string;
}

export interface DownloadZipResponse {
  success: boolean;
  data: {
    downloadUrl: string;
    expiresAt: string;
    fileName: string;
  } | null;
  error: {
    code: string;
    message?: string;
  } | null;
}
