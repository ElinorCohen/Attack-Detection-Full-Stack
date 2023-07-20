import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  BarWrapper,
  Title,
  LottieLogo,
  LogoWrapper,
  NavMenu,
  NavItem,
  HamburgerIcon,
  HamburgerIconBar,
  NavIconImg,
} from "./Dashboard.style";

import AnimatedLogo from "../assets/EDgL26btNA.json";
import HomePic from "../assets/home.png";
import ProfilePic from "../assets/user.png";
import HistoryPic from "../assets/history.png";
import AboutPic from "../assets/about.png";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(true);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowHamburger(window.innerWidth <= 1015);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close menu when screen size is small and user clicks outside of it
  useEffect(() => {
    if (!showHamburger) {
      setOpen(false);
    }
  }, [showHamburger]);

  return (
    <div style={{ height: "100%" }}>
      <BarWrapper id="navbar">
        <LogoWrapper>
          <Title>ATTACK</Title>
          <LottieLogo animationData={AnimatedLogo} />
          <Title>METER</Title>
        </LogoWrapper>
        {showHamburger && (
          <HamburgerIcon onClick={toggleMenu}>
            <HamburgerIconBar open={open} />
            <HamburgerIconBar open={open} />
            <HamburgerIconBar open={open} />
          </HamburgerIcon>
        )}
        <NavMenu open={open}>
          <NavItem to="home">
            <NavIconImg src={HomePic} />
            Home
          </NavItem>
          <NavItem to="profile">
            <NavIconImg src={ProfilePic} />
            Profile
          </NavItem>
          <NavItem to="history">
            <NavIconImg src={HistoryPic} />
            History
          </NavItem>
          <NavItem to="about">
            <NavIconImg src={AboutPic} />
            About
          </NavItem>
        </NavMenu>
      </BarWrapper>
      <div style={{ filter: showHamburger && open ? "blur(4px)" : "none" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
