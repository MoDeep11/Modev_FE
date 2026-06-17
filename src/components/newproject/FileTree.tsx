import Folders from "./newFolders";
import type { FileTreeNode } from "../../apis/newproject/type";

interface FileTreeProps {
  nodes: FileTreeNode[];
  parentPath?: string;
  depth?: number;
  onFileClick: (filePath: string) => void;
}

export default function FileTrees({
  nodes,
  parentPath = "",
  depth = 0,
  onFileClick,
}: FileTreeProps) {
  return (
    <>
      {nodes.map((node) => {
        const currentPath = parentPath
          ? `${parentPath}/${node.name}`
          : node.name;
        const fileType =
          node.type === "DIRECTORY"
            ? depth === 0
              ? "topFolder"
              : "folder"
            : "file";

        return (
          <div key={currentPath}>
            <Folders
              file={fileType}
              text={node.type === "DIRECTORY" ? `${node.name}/` : node.name}
              depth={depth}
              onClick={
                node.type === "FILE"
                  ? () => onFileClick(currentPath)
                  : undefined
              }
            />
            {node.children?.length > 0 && (
              <FileTrees
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
