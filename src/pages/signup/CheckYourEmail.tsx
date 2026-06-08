import Header from "../../layouts/Header";
import styled from "styled-components";
import { Colors } from "../../styles/color";
import { useCheckEmail } from "../../hooks/auth/signup/useCheckEmail";
import { useSendEmail } from "../../hooks/auth/signup/useSendEmail";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CheckYourEmail() {
  const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const email = location.state?.email;

  const { mutate: checkEmail, isPending } = useCheckEmail();
  const { mutate: sendEmail, isPending: isSending } = useSendEmail();

  const codeReSend = () => {
    sendEmail(email);
  };

  useEffect(() => {
    if (token) {
      checkEmail({ token });
    }
  }, [token, checkEmail]);

  return (
    <>
      <WrapperAll>
        <Header text="로그인" />
        <WrapperContainer>
          <Wrapper>
            <Title>회원가입</Title>
            <MessageContainer>
              <SentMessage>
                <UserEmail>{email}</UserEmail> 으로 가입 링크를 보냈습니다.
              </SentMessage>
              <SentMessageSecond>
                메일함의 링크를 눌러 가입을 완료해 주세요
              </SentMessageSecond>
              <If>혹시 메일이 오지 않았다면 스팸 메일함을 확인해 주세요.</If>
            </MessageContainer>

            <BottomWrapper>
              <VerifyButton onClick={codeReSend}>코드 재발송</VerifyButton>
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

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;
`;

const VerifyButton = styled.button`
  background-color: ${Colors.brand.default};
  width: 436px;
  height: 39px;
  padding: 10px 32px;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 20px;
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
