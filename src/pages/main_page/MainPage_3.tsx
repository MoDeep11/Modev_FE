import HeaderV2 from "../../layouts/HeaderV2";
import styled from "@emotion/styled";
import { Colors } from "../../styles/color";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Arrow from "../../assets/Arrow.svg";
import Fold from "../../assets/Fold.svg";
import Cancel from "../../assets/Vector (Stroke).svg";
import Process from "../../components/main_com/TopProcess";
import Skill from "../../components/choice/SkillBlock";
import Search_img from "../../assets/search.svg";
import { useProjectForm } from "../../hooks/useProjectForm";
import { useQuery } from "@tanstack/react-query";
import { getDevStacks, getDevFields, getProject } from "../../apis/project/index";
import type { ServerStack } from "../../apis/project/type";

const categoryTitleMap: Record<string, string> = {
  domain_fe: "Frontend",
  domain_be: "Backend",
  domain_ios: "AI",
  domain_aos: "DevOps",
};

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams<{ projectId: string }>();
  const { saveStepData } = useProjectForm();
  
  const isModify = !!projectId && location.pathname.startsWith("/main-md-3/");

  const [allowedFieldIds, setAllowedFieldIds] = useState<string[]>([]); 
  const [selectedStacks, setSelectedStacks] = useState<ServerStack[]>([]); 
  const [searchKeyword, setSearchKeyword] = useState<string>(""); 
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  const handleToggleCategory = (categoryId: string) => {
    if (collapsedCategories.includes(categoryId)) {
      setCollapsedCategories(collapsedCategories.filter((id) => id !== categoryId));
    } else {
      setCollapsedCategories([...collapsedCategories, categoryId]);
    }
  };

  const { data: serverData, isError: isStacksError, error: stacksError } = useQuery({
    queryKey: ["devStacks"],
    queryFn: async () => {
      console.log("%c📡 [GET] 기술 스택 목록 요청 시작 -> /projects/stacks", "color: #00d2ff; font-weight: bold;");
      const res = await getDevStacks();
      console.log("%c✅ [GET] 기술 스택 목록 수신 성공:", "color: #00ff87; font-weight: bold;", res);
      return res;
    },
  });

  useEffect(() => {
    if (isStacksError) {
      console.error("%c❌ [GET] 기술 스택 목록 요청 실패:", "color: #ff4d4d; font-weight: bold;", stacksError);
    }
  }, [isStacksError, stacksError]);

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

  // ⚠️ getProject()가 돌려주는 fields는 "Backend" 같은 이름이라, fieldId(domain_be 등) 형식이 필요한
  // 이 페이지에서 쓰려면 이름 -> fieldId 매핑이 필요함. 그래서 수정 모드에서만 분야 목록도 같이 조회.
  const { data: fieldsData } = useQuery({
    queryKey: ["devFields"],
    queryFn: async () => {
      console.log("%c📡 [GET] 개발 분야 목록 요청 시작 (이름-ID 매핑용) -> /catalog/fields", "color: #00d2ff; font-weight: bold;");
      const res = await getDevFields();
      console.log("%c✅ [GET] 개발 분야 목록 수신 성공:", "color: #00ff87; font-weight: bold;", res);
      return res;
    },
    enabled: isModify,
  });

  const allStacks: ServerStack[] = serverData?.data?.stacks ?? [];

  useEffect(() => {
    const savedForm = sessionStorage.getItem("projectForm");
    
    if (isModify) {
      if (projectResponse) {
        const fieldNames = projectResponse.fields || [];
        const nameToFieldId: Record<string, string> = {};
        (fieldsData?.data?.fields ?? []).forEach((f) => {
          nameToFieldId[f.name] = f.fieldId;
        });
        const fieldsFromProject = fieldNames
          .map((name) => nameToFieldId[name])
          .filter((id): id is string => Boolean(id));
        setAllowedFieldIds(fieldsFromProject);

        const serverStacks = projectResponse.stacks || [];
        const restoredStackIds = serverStacks.map((s) => s.stackId);
        
        const restored = allStacks.filter((stack) => restoredStackIds.includes(stack.stackId));
        console.log("%c📥 수정 모드: 서버에서 받은 선택 스택 복원:", "color: #b970ff;", restored);
        setSelectedStacks(restored);
      }
    } else {
      if (savedForm) {
        const parsed = JSON.parse(savedForm);
        const fieldIdsFromSession: string[] = parsed.fieldIds || [];
        setAllowedFieldIds(fieldIdsFromSession);
        const stackIdsFromSession: string[] = parsed.stackIds || [];
        if (stackIdsFromSession.length > 0) {
          const restored = allStacks.filter((stack) => stackIdsFromSession.includes(stack.stackId));
          setSelectedStacks(restored);
        }
      }
    }
  }, [serverData, projectResponse, isModify, fieldsData]); 

  const filteredStacks = allStacks.filter((stack) => {
    const isAllowedField = allowedFieldIds.includes(stack.fieldId);
    const matchesSearch = stack.name.toLowerCase().includes(searchKeyword.toLowerCase());
    return isAllowedField && matchesSearch;
  });

  const groupedCategories = allowedFieldIds.map((fieldId) => {
    return {
      fieldId,
      categoryName: categoryTitleMap[fieldId] || `${fieldId.replace("domain_", "").toUpperCase()} 스택`,
      stacks: filteredStacks.filter((stack) => stack.fieldId === fieldId),
    };
  }).filter((group) => group.stacks.length > 0); 

  const handleSelectStack = (stack: ServerStack) => {
    if (selectedStacks.some((item) => item.stackId === stack.stackId)) {
      handleRemoveStack(stack.stackId);
    } else {
      setSelectedStacks([...selectedStacks, stack]);
    }
  };

  const handleRemoveStack = (stackId: string) => {
    setSelectedStacks(selectedStacks.filter((item) => item.stackId !== stackId));
  };

  const handleNextStep = () => {
    const stackIds = selectedStacks.map((stack) => stack.stackId);
    saveStepData({ stackIds: stackIds }); 
    navigate(isModify ? `/main-md-4/${projectId}` : "/main-4");
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
          <Process num={isModify ? 1 : 2} text="개발 분야 선택" use={false} />
          <img src={Arrow} width={16} height={16} alt="" />
          <Process num={isModify ? 2 : 3} text="기술 스택 선택" use={true} />
          <img src={Arrow} width={16} height={16} alt="" />
          <Process num={isModify ? 3 : 4} text="의존성 선택" use={false} />
        </Main_top>
        
        <Main_section>
          <Title_box>
            <Sec_title>프로젝트에 사용할 상세 메인 기술 스택 지정</Sec_title>
            <Sec_text>
              선택하신 개발범위에 최적화된 스택 목록입니다.
            </Sec_text>
          </Title_box>

          <Search_container>
            <Search_bar>
              <Search_input 
                placeholder="스택명을 찾아보세요!"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <img src={Search_img} alt="" />
            </Search_bar>
            
            <Choice_tag>
              <Choice_num>{selectedStacks.length}개 선택됨</Choice_num>
              {selectedStacks.length > 0 && <Line />}
              {selectedStacks.map((stack) => (
                <Choice_option key={stack.stackId}>
                  {stack.name}
                  <img 
                    src={Cancel} 
                    alt="삭제" 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleRemoveStack(stack.stackId);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </Choice_option>
              ))}
            </Choice_tag>
          </Search_container>

          <Choice_box>
            {groupedCategories.length > 0 ? (
              groupedCategories.map((category) => {
                const isCollapsed = collapsedCategories.includes(category.fieldId);

                return (
                  <Skill_container key={category.fieldId}>
                    <Skill_category onClick={() => handleToggleCategory(category.fieldId)} style={{ cursor: "pointer" }}>
                      {category.categoryName}
                      <FoldIcon src={Fold} width={16} height={16} alt="토글" isCollapsed={isCollapsed} />
                    </Skill_category>
                    
                    {!isCollapsed && (
                      <Skill_box>
                        {category.stacks.map((stack) => {
                          const isSelected = selectedStacks.some(item => item.stackId === stack.stackId);
                          return (
                            <div 
                              key={stack.stackId} 
                              onClick={() => handleSelectStack(stack)}
                              style={{ 
                                cursor: "pointer",
                                borderRadius: "12px",
                                position: "relative",
                                outline: isSelected ? `2px solid ${Colors.brand.default}` : "none",
                                transition: "all 0.1s ease"
                              }}
                            >
                              <Skill 
                                title={stack.name} 
                                text={stack.description} 
                                isSelected={isSelected} 
                              />
                            </div>
                          );
                        })}
                      </Skill_box>
                    )}
                  </Skill_container>
                );
              })
            ) : (
              <NoDataText>표시할 기술 스택이 없거나 검색 결과가 존재하지 않습니다.</NoDataText>
            )}
            
            <Choice_text>
              선택된 메인 기술 스택들을 바탕으로 마지막 단계에서 세부 라이브러리 및 의존성 주입 코드가 완성됩니다.
            </Choice_text>
          </Choice_box>
        </Main_section>
        
        <Btn_box>
          <Before onClick={() => navigate(isModify ? `/main-md-2/${projectId}` : "/main-2")}>
            <img src={Arrow} alt="" />
            이전
          </Before>
          <Next onClick={handleNextStep}>
            다음
            <img src={Arrow} alt="" />
          </Next>
        </Btn_box>
      </Body>
    </>
  );
};



