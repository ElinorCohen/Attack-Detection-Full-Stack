import React, { useEffect, useRef } from "react";
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
  TableContainer,
  CloseButtonWrapper,
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
        <CloseButtonWrapper>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </CloseButtonWrapper>
        <h1>{rowData.CVE}</h1>
        <HeadWrapper>
          <strong>Description: </strong>
          <FieldWrapper>
            <p
              style={{
                paddingInline: "15px",
                margin: "0",
                paddingBlock: "10px",
              }}
            >
              {rowData.DESCRIPTION}
            </p>

            <p
              style={{
                paddingInline: "15px",
                margin: "0",
                paddingBlock: "10px",
              }}
            >
              <strong>Category: </strong>
              {rowData.CATEGORY.join(", ")}
            </p>
            <p
              style={{
                paddingInline: "15px",
                margin: "0",
                paddingBlock: "10px",
              }}
            >
              <strong>Published: </strong>
              {rowData.PUBLISHED}
              <span style={{ margin: "0 20px" }}></span>
              <strong>Updated: </strong>
              {rowData.UPDATED}
            </p>
          </FieldWrapper>
        </HeadWrapper>

        <HeadWrapper>
          <strong>
            Epss (Exploit Prediction Scoring System) as of{" "}
            {rowData.EPSS["Date:"]}:
          </strong>
          <FieldWrapper>
            {Object.entries(rowData.EPSS).map(([key, value]) => {
              return key !== "Date:" ? (
                <p
                  key={key}
                  style={{
                    paddingInline: "15px",
                    margin: "0",
                    paddingBlock: "10px",
                  }}
                >
                  <strong>{key} </strong>
                  {value}
                </p>
              ) : (
                <React.Fragment key={key} />
              );
            })}
          </FieldWrapper>
        </HeadWrapper>

        {/* {
          <StyledTable>
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
        } */}

        {
          <TableContainer>
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
                            {
                              rowData["BASE SCORE (TABLE)"][columnName][
                                rowIndex
                              ]
                            }
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  )
                )}
              </tbody>
            </StyledTable>
          </TableContainer>
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
