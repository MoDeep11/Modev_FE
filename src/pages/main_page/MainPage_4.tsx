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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProject,
  updateProject,
  getProjectDetail,
  getProjectDependencies,
  generateAIStructure,
  getStructureStatus,
} from "../../apis/project/index";
import type {
  ProjectPayload,
  UpdateStacksPayload,
  ServerDependency,
} from "../../apis/project/type";

const stackTitleMap: Record<string, string> = {
  stack_spring: "Spring Boot 관련 라이브러리",
  stack_axios: "Axios 관련 라이브러리",
  stack_react_query: "React Query 관련 라이브러리",
};

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams<{ projectId: string }>();
  const { saveStepData } = useProjectForm();

  const isModify = !!projectId && location.pathname.startsWith("/main-md-4/");

  const [selectedStackIds, setSelectedStackIds] = useState<string[]>([]);
  const [selectedDeps, setSelectedDeps] = useState<ServerDependency[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  useEffect(() => {
    const savedForm = sessionStorage.getItem("projectForm");
    if (savedForm) {
      const parsed = JSON.parse(savedForm);
      setSelectedStackIds(parsed.stackIds || []);
    }
  }, []);

  // 1. 의존성 목록 가져오기
  const {
    data: serverData,
    isError: isDepsError,
    error: depsError,
  } = useQuery({
    queryKey: ["projectDependencies", selectedStackIds],
    queryFn: async () => {
      console.log(
        `%c📡 [GET] 의존성 목록 요청 시작 -> /catalog/dependencies?stackIds=${selectedStackIds.join(",")}`,
        "color: #00d2ff; font-weight: bold;",
      );
      const res = await getProjectDependencies(selectedStackIds);
      console.log(
        "%c✅ [GET] 의존성 목록 수신 성공:",
        "color: #00ff87; font-weight: bold;",
        res,
      );
      return res;
    },
    enabled: selectedStackIds.length > 0,
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

  const allDependencies: ServerDependency[] =
    serverData?.data?.dependencies ?? [];

  // 3. 기존 의존성 복원 처리
  useEffect(() => {
    if (
      isModify &&
      projectResponse?.data?.dependencies &&
      allDependencies.length > 0
    ) {
      const savedDeps = projectResponse.data.dependencies;
      const restored = allDependencies.filter((d) =>
        savedDeps.some(
          (sd: any) => sd.dependencyId === d.dependencyId || sd.name === d.name,
        ),
      );
      setSelectedDeps(restored);
      console.log(
        "%c🔄 [수정 모드] 기존 선택 의존성 복원 완료:",
        "color: #ff9f43; font-weight: bold;",
        restored,
      );
    }
  }, [isModify, projectResponse, allDependencies]);

  useEffect(() => {
    if (isModify) return;
    const savedForm = sessionStorage.getItem("projectForm");
    if (savedForm && allDependencies.length > 0) {
      const parsed = JSON.parse(savedForm);
      const dependencyIdsFromSession: string[] = parsed.dependencyIds || [];
      if (dependencyIdsFromSession.length > 0) {
        const restored = allDependencies.filter((dep) =>
          dependencyIdsFromSession.includes(dep.dependencyId),
        );
        setSelectedDeps(restored);
      }
    }
  }, [allDependencies, isModify]);

  useEffect(() => {
    if (isDepsError) {
      console.error(
        "%c❌ [GET] 의존성 목록 요청 실패:",
        "color: #ff4d4d; font-weight: bold;",
        depsError,
      );
    }
  }, [isDepsError, depsError]);

  const handleToggleCategory = (categoryId: string) => {
    if (collapsedCategories.includes(categoryId)) {
      setCollapsedCategories(
        collapsedCategories.filter((id) => id !== categoryId),
      );
    } else {
      setCollapsedCategories([...collapsedCategories, categoryId]);
    }
  };

  // 신규 생성 또는 업데이트 연동 Mutation 처리
  const projectMutation = useMutation({
    mutationFn: async (payload: ProjectPayload) => {
      if (isModify && projectId) {
        console.log(
          "%c🚀 [PATCH] 서버 수정 요청 시작 -> /projects/" +
            projectId +
            "/stacks",
          "color: #ff007f; font-weight: bold;",
        );
        const stacksOnlyPayload: UpdateStacksPayload = {
          fieldIds: payload.fieldIds,
          stackIds: payload.stackIds,
          dependencyIds: payload.dependencyIds,
        };
        return await updateProject({ projectId, data: stacksOnlyPayload });
      } else {
        console.log(
          "%c🚀 [POST] 서버 생성 요청 시작 -> /projects",
          "color: #ff007f; font-weight: bold;",
        );
        return await createProject(payload);
      }
    },
    onSuccess: async (response) => {
      console.log(
        "%c🎉 성공 데이터 수신 완료:",
        "color: #00ff87; font-weight: bold;",
        response,
      );

      const activeProjectId =
        projectId || response?.data?.projectId || response?.projectId;

      if (!activeProjectId) {
        alert("⚠️ 프로젝트 ID를 특정할 수 없습니다.");
        return;
      }

      sessionStorage.setItem("currentProjectId", String(activeProjectId));

      try {
        if (isModify) {
          console.log(
            `📡 [GET] 재생성 상태 확인 -> /projects/structures/${activeProjectId} (PATCH가 이미 재생성을 트리거함)`,
          );
          const statusRes = await getStructureStatus(String(activeProjectId));
          console.log(
            "%c✅ [GET] 재생성 상태 수신:",
            "color: #00ff87; font-weight: bold;",
            statusRes,
          );
        } else {
          console.log(
            `📡 [POST] AI 구조 생성 트리거 -> /projects/structures (id: ${activeProjectId})`,
          );
          await generateAIStructure(String(activeProjectId));
        }

        alert(
          isModify
            ? "🎉 프로젝트가 성공적으로 수정되었습니다!"
            : "🎉 프로젝트가 성공적으로 생성되었습니다!",
        );
        sessionStorage.removeItem("projectForm");

        const storedProjectId = sessionStorage.getItem("currentProjectId");

        navigate(
          isModify
            ? `/project-detail/${activeProjectId}`
            : `/build-progress/${storedProjectId}`,
        );
      } catch (error) {
        console.error("❌ AI 구조 생성/상태 확인 API 에러:", error);
        alert(
          "⚠️ 프로젝트 메타 구조 처리는 반영되었으나, AI 빌드 컨텍스트 처리 중 에러가 발생했습니다.",
        );
      }
    },
    onError: (error) => {
      console.error("❌ 처리 실패:", error);
      alert("⚠️ 서버 통신 중 오류가 발생했습니다.");
    },
  });

  const filteredDeps = allDependencies.filter((dep) => {
    const isRelatedToStack = selectedStackIds.includes(dep.stackId);
    const matchesSearch = dep.name
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    return isRelatedToStack && matchesSearch;
  });

  const groupedCategories = selectedStackIds
    .map((stackId) => {
      return {
        stackId,
        categoryName: stackTitleMap[stackId] || `선택한 스택 관련 의존성`,
        dependencies: filteredDeps.filter((dep) => dep.stackId === stackId),
      };
    })
    .filter((group) => group.dependencies.length > 0);

  const handleSelectDep = (dep: ServerDependency) => {
    if (selectedDeps.some((item) => item.dependencyId === dep.dependencyId)) {
      handleRemoveDep(dep.dependencyId);
    } else {
      setSelectedDeps([...selectedDeps, dep]);
    }
  };

  const handleRemoveDep = (dependencyId: string) => {
    setSelectedDeps(
      selectedDeps.filter((item) => item.dependencyId !== dependencyId),
    );
  };

  const handleCompleteForm = () => {
    const finalDepIds = selectedDeps.map((dep) => dep.dependencyId);
    saveStepData({ dependencyIds: finalDepIds });

    const savedForm = sessionStorage.getItem("projectForm");
    if (!savedForm) {
      alert("선택된 프로젝트 구성 정보가 없습니다.");
      return;
    }

    const parsedData = JSON.parse(savedForm);

    const payload: ProjectPayload = {
      projectName: parsedData.projectName || "새로운 프로젝트",
      description: parsedData.description || "프로젝트 한 줄 설명",
      fieldIds: parsedData.fieldIds || [],
      stackIds: parsedData.stackIds || [],
      dependencyIds: finalDepIds,
    };

    projectMutation.mutate(payload);
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
          <Process num={isModify ? 2 : 3} text="기술 스택 선택" use={false} />
          <img src={Arrow} width={16} height={16} alt="" />
          <Process num={isModify ? 3 : 4} text="의존성 선택" use={true} />
        </Main_top>

        <Main_section>
          <Title_box>
            <Sec_title>프로젝트 세부 라이브러리 및 의존성 구성</Sec_title>
            <Sec_text>
              선택한 프레임워크 스택과 호환되는 유용한 라이브러리 꾸러미입니다.
            </Sec_text>
          </Title_box>

          <Search_container>
            <Search_bar>
              <Search_input
                placeholder="라이브러리명을 찾아보세요!"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <img src={Search_img} alt="" />
            </Search_bar>

            <Choice_tag>
              <Choice_num>{selectedDeps.length}개 선택됨</Choice_num>
              {selectedDeps.length > 0 && <Line />}
              {selectedDeps.map((dep) => (
                <Choice_option key={dep.dependencyId}>
                  {dep.name}
                  <img
                    src={Cancel}
                    alt="삭제"
                    onClick={() => handleRemoveDep(dep.dependencyId)}
                    style={{ cursor: "pointer" }}
                  />
                </Choice_option>
              ))}
            </Choice_tag>
          </Search_container>

          <Choice_box>
            {groupedCategories.length > 0 ? (
              groupedCategories.map((category) => {
                const isCollapsed = collapsedCategories.includes(
                  category.stackId,
                );

                return (
                  <Skill_container key={category.stackId}>
                    <Skill_category
                      onClick={() => handleToggleCategory(category.stackId)}
                      style={{ cursor: "pointer" }}
                    >
                      {category.categoryName}
                      <FoldIcon
                        src={Fold}
                        width={16}
                        height={16}
                        alt="토글"
                        isCollapsed={isCollapsed}
                      />
                    </Skill_category>

                    {!isCollapsed && (
                      <Skill_box>
                        {category.dependencies.map((dep) => {
                          const isSelected = selectedDeps.some(
                            (item) => item.dependencyId === dep.dependencyId,
                          );
                          return (
                            <div
                              key={dep.dependencyId}
                              onClick={() => handleSelectDep(dep)}
                              style={{
                                cursor: "pointer",
                                borderRadius: "12px",
                                position: "relative",
                                outline: isSelected
                                  ? `2px solid ${Colors.brand.default}`
                                  : "none",
                                transition: "all 0.1s ease",
                              }}
                            >
                              <Skill
                                title={`${dep.name} (${dep.version})`}
                                text={dep.description}
                                isSelected={isSelected}
                              />
                              {dep.isRecommended && (
                                <RecommendBadge>추천</RecommendBadge>
                              )}
                            </div>
                          );
                        })}
                      </Skill_box>
                    )}
                  </Skill_container>
                );
              })
            ) : (
              <NoDataText>
                3단계에서 선택한 기술 스택이 없거나 조건에 맞는 데이터가
                없습니다.
              </NoDataText>
            )}
            <Choice_text>
              선택한 의존성은 빌드 시스템 파일에 자동 주입됩니다.
            </Choice_text>
          </Choice_box>
        </Main_section>

        <Btn_box>
          <Before
            onClick={() =>
              navigate(isModify ? `/main-md-3/${projectId}` : "/main-3")
            }
          >
            <img src={Arrow} alt="" />
            이전
          </Before>

          <Next onClick={handleCompleteForm} style={{ cursor: "pointer" }}>
            프로젝트 {isModify ? "수정 완료" : "생성"}
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
const NoDataText = styled.div`
  color: ${Colors.text.disabled};
  text-align: center;
  padding: 147px 0;
  font-size: 16px;
`;
const RecommendBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: ${Colors.brand.default};
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
`;
const FoldIcon = styled.img<{ isCollapsed: boolean }>`
  transition: transform 0.2s ease;
  transform: ${({ isCollapsed }) =>
    isCollapsed ? "rotate(-90deg)" : "rotate(0deg)"};
`;

export default Main;
