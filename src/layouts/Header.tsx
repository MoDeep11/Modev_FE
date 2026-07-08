import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MoDevLogo from "../assets/MoDevLogo.svg";
import { Colors } from "../styles/color";
import LoginButton from "../components/header/LoginButton";
import LogoutButton from "../components/header/LogoutButton";

interface HeaderProps {
  text: "로그아웃" | "로그인" | "메인으로";
  onClick?: () => void;
}

export default function Header({ text, onClick }: HeaderProps) {
  const navigate = useNavigate();

  const Button = text === "로그인" ? LoginButton : LogoutButton;

  return (
    <Wrapper>
      <Img src={MoDevLogo} alt="MoDev로고" />

      {text === "메인으로" ? (
        <MainButton
          onClick={() => {
            if (onClick) {
              onClick();
            } else {
              navigate("/main");
            }
          }}
        >
          메인으로
        </MainButton>
      ) : (
        <Button />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${Colors.background.base};
  height: 64px;
  padding: 12px 120px;
  border-bottom: 1px solid ${Colors.background.overlay};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 90px;
  height: 24px;
`;

const MainButton = styled.button`
  background-color: ${Colors.background.base};
  border: 1px solid ${Colors.background.overlay};
  color: white;
  padding: 8px 24px;
  height: 40px;
  border-radius: 50px;
  cursor: pointer;
`;
