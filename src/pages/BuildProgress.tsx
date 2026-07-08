import styled from "styled-components";
import HeaderV2 from "../layouts/HeaderV2";
import { Colors } from "../styles/color";
import ProgressBar from "../components/Build/progressBar";
import under from "../assets/under.svg";
import FileTree from "../components/common/FileTree";
import { useParams } from "react-router-dom";
import { useProjectStatus } from "../hooks/newproject";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProjectStream } from "../hooks/useProjectStream";
import { getFileContent } from "../apis/newproject";
import { getProjectDetail } from "../apis/project/index";
import type { ProjectDetail } from "../apis/project/type";

interface FileContentState {
  filePath: string;
  content: string;
  language?: string;
}

export default function BuildProgress() {
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedFile, setSelectedFile] = useState("");
  const [projectForm, setProjectForm] = useState<any>({});

  const [activeTab, setActiveTab] = useState<"field" | "stack" | "dependency">(
    "field",
  );

  const [fileContent, setFileContent] = useState<FileContentState | null>(null);
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [fileError, setFileError] = useState(false);

  useEffect(() => {
    setSelectedFile("");
    // sessionStorage에서 프로젝트 폼 데이터 가져오기
    const savedForm = sessionStorage.getItem("projectForm");
    if (savedForm) {
      setProjectForm(JSON.parse(savedForm));
    }
  }, [projectId]);

  const { data: projectData, refetch } = useProjectStatus(projectId || "");

  // 🔧 sessionStorage의 projectForm은 생성 성공 시 이미 삭제되므로,
  // 화면 상단 정보는 서버에서 실제 저장된 프로젝트 상세를 조회해서 표시
  const { data: projectDetailRes } = useQuery({
    queryKey: ["projectDetail", projectId],
    queryFn: () => getProjectDetail(projectId as string),
    enabled: !!projectId,
  });

  const projectDetail: ProjectDetail | undefined = projectDetailRes?.data;

  const { progress, message, completed } = useProjectStream(projectId || "");

  useEffect(() => {
    if (!completed) return;

    refetch();
  }, [completed, refetch]);

  // 🔧 파일 클릭 시 해당 파일 내용 조회
  useEffect(() => {
    if (!selectedFile || !projectId) {
      setFileContent(null);
      setFileError(false);
      return;
    }

    let ignore = false;
    setIsFileLoading(true);
    setFileError(false);

    getFileContent({ projectId, filePath: selectedFile })
      .then((res: any) => {
        if (ignore) return;
        setFileContent(res);
      })
      .catch((err) => {
        if (ignore) return;
        console.error("❌ 파일 내용 조회 실패:", err);
        setFileError(true);
        setFileContent(null);
      })
      .finally(() => {
        if (!ignore) setIsFileLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [selectedFile, projectId]);

  const handleCopy = async () => {
    if (!fileContent?.content) return;
    try {
      await navigator.clipboard.writeText(fileContent.content);
      alert("복사되었습니다.");
    } catch (err) {
      console.error("❌ 복사 실패:", err);
      alert("복사에 실패했습니다.");
    }
  };

  const fileTree = projectData?.result?.fileTree ?? [];
  const status = projectData?.status ?? "PENDING";
  return (
    <>
      <WrapperAll>
        <HeaderV2 text="로그아웃" page="프로젝트 빌더" />

        <WrapperContainer>
          <Wrapper>
            <TopContainer>
              <Project>
                <ProjectTitle>
                  {projectDetail?.projectName ||
                    projectForm.projectName ||
                    "프로젝트명"}
                </ProjectTitle>
                <ProjectDetail>
                  {projectDetail?.description ||
                    projectForm.description ||
                    "프로젝트 설명이 들어가~입니다"}
                </ProjectDetail>
                <ProjectIdDisplay>ID: {projectId}</ProjectIdDisplay>
              </Project>

              <TopRightContainer>
                <TabItemContainer>
                  <TabItem
                    $active={activeTab === "field"}
                    onClick={() => setActiveTab("field")}
                  >
                    기술분야
                  </TabItem>

                  <TabItem
                    $active={activeTab === "stack"}
                    onClick={() => setActiveTab("stack")}
                  >
                    기술스택
                  </TabItem>

                  <TabItem
                    $active={activeTab === "dependency"}
                    onClick={() => setActiveTab("dependency")}
                  >
                    의존성
                  </TabItem>
                </TabItemContainer>

                <SkillItemContainer>
                  {activeTab === "field" &&
                    (projectDetail?.fields?.length ? (
                      projectDetail.fields.map((field) => (
                        <SkillItem key={field}>{field}</SkillItem>
                      ))
                    ) : projectForm.fieldIds?.length ? (
                      projectForm.fieldIds.map((field: string) => (
                        <SkillItem key={field}>{field}</SkillItem>
                      ))
                    ) : (
                      <SkillItem>선택 안됨</SkillItem>
                    ))}

                  {activeTab === "stack" &&
                    (projectDetail?.stacks?.length ? (
                      projectDetail.stacks.map((stack) => (
                        <SkillItem key={stack.stackId}>{stack.name}</SkillItem>
                      ))
                    ) : projectForm.stackIds?.length ? (
                      projectForm.stackIds.map((stack: string) => (
                        <SkillItem key={stack}>{stack}</SkillItem>
                      ))
                    ) : (
                      <SkillItem>선택 안됨</SkillItem>
                    ))}

                  {activeTab === "dependency" &&
                    (projectDetail?.dependencies?.length ? (
                      projectDetail.dependencies.map((dep) => (
                        <SkillItem key={dep.dependencyId}>{dep.name}</SkillItem>
                      ))
                    ) : projectForm.dependencyIds?.length ? (
                      projectForm.dependencyIds.map((dep: string) => (
                        <SkillItem key={dep}>{dep}</SkillItem>
                      ))
                    ) : (
                      <SkillItem>선택 안됨</SkillItem>
                    ))}
                </SkillItemContainer>
              </TopRightContainer>
            </TopContainer>

            <Progress>
              <ProgressBar current={progress} />
              <ProgressBarBottom>
                <StatusDescription>
                  {message ||
                    (status === "PENDING"
                      ? "생성 대기 중..."
                      : status === "IN_PROGRESS"
                        ? "프로젝트 생성 중..."
                        : status === "COMPLETED"
                          ? "생성 완료"
                          : "생성 실패")}
                </StatusDescription>

                <Detail>
                  과정 보기{" "}
                  <img
                    style={{ marginLeft: "7px", marginTop: "1px" }}
                    src={under}
                    alt=""
                  />
                </Detail>
              </ProgressBarBottom>
            </Progress>

            <BottomWrapper>
              <FolderWrapper>
                {fileTree.length > 0 ? (
                  <FileTree nodes={fileTree} onFileClick={setSelectedFile} />
                ) : (
                  <p style={{ color: "white", fontSize: "14px" }}>
                    {status === "PENDING" || status === "IN_PROGRESS"
                      ? "생성 중..."
                      : status === "FAILED"
                        ? "생성 실패"
                        : "파일이 없습니다."}
                  </p>
                )}
              </FolderWrapper>

              <CodeWrapper>
                <CodeTextsWrapper>
                  <FileName>{selectedFile || "파일명"}</FileName>
                  <CopyButton
                    onClick={handleCopy}
                    style={{
                      cursor: fileContent ? "pointer" : "default",
                      opacity: fileContent ? 1 : 0.4,
                    }}
                  >
                    복사하기
                  </CopyButton>
                </CodeTextsWrapper>

                <CodeContent>
                  {!selectedFile ? (
                    <EmptyText>왼쪽 트리에서 파일을 선택해주세요.</EmptyText>
                  ) : isFileLoading ? (
                    <EmptyText>파일을 불러오는 중...</EmptyText>
                  ) : fileError ? (
                    <EmptyText>파일을 불러오지 못했습니다.</EmptyText>
                  ) : fileContent ? (
                    <Pre>
                      <code>{fileContent.content}</code>
                    </Pre>
                  ) : (
                    <EmptyText>파일을 불러오지 못했습니다.</EmptyText>
                  )}
                </CodeContent>
              </CodeWrapper>
            </BottomWrapper>

            <Bottom>
              <ResetButton>처음으로</ResetButton>
              <DownloadFile>.zip 파일 다운로드</DownloadFile>
            </Bottom>
          </Wrapper>
        </WrapperContainer>
      </WrapperAll>
    </>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Project = styled.div``;

const ProjectIdDisplay = styled.p`
  color: ${Colors.text.secondary};
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-top: 4px;
`;

const ProgressBarBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Detail = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: ${Colors.text.disabled};
`;

const Bottom = styled.div`
  width: 900px;
  height: 39px;
  display: flex;
  justify-content: space-between;
`;

const ResetButton = styled.button`
  padding: 10px 32px;
  border: 1px solid ${Colors.border.strong};
  color: white;
  background-color: ${Colors.background.base};
  border-radius: 10px;
  width: 120px;
  height: 39px;
  cursor: pointer;
`;

const DownloadFile = styled.button`
  cursor: pointer;
  padding: 10px 32px;
  background-color: ${Colors.brand.default};
  width: 181px;
  height: 39px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
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

const CopyButton = styled.div`
  color: white;
  font-size: 14px;
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
  display: flex;
  flex-direction: column;
`;

const CodeContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  padding-top: 12px;
`;

const Pre = styled.pre`
  margin: 0;
  color: ${Colors.text.primary};
  font-family: "Fira Code", Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 20px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const EmptyText = styled.div`
  color: ${Colors.text.disabled};
  font-size: 14px;
  text-align: center;
  padding-top: 120px;
`;

const FolderWrapper = styled.div`
  background-color: ${Colors.background.surface};
  border: 1px solid ${Colors.background.overlay};
  width: 260px;
  height: 343px;
  border-radius: 12px;
  padding: 10px;

  overflow-y: auto;

  overflow-x: hidden;
`;

const Progress = styled.div`
  display: flex;
  gap: 7px;
  flex-direction: column;
  margin-bottom: 24px;
`;

const SkillItem = styled.div`
  background-color: ${Colors.background.overlay};
  width: fit-content;
  height: 24px;
  padding: 4px 12px;
  border-radius: 50px;
  color: white;
  font-size: 12px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatusDescription = styled.div`
  font-size: 14px;
  color: ${Colors.text.primary};
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
  flex-wrap: wrap;
  gap: 8px;
  width: 444px;
  max-height: 48px;
  overflow-y: auto;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? Colors.text.primary : Colors.text.disabled};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
`;
