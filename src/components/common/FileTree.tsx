import type { FileTreeNode } from "../../apis/project/type";
import Folders from "../Build/Folders";

interface Props {
  nodes: FileTreeNode[];
  parentPath?: string;
  depth?: number;
  onFileClick: (filePath: string) => void;
}

export default function FileTree({
  nodes,
  parentPath = "",
  depth = 0,
  onFileClick,
}: Props) {
  return (
    <>
      {nodes.map((node) => {
        const currentPath = parentPath
          ? `${parentPath}/${node.name}`
          : node.name;

        const isDirectory = node.type === "DIRECTORY";

        return (
          <div key={currentPath}>
            <Folders
              file={
                isDirectory ? (depth === 0 ? "topFolder" : "folder") : "file"
              }
              text={isDirectory ? `${node.name}/` : node.name}
              depth={depth}
              onClick={
                isDirectory
                  ? undefined
                  : () => onFileClick(node.path || currentPath)
              }
            />

            {isDirectory && node.children && node.children.length > 0 && (
              <FileTree
                nodes={node.children}
                parentPath={currentPath}
                depth={depth + 1}
                onFileClick={onFileClick}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
