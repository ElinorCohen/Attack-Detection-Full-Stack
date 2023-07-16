import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  height: 100%;
  margin-top: 26px;
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
  border-spacing: 1px;
  /* border-collapse: collapse; */
`;

export const TableHeader = styled.th`
  padding: 12px;
  background-color: #f3ecec;
  border-bottom: 2px solid #e1dbdb;
  position: sticky;
  top: 0;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9cc;
  }
  &:nth-child(odd) {
    background-color: #ffffff6e;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  /* border: 1px solid #e0e0e0; */
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px;
  padding-right: 8px;
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
