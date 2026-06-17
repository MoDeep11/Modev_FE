import TopFolder from "@/assets/folder/topFolder.svg";
import Folder from "@/assets/folder/folder.svg";
import File from "@/assets/folder/file.svg";
import WriteFile from "@/assets/folder/writeFile.svg";
import styled from "styled-components";
import { Colors } from "../../styles/color";

const iconMap = {
  topFolder: TopFolder,
  folder: Folder,
  file: File,
  writeFile: WriteFile,
};

interface FoldersProps {
  text: string;
  file: "topFolder" | "folder" | "file" | "writeFile";
  depth: number;
  onClick?: () => void;
}

export default function Folders({ text, file, depth, onClick }: FoldersProps) {
  const isClickable = file === "file" || file === "writeFile";

  return (
    <Wrapper
      depth={depth}
      isClickable={isClickable}
      onClick={isClickable ? onClick : undefined}
    >
      {Array.from({ length: depth }).map((_, index) => (
        <TreeLine key={index} index={index} />
      ))}
      <Icon src={iconMap[file]} alt={text} />
      <Text file={file}>{text}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ depth: number; isClickable: boolean }>`
  position: relative;
  display: flex;
  gap: 6px;
  align-items: center;
  padding-left: ${(props) => props.depth * 24 + 12}px;
  height: 26px;
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};
  border-radius: 6px;

  &:hover {
    background-color: ${(props) =>
      props.isClickable ? Colors.background.overlay : "transparent"};
  }
`;

const TreeLine = styled.div<{ index: number }>`
  position: absolute;
  left: ${(props) => props.index * 24 + 20}px;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: ${Colors.border.strong || Colors.border.default};
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  z-index: 1;
`;

const Text = styled.p<{ file: string }>`
  font-size: 14px;
  color: ${(props) =>
    props.file === "folder" || props.file === "topFolder"
      ? "white"
      : Colors.text.secondary};
  margin: 0;
  margin-top: 3px;
  z-index: 1;
`;
