import styled from "styled-components";
import { Colors } from "../../styles/color";
import { useDeleteMyProject } from "../../hooks/myproject";
import { useParams } from "react-router-dom";

export default function DeleteProject() {
  const { id } = useParams<{ id: string }>();

  const { mutate: handleDelete, isPending } = useDeleteMyProject();
  const deleteFunc = () => {
    handleDelete({ projectId: Number(id) });
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
  width: 92ppx;
  height: 39px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
