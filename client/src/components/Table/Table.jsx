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
  SearchButton,
  SearchInput,
  SearchWrapper,
  SearchBar,
  ClearSearch,
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

import searchIcon from "../../assets/icons/find.png";
import closeIcon from "../../assets/icons/close.png";
import PopRow from "../PopRow/PopRow";

function Table({ url_data_route, collectionName }) {
  const itemsPerPage = 50;
  const MAX_VISIBLE_PAGES = 3;
  const [data, setData] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortFields, setSortFields] = useState([]);
  const [input, setInput] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [tableContainerHeight, setTableContainerHeight] = useState("75px");
  const [total, setTotal] = useState(itemsPerPage);

  const [GoToinputValue, setGoToInputValue] = useState(page);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleRowClick = async (rowData) => {
    const cveSearch = rowData.CVE;

    try {
      const dataToSend = {
        collectionName: collectionName,
      };

      const config = {
        headers: {
          "data-header": JSON.stringify(dataToSend),
        },
      };

      const response = await axios.get(
        `http://localhost:8000/api/User/getRowData/${cveSearch}`,
        config
      );
      setSelectedRowData(response.data); // Update selectedRowData with the retrieved data
      setPopupVisible(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClosePopRow = () => {
    setPopupVisible(false);
    setSelectedRowData(null); // Clear the selected row data
  };

  const sccrollUp = () => {
    const tableContainer = document.getElementById("TableContainer");
    if (tableContainer) {
      tableContainer.scrollTo({ behavior: "smooth", top: 0 });
    }
  };

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

        const dataToSend = {
          sort: sortCriteria,
          itemsPerPage: itemsPerPage,
          searchText: input,
          collectionName: collectionName,
        };

        const config = {
          headers: {
            "data-header": JSON.stringify(dataToSend),
          },
        };

        const response = await axios.get(
          `http://localhost:8000/api/User/${url_data_route}/${page}`,
          config
        );

        setData(response.data.data);
        setTotal(response.data.size);
        console.log(response.data.size);
        if (response.data.size > 0) setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [url_data_route, input, collectionName]
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
      const updatedSortFields = [{ name: mappedFieldName, order: sortOrder }];

      setSortFields(updatedSortFields);
    }
    setCurrentPage(1);
    setGoToInputValue(1);
    sccrollUp();
  };

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
    sccrollUp();
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setGoToInputValue(1);
    setInput(searchValue);
    sccrollUp();
  };

  const clearSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setGoToInputValue(1);
    setSearchValue("");
    setInput("");
    sccrollUp();
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(`Form was submited with input: ${input}`);
  };

  const columns = Object.keys(data[0] || {});

  return (
    <div>
      {isPopupVisible && (
        <PopRow rowData={selectedRowData[0]} onClose={handleClosePopRow} />
      )}
      <SearchWrapper id="search">
        <SearchBar onSubmit={onFormSubmit}>
          <SearchButton type="submit" onClick={handleSearch}>
            <img
              src={searchIcon}
              style={{
                height: "18px",
                width: "18px",
                paddingLeft: "3px",
                paddingTop: "3px",
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = 0.7; // Change opacity on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = 1; // Reset opacity when not hovering
              }}
            />
          </SearchButton>
          <SearchInput
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            value={searchValue}
            placeholder="Search..."
          />
          <ClearSearch src={closeIcon} onClick={clearSearch} />
        </SearchBar>
      </SearchWrapper>
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
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(item)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = 0.7; // Change opacity on hover
                    e.currentTarget.style.cursor = "pointer"; // Change cursor to pointer
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = 1; // Reset opacity when not hovering
                    e.currentTarget.style.cursor = "default"; // Reset cursor to default
                  }}
                >
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
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value)) {
                setGoToInputValue(value);
              }
            }}
            placeholder="Page"
          />
          <GoToPageButton
            onClick={() => handlePageChange(GoToinputValue)}
            disabled={
              GoToinputValue < 1 ||
              GoToinputValue > totalPages ||
              !Number.isInteger(GoToinputValue)
            }
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
