import React from "react";
import styled from "styled-components";
import { InternalLink, ExternalLink } from "../components/Link";

const Navbar = () => (
  <Nav>
    <Title>
      <h1>Kaitlin Moreno</h1>
      <h3>Software Developer</h3>
    </Title>
    <NavLinks>
      <InternalLink to="/">About</InternalLink>
      <InternalLink to="/projects">Projects</InternalLink>
      <InternalLink to="/talks">Talks</InternalLink>
      <ExternalLink
        href="https://medium.com/@kaitmore"
        target="_blank"
        rel="noopener noreferrer"
      >
        Blog &#x2197;
      </ExternalLink>
    </NavLinks>
  </Nav>
);

const Title = styled.div`
  display: flex;
  align-items: baseline;

  > h1 {
    margin: 0 8px 8px 0;
    color: #2469f6;
    white-space: nowrap;
  }

  > h3 {
    margin: 0;
    margin-right: 16px;
    color: #5287f2;
    white-space: nowrap;
  }
`;

const NavLinks = styled.div`
  white-space: nowrap;
  width: 100%;
  max-width: 375px;
  display: flex;
  justify-content: space-around;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex: 1 1 auto;
  margin: 24px;

  @media only screen and (max-width: 900px) {
    align-items: center;
    ${Title} {
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 650px) {
    flex-wrap: wrap;
    justify-content: center;
    ${Title} {
      flex-direction: row;
      margin-bottom: 20px;
      > h3 {
        margin-right: 0;
      }
    }
  }

  @media only screen and (min-device-width: 300px) and (max-device-width: 812px) {
    ${Title} {
      flex-direction: column;
      margin-bottom: 20px;
      align-items: center;
      > * {
        margin-left: 0;
        margin-right: 0;
      }
    }

    ${NavLinks} {
      flex-direction: column;
      margin-bottom: 20px;
      align-items: center;
      > * {
        width: 100%;
        text-align: center;
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 8px;
      }
    }
  }
`;

export default Navbar;
