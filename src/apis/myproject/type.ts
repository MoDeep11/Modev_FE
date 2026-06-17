export type GetProjectsParams = {
  page?: number;
  size?: number;
  keyword?: string;
};

export type Project = {
  projectId: string;
  projectName: string;
  description: string;
  stacks: string[];
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "INACTIVE";
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  size: number;
};

export type GetProjectsResponse = {
  success: boolean;
  data: {
    projects: Project[];
    pagination: Pagination;
  };
  error: null | string;
};

export type DeleteProjectProps = {
  projectId: number;
};
