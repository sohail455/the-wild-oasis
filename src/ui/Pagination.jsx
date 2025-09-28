import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function handleNext() {
    if (currentPage < pageCount) currentPage += 1;
    searchParams.set("page", currentPage);
    setSearchParams(searchParams);
  }
  function handlePrev() {
    if (currentPage > 1) currentPage -= 1;
    searchParams.set("page", currentPage);
    setSearchParams(searchParams);
  }

  if (count <= PAGE_SIZE) return null;
  return (
    <StyledPagination>
      <P>
        From {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
        {currentPage * PAGE_SIZE < count ? currentPage * PAGE_SIZE : count} of{" "}
        {count}
      </P>
      <Buttons>
        <PaginationButton onClick={handlePrev}>
          <HiChevronLeft />
          <P>Previous</P>
        </PaginationButton>
        <PaginationButton onClick={handleNext}>
          <P>Next</P>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
