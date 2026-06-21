import Folders from "../Build/Folders";
import type { FileTreeNode } from "../../apis/project/type";

interface FileTreeProps {
  nodes: FileTreeNode[];
  depth?: number;
  onFileClick: (filePath: string) => void;
}

export default function FileTrees({
  nodes,
  depth = 0,
  onFileClick,
}: FileTreeProps) {
  return (
    <>
      {nodes.map((node) => {
        const fileType =
          node.type === "DIRECTORY"
            ? depth === 0
              ? "topFolder"
              : "folder"
            : "file";

        return (
          <div key={node.path}>
            <Folders
              file={fileType}
              text={node.type === "DIRECTORY" ? `${node.name}/` : node.name}
              depth={depth}
              onClick={
                node.type === "FILE"
                  ? () => onFileClick(node.path) 
                  : undefined
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
