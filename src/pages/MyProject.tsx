import { useState } from "react";
import styled from "styled-components";
import HeaderV2 from "../layouts/HeaderV2";
import { Colors } from "../styles/color";
import ProjectGrid from "../components/myprojects/Projects";
import { useMyProjects } from "../hooks/myproject";
import search from "../assets/search.svg";
import { useDebounce } from "../hooks/debounce";
import Pagination from "react-js-pagination";

const PAGE_SIZE = 9;

export default function MyProject() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const debouncedKeyword = useDebounce(keyword, 500);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleKeywordChange = (value) => {
    setKeyword(value);
    setPage(1);
  };

  const { data, isLoading } = useMyProjects({
    keyword: debouncedKeyword,
    page,
    size: PAGE_SIZE,
  });

  const projects = data?.data?.projects ?? [];
  const pagination = data?.data?.pagination;

  return (
    <WrapperAll>
      <HeaderV2 text="로그아웃" page="내 프로젝트" />
      <WrapperContainer>
        <Wrapper>
          <TopContainer>
            <Title>프로젝트 이력 조회</Title>
            <Text>지금껏 구성한 프로젝트들의 히스토리와 스택 현황입니다.</Text>
            <InputContainer>
              <Input
                placeholder="프로젝트를 찾아보세요!"
                value={keyword}
                onChange={(e) => handleKeywordChange(e.target.value)}
              />
              <SearchIcon src={search} alt="검색" />
            </InputContainer>
          </TopContainer>

          {isLoading ? (
            <LoadingText>불러오는 중...</LoadingText>
          ) : projects.length === 0 ? (
            <EmptyText>
              {keyword
                ? `"${keyword}" 검색 결과가 없습니다.`
                : "프로젝트가 없습니다."}
            </EmptyText>
          ) : (
            <>
              <ProjectGrid projects={projects} />

              {pagination && (
                <PaginationWrapper>
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={PAGE_SIZE}
                    totalItemsCount={pagination.totalCount}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                  />
                </PaginationWrapper>
              )}
            </>
          )}
        </Wrapper>
      </WrapperContainer>
    </WrapperAll>
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

const LoadingText = styled.div`
  color: ${Colors.text.secondary};
  font-size: 14px;
  margin-top: 40px;
`;

const EmptyText = styled.div`
  color: ${Colors.text.disabled};
  font-size: 14px;
  margin-top: 40px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  align-items: center;
`;
