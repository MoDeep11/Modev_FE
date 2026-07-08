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
import { getDevStacks, getProjectDetail } from "../../apis/project/index";
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

  useEffect(() => {
    const savedForm = sessionStorage.getItem("projectForm");
    if (savedForm) {
      const parsed = JSON.parse(savedForm);
      setAllowedFieldIds(parsed.fieldIds || []);
    }
  }, []);

  // 1. 스택 풀 목록 가져오기
  const { data: serverData, isError: isStacksError, error: stacksError } = useQuery({
    queryKey: ["devStacks", allowedFieldIds],
    queryFn: async () => {
      console.log(`%c📡 [GET] 기술 스택 목록 요청 -> /catalog/stacks?fieldIds=${allowedFieldIds.join(",")}`, "color: #00d2ff; font-weight: bold;");
      const res = await getDevStacks(allowedFieldIds);
      console.log("%c✅ [GET] 기술 스택 목록 수신 성공:", "color: #00ff87; font-weight: bold;", res);
      return res;
    },
    enabled: allowedFieldIds.length > 0,
  });

  // 2. 수정 모드 데이터 로드하기
  const { data: projectResponse } = useQuery({
    queryKey: ["projectDetail", projectId],
    queryFn: async () => {
      if (!projectId) return null;
      return await getProjectDetail(projectId);
    },
    enabled: isModify && !!projectId,
  });

  const allStacks: ServerStack[] = serverData?.data?.stacks ?? [];

  // 3. 기존 기술 스택 복원 처리
  useEffect(() => {
    if (isModify && projectResponse?.data?.stacks && allStacks.length > 0) {
      const savedStacks = projectResponse.data.stacks;
      const restored = allStacks.filter((s) => 
        savedStacks.some((ss: any) => ss.stackId === s.stackId || ss.name === s.name)
      );
      setSelectedStacks(restored);
      console.log("%c🔄 [수정 모드] 기존 선택 스택 복원 완료:", "color: #ff9f43; font-weight: bold;", restored);
    }
  }, [isModify, projectResponse, allStacks]);

  useEffect(() => {
    if (isModify) return;
    const savedForm = sessionStorage.getItem("projectForm");
    if (savedForm && allStacks.length > 0) {
      const parsed = JSON.parse(savedForm);
      const stackIdsFromSession: string[] = parsed.stackIds || [];
      if (stackIdsFromSession.length > 0) {
        const restored = allStacks.filter((s) => stackIdsFromSession.includes(s.stackId));
        setSelectedStacks(restored);
      }
    }
  }, [allStacks, isModify]);

  useEffect(() => {
    if (isStacksError) {
      console.error("%c❌ [GET] 기술 스택 목록 요청 실패:", "color: #ff4d4d; font-weight: bold;", stacksError);
    }
  }, [isStacksError, stacksError]);

  const handleToggleCategory = (fieldId: string) => {
    if (collapsedCategories.includes(fieldId)) {
      setCollapsedCategories(collapsedCategories.filter((id) => id !== fieldId));
    } else {
      setCollapsedCategories([...collapsedCategories, fieldId]);
    }
  };

  const filteredStacks = allStacks.filter((stack) => {
    return stack.name.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  const groupedCategories = allowedFieldIds.map((fieldId) => {
    return {
      fieldId,
      categoryName: categoryTitleMap[fieldId] || `${fieldId} 관련 스택`,
      stacks: filteredStacks.filter((stack) => stack.fieldId === fieldId),
    };
  }).filter(group => group.stacks.length > 0);

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
    if (selectedStacks.length === 0) {
      alert("최소 하나의 기술 스택을 선택해주세요!");
      return;
    }
    const stackIds = selectedStacks.map((s) => s.stackId);
    saveStepData({ stackIds });

    navigate(isModify ? `/main-md-4/${projectId}` : "/main-4");
  };

  return (
    <>
      <HeaderV2
        text={localStorage.getItem("accessToken") ? "로그아웃" : "로그인"}
        page="프로젝트 빌더"
      />
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
            <Sec_title>프로젝트의 주요 기술 스택을 구성해주세요.</Sec_title>
            <Sec_text>2단계에서 선택한 분야를 바탕으로 필터링 된 기술 마켓입니다.</Sec_text>
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
                    onClick={() => handleRemoveStack(stack.stackId)}
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
                                outline: isSelected ? `2px solid ${Colors.brand.default}` : "none",
                                transition: "all 0.1s ease"
                              }}
                            >
                              <Skill title={stack.name} text={stack.description} isSelected={isSelected} />
                            </div>
                          );
                        })}
                      </Skill_box>
                    )}
                  </Skill_container>
                );
              })
            ) : (
              <NoDataText>2단계에서 선택한 분야가 없거나 조건에 맞는 데이터가 없습니다.</NoDataText>
            )}
            <Choice_text>선택 목록에 없는 스택은 인프라 구성 시 기본 템플릿으로 연동됩니다.</Choice_text>
          </Choice_box>
        </Main_section>
        
        <Btn_box>
          <Before onClick={() => navigate(isModify ? `/main-md-2/${projectId}` : "/main-2")}>
            <img src={Arrow} alt="" />
            이전
          </Before>
          <Next onClick={handleNextStep} style={{ cursor: "pointer" }}>
            다음 단계
            <img src={Arrow} alt="" />
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
  &:focus { outline: none; }
  &:placeholder-shown { color: ${Colors.text.disabled}; }
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
const NoDataText = styled.div`
  color: ${Colors.text.disabled};
  text-align: center;
  padding: 147px 0;
  font-size: 16px;
`;
const FoldIcon = styled.img<{ isCollapsed: boolean }>`
  transition: transform 0.2s ease;
  transform: ${({ isCollapsed }) => (isCollapsed ? "rotate(-90deg)" : "rotate(0deg)")};
`;

export default Main;