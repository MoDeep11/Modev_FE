import styled from "styled-components";
import { Colors } from "../../styles/color";
import { useDownloadZip } from "../../hooks/downloadZip";
import { useParams } from "react-router-dom";

export default function DownloadFile() {
  const { mutate: download, isPending } = useDownloadZip();
  const { id } = useParams<{ id: string }>();

  const downloadFunc = () => {
    download({ projectId: Number(id) });
  };

  return (
    <Wrapper onClick={downloadFunc} disabled={isPending}>
      {isPending ? "로딩 중..." : ".zip 파일 다운로드"}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  padding: 10px 32px;
  border: 1px solid ${Colors.border.strong};
  color: White;
  background-color: ${Colors.background.base};
  border-radius: 10px;
  width: 185px;
  height: 39px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
