import Header from "../../layouts/Header";
import styled from "styled-components";
import { Colors } from "../../styles/color";
import { useCheckEmail, useSendEmail } from "../../hooks/auth";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function CheckYourEmail() {
  const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const email = location.state?.email;

  const { mutate: checkEmail } = useCheckEmail();
  const { mutate: sendEmail, isPending: isSending } = useSendEmail();

  const codeReSend = () => {
    sendEmail({ email });
  };

  useEffect(() => {
    if (token) {
      checkEmail({ token });
    }
  }, [token, checkEmail]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getCode = () => inputRefs.current.map((el) => el?.value ?? "").join("");

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.value.replace(/\D/g, "");
    e.target.value = val.slice(-1);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && val) {
      const code = getCode();
      if (code.length === 6) checkEmail({ token: code });
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <WrapperAll>
        <Header text="로그인" />
        <WrapperContainer>
          <Wrapper>
            <Title>회원가입</Title>
            <MessageContainer>
              <SentMessage>
                <UserEmail>{email}</UserEmail>&nbsp;으로 인증 코드를 보냈습니다.
              </SentMessage>
              <SentMessageSecond>6자리 코드를 입력해 주세요</SentMessageSecond>

              <CodeInputRow>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <CodeInput
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    onChange={(e) => handleChange(i, e)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                  />
                ))}
              </CodeInputRow>

              <If>혹시 메일이 오지 않았다면 스팸 메일함을 확인해 주세요.</If>
            </MessageContainer>

            <BottomWrapper>
              <CheckButton onClick={() => checkEmail}>확인</CheckButton>
              <VerifyButton onClick={codeReSend}>
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

const CodeInputRow = styled.div`
  display: flex;
  gap: 10px;
`;

const CodeInput = styled.input`
  width: 44px;
  height: 52px;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  border-radius: 8px;
  background-color: ${Colors.background.base};
  border: 1px solid ${Colors.background.overlay};
  color: white;
  caret-color: transparent;

  &:focus {
    outline: none;
    border-color: ${Colors.brand.default};
  }
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
  gap: 3px;
`;

const VerifyButton = styled.div`
  background-color: ${Colors.background.base};
  color: white;
  cursor: pointer;
  font-size: 13px;
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
