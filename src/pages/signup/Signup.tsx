import Header from "../../layouts/Header";
import styled from "styled-components";
import { Colors } from "../../styles/color";
import { useSignup } from "../../hooks/auth/signup/useSignup";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Signup() {
  const location = useLocation();
  const email = location.state?.userEmail || "";
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { mutate: sendPassword, isPending } = useSignup();

  const PasswordInput = (e) => setPassword(e.target.value);
  const CheckPasswordInput = (e) => setPasswordConfirm(e.target.value);

  const SignupHandle = () => {
    if (!password.trim() || !passwordConfirm.trim()) {
      alert("비밀번호를 입력해주세요!");
      return;
    }

    sendPassword({ email, password, passwordConfirm });
  };

  return (
    <>
      <WrapperAll>
        <Header text="로그인" />
        <WrapperContainer>
          <Wrapper>
            <Title>회원가입</Title>

            <InputAllContainer>
              <InputContainer>
                <InputText>비밀번호</InputText>
                <Input
                  type="password"
                  onChange={PasswordInput}
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                ></Input>
              </InputContainer>

              <InputContainer>
                <InputText>비밀번호 확인</InputText>
                <Input
                  type="password"
                  onChange={CheckPasswordInput}
                  placeholder="비밀번호를 다시 입력해주세요."
                  value={passwordConfirm}
                ></Input>
              </InputContainer>
            </InputAllContainer>

            <BottomWrapper>
              <VerifyButton onClick={SignupHandle} disabled={isPending}>
                {isPending ? "가입 중..." : "회원가입"}
              </VerifyButton>

              <LoginContainer>
                <SignInQuestion>계정이 있으신가요?</SignInQuestion>
                <LoginBtn>로그인</LoginBtn>
              </LoginContainer>
            </BottomWrapper>
          </Wrapper>
        </WrapperContainer>
      </WrapperAll>
    </>
  );
}

const WrapperAll = styled.div`
  background-color: ${Colors.background.base};
  min-height: 100vh;
`;

const InputAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const WrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
`;

const Wrapper = styled.div`
  width: 600px;
  height: 503px;
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

const SignInQuestion = styled.p`
  color: ${Colors.text.secondary};
`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;
`;

const LoginBtn = styled.p`
  color: ${Colors.brand.default};
  cursor: pointer;
  margin-left: 5px;
`;

const VerifyButton = styled.button`
  background-color: ${Colors.brand.default};
  width: 436px;
  height: 39px;
  padding: 10px 32px;
  border-radius: 12px;
  font-size: 16px;
`;

const InputContainer = styled.div`
  width: 436px;
  height: 70px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputText = styled.p`
  color: white;
  font-size: 16px;
`;

const Input = styled.input`
  width: 436px;
  height: 40px;
  font-size: 16px;
  border-radius: 6px;
  padding: 8px 16px;
  background-color: ${Colors.background.base};
  border: 1px solid ${Colors.background.base};
  color: ${Colors.text.disabled};

  &::placeholder {
    color: ${Colors.text.disabled};
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.p`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;
