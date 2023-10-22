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
  z-index: 1000;
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
  flex: 1;
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

export const PaginationButtonImage = styled.img`
  height: 10px;
  width: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const ThreeDotsImg = styled.img`
  height: 18px;
  width: 20px;
  padding-inline: 5px;
  padding-top: 10px;
`;

export const PageNumber = styled(PaginationButton)`
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) => (active ? "blue" : "inherit")};
  opacity: ${({ active }) => (active ? 0.75 : 1)};
  border-radius: 4px;
  background-color: #f3ecec;
  border-radius: 3px;
  width: 40px;
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

export const GoToPageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  align-items: center;
  padding-left: 15px;
`;

export const GoToPageInput = styled.input`
  height: 30px;
  width: 70px;
  padding-left: 8px;
  font-size: 0.9rem;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    height: 33px;
    padding-inline: 5px;
    opacity: 1;
  }
`;

export const GoToPageButton = styled.button`
  height: 36px;
  /* padding: 10px; */
  font-size: 0.9rem;
`;

export const BottomTableWrapper = styled.div`
  display: flex;
`;

////////SearchDesign//////////

export const SearchWrapper = styled.div`
  padding-bottom: 17px;
  padding-top: 17px;
  padding-left: 17px;
`;

export const SearchBar = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #ffffffc2;
  cursor: auto;
  width: 20rem;
  padding: 1rem;
  height: 0.5rem;
  border-radius: 10rem;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

export const SearchInput = styled.input`
  font-size: 16px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: 1rem;
  border: none;
  color: black;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  outline: none;
  &::placeholder {
    color: black;
    opacity: 0.7;
  }
`;

export const SearchButton = styled.button`
  line-height: 1;
  pointer-events: auto;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
`;

export const ClearSearch = styled.img`
  height: 0.9rem;
  width: 0.9rem;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
