import styled from "styled-components";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  padding: 15px;
  border: none;
  outline: none;
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
  outline: none;
  padding: 3px;
  font-size: 17px;
  border: 1px solid black;
  border-radius: 15px;
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
  height: 25.5rem;
`;

export const RegisterButton = styled.button`
  background-color: #e4e4e4;
  width: 13.2rem;
  color: black;
  border-radius: 30px;
  font-size: 1.3rem;
  /* padding-block: 1rem; */
  height: 3.7rem;
  font-weight: 600;
  border: none;
  transition: all 200ms linear;
  &:hover {
    scale: 1;
    cursor: pointer;
    box-shadow: 0px 0px 7px grey;
  }
`;

export const WrapParagraphAndLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  gap: 0px;
  padding-left: 20px;
`;

export const AlignSelections = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

export const Title = styled.h1`
  font-family: "Impact", fantasy;
  font-size: 4.5rem;
  font-weight: 400;
  color: #dddada;
`;

export const LottieLogo = styled(Lottie)`
  animation-duration: 0.001;
  height: 7rem;
  width: 7rem;
  padding-top: 55px;
  padding-right: 10px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  padding: 0;
`;

export const ShowPassword = styled.img`
  height: 1.3rem;
  width: 1.3rem;
  padding-top: 12px;
  padding-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
`;
