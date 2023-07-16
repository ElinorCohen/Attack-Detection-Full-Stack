import styled from "styled-components";
import { NavLink } from "react-router-dom";
// import { FaBars } from 'react-icons/fa';
// import { NavLink as Link } from 'react-router-dom';
import Lottie from "lottie-react";

export const BarWrapper = styled.nav`
  background: #001eff5e;
  height: 85px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const NavItem = styled(NavLink)`
  float: left;
  text-align: center;
  padding: 27px 45px;
  color: black;
  text-decoration: none;
  font-size: 20px;
  &:hover {
    cursor: pointer;
    background-color: #010d6a5e;
  }
  &.active {
    font-weight: bold;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  white-space: nowrap;
  justify-content: center;
`;

export const Title = styled.div`
  font-family: "Impact", fantasy;
  font-size: 3rem;
  font-weight: 400;
`;

export const LottieLogo = styled(Lottie)`
  animation-duration: 0.001;
  /* height: 70%;
    width: 70%; */
  height: 4rem;
  width: 4rem;
  padding: 5px;
  padding-top: 10px;
  padding-right: 8px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  padding-left: 10px;
  padding-top: 4px;
`;
