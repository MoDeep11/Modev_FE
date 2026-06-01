import styled from "styled-components";
import { calculatePercentage } from "../../util/progress";
import { Colors } from "../../styles/color";

interface ProgressBarProps {
  current: number;
}

interface StyledBarProps {
  $width: string;
}

export default function ProgressBar({ current }: ProgressBarProps) {
  const percentText = calculatePercentage(current);

  return (
    <ProgressContainer>
      <PercentText>{percentText}</PercentText>
      <BarTrack>
        <BarFill $width={percentText} />
      </BarTrack>
    </ProgressContainer>
  );
}

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const PercentText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${Colors.brand.default};
`;

const BarTrack = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 20px;
  background-color: ${Colors.background.surface};
  border-radius: 50px;
  border: 1px solid ${Colors.background.overlay};
  width: 854px;
  padding: 0 2px;
`;

const BarFill = styled.div<StyledBarProps>`
  height: 14px;
  width: ${(props) => props.$width}%;
  border-radius: 50px;
  transition: width 0.4s ease-out;
  background: linear-gradient(90deg, #00855b 0%, #38ffc0 100%);
  box-shadow: 0px 0px 12px 0px rgba(14, 229, 161, 0.5);
`;
