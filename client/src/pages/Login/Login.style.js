import styled from "styled-components";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

export const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid white;
  border-radius: 20px;
  box-shadow: 1px 0px 20px black;
  background-color: white;
  gap: 18px;
  width: 20rem;
`;

export const SubmitButton = styled.button`
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

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 4px;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
  font-size: 1rem;
  &::placeholder {
    font-size: 1rem;
  }
`;

export const Title = styled.h1`
  font-family: "Impact", fantasy;
  font-size: 6rem;
  font-weight: 400;
`;

export const Icon = styled.img`
  padding: 3px;
  height: 21px;
  width: 21px;
  border-inline-color: #e4e4e4;
  padding-right: 5px;
  border-bottom: 1px solid grey;
`;

export const ForgotPassword = styled(Link)`
  align-self: flex-end;
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
`;

export const RegisterField = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: bold;
  gap: 18px;
`;
