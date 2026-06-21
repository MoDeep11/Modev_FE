import styled from "styled-components";
import { Colors } from "../../styles/color";

interface Props {
  name: string;
  description: string;
}

export default function ProjectInfo({ name, description }: Props) {
  return (
    <Container>
      <Title>{name}</Title>
      <Detail>{description}</Detail>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.p`
  color: ${Colors.text.primary};
  font-family: Inter;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
`;

const Detail = styled.p`
  color: ${Colors.text.secondary};
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;