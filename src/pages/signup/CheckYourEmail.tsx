import Header from "../../layouts/Header";
import styled from "styled-components";
import { Colors } from "../../styles/color";
import { useCheckEmail, useSendEmail } from "../../hooks/auth";
import { useLocation } from "react-router-dom";
import CodeInput from "../../components/auth/CodeInput";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function CheckYourEmail() {
  const location = useLocation();
  const email = location.state?.email;

  const { mutate: checkEmail } = useCheckEmail();
  const { mutate: sendEmail, isPending: isSending } = useSendEmail();

  const getCodeRef = useRef<() => string>(() => "");

  const handleConfirm = () => {
    const code = getCodeRef.current();
    if (code.length < 6) {
      toast.error("6자리 코드를 모두 입력해주세요.");
      return;
    }
    checkEmail({ code: code });
  };

  const codeReSend = () => {
    if (!email || isSending) return;
    sendEmail({ email });
  };
  return (
    <>
      <WrapperAll>
        <Header text="로그인" />
        <WrapperContainer>
          <Wrapper>
            <Title>회원가입</Title>
            <MessageContainer>
              <SentMessage>인증 코드를 보냈습니다.</SentMessage>
              <SentMessageSecond>6자리 코드를 입력해 주세요</SentMessageSecond>
              <CodeInput
                onReady={(fn) => {
                  getCodeRef.current = fn;
                }}
              />
              <If>혹시 메일이 오지 않았다면 스팸 메일함을 확인해 주세요.</If>
            </MessageContainer>

            <BottomWrapper>
              <CheckButton onClick={handleConfirm}>확인</CheckButton>
              <VerifyButton $isSending={isSending} onClick={codeReSend}>
                {isSending ? "발송 중..." : "코드 재발송"}
              </VerifyButton>
            </BottomWrapper>
          </Wrapper>
        </WrapperContainer>
      </WrapperAll>
    </>
  );
}

const CheckButton = styled.button`
  background-color: ${Colors.brand.default};
  width: 436px;
  height: 39px;
  padding: 10px 32px;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const If = styled.p`
  color: ${Colors.text.secondary};
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 30px;
`;

const SentMessage = styled.p`
  color: white;
  display: flex;
`;

const SentMessageSecond = styled.p`
  color: white;
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
  gap: 3px;
`;

const VerifyButton = styled.div<{ $isSending: boolean }>`
  background-color: ${Colors.background.base};
  color: white;
  font-size: 13px;
  cursor: ${({ $isSending }) => ($isSending ? "not-allowed" : "pointer")};
  pointer-events: ${({ $isSending }) => ($isSending ? "none" : "auto")};
  opacity: ${({ $isSending }) => ($isSending ? 0.5 : 1)};

  transition: opacity 0.2s ease-in-out;
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
  margin-bottom: 30px;
`;
