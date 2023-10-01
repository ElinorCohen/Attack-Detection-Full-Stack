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

import AnimatedLogo from "../assets/lotties/EDgL26btNA.json";
import HomePic from "../assets/icons/home.png";
import ProfilePic from "../assets/icons/user.png";
import HistoryPic from "../assets/icons/history.png";
import AboutPic from "../assets/icons/about.png";
import HomePicActive from "../assets/icons/homeActive.png";
import ProfilePicActive from "../assets/icons/userActive.png";
import HistoryPicActive from "../assets/icons/historyActive.png";
import AboutPicActive from "../assets/icons/aboutActive.png";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(true);
  const [selectedNavItem, setSelectedNavItem] = useState("home");

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

  const handleNavItemClick = (navItem) => {
    setSelectedNavItem(navItem);
  };

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
          <NavItem to="home" onClick={() => handleNavItemClick("home")}>
            <NavIconImg
              src={selectedNavItem === "home" ? HomePicActive : HomePic}
            />
            Home
          </NavItem>
          <NavItem to="profile" onClick={() => handleNavItemClick("profile")}>
            <NavIconImg
              src={
                selectedNavItem === "profile" ? ProfilePicActive : ProfilePic
              }
            />
            Profile
          </NavItem>
          <NavItem to="history" onClick={() => handleNavItemClick("history")}>
            <NavIconImg
              src={
                selectedNavItem === "history" ? HistoryPicActive : HistoryPic
              }
            />
            History
          </NavItem>
          <NavItem to="about" onClick={() => handleNavItemClick("about")}>
            <NavIconImg
              src={selectedNavItem === "about" ? AboutPicActive : AboutPic}
            />
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
