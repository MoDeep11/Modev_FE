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
  projectId: string;
  filePath: string;
}

export interface GetFileContentResponse {
  filePath: string;
  content: string;
  language: string;
}
export interface ConnectedEvent {
  projectId: string;
  message: string;
}

export interface ProgressEvent {
  step: "analyzing" | "generating";
  message: string;
}

export interface FileCreatedEvent {
  type: "directory" | "file";
  path: string;
  depth: number;
  content?: string;
}

export interface CompleteEvent {
  projectId: string;
  totalFiles: number;
  totalDirectories: number;
  message: string;
}

export interface ErrorEvent {
  code: string;
  message: string;
}
