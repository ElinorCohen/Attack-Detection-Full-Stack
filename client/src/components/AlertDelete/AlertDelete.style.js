import styled from "styled-components";
import Lottie from "lottie-react";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background: lightgray;
  padding: 15px;
  width: 20%;
  border-radius: 8px;
  text-align: center;
  align-items: center;
`;

export const Button = styled.button`
  background-color: gray;
  /* color: #fff; */
  padding: 8px 16px;
  border-color: lightcoral;
  border-radius: 4px;
  cursor: pointer;
`;

export const LottieSign = styled(Lottie)`
  animation-duration: 0.01;
  height: 5rem;
  width: 5rem;
  /* padding: 5px; */
  /* padding-top: 10px; */
  /* padding-right: 8px; */
`;
