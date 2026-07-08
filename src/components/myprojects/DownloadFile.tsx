import styled from "styled-components";
import { Colors } from "../../styles/color";
import { useDownloadZip } from "../../hooks/downloadZip";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function DownloadFile() {
  console.log("DownloadFile 렌더링됨");
  const { mutate: download, isPending } = useDownloadZip();
  const { id } = useParams<{ id: string }>();

  const downloadFunc = () => {
    console.log("클릭됨, id:", id); // 이게 안 찍히면 onClick 자체가 안 붙은 것
    if (!id) {
      toast.error("오류가 발생했습니다.");
      return;
    }
    console.log("download 호출 직전");
    download({ projectId: id });
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
