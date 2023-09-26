import styled from "styled-components";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  display: flex;
  height: 2rem;
  width: 100vh;
  outline: none;
  padding: 8px;
  font-size: 17px;
  border: 1px solid black;
  border-radius: 14px;
  &::placeholder {
    font-size: 1rem;
  }
`;

export const AlreadyMember = styled(Link)`
  display: flex;
  justify-content: flex-end;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid white;
  border-radius: 20px;
  box-shadow: 1px 0px 20px black;
  background-color: white;
  gap: 20px;
  width: 30rem;
  height: 30.5rem;
`;

export const RegisterButton = styled.button`
  background-color: #e4e4e4;
  color: black;
  border-radius: 30px;
  font-size: 1.3rem;
  padding-block: 1rem;
  font-weight: 600;
  border: none;
  transition: all 200ms linear;
  &:hover {
    scale: 1.05;
    cursor: pointer;
    box-shadow: 0px 0px 9px grey;
  }
`;

export const WrapParagraphAndLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  gap: 8px;
`;

export const AlignSelections = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

export const Title = styled.h1`
  font-family: "Impact", fantasy;
  font-size: 6rem;
  font-weight: 400;
`;

export const LottieLogo = styled(Lottie)`
  animation-duration: 0.001;
  height: 9rem;
  width: 9rem;
  padding-top: 77px;
  padding-right: 10px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  padding: 0;
`;
