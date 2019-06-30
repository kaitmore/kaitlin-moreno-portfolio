import React from "react";

import github from "../img/github-icon.svg";
import logo from "../img/codebuddha.svg";
import Heading from "../components/Heading";
import { InternalLink, ExternalLink } from "../components/Link";
import ContentWrapper from "../components/ContentWrapper";

const Navbar = () => (
  <nav
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      flex: "1 1 auto"
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "baseline"
      }}
    >
      <Heading style={{ color: "#2469f6" }}>Kaitlin Moreno</Heading>
      <Heading style={{ fontSize: "22px", margin: "0 24px" }}>
        Software Developer
      </Heading>
    </div>
    <div>
      <InternalLink to="/about">About</InternalLink>
      <ExternalLink href="https://medium.com/@kaitmore" target="_blank">
        Blog
      </ExternalLink>
      <InternalLink to="/projects">Projects</InternalLink>
      <InternalLink to="/contact">Contact</InternalLink>
    </div>
  </nav>
);

export default Navbar;
