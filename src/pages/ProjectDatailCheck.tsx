import styled from "styled-components";
import { Colors } from "../styles/color";
import Folders from "../components/Build/Folders";
import HeaderV2 from "../layouts/HeaderV2";
import DownloadFile from "../components/Button/DownloadFile";
import { useParams } from "react-router-dom";

export default function ProjectDatailCheck() {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <WrapperAll>
        <HeaderV2 text="로그아웃" page="내 프로젝트" />

        <WrapperContainer>
          <Wrapper>
            <TopContainer>
              <Project>
                <ProjectTitle>프로젝트명</ProjectTitle>
                <ProjectDetail>프로젝트 설명이 들어가~입니다</ProjectDetail>
              </Project>

              <TopRightContainer>
                <TabItemContainer>
                  <TabItem>기술분야</TabItem>
                  <TabItem>기술스택</TabItem>
                  <TabItem>의존성</TabItem>
                </TabItemContainer>

                <SkillItemContainer>
                  <SkillItem>Frontend</SkillItem>
                  <SkillItem>Frontend</SkillItem>
                  <SkillItem>Frontend</SkillItem>
                  <SkillItem>Frontend</SkillItem>
                  <SkillItem>Frontend</SkillItem>
                </SkillItemContainer>
              </TopRightContainer>
            </TopContainer>

            <BottomWrapper>
              <FolderWrapper>
                <Folders file="topFolder" text="/ my-dsm-project" depth={0} />
                <Folders file="folder" text="frontend/" depth={1} />
                <Folders file="file" text="package.json" depth={2} />
                <Folders file="folder" text="backend/" depth={1} />
                <Folders file="writeFile" text="env.example" depth={2} />
                <Folders file="writeFile" text="README.md" depth={2} />
              </FolderWrapper>

              <CodeWrapper>
                <CodeTextsWrapper>
                  <FileName>파일명</FileName>
                  <CopyButton>복사하기</CopyButton>
                </CodeTextsWrapper>
              </CodeWrapper>
            </BottomWrapper>

            <Bottom>
              <Delete>삭제</Delete>
              <BottomRight>
                <DownloadFile />
                <ModifySkillStack>기술 스택 수정</ModifySkillStack>
                <Check>확인</Check>
              </BottomRight>
            </Bottom>
          </Wrapper>
        </WrapperContainer>
      </WrapperAll>
    </>
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

const Delete = styled.div`
  padding: 10px 32px;
  border: 1px solid ${Colors.status.error};
  color: ${Colors.status.error};
  background-color: ${Colors.background.base};
  border-radius: 10px;
  width: 92ppx;
  height: 39px;
  cursor: pointer;
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

const TabItem = styled.p`
  font-size: 16px;
  color: ${Colors.text.disabled};
  cursor: pointer;
`;
