import HeaderV2 from "../../layouts/HeaderV2";
import styled from "@emotion/styled";
import { Colors } from "../../styles/color";
import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/Arrow.svg";
import Fold from "../../assets/Fold.svg";
import Cancel from "../../assets/Vector (Stroke).svg";
import Process from "../../components/main_com/TopProcess";
import Skill from "../../components/choice/SkillBlock";
import Search_img from "../../assets/search.svg";

const Main = () => {
  const num = 3;
  const navigate = useNavigate();

  return (
    <>
      <HeaderV2 text="로그아웃" page="프로젝트 빌더" />
      <Body>
        <Main_top>
          <Process num={1} text="프로젝트 생성" use={false}/>
          <img src={Arrow} width={16} height={16} />
          <Process num={2} text="개발 분야 선택" use={false}/>
          <img src={Arrow} width={16} height={16} />
          <Process num={3} text="기술 스택 선택" use={true}/>
          <img src={Arrow} width={16} height={16} />
          <Process num={4} text="의존성 선택" use={false}/>
        </Main_top>
        <Main_section>
          <Title_box>
            <Sec_title>프로젝트에 사용할 상세 메인 기술 스택 지정</Sec_title>
            <Sec_text>
              선택하신 개발범위(frontend, devops, backend)에 최적화된 스택
              목록입니다.
            </Sec_text>
          </Title_box>

          <Search_container>
            <Search_bar>
              <Search_input placeholder="스택명을 찾아보세요!"></Search_input>
              <img src={Search_img} alt="" />
            </Search_bar>
            <Choice_tag>
              <Choice_num>{num}개 선택됨</Choice_num>
              <Line></Line>
              <Choice_option>
                FrontEnd
                <img src={Cancel} alt="" />
              </Choice_option>
              <Choice_option>
                FrontEnd
                <img src={Cancel} alt="" />
              </Choice_option>
              <Choice_option>
                FrontEnd
                <img src={Cancel} alt="" />
              </Choice_option>
            </Choice_tag>
          </Search_container>

          <Choice_box>
            <Skill_container>
              <Skill_category>
                카테고리명
                <img src={Fold} width={16} height={16} />
              </Skill_category>
              <Skill_box>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
              </Skill_box>
            </Skill_container>
            <Skill_container>
              <Skill_category>
                카테고리명
                <img src={Fold} width={16} height={16} />
              </Skill_category>
              <Skill_box>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
              </Skill_box>
            </Skill_container>
            <Skill_container>
              <Skill_category>
                카테고리명
                <img src={Fold} width={16} height={16} />
              </Skill_category>
              <Skill_box>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
                <Skill
                  title="Axios"
                  text="서버 통신을 위한 고신뢰성 Promise 기반 HTTP 클라이언트"
                ></Skill>
              </Skill_box>
            </Skill_container>
            <Choice_text>
              만들고 싶은 서비스에 필요한 개발 분야를 선택해주세요. 현재 선택된
              분야를 기준으로 다음 단계에서 기술 스택 추천이 제공됩니다.
            </Choice_text>
          </Choice_box>
        </Main_section>
        <Btn_box>
          <Before
            onClick={() => {
              navigate("/main-2");
            }}
          >
            <img src={Arrow} alt="" />
            이전
          </Before>

          <Next onClick={() => {
            navigate("/main-4")
          }}>
            다음
            <img src={Arrow} alt="" />
          </Next>
        </Btn_box>
      </Body>
    </>
  );
};

const Body = styled.div`
  width: 100%;
  height: fit-content;
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

export default Main;
