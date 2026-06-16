import styled from "styled-components";
import { Colors } from "../../styles/color";

const MAX_VISIBLE_SKILLS = 3;

interface ProjectBoxProps {
  title: string;
  text: string;
  createdAt: string;
  lastModifiedAt: string;
  stacks: string[];
}

export default function ProjectBox({
  title,
  text,
  createdAt,
  lastModifiedAt,
  stacks,
}: ProjectBoxProps) {
  const visibleStacks = stacks.slice(0, MAX_VISIBLE_SKILLS);
  const hiddenCount = stacks.length - MAX_VISIBLE_SKILLS;

  return (
    <Wrapper>
      <TopWrapper>
        <ProjectName>{title}</ProjectName>
        <ProjectDetail>{text}</ProjectDetail>
      </TopWrapper>

      <Border />

      <DateWrapper>
        <DateTitle>생성일</DateTitle>
        <ShortBorder />
        <DetailDate>{createdAt}</DetailDate>
      </DateWrapper>

      <DateWrapper style={{ marginBottom: "12px" }}>
        <DateTitle>최종 수정일</DateTitle>
        <ShortBorder />
        <DetailDate>{lastModifiedAt}</DetailDate>
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
  width: 76px;
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
  height: 187px;
  border: 1px solid ${Colors.background.overlay};
  background-color: ${Colors.background.base};
  padding: 16px 32px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;
