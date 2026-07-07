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
}

// 🔧 [FIX] 서버의 다른 모든 응답(FieldsResponse, StacksResponse, DependenciesResponse,
// ProjectMetadataResponse)이 { success, data, error } 로 감싸져 오는 것과 동일하게,
// GET /projects/:id (getProject) 응답도 같은 규격일 가능성이 높습니다.
// 기존 getProject의 반환 타입(Promise<ProjectDetail>)은 래핑 없이 flat하게 온다고 가정하고 있어서
// 실제 서버가 래핑된 형태로 응답하면 projectResponse.fields / .stacks / .dependencies 가
// 전부 undefined가 되어 2/3/4단계에서 "이미 선택된 상태"가 화면에 반영되지 않습니다.
// -> 아래 타입을 실제 서버 응답 형태(Swagger/Postman)로 확인하고 apis/project/index.tsx의
//    getProject 함수를 이 타입으로 맞춰주세요.
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
