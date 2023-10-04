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
} from "./Table.style";
import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import AnimatedLoading1 from "../../assets/lotties/loading1.json";

import SortAsc from "../../assets/icons/sort-up-whitesmoke.png";
import SortDesc from "../../assets/icons/caret-down-whitesmoke.png.png";

// import AnimatedLoading2 from "../../assets/lotties/loading2.json";
// import AnimatedLoading3 from "../../assets/lotties/loading3.json";

// function Table({ data, page, onPageChange }) {
//   //calculation of table height

//   const [tableContainerHeight, setTableContainerHeight] = useState("75px");

//   const handleResize = () => {
//     const navBarHeight = document.getElementById("navbar").clientHeight;
//     const paginationHeight = document.getElementById("pagination").clientHeight;
//     const searchHeight = document.getElementById("search").clientHeight;
//     const windowHeight = window.innerHeight;

//     const desiredTableContainerHeight =
//       windowHeight - navBarHeight - paginationHeight - searchHeight;

//     setTableContainerHeight(`${desiredTableContainerHeight}px`);
//   };

//   useEffect(() => {
//     // Add event listener to handle window resize
//     window.addEventListener("resize", handleResize);

//     // Initial calculation on component mount
//     handleResize();

//     // Clean up event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   //end of calculation of table height

//   const columns = Object.keys(data[0] || {});
//   const itemsPerPage = 30; // Limitation of 50 rows per page
//   const MAX_VISIBLE_PAGES = 3;
//   const startIndex = (page - 1) * itemsPerPage;
//   const visibleData = data.slice(startIndex, startIndex + itemsPerPage);

//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const isPrevDisabled = page === 1;
//   const isNextDisabled = page === totalPages;

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       onPageChange(newPage);
//     }
//   };

//   const generatePageNumbers = () => {
//     const pages = [];
//     const startPage = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
//     const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

//     if (startPage > 1) {
//       pages.push(
//         <PageNumber
//           key={1}
//           active={page === 1 ? "true" : undefined}
//           onClick={() => handlePageChange(1)}
//         >
//           1
//         </PageNumber>
//       );
//       if (startPage > 2) {
//         pages.push(<span key="ellipsis1">...</span>);
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <PageNumber
//           key={i}
//           active={i === page ? "true" : undefined}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </PageNumber>
//       );
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         pages.push(<span key="ellipsis2">...</span>);
//       }
//       pages.push(
//         <PageNumber
//           key={totalPages}
//           active={page === totalPages ? "true" : undefined}
//           onClick={() => handlePageChange(totalPages)}
//         >
//           {totalPages}
//         </PageNumber>
//       );
//     }

//     return pages;
//   };

//   return (
//     <div>
//       <TableContainer
//         id="TableContainer"
//         style={{ height: tableContainerHeight }}
//       >
//         <StyledTable>
//           <thead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableHeader key={column}>{column}</TableHeader>
//               ))}
//             </TableRow>
//           </thead>
//           <tbody>
//             {visibleData.map((item, index) => (
//               <TableRow key={index}>
//                 {columns.map((column) => (
//                   <TableCell key={column}>{item[column]}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </tbody>
//         </StyledTable>
//       </TableContainer>
//       <PaginationWrapper id="pagination">
//         <PaginationButton
//           onClick={() => onPageChange(page - 1)}
//           disabled={isPrevDisabled}
//         >
//           Prev
//         </PaginationButton>
//         {generatePageNumbers()}
//         <PaginationButton
//           onClick={() => onPageChange(page + 1)}
//           disabled={isNextDisabled}
//         >
//           Next
//         </PaginationButton>
//       </PaginationWrapper>
//     </div>
//   );
// }

// Table.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
//   page: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
// };

// export default Table;

// import axios from "axios"; // Import Axios for API requests

function Table({ url_data_route }) {
  const [data, setData] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortFields, setSortFields] = useState([]);

  // const total = getTotalItemsFromDB("Exploits");
  // console.log(total);

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
            params: { sort: sortCriteria },
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

  const [tableContainerHeight, setTableContainerHeight] = useState("75px");

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
                <LoadingAnimation animationData={AnimatedLoading1} />
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
      <PaginationWrapper id="pagination">
        <PaginationButton
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(page + 1)}
          disabled={data.length < 50}
        >
          Next
        </PaginationButton>
      </PaginationWrapper>
    </div>
  );
}

Table.propTypes = {
  url_data_route: PropTypes.string.isRequired,
};

export default Table;
