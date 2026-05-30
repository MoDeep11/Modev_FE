import styled from "styled-components";
import MoDevLogo from "../assets/MoDevLogo.svg";
import { Colors } from "../styles/color";
import LoginButton from "../components/header/LoginButton";

export default function Header() {
  return (
    <>
      <Wrapper>
        <Img src={MoDevLogo} alt="MoDev로고" />
        <LoginButton />
      </Wrapper>
    </>
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
