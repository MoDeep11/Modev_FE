import styled from "styled-components";
import HeaderV2 from "../layouts/HeaderV2";
import { Colors } from "../styles/color";
import ProjectBox from "../components/myprojects/ProjectBox";
import serch from "../assets/serch.svg";

export default function MyProject() {
  return (
    <>
      <WrapperAll>
        <HeaderV2 text="로그아웃" page="내 프로젝트" />

        <WrapperContainer>
          <Wrapper>
            <TopContainer>
              <Title>프로젝트 이력 조회</Title>
              <Text>
                지금껏 구성한 프로젝트들의 히스토리와 스택 현황입니다.
              </Text>
              <InputContainer>
                <Input placeholder="프로젝트를 찾아보세요!"></Input>
                <SearchIcon src={serch} alt=""></SearchIcon>
              </InputContainer>
            </TopContainer>

            <ProjectBoxWrapper>
              <ProjectBox
                title="프로젝트명"
                text="프로젝트 한 줄 설명이 들어갑니다."
                createdAt="2026-09-03"
                lastModifiedAt="2026-09-08"
              />
              <ProjectBox
                title="프로젝트명"
                text="프로젝트 한 줄 설명이 들어갑니다."
                createdAt="2026-09-03"
                lastModifiedAt="2026-09-08"
              />
              <ProjectBox
                title="프로젝트명"
                text="프로젝트 한 줄 설명이 들어갑니다."
                createdAt="2026-09-03"
                lastModifiedAt="2026-09-08"
              />
              <ProjectBox
                title="프로젝트명"
                text="프로젝트 한 줄 설명이 들어갑니다."
                createdAt="2026-09-03"
                lastModifiedAt="2026-09-08"
              />
            </ProjectBoxWrapper>
          </Wrapper>
        </WrapperContainer>
      </WrapperAll>
    </>
  );
}

const WrapperAll = styled.div`
  background-color: ${Colors.background.base};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const WrapperContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const ProjectBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
`;

const Title = styled.div`
  color: ${Colors.text.primary};
  text-align: center;
  font-size: 24px;
  line-height: 32px;
`;

const Text = styled.div`
  color: ${Colors.text.secondary};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 24px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: white;
  outline: none;
  font-size: 16px;
`;

const SearchIcon = styled.img`
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  width: 744px;
  height: 44px;
  padding: 10px 24px;
  justify-content: space-between;
  align-items: center;
  border-radius: 50px;
  background-color: ${Colors.background.overlay};
  margin-bottom: 48px;
`;
