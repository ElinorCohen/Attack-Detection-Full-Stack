import {
  TableContainer,
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
  PaginationWrapper,
  PaginationButton,
  LoadingAnimation,
  LoadingWrapper,
  HeaderText,
  HeaderTextContainer,
  SortButtonImg,
  SortContainer,
  PageNumber,
  PaginationButtonImage,
  ThreeDotsImg,
  GoToPageButton,
  GoToPageInput,
  GoToPageWrapper,
  BottomTableWrapper,
} from "./Table.style";
import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import AnimatedLoading from "../../assets/lotties/loading1.json";

import SortAsc from "../../assets/icons/sort-up-whitesmoke.png";
import SortDesc from "../../assets/icons/caret-down-whitesmoke.png.png";

import Next from "../../assets/icons/right-arrow_white.png";
import Prev from "../../assets/icons/left-arrow_white.png";
import ThreeDots from "../../assets/icons/more_white.png";

function Table({ url_data_route, collectionName }) {
  const itemsPerPage = 50;
  const MAX_VISIBLE_PAGES = 3;
  const [data, setData] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortFields, setSortFields] = useState([]);

  const [tableContainerHeight, setTableContainerHeight] = useState("75px");
  const [isDataLengthFetched, setIsDataLengthFetched] = useState(false);
  const [total, setTotal] = useState(itemsPerPage);

  const [GoToinputValue, setGoToInputValue] = useState(page);

  const fetchDataLength = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/User/getDataLength/${collectionName}`
      );
      setTotal(response.data);
      setIsDataLengthFetched(true); // Set the flag to true after fetching
    } catch (error) {
      console.error("Axios request error:", error);
    }
  }, [collectionName]);

  const fetchDataForPage = useCallback(
    async (page, sortFields) => {
      try {
        let sortCriteria = {};
        if (sortFields) {
          sortCriteria = sortFields.reduce((criteria, field) => {
            if (field.name === "CATEGORY") field.name = "CategorySort";
            criteria[field.name] = field.order === "asc" ? 1 : -1;
            return criteria;
          }, {});
        }

        const response = await axios.get(
          `http://localhost:8000/api/User/${url_data_route}/${page}`,
          {
            params: { sort: sortCriteria, itemsPerPage: itemsPerPage },
          }
        );

        setData(response.data);
        if (response.data.length > 0) setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [url_data_route]
  );

  const handleSortClick = (fieldName, sortOrder) => {
    // Create a map for field name transformations
    const fieldNameMap = {
      "BASE SCORE (TABLE)": "MaxBaseScoreSort",
      CATEGORY: "CategorySort",
    };

    const mappedFieldName = fieldNameMap[fieldName] || fieldName;

    const existingSortFieldIndex = sortFields.findIndex(
      (field) => field.name === mappedFieldName
    );

    if (existingSortFieldIndex !== -1) {
      const updatedSortFields = [...sortFields];

      if (
        sortOrder === "asc" &&
        sortFields[existingSortFieldIndex].order === "asc"
      ) {
        updatedSortFields.splice(existingSortFieldIndex, 1);
      } else if (
        sortOrder === "desc" &&
        sortFields[existingSortFieldIndex].order === "desc"
      ) {
        updatedSortFields.splice(existingSortFieldIndex, 1);
      } else if (
        sortOrder === "desc" &&
        sortFields[existingSortFieldIndex].order === "asc"
      ) {
        updatedSortFields[existingSortFieldIndex].order = "desc";
      } else if (
        sortOrder === "asc" &&
        sortFields[existingSortFieldIndex].order === "desc"
      ) {
        updatedSortFields[existingSortFieldIndex].order = "asc";
      }

      setSortFields(updatedSortFields);
    } else {
      const updatedSortFields = [
        ...sortFields,
        { name: mappedFieldName, order: sortOrder },
      ];

      setSortFields(updatedSortFields);
    }
  };

  useEffect(() => {
    if (!isDataLengthFetched) {
      fetchDataLength();
    }
  }, [isDataLengthFetched, fetchDataLength]);

  useEffect(() => {
    fetchDataForPage(page, sortFields);
  }, [page, sortFields, fetchDataForPage]);

  useEffect(() => {
    const handleResize = () => {
      const navBarHeight = document.getElementById("navbar").clientHeight;
      const paginationHeight =
        document.getElementById("pagination").clientHeight;
      const searchHeight = document.getElementById("search").clientHeight;
      const windowHeight = window.innerHeight;

      const desiredTableContainerHeight =
        windowHeight - navBarHeight - paginationHeight - searchHeight;

      setTableContainerHeight(`${desiredTableContainerHeight}px`);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalPages = total ? Math.ceil(total / itemsPerPage) : 0; // Calculate only if 'total' is available

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
        pages.push(
          <span key="ellipsis1">
            <ThreeDotsImg src={ThreeDots} alt="more" />
          </span>
        );
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
        pages.push(
          <span key="ellipsis2">
            <ThreeDotsImg src={ThreeDots} alt="more" />
          </span>
        );
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

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= total) {
      setCurrentPage(parseInt(newPage));
      setGoToInputValue(parseInt(newPage));
    }
    const tableContainer = document.getElementById("TableContainer");
    if (tableContainer) {
      tableContainer.scrollTo({ behavior: "smooth", top: 0 });
    }
  };

  const columns = Object.keys(data[0] || {});

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
                <TableHeader key={column}>
                  <HeaderTextContainer>
                    <HeaderText>
                      {column === "BASE SCORE (TABLE)"
                        ? "MAX BASE SCORE"
                        : column}
                    </HeaderText>
                    <SortContainer>
                      <SortButtonImg
                        src={SortAsc}
                        onClick={() => handleSortClick(column, "asc")}
                        active={sortFields.some((field) => {
                          if (column === "CATEGORY") column = "CategorySort";
                          if (column === "BASE SCORE (TABLE)")
                            column = "MaxBaseScoreSort";
                          return column === field.name && field.order === "asc";
                        })}
                      />
                      <SortButtonImg
                        src={SortDesc}
                        onClick={() => handleSortClick(column, "desc")}
                        active={sortFields.some((field) => {
                          if (column === "CATEGORY") column = "CategorySort";
                          if (column === "BASE SCORE (TABLE)")
                            column = "MaxBaseScoreSort";
                          return (
                            column === field.name && field.order === "desc"
                          );
                        })}
                      />
                    </SortContainer>
                  </HeaderTextContainer>
                </TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {loading ? (
              <LoadingWrapper>
                <LoadingAnimation animationData={AnimatedLoading} />
              </LoadingWrapper>
            ) : (
              data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column}>
                      {column === "BASE SCORE (TABLE)"
                        ? item[column]["Base Score"].reduce((max, c) =>
                            c > max ? c : max
                          )
                        : Array.isArray(item[column])
                        ? item[column].join(", ")
                        : item[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableContainer>
      <BottomTableWrapper>
        <GoToPageWrapper>
          <GoToPageInput
            type="number"
            value={GoToinputValue}
            max={totalPages}
            min={1}
            onChange={(e) => {
              setGoToInputValue(e.target.value);
            }}
            placeholder="Go to Page"
          />
          <GoToPageButton
            onClick={() => handlePageChange(GoToinputValue)}
            disabled={GoToinputValue < 1 || GoToinputValue > totalPages}
          >
            GO
          </GoToPageButton>
        </GoToPageWrapper>
        <PaginationWrapper id="pagination">
          <PaginationButton
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <PaginationButtonImage src={Prev} alt="prev" />
          </PaginationButton>
          {generatePageNumbers()}
          <PaginationButton
            onClick={() => handlePageChange(page + 1)}
            disabled={data.length < itemsPerPage}
          >
            <PaginationButtonImage src={Next} alt="next" />
          </PaginationButton>
        </PaginationWrapper>
      </BottomTableWrapper>
    </div>
  );
}

Table.propTypes = {
  url_data_route: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default Table;
