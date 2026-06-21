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
  fileTree: FileTreeNode[];
  createdAt: string;
  updatedAt: string;
}

export interface FileContent {
  filePath: string;
  content: string;
}
