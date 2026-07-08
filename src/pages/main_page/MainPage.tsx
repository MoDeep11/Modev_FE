import { useState, useEffect } from "react";
import HeaderV2 from "../../layouts/HeaderV2";
import styled from "@emotion/styled";
import { Colors } from "../../styles/color";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Arrow from "../../assets/Arrow.svg";
import Process from "../../components/main_com/TopProcess";
import { useProjectForm } from "../../hooks/useProjectForm";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getProjectDetail,
  updateProjectMetadata,
} from "../../apis/project/index";
import ExitModal from "../../components/modal/ExitModal";
import { useWizardExitGuard } from "../../hooks/Wizardpaths";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams<{ projectId: string }>();

  const { saveStepData } = useProjectForm();
  const isModify = !!projectId && location.pathname.startsWith("/main-modify/");
  const { isExitModalOpen, guardedNavigate, confirmExit, cancelExit } = useWizardExitGuard();

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  // 생성 모드에서 2페이지 등으로 갔다 돌아왔을 때, 이미 입력했던 이름/설명을 복원
  useEffect(() => {
    if (isModify) return;
    const savedForm = sessionStorage.getItem("projectForm");
    if (savedForm) {
      const { projectName: savedName, description: savedDesc } = JSON.parse(savedForm);
      if (savedName) setProjectName(savedName);
      if (savedDesc) setProjectDesc(savedDesc);
    }
  }, [isModify]);

  const {
    data: projectResponse,
    isError: isProjectError,
    error: projectError,
  } = useQuery({
    queryKey: ["projectDetail", projectId],
    queryFn: async () => {
      console.log(
        `%c📡 [GET] 프로젝트 데이터 요청 시작 -> ID: ${projectId}`,
        "color: #00d2ff; font-weight: bold;",
      );
      const res = await getProjectDetail(projectId!);
      console.log(
        "%c✅ [GET] 서버 연결 성공! 수신 데이터:",
        "color: #00ff87; font-weight: bold;",
        res,
      );
      return res;
    },
    enabled: isModify,
  });

  useEffect(() => {
    if (isProjectError) {
      console.error(
        "%c❌ [GET] 프로젝트 데이터 요청 실패:",
        "color: #ff4d4d; font-weight: bold;",
        projectError,
      );
    }
  }, [isProjectError, projectError]);

  useEffect(() => {
    if (isModify && projectResponse?.success && projectResponse.data) {
      console.log(
        "%c📥 전체 데이터 수신 완료! 1페이지 메타데이터 바인딩:",
        "color: #b970ff;",
        projectResponse.data,
      );
      setProjectName(projectResponse.data.projectName);
      setProjectDesc(projectResponse.data.description);
    }
  }, [isModify, projectResponse]);

  const updateMetadataMutation = useMutation({
    mutationFn: async (payload: {
      projectName: string;
      description: string;
    }) => {
      console.log(
        `%c🚀 [PATCH] 서버 전송 시작 -> 엔드포인트: /projects/${projectId}/metadata`,
        "color: #ff007f; font-weight: bold;",
      );
      console.log("%c📦 REQUEST BODY (Payload):", "color: #ff007f;", payload);
      return await updateProjectMetadata(projectId!, payload);
    },

    onSuccess: (res) => {
      console.log(
        "%c🎉 [PATCH] RESPONSE 성공 데이터 수신 완료:",
        "color: #00ff87; font-weight: bold;",
        res,
      );

      alert("🎉 프로젝트 메타데이터 수정 요청 성공!");

      // ✅ 이름/설명은 트리 구조와 무관하므로 재생성 없이 바로 상세 페이지로 이동
      navigate(`/project-detail/${projectId}`);
    },
    onError: (error) => {
      console.error(
        "%c❌ [PATCH] 최종 수정 데이터 전송 실패:",
        "color: #ff4d4d; font-weight: bold;",
        error,
      );
      alert("⚠️ 메타데이터 수정 중 서버 오류가 발생했습니다.");
    },
  });

  const handleNextStep = () => {
    if (isModify) {
      updateMetadataMutation.mutate({
        projectName: projectName,
        description: projectDesc,
      });
    } else {
      saveStepData({
        projectName: projectName,
        description: projectDesc,
      });
      navigate("/main-2");
    }
  };

  return (
    <>
      <HeaderV2
        text={localStorage.getItem("accessToken") ? "로그아웃" : "로그인"}
        page="프로젝트 빌더"
      />
      <Body>
        <Main_top $isModify={isModify}>
          <Process num={1} text="프로젝트 생성" use={true} />
          <img src={Arrow} width={16} height={16} alt="" />
          <Process num={2} text="개발 분야 선택" use={false} />
          <img src={Arrow} width={16} height={16} alt="" />
          <Process num={3} text="기술 스택 선택" use={false} />
          <img src={Arrow} width={16} height={16} alt="" />
          <Process num={4} text="의존성 선택" use={false} />
        </Main_top>

        <Main_section>
          <Title_box>
            <Sec_title>
              {isModify ? "메타데이터 수정" : "프로젝트 생성"}
            </Sec_title>
            <Sec_text>
              {isModify
                ? "프로젝트 이름과 설명을 수정해주세요."
                : "생성할 프로젝트 이름과 설명을 적어주세요."}
            </Sec_text>
          </Title_box>
          <Choice_box>
            <Pr_box>
              <Name_box>
                <Pr_name_text>프로젝트 식별 이름</Pr_name_text>
                <Pr_name
                  placeholder="새 프로젝트 이름"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </Name_box>
              <Explain_box>
                <Pr_ex_text>한 줄 묘사(프로젝트 상세)</Pr_ex_text>
                <Pr_ex
                  placeholder="설명을 적어주세요."
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                />
              </Explain_box>
            </Pr_box>
            <Choice_text>
              이 설정 정보는 추후 스트리밍 빌더 엔진이 프로젝트 기본 파일명,
              README 구조 및 AI 기반 포트폴리오 보고서 초안을 구성할 때
              활용됩니다.
            </Choice_text>
          </Choice_box>
        </Main_section>

        {isModify && (
          <Before onClick={() => guardedNavigate("/myproject")}>취소</Before>
        )}

        <Next onClick={handleNextStep}>
          {isModify ? "수정완료" : "다음"}
          {!isModify && <img src={Arrow} alt="" />}
        </Next>
      </Body>

      {isExitModalOpen && (
        <ModalOverlay>
          <ExitModal onCancel={cancelExit} onConfirm={confirmExit} />
        </ModalOverlay>
      )}
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Body = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  height: auto;
  box-sizing: border-box;
  background-color: ${Colors.background.base};
  padding: 24px 270px 117px 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  position: relative;
`;

const Main_top = styled.div<{ $isModify: boolean }>`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  padding: 0px 6px;
  gap: 6px;
  opacity: ${({ $isModify }) => ($isModify ? 0 : 1)};
  transition: opacity 0.2s ease-in-out;
`;

const Main_section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Next = styled.div`
  width: 118px;
  height: 40px;
  background-color: ${Colors.brand.default};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  gap: 10px;
  position: absolute;
  bottom: 102px;
  right: 270px;
  cursor: pointer;
`;

const Before = styled.button`
  width: 118px;
  height: 40px;
  color: #fff;
  background-color: #000;
  border: 1px solid #4a4a6a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  gap: 10px;
  position: absolute;
  bottom: 102px;
  left: 270px;
  cursor: pointer;
`;

const Title_box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Sec_title = styled.p`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
`;

const Sec_text = styled.div`
  color: #9898bb;
  font-size: 14px;
  font-weight: 400;
`;

const Choice_box = styled.div`
  width: 900px;
  height: 492px;
  background: ${Colors.background.surface};
  border-radius: 12px;
  border: 1px solid ${Colors.background.overlay};
  padding: 32px 64px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Choice_text = styled.div`
  color: ${Colors.text.disabled};
  font-size: 14px;
`;

const Pr_box = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const Name_box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const Pr_name_text = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
`;

const Pr_name = styled.input`
  width: 100%;
  height: 40px;
  display: flex;
  padding: 0 16px;
  font-size: 16px;
  background-color: ${Colors.background.base};
  border: none;
  color: #fff;
`;

const Explain_box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const Pr_ex_text = styled.p`
  color: #fff;
`;

const Pr_ex = styled.textarea`
  width: 100%;
  height: 240px;
  background-color: ${Colors.background.base};
  border: none;
  resize: none;
  color: #fff;
  padding: 8px 16px;
`;

export default Main;