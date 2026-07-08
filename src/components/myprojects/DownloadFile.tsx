import styled from "styled-components";
import { Colors } from "../../styles/color";
import { useNewDownloadZip } from "../../hooks/downloadZip";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function DownloadFile() {
  const { mutate: download, isPending } = useNewDownloadZip();
  const { id, projectId } = useParams<{ id?: string; projectId?: string }>();
  const targetId = projectId ?? id;

  const downloadFunc = () => {
    if (!targetId) {
      toast.error("오류가 발생했습니다.");
      return;
    }

    download({
      projectId: targetId,
    });
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
  width: 200px;
  height: 39px;
  font-size: 16px;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
