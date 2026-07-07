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
import { getDevFields, getProject } from "../../apis/project/index";
import type { ServerField } from "../../apis/project/type";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams<{ projectId: string }>(); 
  const { saveStepData } = useProjectForm();

  const isModify = !!projectId && location.pathname.startsWith("/main-md-2/");

  const [selectedFields, setSelectedFields] = useState<ServerField[]>([]);

  const { data: serverData, isError: isFieldsError, error: fieldsError } = useQuery({
    queryKey: ["devFields"],
    queryFn: async () => {
      console.log("%c📡 [GET] 개발 분야 목록 요청 시작 -> /dev-fields", "color: #00d2ff; font-weight: bold;");
      const res = await getDevFields();
      console.log("%c✅ [GET] 개발 분야 목록 수신 성공:", "color: #00ff87; font-weight: bold;", res);
      return res;
    },
  });

  useEffect(() => {
    if (isFieldsError) {
      console.error("%c❌ [GET] 개발 분야 목록 요청 실패:", "color: #ff4d4d; font-weight: bold;", fieldsError);
    } 
  }, [isFieldsError, fieldsError]);

  const { data: projectResponse, isError: isProjectError, error: projectError } = useQuery({
    queryKey: ["projectDetail", projectId],
    queryFn: async () => {
      console.log(`%c📡 [GET] 프로젝트 상세 요청 시작 -> ID: ${projectId}`, "color: #00d2ff; font-weight: bold;");
      const res = await getProject(projectId!);
      console.log("%c✅ [GET] 프로젝트 상세 수신 성공:", "color: #00ff87; font-weight: bold;", res);
      return res;
    },
    enabled: isModify, 
  });

  useEffect(() => {
    if (isProjectError) {
      console.error("%c❌ [GET] 프로젝트 상세 요청 실패:", "color: #ff4d4d; font-weight: bold;", projectError);
    }
  }, [isProjectError, projectError]);

  const devFields: ServerField[] = serverData?.data?.fields ?? [];

  useEffect(() => {
    if (devFields.length === 0) return;

    if (isModify) {
      if (projectResponse?.fields) {
        const serverSelectedNames = projectResponse.fields; 
        const matchedFields = devFields.filter((field) => serverSelectedNames.includes(field.name));
        console.log("%c📥 수정 모드: 서버에서 받은 선택 분야 복원:", "color: #b970ff;", matchedFields);
        setSelectedFields(matchedFields);
      }
    } else {
      const savedForm = sessionStorage.getItem("projectForm");
      if (savedForm) {
        try {
          const { fieldIds } = JSON.parse(savedForm);
          if (fieldIds && Array.isArray(fieldIds)) {
            // 💡 타입 서류와 일치하므로 field.fieldId로 정석 비교
            const matchedFields = devFields.filter((field) => fieldIds.includes(field.fieldId));
            setSelectedFields(matchedFields);
          }
        } catch (e) {
          console.error("sessionStorage 파싱 에러:", e);
        }
      }
    }
  }, [serverData, projectResponse, isModify, devFields]); 

  const handleSelect = (field: ServerField) => {
    if (selectedFields.some((item) => item.fieldId === field.fieldId)) {
      handleRemove(field.fieldId);
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleRemove = (fieldId: string) => {
    setSelectedFields(selectedFields.filter((item) => item.fieldId !== fieldId));
  };

  const handleNextStep = () => {
    const fieldIds = selectedFields.map((field) => field.fieldId);
    saveStepData({ fieldIds: fieldIds });
    navigate(isModify ? `/main-md-3/${projectId}` : "/main-3");
  };

  return (
    <>
      <HeaderV2 text="로그아웃" page="프로젝트 빌더"/>
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
            <Sec_title>개발 분야 선택</Sec_title>
            <Sec_text>프로젝트 구성을 위해 복수 선택이 가능합니다</Sec_text>
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
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleRemove(field.fieldId);
                    }} 
                    style={{ cursor: "pointer" }} 
                    />
                </Choice_option>
              ))}
            </Choice_info>
            
            <List_box>
              <Select_list>
                {devFields.map((field) => {
                  const isSelected = selectedFields.some((item) => item.fieldId === field.fieldId);

                  return (
                    <div 
                      key={field.fieldId} 
                      onClick={() => handleSelect(field)}
                      style={{ cursor: "pointer" }}
                    >
                      <List
                        title={field.name} 
                        text={field.description}
                        isSelected={isSelected} 
                      />
                    </div>
                  );
                })}
              </Select_list>
            </List_box>
            <Choice_text>
              만들고 싶은 서비스에 필요한 개발 분야를 선택해주세요. 현재 선택된
              분야를 기준으로 다음 단계에서 기술 스택 추천이 제공됩니다.
            </Choice_text>
          </Choice_box>
        </Main_section>
        
        {!isModify && (
          <Before onClick={() => navigate("/main")}>
            <img src={Arrow} alt="" />
            이전
          </Before>
        )}

        <Next onClick={handleNextStep}>
          다음
          <img src={Arrow} alt="" />
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
  img {
    transform: rotate(180deg);
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
  justify-content: flex-start; /* baseline에서 변경 */
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
  padding: 4px 12px;
  background: ${Colors.background.overlay};
  border-radius: 33554400px;
  color: #fff;
  gap: 9px;
  font-size: 12px;
  font-weight: 300;
`;

const List_box = styled.div`
  width: 100%;
  height: auto;
  min-height: 344px;
`;

const Select_list = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Choice_text = styled.div`
  color: ${Colors.text.disabled};
  font-size: 14px;
`;


export default Main;