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
  // ⭐ 백엔드 파일 조회 API용 path 변환
  const normalizeFilePath = (path: string) => {
    if (path.startsWith("frontend/")) {
      return path.replace("frontend/", "");
    }

    console.log(node.path);
    return path;
  };

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
                  : () => {
                      const filePath = node.path || currentPath;

                      console.log(filePath);

                      onFileClick(filePath);
                    }
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
