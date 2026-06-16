export interface GetProjectsParams {
  page?: number;
  size?: number;
  keyword?: string;
}

export interface ProjectItem {
  projectId: string;
  projectName: string;
  description: string;
  stacks: string[];
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  size: number;
}

export interface GetProjectsResponse {
  success: boolean;
  data: {
    projects: ProjectItem[];
    pagination: PaginationInfo;
  };
  error: null | string;
}
