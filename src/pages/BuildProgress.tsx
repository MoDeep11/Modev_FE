import styled from "styled-components";
import HeaderV2 from "../layouts/HeaderV2";
import { Colors } from "../styles/color";
import ProgressBar from "../components/Build/progressBar";
import under from "../assets/under.svg";
import FileTree from "../components/common/FileTree";
import { useParams } from "react-router-dom";
import { useProjectStatus } from "../hooks/newproject";
import { useEffect, useState } from "react";
import { useProjectStream } from "../hooks/useProjectStream";

export default function BuildProgress() {
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedFile, setSelectedFile] = useState("");
  const [projectForm, setProjectForm] = useState<any>({});

  const [selectedTab, setSelectedTab] = useState<
    "field" | "stack" | "dependency"
  >("field");

  const [activeTab, setActiveTab] = useState<"field" | "stack" | "dependency">(
    "field",
  );

  console.log("🔍 BuildProgress projectId:", projectId);

  console.log(
    `${import.meta.env.VITE_BASE_URL}/projects/structures/${projectId}/stream`,
  );

  useEffect(() => {
    setSelectedFile("");
    // sessionStorage에서 프로젝트 폼 데이터 가져오기
    const savedForm = sessionStorage.getItem("projectForm");
    if (savedForm) {
      setProjectForm(JSON.parse(savedForm));
    }
  }, [projectId]);

  const { data: projectData, refetch } = useProjectStatus(projectId || "");

  const { progress, message, completed } = useProjectStream(projectId || "");

  useEffect(() => {
    if (!completed) return;

    refetch();
  }, [completed, refetch]);

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
                  {projectForm.projectName || "프로젝트명"}
                </ProjectTitle>
                <ProjectDetail>
                  {projectForm.description || "프로젝트 설명이 들어가~입니다"}
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
                    (projectForm.fieldIds?.length ? (
                      projectForm.fieldIds.map((field: string) => (
                        <SkillItem key={field}>{field}</SkillItem>
                      ))
                    ) : (
                      <SkillItem>선택 안됨</SkillItem>
                    ))}

                  {activeTab === "stack" &&
                    (projectForm.stackIds?.length ? (
                      projectForm.stackIds.map((stack: string) => (
                        <SkillItem key={stack}>{stack}</SkillItem>
                      ))
                    ) : (
                      <SkillItem>선택 안됨</SkillItem>
                    ))}

                  {activeTab === "dependency" &&
                    (projectForm.dependencyIds?.length ? (
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
                  <FileName>파일명</FileName>
                  <CopyButton>복사하기</CopyButton>
                </CodeTextsWrapper>
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

const TabItemText = styled.p`
  font-size: 12px;
  color: ${Colors.text.disabled};
  margin: 0;
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
`;

const FolderWrapper = styled.div`
  background-color: ${Colors.background.surface};
  border: 1px solid ${Colors.background.overlay};
  width: 260px;
  height: 343px;
  border-radius: 12px;
  padding: 10px;
`;

const Progress = styled.div`
  display: flex;
  gap: 7px;
  flex-direction: column;
  margin-bottom: 24px;
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
  gap: 16px;
  width: 444px;
  height: 24px;
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
