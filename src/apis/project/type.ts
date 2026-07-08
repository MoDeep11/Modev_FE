export type ProjectField = "Backend" | "Frontend" | string;

export type StackCategory =
  | "FRAMEWORK"
  | "LIBRARY"
  | "DATABASE"
  | "TOOL"
  | string;

export interface Stack {
  stackId: string;
  name: string;
  category: StackCategory;
}

export interface Dependency {
  dependencyId: string;
  name: string;
  version: string;
  stackId: string;
}

export interface FileTreeNode {
  name: string;
  path: string;
  type: "FILE" | "DIRECTORY";
  children?: FileTreeNode[];
}

export interface ProjectDetail {
  projectId: string;
  projectName: string;
  description: string;
  fields: ProjectField[];
  stacks: Stack[];
  dependencies: Dependency[];
  fileTree: ProjectFileTree;
  createdAt: string;
  updatedAt: string;
}

export interface FileContent {
  filePath: string;
  content: string;
  language: string;
}

export interface ProjectDetailResponse {
  success: boolean;
  data: ProjectDetail;
  error: string | null;
}

// 💡 project.ts에서 이관 및 정리된 서버 통신용 타입들
export interface ProjectPayload {
  projectName: string;
  description: string;
  fieldIds: string[];
  stackIds: string[];
  dependencyIds: string[];
}

export interface UpdateProjectPayload {
  projectId: string;
  data: ProjectPayload;
}

export interface ProjectResponse {
  code: string;
  message: string;
  data?: any;
}

export interface ServerField {
  fieldId: string;
  name: string;
  description: string;
  iconUrl: string;
}

export interface FieldsResponse {
  success: boolean;
  data: {
    fields: ServerField[];
  };
  error: string | null;
}

export interface ServerStack {
  stackId: string;
  fieldId: string;
  category: string;
  name: string;
  description: string;
  iconUrl: string;
}

export interface StacksResponse {
  success: boolean;
  data: {
    stacks: ServerStack[];
  };
  error: string | null;
}

export interface ServerDependency {
  dependencyId: string;
  stackId: string;
  name: string;
  version: string;
  description: string;
  isRecommended: boolean;
  documentUrl: string;
}

export interface DependenciesResponse {
  success: boolean;
  data: {
    dependencies: ServerDependency[];
  };
  error: string | null;
}

export interface ProjectMetadataResponse {
  success: boolean;
  data: {
    projectId: string;
    projectName: string;
    description: string;
  };
  error: string | null;
}

export interface ProjectFileTree {
  projectId: string;
  status: "NOT_CREATED" | "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";

  result: {
    fileTree: FileTreeNode[];
  } | null;
}
