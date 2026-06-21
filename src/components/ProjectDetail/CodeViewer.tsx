import styled from "styled-components";
import { Colors } from "../../styles/color";

interface Props {
  filePath: string;
  content: string;
  isLoading: boolean;
  onCopy: () => void;
}

export default function CodeViewer({
  filePath,
  content,
  isLoading,
  onCopy,
}: Props) {
  return (
    <Wrapper>
      <Header>
        <FileName>{filePath || "파일명"}</FileName>
        <CopyButton type="button" onClick={onCopy}>
          복사하기
        </CopyButton>
      </Header>
      <pre
        style={{
          color: "white",
          overflow: "auto",
          margin: 0,
          fontSize: "13px",
        }}
      >
        {isLoading ? "로딩 중..." : content || "파일을 선택해주세요."}
      </pre>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  background-color: ${Colors.background.surface};
  border: 1px solid ${Colors.background.overlay};
  width: 616px;
  height: 343px;
  border-radius: 12px;
  background: none;
  border: 0;
  padding: 0;
  padding: 11px 15px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid ${Colors.border.strong};
`;

const FileName = styled.div`
  color: white;
  font-size: 14px;
`;

const CopyButton = styled.div`
  color: white;
  font-size: 14px;
  cursor: pointer;
`;
