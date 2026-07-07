import Folders from "../Build/Folders";
import type { FileTreeNode } from "../../apis/project/type";

interface FileTreeProps {
  nodes?: FileTreeNode[] | null;
  depth?: number;
  onFileClick: (filePath: string) => void;
}

export default function FileTrees({
  nodes,
  depth = 0,
  onFileClick,
}: FileTreeProps) {
  const safeNodes = Array.isArray(nodes) ? nodes : [];

  if (safeNodes.length === 0) {
    return null;
  }

  return (
    <>
      {safeNodes.map((node) => {
        const fileType =
          node.type === "DIRECTORY"
            ? depth === 0
              ? "topFolder"
              : "folder"
            : "file";

        return (
          <div key={node.path || node.name}>
            <Folders
              file={fileType}
              text={node.type === "DIRECTORY" ? `${node.name}/` : node.name}
              depth={depth}
              onClick={
                node.type === "FILE" ? () => onFileClick(node.path) : undefined
              }
            />
            {node.children && node.children.length > 0 && (
              <FileTrees
                nodes={node.children}
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
