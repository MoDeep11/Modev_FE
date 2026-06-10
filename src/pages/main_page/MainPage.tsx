import { useState } from "react"; // useState 추가
import HeaderV2 from "../../layouts/HeaderV2";
import styled from "@emotion/styled";
import { Colors } from "../../styles/color";
import { useNavigate, useLocation } from "react-router-dom";
import Arrow from "../../assets/Arrow.svg";
import Process from "../../components/main_com/TopProcess";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 '/main-modify' 인지 확인
  const isModify = location.pathname === "/main-modify";

  const [projectName, setProjectName] = useState(
    isModify ? "기존 프로젝트 이름" : "",
  );
  const [projectDesc, setProjectDesc] = useState(
    isModify ? "기존 프로젝트 상세 설명입니다." : "",
  );

  return (
    <>
      <HeaderV2 text="로그아웃" page="프로젝트 빌더" />
      <Body>
        <Main_top isModify={isModify}>
          <Process num={1} text="프로젝트 생성" use={true} />
          <img src={Arrow} width={16} height={16} />
          <Process num={2} text="개발 분야 선택" use={false} />
          <img src={Arrow} width={16} height={16} />
          <Process num={3} text="기술 스택 선택" use={false} />
          <img src={Arrow} width={16} height={16} />
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
                {/* value와 onChange를 연결하여 값이 직접 들어가고 수정 가능하게 변경 */}
                <Pr_name
                  placeholder="새 프로젝트 이름"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </Name_box>
              <Explain_box>
                <Pr_ex_text>한 줄 묘사(프로젝트 상세)</Pr_ex_text>
                {/* value와 onChange를 연결하여 값이 직접 들어가고 수정 가능하게 변경 */}
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
          <Before onClick={() => navigate("/project-detail")}>취소</Before>
        )}
        <Next
          onClick={() => navigate(isModify ? "/project-detail" : "/main-2")}
        >
          {isModify ? "수정완료" : "다음"}
          {!isModify && <img src={Arrow} />}
        </Next>
      </Body>
    </>
  );
};

const Body = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  background-color: ${Colors.background.base};
  padding: 24px 270px 117px 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;

// props를 받아와서 isModal이 true일 때 opacity를 0%로 조절 (부드러운 전환을 위해 transition 추가)
const Main_top = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  padding: 0px 6px;
  gap: 6px;
  opacity: ${(props) => (props.isModify ? 0 : 1)};
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
  img {
    rotate: calc(180deg);
  }
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
