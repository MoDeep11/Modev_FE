import Header from "../../layouts/Header";
import styled from "styled-components";
import { Colors } from "../../styles/color";
import VerifyBtn from "../../assets/VerifyBtn.svg";

export default function CheckYourEmail() {
  return (
    <>
      <WrapperAll>
        <Header />
        <WrapperContainer>
          <Wrapper>
            <Title>회원가입</Title>
            <MessageContainer>
              <SentMessage>
                <UserEmail>example@email.com</UserEmail> 으로 가입 링크를
                보냈습니다.
              </SentMessage>
              <SentMessageSecond>
                메일함의 링크를 눌러 가입을 완료해 주세요
              </SentMessageSecond>
              <If>혹시 메일이 오지 않았다면 스팸 메일함을 확인해 주세요.</If>
            </MessageContainer>

            <BottomWrapper>
              <VerifyButton>
                메일함으로 이동하기 <Img src={VerifyBtn} alt="" />
              </VerifyButton>

              <LoginContainer>
                <SentQuestion>이메일을 못 받으셨나요?</SentQuestion>
                <ReSendBtn>코드 재발송</ReSendBtn>
              </LoginContainer>
            </BottomWrapper>
          </Wrapper>
        </WrapperContainer>
      </WrapperAll>
    </>
  );
}

const If = styled.p`
  color: ${Colors.text.secondary};
  font-size: 14px;
  font-weight: 400;
`;

const SentMessage = styled.p`
  color: white;
  display: flex;
`;

const SentMessageSecond = styled.p`
  color: white;
`;

const UserEmail = styled.p`
  color: ${Colors.brand.subtle};
`;

const WrapperAll = styled.div`
  background-color: ${Colors.background.base};
  min-height: 100vh;
`;

const WrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
`;

const Wrapper = styled.div`
  width: 600px;
  height: 409px;
  background-color: ${Colors.background.surface};
  border: 1px solid ${Colors.background.overlay};
  border-radius: 12px;
  padding: 64px 82px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const LoginContainer = styled.div`
  font-size: 14px;
  width: 436px;
  display: flex;
  justify-content: center;
`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;
`;

const Img = styled.img`
  width: 4px;
  height: 8px;
  margin-left: 5px;
  margin-bottom: 2px;
`;

const VerifyButton = styled.button`
  background-color: ${Colors.brand.default};
  width: 436px;
  height: 39px;
  padding: 10px 32px;
  border-radius: 12px;
  font-size: 16px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

const Title = styled.p`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const SentQuestion = styled.p`
  color: ${Colors.text.secondary};
`;

const ReSendBtn = styled.p`
  color: ${Colors.brand.default};
  cursor: pointer;
  margin-left: 5px;
`;
