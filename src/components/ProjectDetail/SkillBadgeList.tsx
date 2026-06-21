import styled from "styled-components";
import SkillBadge from "./SkillBadge";
import type { ProjectDetail } from "../../apis/project/type";

type Tab = "fields" | "stacks" | "dependencies";

interface Props {
  activeTab: Tab;
  project: ProjectDetail;
}

export default function SkillBadgeList({ activeTab, project }: Props) {
  const items = {
    fields: project?.fields ?? [],
    stacks: project?.stacks?.map((s) => s.name) ?? [],
    dependencies:
      project?.dependencies?.map((d) => `${d.name} ${d.version}`) ?? [],
  }[activeTab];

  return (
    <Container>
      {items.map((label, i) => (
        <SkillBadge key={`${activeTab}-${String(label)}-${i}`} label={label} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 444px;
  height: 24px;
`;
