export interface FileTreeNode {
  name: string;
  type: "FILE" | "DIRECTORY";
  children: FileTreeNode[];
}

export interface GetProjectStatusResponse {
  projectId: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  result: {
    fileTree: FileTreeNode[];
  } | null;
}

export interface GetFileContentProps {
  projectId: number;
  filePath: string;
}

export interface GetFileContentResponse {
  filePath: string;
  content: string;
  language: string;
}