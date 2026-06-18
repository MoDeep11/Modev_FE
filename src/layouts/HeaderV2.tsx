import styled from "styled-components";
import MoDevLogo from "../assets/MoDevLogo.svg";
import { Colors } from "../styles/color";
import LoginButton from "../components/header/LoginButton";
import LogoutButton from "../components/header/LogoutButton";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  text: "로그아웃" | "로그인";
  page: "프로젝트 빌더" | "내 프로젝트";
}

export default function HeaderV2({ text, page }: HeaderProps) {
  const navigate = useNavigate();
  const Button = text === "로그인" ? LoginButton : LogoutButton;

  return (
    <Wrapper>
      <Left>
        <Img src={MoDevLogo} alt="MoDev로고" />
        <ProjectBuilder
          type="button"
          isActive={page === "프로젝트 빌더"}
          onClick={() => navigate("/main")}
        >
          프로젝트 빌더
        </ProjectBuilder>
        <MyProject
          type="button"
          isActive={page === "내 프로젝트"}
          onClick={() => navigate("/myproject")}
        >
          내 프로젝트
        </MyProject>
      </Left>
      <Button />
    </Wrapper>
  );
}

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const ProjectBuilder = styled.button<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "white" : Colors.text.disabled)};
  padding: 8px 12px;
  cursor: pointer;
  background: transparent;
  border: 0;
`;

const MyProject = styled.button<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "white" : Colors.text.disabled)};
  padding: 8px 12px;
  cursor: pointer;
  background: transparent;
  border: 0;
`;

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
  margin-right: 50px;
`;
