import styled from "styled-components";

export const PopRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  background-color: whitesmoke;
  width: 60%;
  max-height: 80%;
  padding: 20px;
  padding-top: 0;
  padding-inline: 0;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  justify-content: center;

  text-align: center;
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

export const CloseButtonWrapper = styled.div`
  /* display: flex; */
  background-color: whitesmoke;
  border-color: black;
  width: 100%;
  padding: 0;
  margin: 0;
  position: sticky;
  top: 0;
  z-index: 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  /* display: flex; */
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: black;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 1.7px;
  text-align: left;
  /* border-color: black; */
  /* font-size: 0.9rem; */
`;

export const TableHeader = styled.th`
  padding: 13px;
  background-color: gray;
  /* border-bottom: 1.5px solid #383838; */
  color: black;
  font-weight: bold;
  /* top: 0; */
  /* z-index: 0; */
  letter-spacing: 0.5px;
  table-layout: auto;
  border-collapse: collapse;
  /* white-space: nowrap; */

  /* text-align: center; */
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: lightgray;
  }
  &:nth-child(odd) {
    background-color: #cfcfcf;
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
  width: 100%;

  /* padding-block: 1px; */
  /* padding-top: 0; */
  padding-block: 1px;
  background-color: lightgray;
  border-radius: 25px;
  text-align: start;

  /* margin-inline: 1px; */
  /* z-index: 100000; */
`;

export const HeadWrapper = styled.div`
  /* width: 95%; */
  /* height: 100%; */
  background-color: gray;
  /* padding-block: 0px;
  margin: 0; */
  border-radius: 40px;
  text-align: center;
  z-index: 0;
  margin-block: 40px;
  margin-inline: 20px;
`;

export const TableContainer = styled.div`
  /* width: 95%; */
  overflow: auto;
  /* height: 100%; */
  margin: 20px;
  position: relative;
  /* box-shadow: 1px 0px 5px black; */
  border-radius: 20px;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;
