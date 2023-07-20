import styled from "styled-components";

export const Input = styled.input`
  display: flex;
  height: 2rem;
  outline: none;
  padding: 8px;
  font-size: 17px;
  border: 1px solid black;
  border-radius: 14px !important;
  &::placeholder {
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid white;
  border-radius: 20px;
  box-shadow: 1px 0px 20px black;
  background-color: white;
  gap: 15px;
  width: 25rem;
  height: 18.5rem;
`;

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ResetPasswordButton = styled.button`
  background-color: #e4e4e4;
  color: black;
  border-radius: 30px;
  font-size: 1.3rem;
  padding-block: 1rem;
  font-weight: 600;
  border: none;
  transition: all 200ms linear;
  margin-top: 1.2rem;
  &:hover {
    scale: 1.05;
    cursor: pointer;
    box-shadow: 0px 0px 9px grey;
  }
`;

export const AlignH1 = styled.h1`
  margin: 0px;
`;

export const Alignp = styled.p`
  line-height: 0px;
  margin-top: 0px;
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  flex-direction: row;
  justify-content: center;
  background: none;
  margin-top: 12px;
  outline: none;
  font-size: 1.2rem;
  border: none;
  color: black;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: grey;
  }
`;
