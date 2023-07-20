import styled from "styled-components";

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
  /* Change width of the form depending if the bar is opened or not */
  width: ${(props) => (props.barOpened ? "20rem" : "0.5rem")};
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
  cursor: ${(props) => (props.barOpened ? "auto" : "pointer")};
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
  margin-left: ${(props) => (props.barOpened ? "1rem" : "0rem")};
  border: none;
  color: black;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: black;
    opacity: 0.7;
  }
`;

export const SearchButton = styled.button`
  line-height: 1;
  /* height: 15px;
  width: 15px; */
  pointer-events: ${(props) => (props.barOpened ? "auto" : "none")};
  cursor: ${(props) => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
`;
