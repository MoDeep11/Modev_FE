import styled from "styled-components";
import { Colors } from "../../styles/color";
import { useDeleteMyProject } from "../../hooks/myproject";
import { useParams } from "react-router-dom";

export default function DeleteProject() {
  const { id } = useParams<{ id: string }>();

  const { mutate: handleDelete, isPending } = useDeleteMyProject();

  const deleteFunc = () => {
    if (!id) return;

    const ok = window.confirm("정말 삭제하시겠습니까?");

    if (!ok) return;

    handleDelete({
      projectId: id,
    });
  };

  return (
    <Delete onClick={deleteFunc}>{isPending ? "삭제 중..." : "삭제"}</Delete>
  );
}

const Delete = styled.div`
  padding: 10px 32px;
  border: 1px solid ${Colors.status.error};
  color: ${Colors.status.error};
  background-color: ${Colors.background.base};
  border-radius: 10px;
  width: 92px;
  height: 39px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
