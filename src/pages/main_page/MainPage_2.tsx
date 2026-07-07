import HeaderV2 from "../../layouts/HeaderV2";
import styled from "@emotion/styled";
import { Colors } from "../../styles/color";
import { useNavigate, useLocation, useParams } from "react-router-dom"; 
import { useState, useEffect } from "react"; 
import Arrow from "../../assets/Arrow.svg";
import Process from "../../components/main_com/TopProcess";
import Cancel from "../../assets/Vector (Stroke).svg";
import List from "../../components/choice/DevBlock"; 
import { useProjectForm } from "../../hooks/useProjectForm";
import { useQuery } from "@tanstack/react-query";
import { getDevFields, getProjectDetail } from "../../apis/project/index";
import type { ServerField } from "../../apis/project/type";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams<{ projectId: string }>(); 
  const { saveStepData } = useProjectForm();

  const isModify = !!projectId && location.pathname.startsWith("/main-md-2/");
  const [selectedFields, setSelectedFields] = useState<ServerField[]>([]);

  // 1. 전체 개발 분야 리스트 가져오기
  const { data: serverData } = useQuery({
    queryKey: ["devFields"],
    queryFn: getDevFields,
  });

  // 2. 수정 모드일 때 기존 프로젝트 상세 정보 불러오기
  const { data: projectResponse } = useQuery({
    queryKey: ["projectDetail", projectId],
    queryFn: () => getProjectDetail(projectId!),
    enabled: isModify && !!projectId,
  });

  const allFields: ServerField[] = serverData?.data?.fields ?? [];

  // 3. [수정 모드] 서버에 저장되어 있던 기존 분야 데이터를selectedFields에 바인딩
  useEffect(() => {
    if (isModify && projectResponse?.data?.fields && allFields.length > 0) {
      const savedFields = projectResponse.data.fields; // ['Backend', 'Frontend' 등] 또는 객체 배열
      
      const restored = allFields.filter((f) => 
        savedFields.some((sf: any) => {
          // 서버에서 fieldId로 줄 수도 있고, 단순 string 이름으로 줄 수도 있으므로 둘 다 대응
          const savedId = typeof sf === 'string' ? sf : sf.fieldId || sf.name;
          return savedId === f.fieldId || savedId === f.name;
        })
      );
      setSelectedFields(restored);
    }
  }, [isModify, projectResponse, allFields]);

  useEffect(() => {
    if (isModify) return; 
    const savedForm = sessionStorage.getItem("projectForm");
    if (savedForm && allFields.length > 0) {
      const parsed = JSON.parse(savedForm);
      const fieldIdsFromSession: string[] = parsed.fieldIds || [];
      const restored = allFields.filter((f) => fieldIdsFromSession.includes(f.fieldId));
      setSelectedFields(restored);
    }
  }, [allFields, isModify]);

  const handleSelectField = (field: ServerField) => {
    if (selectedFields.some((item) => item.fieldId === field.fieldId)) {
      setSelectedFields(selectedFields.filter((item) => item.fieldId !== field.fieldId));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleNextStep = () => {
    if (selectedFields.length === 0) {
      alert("최소 하나의 개발 분야를 선택해주세요!");
      return;
    }
    const fieldIds = selectedFields.map((f) => f.fieldId);
    saveStepData({ fieldIds });
    navigate(isModify ? `/main-md-3/${projectId}` : "/main-3");
  };

  return (
    <>
      <HeaderV2 text="로그아웃" page="프로젝트 빌더" />
      <Body>
        <Main_top>
          {!isModify && (
            <>
              <Process num={1} text="프로젝트 생성" use={false} />
              <img src={Arrow} width={16} height={16} alt="" />
            </>
          )}
          <Process num={isModify ? 1 : 2} text="개발 분야 선택" use={true} />
          <img src={Arrow} width={16} height={16} alt="" />
          <Process num={isModify ? 2 : 3} text="기술 스택 선택" use={false} />
          <img src={Arrow} width={16} height={16} alt="" />
          <Process num={isModify ? 3 : 4} text="의존성 선택" use={false} />
        </Main_top>
        
        <Main_section>
          <Title_box>
            <Sec_title>프로젝트의 개발 분야를 선택해주세요.</Sec_title>
            <Sec_text>다중 선택이 가능하며, 선택한 분야에 맞춰 기술 스택 풀이 구성됩니다.</Sec_text>
          </Title_box>
          
          <Choice_box>
            <Choice_info>
              <Choice_num>{selectedFields.length}개 선택됨</Choice_num>
              {selectedFields.length > 0 && <Line />}
              {selectedFields.map((field) => (
                <Choice_option key={field.fieldId}>
                  {field.name}
                  <img 
                    src={Cancel} 
                    alt="삭제" 
                    onClick={() => setSelectedFields(selectedFields.filter((item) => item.fieldId !== field.fieldId))}
                    style={{ cursor: "pointer" }}
                  />
                </Choice_option>
              ))}
            </Choice_info>

            <Dev_box>
              {allFields.map((field) => {
                // 💡 핵심: selectedFields에 현재 field가 들어있는지 검사하여 활성화 상태 주입!
                const isSelected = selectedFields.some((item) => item.fieldId === field.fieldId);
                return (
                  <div key={field.fieldId} onClick={() => handleSelectField(field)}>
                    <List 
                      title={field.name} 
                      text={field.description} 
                      img={field.iconUrl} 
                      isSelected={isSelected} // 👈 이 속성으로 인해 기존 데이터가 있다면 true로 켜집니다!
                    />
                  </div>
                );
              })}
            </Dev_box>
          </Choice_box>
        </Main_section>
        
        <Btn_box>
          <Before onClick={() => navigate(isModify ? `/main-modify/${projectId}` : "/main")}>
            <img src={Arrow} alt="" /> 이전
          </Before>
          <Next onClick={handleNextStep}>
            다음 단계 <img src={Arrow} alt="" />
          </Next>
        </Btn_box>
      </Body>
    </>
  );
};

// ─── 스타일 컴포넌트 원본 100% 보존 ───
const Body = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  background-color: ${Colors.background.base};
  padding: 24px 270px 117px 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  box-sizing: border-box;
`;
const Main_top = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  padding: 0px 6px;
  gap: 6px;
`;
const Main_section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
const Btn_box = styled.div`
  width: 100%;
  display: flex;
  height: fit-content;
  justify-content: space-between;
`;
const Next = styled.div`
  width: fit-content;
  height: 40px;
  background-color: ${Colors.brand.default};
  display: flex;
  padding: 10px 32px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  gap: 10px;
`;
const Before = styled.div`
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
  img { rotate: calc(180deg); }
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
  height: auto;
  min-height: 492px;
  background: ${Colors.background.surface};
  border-radius: 12px;
  border: 1px solid ${Colors.background.overlay};
  padding: 32px 64px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Choice_info = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  align-items: center;
  min-height: 26px;
`;
const Choice_num = styled.div`
  font-size: 14px;
  color: ${Colors.text.secondary};
  white-space: nowrap;
`;
const Line = styled.div`
  display: flex;
  width: 1px;
  height: 17px;
  background: ${Colors.border.strong};
`;
const Choice_option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 6px 12px;
  background: ${Colors.background.overlay};
  border-radius: 33554400px;
  color: #fff;
  gap: 9px;
  font-size: 12px;
  font-weight: 300;
`;
const Dev_box = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 24px 20px;
`;
const Choice_text = styled.div`
  color: ${Colors.text.disabled};
  font-size: 14px;
  margin-top: auto;
`;

export default Main;