import { ReactElement } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/contants";

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

interface PaginationButtonProps {
  active?: boolean;
}

const PaginationButton = styled.button<PaginationButtonProps>`
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

interface PaginationProps {
  count: number; // number of results (bookings full dataset)
}

function Pagination({ count }: PaginationProps): ReactElement | null {
  // Get the search parameters from the URL
  const [searchParams, setSearchParams] = useSearchParams();
  // Get the current page from URL, default to page 1 if not specified
  const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  // Calculate how many pages we need based on the total count and items per page
  const pageCount = Math.ceil(count / PAGE_SIZE);
  // Make sure we don't try to show a page that doesn't exist
  // If currentPage is 5 but we only have 3 pages, use 3
  const safeCurrentPage = Math.min(currentPage, pageCount);
  /**
   * If the user somehow landed on a page that doesn't exist (for example, they were on
   * page 5, then applied a filter that reduced results to only 2 pages) Automatically
   * redirect them to the highest available page instead of showing an error. This
   * prevents "page not found" scenarios when data changes.
   * Added automatic URL correction if the current page exceeds the max page count
   */
  if (currentPage > pageCount) {
    searchParams.set("page", String(pageCount));
    setSearchParams(searchParams);
  }
  // Calculate item range correctly - Ensure they never exceed the actual count
  // Calculate the first item number we're showing
  // Example: On page 2 with 10 items per page, this would be 11
  // Also make sure we don't show a number higher than the total count
  const from = Math.min((safeCurrentPage - 1) * PAGE_SIZE + 1, count);
  // Calculate the last item number we're showing
  // Example: On page 2 with 10 items per page, this would be 20
  // Also make sure we don't show a number higher than the total count
  const to = Math.min(safeCurrentPage * PAGE_SIZE, count);
  // Function to go to the next page
  const nextPage = () => {
    // If we're already on the last page, stay there
    // Otherwise, go to the next page
    const next = safeCurrentPage === pageCount ? safeCurrentPage : safeCurrentPage + 1;
    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  };
  // Function to go to the previous page
  const previousPage = () => {
    // If we're already on the first page, stay there
    // Otherwise, go to the previous page
    const prev = safeCurrentPage === 1 ? safeCurrentPage : safeCurrentPage - 1;
    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  };
  // If there's only one page or less, don't show pagination at all
  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        {/* Display which items we're currently showing */}
        Showing <span>{from}</span> to <span>{to}</span> of <span>{count}</span> results
      </P>
      <Buttons>
        {/* Previous button - disabled if we're on page 1 */}
        <PaginationButton onClick={previousPage} disabled={safeCurrentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        {/* Next button - disabled if we're on the last page */}
        <PaginationButton onClick={nextPage} disabled={safeCurrentPage === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
