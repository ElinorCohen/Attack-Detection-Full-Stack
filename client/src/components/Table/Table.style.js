import styled from "styled-components";
import Lottie from "lottie-react";

export const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  height: 100%;
  position: relative;
  box-shadow: 1px 0px 10px black;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 1.5px;
  text-align: left;
`;

export const TableHeader = styled.th`
  padding: 13px;
  background-color: rgb(59 66 80);
  border-bottom: 1.5px solid #383838;
  color: whitesmoke;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 0;
  letter-spacing: 1px;
  table-layout: auto;
  border-collapse: collapse;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* text-align: center; */
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f996;
  }
  &:nth-child(odd) {
    background-color: #ffffff6e;
  }
`;

export const TableCell = styled.td`
  max-width: 185px;
  min-width: 160px;
  padding: 12px;
  /* table-layout: auto; */
  border-collapse: collapse;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* border: 1px solid #e0e0e0; */
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px;
  padding-right: 8px;
  /* position: fixed; */
  /* width: 100%; */
  /* overflow: hidden; */
`;

export const PaginationButton = styled.button`
  background-color: transparent;
  border: none;
  margin: 2px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const PageNumber = styled(PaginationButton)`
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) => (active ? "blue" : "inherit")};
  opacity: ${({ active }) => (active ? 0.75 : 1)};
  border-radius: 4px;
  background-color: #f3ecec;
  border-radius: 3px;
  width: 32px;
  height: 32px;
  &:hover {
    text-decoration: none;
    cursor: pointer;
    opacity: 0.75;
  }
`;

export const LoadingAnimation = styled(Lottie)`
  animation-duration: 0.01;
  max-height: 17rem;
  width: 17rem;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  height: 100%;
`;

export const SortButtonImg = styled.img`
  width: 11px;
  height: 11px;
  padding-right: 10px;
  opacity: ${(props) => (props.active ? 1.0 : 0.3)};

  &:hover {
    cursor: pointer;
  }

  /* &.active {
    width: 25px;
    height: 25px;
  } */
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderText = styled.div`
  flex: 1; /* Take up most of the available space */
`;

export const SortContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
