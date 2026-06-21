import styled from "styled-components";
import { Colors } from "../styles/color";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import HeaderV2 from "../layouts/HeaderV2";
import DownloadFile from "../components/newproject/DownloadFile";
import DeleteProject from "../components/Button/DeleteProject";
import FileTrees from "../components/ProjectDetail/FileTree";

import ProjectInfo from "../components/ProjectDetail/ProjectInfo";
import TabBar from "../components/ProjectDetail/TabBar";
import SkillBadgeList from "../components/ProjectDetail/SkillBadgeList";
import CodeViewer from "../components/ProjectDetail/CodeViewer";

import { useProject, useFileContent } from "../hooks/useProject";

type Tab = "fields" | "stacks" | "dependencies";

export default function ProjectDetailCheck() {
  const { id } = useParams<{ id: string }>();
  const [selectedFile, setSelectedFile] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("fields");

  useEffect(() => {
    setSelectedFile("");
  }, [id]);

  const {
    data: project,
    isLoading: projectLoading,
    isError: projectError,
  } = useProject(id ?? "");
  const { data: fileData, isLoading: fileLoading } = useFileContent(
    id ?? "",
    selectedFile,
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fileData?.content ?? "");
    } catch {}
  };

  if (!id) return <div>잘못된 접근입니다.</div>;
  if (projectLoading) return <div>로딩 중...</div>;
  if (projectError || !project)
    return <div>프로젝트를 불러오지 못했습니다.</div>;

  return (
    <WrapperAll>
      <HeaderV2 text="로그아웃" page="내 프로젝트" />
      <WrapperContainer>
        <Wrapper>
          <TopContainer>
            <ProjectInfo
              name={project.projectName}
              description={project.description}
            />
            <TopRightContainer>
              <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
              <SkillBadgeList activeTab={activeTab} project={project} />
            </TopRightContainer>
          </TopContainer>

          <BottomWrapper>
            <FolderWrapper>
              <FileTrees
                nodes={project.fileTree ?? []}
                onFileClick={setSelectedFile}
              />
            </FolderWrapper>
            <CodeViewer
              filePath={fileData?.filePath ?? ""}
              content={fileData?.content ?? ""}
              isLoading={fileLoading}
              onCopy={handleCopy}
            />
          </BottomWrapper>

          <Bottom>
            <DeleteProject />
            <BottomRight>
              <DownloadFile />
              <ModifySkillStack>기술 스택 수정</ModifySkillStack>
              <Check>확인</Check>
            </BottomRight>
          </Bottom>
        </Wrapper>
      </WrapperContainer>
    </WrapperAll>
  );
}

const WrapperAll = styled.div`
  background-color: ${Colors.background.base};
  min-height: 100vh;
`;
const WrapperContainer = styled.div`
  width: 900px;
  height: 587px;
  display: flex;
`;
const Wrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 42px;
`;
const TopRightContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 444px;
  height: 64px;
  flex-direction: column;
  justify-content: center;
`;
const BottomWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;
const FolderWrapper = styled.div`
  background-color: ${Colors.background.surface};
  border: 1px solid ${Colors.background.overlay};
  width: 260px;
  height: 343px;
  border-radius: 12px;
  padding: 10px;
  overflow-y: auto;
`;
const Bottom = styled.div`
  width: 900px;
  height: 39px;
  display: flex;
  justify-content: space-between;
`;
const BottomRight = styled.div`
  display: flex;
  gap: 12px;
`;
const ModifySkillStack = styled.div`
  padding: 10px 32px;
  border: 1px solid ${Colors.border.strong};
  color: white;
  background-color: ${Colors.background.base};
  border-radius: 10px;
  width: 160px;
  display: flex;
  align-items: center;
  height: 39px;
  cursor: pointer;
`;
const Check = styled.div`
  cursor: pointer;
  padding: 10px 32px;
  background-color: ${Colors.brand.default};
  width: 92px;
  height: 39px;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;
