import { useEffect, useRef } from "react";
import {
  PopRowWrapper,
  CloseButton,
  PopRowContent,
  StyledTable,
  TableCell,
  TableHeader,
  TableRow,
  FieldWrapper,
  HeadWrapper,
} from "./PopRow.style";
import PropTypes from "prop-types";
function PopRow({ rowData, onClose }) {
  const popRowRef = useRef(null);

  const useOutsideClick = (ref, callback) => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    });
  };
  // Close the PopRow when clicked outside
  useOutsideClick(popRowRef, onClose);

  return (
    <PopRowWrapper>
      <PopRowContent ref={popRowRef}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h1>{rowData.CVE}</h1>
        <FieldWrapper>
          <p>
            <HeadWrapper>
              <strong>Description: </strong>
            </HeadWrapper>
            {rowData.DESCRIPTION}
          </p>
        </FieldWrapper>
        <p>
          <strong>Category: </strong>
          {rowData.CATEGORY.join(", ")}
        </p>
        <p>
          <strong>Published: </strong>
          {rowData.PUBLISHED}
          <span style={{ margin: "0 20px" }}></span>
          <strong>Updated: </strong>
          {rowData.UPDATED}
        </p>

        <strong>Epss: </strong>
        {
          <StyledTable
          // style={{
          //   width: "100%",
          //   borderSpacing: "1.8px",
          //   textAlign: "left",
          //   backgroundColor: "gray",
          //   borderColor: "whitesmoke",
          // }}
          >
            <tbody>
              {Object.entries(rowData.EPSS).map(([subKey, subValue]) => (
                <TableRow key={subKey}>
                  <TableCell>
                    <strong>{subKey}</strong>
                  </TableCell>
                  <TableCell>{subValue}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        }

        <strong>Base score: </strong>
        {
          <StyledTable>
            <thead>
              <TableRow>
                {Object.keys(rowData["BASE SCORE (TABLE)"]).map(
                  (columnName) => (
                    <TableHeader key={columnName}>{columnName}</TableHeader>
                  )
                )}
              </TableRow>
            </thead>
            <tbody>
              {rowData["BASE SCORE (TABLE)"]["Base Score"].map(
                (_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.keys(rowData["BASE SCORE (TABLE)"]).map(
                      (columnName) => (
                        <TableCell key={columnName}>
                          {rowData["BASE SCORE (TABLE)"][columnName][rowIndex]}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                )
              )}
            </tbody>
          </StyledTable>
        }
      </PopRowContent>
    </PopRowWrapper>
  );
}

PopRow.propTypes = {
  rowData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopRow;
