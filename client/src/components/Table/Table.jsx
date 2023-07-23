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
import { useEffect, useState } from "react";

function Table({ data, page, onPageChange }) {
  //calculation of table height

  const [tableContainerHeight, setTableContainerHeight] = useState("75px");

  const handleResize = () => {
    const navBarHeight = document.getElementById("navbar").clientHeight;
    const paginationHeight = document.getElementById("pagination").clientHeight;
    const searchHeight = document.getElementById("search").clientHeight;
    const windowHeight = window.innerHeight;

    const desiredTableContainerHeight =
      windowHeight - navBarHeight - paginationHeight - searchHeight;

    setTableContainerHeight(`${desiredTableContainerHeight}px`);
  };

  useEffect(() => {
    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Initial calculation on component mount
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //end of calculation of table height

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
          active={page === 1 ? "true" : undefined}
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
          active={i === page ? "true" : undefined}
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
          active={page === totalPages ? "true" : undefined}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </PageNumber>
      );
    }

    return pages;
  };

  return (
    <div>
      <TableContainer
        id="TableContainer"
        style={{ height: tableContainerHeight }}
      >
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
      <PaginationWrapper id="pagination">
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
