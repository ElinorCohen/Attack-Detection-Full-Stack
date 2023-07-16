import {
  TableContainer,
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
  PaginationWrapper,
  PaginationButton,
  PageNumber,
} from "./Table.style";
import PropTypes from "prop-types";

function Table({ data, page, onPageChange }) {
  const columns = Object.keys(data[0] || {});
  const itemsPerPage = 30; // Limitation of 50 rows per page
  const MAX_VISIBLE_PAGES = 3;
  const startIndex = (page - 1) * itemsPerPage;
  const visibleData = data.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const isPrevDisabled = page === 1;
  const isNextDisabled = page === totalPages;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
    const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (startPage > 1) {
      pages.push(
        <PageNumber
          key={1}
          active={page === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </PageNumber>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageNumber
          key={i}
          active={i === page}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageNumber>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2">...</span>);
      }
      pages.push(
        <PageNumber
          key={totalPages}
          active={page === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </PageNumber>
      );
    }

    return pages;
  };

  return (
    <div style={{ height: "100%" }}>
      <TableContainer id="TableContainer">
        <StyledTable>
          <thead>
            <TableRow>
              {columns.map((column) => (
                <TableHeader key={column}>{column}</TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {visibleData.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column}>{item[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      <PaginationWrapper>
        <PaginationButton
          onClick={() => onPageChange(page - 1)}
          disabled={isPrevDisabled}
        >
          Prev
        </PaginationButton>
        {generatePageNumbers()}
        <PaginationButton
          onClick={() => onPageChange(page + 1)}
          disabled={isNextDisabled}
        >
          Next
        </PaginationButton>
      </PaginationWrapper>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Table;
