import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/color";

const MAX_VISIBLE_SKILLS = 3;

interface ProjectBoxProps {
  projectId: string;
  title: string;
  text: string;
  createdAt: string;
  lastModifiedAt: string;
  stacks: string[];
}

export default function ProjectBox({
  projectId,
  title,
  text,
  createdAt,
  lastModifiedAt,
  stacks,
}: ProjectBoxProps) {
  const navigate = useNavigate();
  const visibleStacks = stacks.slice(0, MAX_VISIBLE_SKILLS);
  const hiddenCount = stacks.length - MAX_VISIBLE_SKILLS;

  const formatDate = (date: string) => date.slice(0, 10);

  const handleClick = () => {
    navigate(`/project-detail/${projectId}`);
  };

  return (
    <Wrapper onClick={handleClick}>
      <TopWrapper>
        <ProjectName>{title}</ProjectName>
        <ProjectDetail>{text}</ProjectDetail>
      </TopWrapper>

      <Border />

      <DateWrapper>
        <DateTitle>생성일</DateTitle>
        <ShortBorder />
        <DetailDate>{formatDate(createdAt)}</DetailDate>
      </DateWrapper>

      <DateWrapper style={{ marginBottom: "12px" }}>
        <DateTitle>최종 수정일</DateTitle>
        <ShortBorder />
        <DetailDate>{formatDate(lastModifiedAt)}</DetailDate>{" "}
      </DateWrapper>

      <SkillContainer>
        {visibleStacks.map((stack) => (
          <SkillItem key={stack}>{stack}</SkillItem>
        ))}
        {hiddenCount > 0 && <Plus>+{hiddenCount}</Plus>}
      </SkillContainer>
    </Wrapper>
  );
}
const SkillContainer = styled.div`
  display: flex;
`;

const Plus = styled.div`
  color: ${Colors.text.secondary};
  font-family: Inter;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
`;

const TopWrapper = styled.div``;

const ShortBorder = styled.div`
  border: 0.5px solid ${Colors.border.default};
  height: 12px;
  width: 1px;
`;

const SkillItem = styled.div`
  background-color: ${Colors.background.overlay};
  min-width: 76px;
  width: fit-content;
  max-width: 100%;

  height: 24px;
  padding: 4px 12px;
  border-radius: 50px;

  color: white;
  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: auto;
  margin-right: 6px;

  white-space: nowrap;
`;

const ProjectName = styled.div`
  color: white;
  font-size: 18px;
  width: 100%;
  line-height: 28px;
`;

const ProjectDetail = styled.div`
  color: ${Colors.text.secondary};
  font-size: 14px;
  width: 100%;
  line-height: 20px;
`;

const Border = styled.div`
  border: 0.5px solid ${Colors.border.default};
  width: 296px;
  margin-top: 12px;
  margin-bottom: 16px;
  height: 1px;
`;

const DateWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const DateTitle = styled.div`
  color: ${Colors.text.disabled};
  font-size: 12px;
`;

const DetailDate = styled.div`
  color: ${Colors.text.disabled};
  font-size: 12px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 360px;
  min-height: 187px;
  height: fit-content;

  border: 1px solid ${Colors.background.overlay};
  background-color: ${Colors.background.base};
  padding: 16px 32px;
  border-radius: 12px;

  display: flex;
  flex-direction: column;

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: ${Colors.border.strong};
    transform: translateY(-2px);
  }
`;
