import styled from "styled-components";
import ProjectBox from "./ProjectBox";
import type { Project } from "../../apis/myproject/type";

interface Props {
  projects: Project[];
}

export default function ProjectGrid({ projects }: Props) {
  return (
    <Grid>
      {projects.map((project) => (
        <ProjectBox
          key={project.projectId}
          title={project.projectName}
          text={project.description}
          createdAt={project.createdAt}
          lastModifiedAt={project.updatedAt}
          stacks={project.stacks}
        />
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
`;
