import styled from "styled-components";
import { Colors } from "../../styles/color";

interface Props {
  label: string;
}

export default function SkillBadge({ label }: Props) {
  return <Badge>{label}</Badge>;
}

const Badge = styled.div`
  background-color: ${Colors.background.overlay};
  padding: 4px 12px;
  border-radius: 50px;
  color: white;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
`;
