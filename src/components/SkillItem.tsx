import styled from "styled-components";
import { Colors } from "../styles/color";

export default function SkillItem() {
  return (
    <>
      <Text>Frontend</Text>
    </>
  );
}

const Text = styled.div`
  background-color: ${Colors.background.overlay};
  width: 76px;
  height: 24px;
  padding: 4px 12px;
  border-radius: 50px;
  color: white;
  font-size: 12px;
  text-align: center;
`;
