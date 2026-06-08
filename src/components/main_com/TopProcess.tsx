import styled from "@emotion/styled";
import { Colors } from "../../styles/color";

interface ProcessProps {
  num: string | number;
  text: string;
  use: boolean; 
}

interface StyledProps {
  $use: boolean; 
}

const Process = ({ num, text, use }: ProcessProps) => {
  return (
    <Top_process $use={use}>
      <Process_num $use={use}>{num}</Process_num>
      <Process_text $use={use}>{text}</Process_text>
    </Top_process>
  );
};

const Top_process = styled.div<StyledProps>`
  padding: 9px 20px;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${(props) => (props.$use ? Colors.brand.default : Colors.background.overlay)};
  background-color: ${(props) => (props.$use ? "rgba(14, 229, 161, 0.1)" : "none" )};
  border-radius: 33554400px;
`;

const Process_num = styled.div<StyledProps>`
  color: ${(props) => (props.$use ? "#fff": Colors.text.disabled)};
  display: flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 33554400px;
  background-color: ${(props)=>(props.$use ? Colors.brand.subtle : Colors.background.elevated)};
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
`;

const Process_text = styled.p<StyledProps>`
  color: ${(props) => (props.$use ? "#fff" : Colors.text.disabled)};
  font-size: 14px;
  font-weight: 400;
`;

export default Process;