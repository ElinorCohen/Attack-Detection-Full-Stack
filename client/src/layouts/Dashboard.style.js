import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";

export const HamburgerIcon = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  padding: 20px;
  padding-top: 30px;
  cursor: pointer;

  @media (max-width: 1015px) {
    display: block;
  }
`;

export const HamburgerIconBar = styled.span`
  display: block;
  width: 100%;
  height: 3.5px;
  background-color: black;
  margin-bottom: 5px;
  border-radius: 3px;
  transition: transform 0.3s ease;

  ${(props) =>
    props.open &&
    css`
      &:nth-child(1) {
        transform: rotate(45deg) translate(7px, 3px);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: rotate(-45deg) translate(10px, -5px);
      }
    `}
`;

export const BarWrapper = styled.nav`
  background: #00031a33;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0px 0px 6px 1px black;
`;

export const NavItem = styled(NavLink)`
  float: left;
  text-align: center;
  padding: 27px 45px;
  color: #dddada;
  text-decoration: none;
  font-size: 20px;
  &:hover {
    cursor: pointer;
    background-color: #010d6a5e;
  }
  &.active {
    font-weight: bold;
  }

  @media (max-width: 1015px) {
    margin: 10px;
  }
`;

export const NavIconImg = styled.img`
  width: 20px;
  height: 20px;
  padding-right: 10px;
  &.active {
    width: 25px;
    height: 25px;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  white-space: nowrap;
  justify-content: center;
  z-index: 0;

  @media (max-width: 1015px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    justify-content: top;
    top: 5.15rem;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #00031a33;
    padding: 20px;
    z-index: 1;
    opacity: 0.9;
  }
`;

export const Title = styled.div`
  font-family: "Impact", fantasy;
  font-size: 3rem;
  font-weight: 300;
  color: #dddada;
`;

export const LottieLogo = styled(Lottie)`
  animation-duration: 0.01;
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
