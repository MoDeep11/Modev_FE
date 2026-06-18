import styled from "styled-components";
import { Colors } from "../../styles/color";
import Login from "../../assets/Login.svg";
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Img src={Login}></Img>
      <Text onClick={() => navigate("/")}>로그인</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${Colors.background.base};
  border: 1px solid ${Colors.background.overlay};
  color: white;
  padding: 8px 24px;
  width: fit-content;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  gap: 6px;
`;

const Img = styled.img`
  width: 16px;
  height: 16px;
`;

const Text = styled.p`
  font-size: 16px;
  cursor: pointer;
`;
