import styled from "styled-components";
import plus from "../../assets/plus.svg";
import check from "../../assets/check.svg";
import { Colors } from "../../styles/color";

interface SkillBlockProps {
  title: string;
  text: string;
  isSelected?: boolean; // 💡 부모(Mainpage_3)에게 선택 상태를 주입받습니다.
}

// 🎯 내부 useState를 제거하고, 부모가 넘겨주는 isSelected를 기준으로 렌더링합니다.
export default function SkillBlock({ title, text, isSelected = false }: SkillBlockProps) {
  return (
    <Wrapper $isSelect={isSelected}>
      <TopContainer>
        {/* 💡 선택 상태에 따라 plus / check 아이콘이 스위칭됩니다. */}
        <Img src={isSelected ? check : plus} alt="status" />
        <Title>{title}</Title>
      </TopContainer>
      <Text>{text}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $isSelect: boolean }>`
  width: 374px;
  height: 94px;
  padding: 10px 24px;
  border-radius: 6px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  border: 1px solid
    ${({ $isSelect }) =>
      $isSelect ? Colors.brand.default : Colors.background.overlay};

  box-shadow: ${({ $isSelect }) =>
    $isSelect ? `0 0 10px 0 ${Colors.brand.default}4D` : "none"};

  background-color: ${({ $isSelect }) =>
    $isSelect ? `${Colors.brand.default}1A` : Colors.background.surface};

  transition: 0.2s;
`;

const TopContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 18px;
  margin-top: 3px;
  color: white;
`;

const Text = styled.div`
  font-size: 14px;
  color: ${Colors.text.secondary};
`;

const Img = styled.img``;