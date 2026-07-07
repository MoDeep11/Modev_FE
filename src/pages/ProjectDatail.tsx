import styled from "styled-components";
import { Colors } from "../styles/color";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import HeaderV2 from "../layouts/HeaderV2";
import DownloadFile from "../components/newproject/DownloadFile";
import DeleteProject from "../components/Button/DeleteProject";
import FileTrees from "../components/ProjectDetail/FileTree";
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

  const visibleStacks = project.stacks ?? [];
  const visibleFields = project.fields ?? [];
  const visibleDependencies = project.dependencies ?? [];

  const renderSummaryItems = () => {
    if (activeTab === "fields") {
      return visibleFields.map((field, index) => (
        <SkillItem key={`${field}-${index}`}>{field}</SkillItem>
      ));
    }

    if (activeTab === "stacks") {
      return visibleStacks.map((stack, index) => (
        <SkillItem key={`${stack.stackId ?? stack.name}-${index}`}>
          {stack.name}
        </SkillItem>
      ));
    }

    return visibleDependencies.map((dependency, index) => (
      <SkillItem key={`${dependency.dependencyId ?? dependency.name}-${index}`}>
        {dependency.name}
      </SkillItem>
    ));
  };

  return (
    <WrapperAll>
      <HeaderV2 text="로그아웃" page="내 프로젝트" />

      <WrapperContainer>
        <Wrapper>
          <TopContainer>
            <Project>
              <ProjectTitle>{project.projectName}</ProjectTitle>
              <ProjectDetail>{project.description}</ProjectDetail>
            </Project>

            <TopRightContainer>
              <TabItemContainer>
                <TabItem
                  $active={activeTab === "fields"}
                  onClick={() => setActiveTab("fields")}
                >
                  기술분야
                </TabItem>
                <TabItem
                  $active={activeTab === "stacks"}
                  onClick={() => setActiveTab("stacks")}
                >
                  기술스택
                </TabItem>
                <TabItem
                  $active={activeTab === "dependencies"}
                  onClick={() => setActiveTab("dependencies")}
                >
                  의존성
                </TabItem>
              </TabItemContainer>

              <SkillItemContainer>{renderSummaryItems()}</SkillItemContainer>
            </TopRightContainer>
          </TopContainer>

          <BottomWrapper>
            <FolderWrapper>
              <FileTrees
                nodes={project.fileTree ?? []}
                onFileClick={setSelectedFile}
              />
            </FolderWrapper>

            <CodeWrapper>
              <CodeTextsWrapper>
                <FileName>{fileData?.filePath ?? "파일명"}</FileName>
                <CopyButton onClick={handleCopy}>복사하기</CopyButton>
              </CodeTextsWrapper>
              <pre
                style={{
                  color: "white",
                  overflow: "auto",
                  margin: 0,
                  fontSize: "13px",
                }}
              >
                {fileLoading
                  ? "로딩 중..."
                  : (fileData?.content ?? "파일을 선택해주세요.")}
              </pre>
            </CodeWrapper>
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

const Wrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Project = styled.div``;

const Bottom = styled.div`
  width: 900px;
  height: 39px;
  display: flex;
  justify-content: space-between;
`;

const CodeTextsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid ${Colors.border.strong};
`;

const FileName = styled.div`
  color: white;
  font-size: 14px;
`;

const CopyButton = styled.button`
  color: white;
  font-size: 14px;
  background: transparent;
  border: 0;
  cursor: pointer;
`;

const BottomWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const CodeWrapper = styled.div`
  background-color: ${Colors.background.surface};
  border: 1px solid ${Colors.background.overlay};
  width: 616px;
  height: 343px;
  border-radius: 12px;
  gap: 15px;
  padding: 11px 15px;
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

const SkillItem = styled.div`
  background-color: ${Colors.background.overlay};
  width: 76px;
  height: 24px;
  padding: 4px 12px;
  border-radius: 50px;
  color: white;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopRightContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 444px;
  height: 64px;
  flex-direction: column;
  justify-content: center;
`;

const SkillItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 444px;
  height: 24px;
  flex-wrap: wrap;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 42px;
`;

const WrapperAll = styled.div`
  background-color: ${Colors.background.base};
  min-height: 100vh;
`;

const WrapperContainer = styled.div`
  height: calc(100vh - 80px);
  width: 900px;
  height: 587px;
  display: flex;
`;

const ProjectTitle = styled.p`
  color: ${Colors.text.primary};
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;

const ProjectDetail = styled.p`
  color: ${Colors.text.secondary};
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

const TabItemContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-left: 10px;
`;

const TabItem = styled.p<{ $active: boolean }>`
  font-size: 16px;
  color: ${(props) => (props.$active ? "white" : Colors.text.disabled)};
  cursor: pointer;
  margin: 0;
`;
