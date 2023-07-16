import {
  BarWrapper,
  Title,
  LottieLogo,
  LogoWrapper,
  // Bars,
  NavMenu,
  NavItem,
} from "./NavBar.style";

import AnimatedLogo from "../../assets/EDgL26btNA.json";

function NavBar() {
  return (
    <BarWrapper>
      <LogoWrapper>
        <Title>ATTACK</Title>
        <LottieLogo animationData={AnimatedLogo} />
        <Title>METER</Title>
      </LogoWrapper>
      <NavMenu>
        <NavItem to="home">Home</NavItem>
        <NavItem to="profile">Profile</NavItem>
        <NavItem to="history">History</NavItem>
        <NavItem to="about">About</NavItem>
      </NavMenu>
    </BarWrapper>
  );
}

export default NavBar;