const NoDataText = styled.div`
  color: ${Colors.text.disabled}; 
  text-align: center; 
  padding: 147px 0; 
  font-size: 16px; 
`;

const Body = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px); 
  height: auto;
  box-sizing: border-box;
  background-color: ${Colors.background.base};
  padding: 24px 270px 117px 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;

const FoldIcon = styled.img<{ isCollapsed: boolean }>`
  transition: transform 0.2s ease;
  transform: ${({ isCollapsed }) => (isCollapsed ? "rotate(-90deg)" : "rotate(0deg)")};
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
  cursor: pointer;
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
  cursor: pointer;
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
  height: fit-content;
  background: ${Colors.background.surface};
  border-radius: 12px;
  border: 1px solid ${Colors.background.overlay};
  padding: 32px 64px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Skill_box = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
`;

const Skill_category = styled.div`
  display: flex;
  gap: 12px;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  align-items: center;
`;

const Skill_container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 36px;
  border-bottom: 1px solid ${Colors.border.strong};
  margin-bottom: 36px;
`;

const Choice_num = styled.div`
  font-size: 14px;
  color: ${Colors.text.secondary};
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

const Search_container = styled.div`
  width: 100%;
  height: 84px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  padding: 0px 80px;
`;

const Search_input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  border: none;
  color: #fff;
  background-color: ${Colors.background.overlay};
  &:focus {
    outline: none;
  }
  &:placeholder-shown {
    color: ${Colors.text.disabled};
  }
`;

const Search_bar = styled.div`
  display: flex;
  width: 740px;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px;
  background: ${Colors.background.overlay};
  border-radius: 33554400px;
`;

const Choice_tag = styled.div`
  height: 24px;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Choice_text = styled.div`
  color: ${Colors.text.disabled};
  font-size: 14px;
`;

export default Main;