import styled from "styled-components";
import { Colors } from "../../styles/color";

export default function ProjectDelete() {
  return (
    <Wrapper>
      <Text>정말 이 프로젝트를 삭제하시겠습니까?</Text>
      <Input placeholder="프로젝트명을 입력하여 삭제를 확인하세요"></Input>
      <ButtonContainer>
        <CancelButton>취소</CancelButton>
        <DeleteButton>삭제</DeleteButton>
      </ButtonContainer>
    </Wrapper>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 462px;
  height: 247px;
  padding: 36px 48px;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${Colors.background.surface};
  border-radius: 12px;
`;

const Text = styled.p`
  color: ${Colors.text.primary};
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  align-self: stretch;
  margin-bottom: 24px;
`;

const Input = styled.input`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${Colors.background.base};
  border-radius: 6px;
  border: 1px solid ${Colors.background.base};
  align-self: stretch;
  font-size: 16px;
  padding: 8px 16px;
  color: white;
  margin-bottom: 48px;

  &:focus {
    outline: none;
  }
`;

const CancelButton = styled.button`
  display: flex;
  padding: 10px 32px;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 39px;
  border-radius: 12px;
  border: 1px solid ${Colors.border.strong};
  background-color: ${Colors.background.surface};
  color: white;
  font-size: 16px;
`;

const DeleteButton = styled.button`
  display: flex;
  padding: 10px 32px;
  width: 175px;
  height: 39px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${Colors.status.error};
  color: ${Colors.status.error};
  background-color: ${Colors.status.error}1A;
  font-size: 16px;
`;
