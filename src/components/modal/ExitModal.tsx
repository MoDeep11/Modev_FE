import styled from "styled-components";
import { Colors } from "../../styles/color";

export default function ExitModal() {
  return (
    <Wrapper>
      <Title>저장되지 않은 변경사항이 있습니다.</Title>
      <Text>
        지금 나가시면 지금까지 재선택한 스택 정보가 모두 초기화됩니다. 변경을
        취소하고 돌아가시겠습니까?
      </Text>
      <ButtonContainer>
        <ModifyButton>계속 수정하기</ModifyButton>
        <ExitButton>나가기</ExitButton>
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
  width: 485px;
  height: 234px;
  padding: 36px 48px;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${Colors.background.surface};
  border-radius: 12px;
`;

const Text = styled.p`
  color: ${Colors.text.secondary};
  text-align: center;
  font-size: 14px;
  align-self: stretch;
  margin-bottom: 48px;
  line-height: 20px;
`;

const Title = styled.p`
  color: ${Colors.text.primary};
  text-align: center;
  font-size: 16px;
  align-self: stretch;
  line-height: 19.2px;
  margin-bottom: 16px;
`;

const ModifyButton = styled.button`
  display: flex;
  padding: 10px 32px;
  justify-content: center;
  align-items: center;
  width: 186.5px;
  height: 39px;
  border-radius: 12px;
  border: 1px solid ${Colors.border.strong};
  background-color: ${Colors.background.surface};
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const ExitButton = styled.button`
  display: flex;
  padding: 10px 32px;
  width: 186.5px;
  height: 39px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${Colors.status.error};
  color: ${Colors.status.error};
  background-color: ${Colors.status.error}1A;
  font-size: 16px;
  cursor: pointer;
`;
