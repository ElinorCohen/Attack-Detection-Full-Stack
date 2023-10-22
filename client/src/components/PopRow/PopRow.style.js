import styled from "styled-components";

export const PopRowWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 1px;
  font-size: 1.1rem;
`;

export const PopRowContent = styled.div`
  position: relative;
  background-color: white;
  width: 45%;
  height: 80%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: auto;
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

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: black;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 1.5px;
  text-align: left;
  /* font-size: 0.9rem; */
`;

export const TableHeader = styled.th`
  padding: 13px;
  background-color: rgb(59 66 80);
  border-bottom: 1.5px solid #383838;
  color: whitesmoke;
  font-weight: bold;
  /* top: 0; */
  /* z-index: 0; */
  letter-spacing: 1px;
  /* table-layout: auto; */
  border-collapse: collapse;
  /* white-space: nowrap; */

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
  /* max-width: 185px;
  min-width: 160px; */
  padding: 12px;
  /* table-layout: auto; */
  border-collapse: collapse;
  white-space: nowrap;
  overflow: hidden;
  /* border: 1px solid #e0e0e0; */
`;

export const FieldWrapper = styled.div`
  width: 95%;
  padding-block: 1px;
  background-color: lightgray;
  border-radius: 10px;
`;

export const HeadWrapper = styled.div`
  width: 100%;
  background-color: gray;
  padding-block: 0px;
  margin: 0;
  border-radius: 10px;
`;
