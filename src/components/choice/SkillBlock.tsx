import styled from "styled-components";
import plus from "../../assets/plus.svg";
import check from "../../assets/check.svg";
import { Colors } from "../../styles/color";
import { useState } from "react";

interface SkillBlockProps {
  title: string;
  text: string;
}

export default function SkillBlock({ title, text }: SkillBlockProps) {
  const [isSelect, setIsSelect] = useState(false);

  return (
    <Wrapper
      $isSelect={isSelect}
      onClick={() => {
        setIsSelect(!isSelect);
      }}
    >
      <TopContainer>
        <Img src={isSelect ? check : plus} />
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
