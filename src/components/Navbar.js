import React from "react";

import github from "../img/github-icon.svg";
import logo from "../img/codebuddha.svg";
import Heading from "../components/Heading";
import Link from "../components/Link";
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
      <Link
        to="/about"
        style={{
          padding: "20px",
          marginRight: "10px",
          border: "1px solid #dcf0fd"
        }}
      >
        About
      </Link>
      <Link
        to="/blog"
        style={{
          padding: "20px",
          margin: "10px",
          border: "1px solid #dcf0fd"
        }}
      >
        Blog
      </Link>
      <Link
        to="/work"
        style={{
          padding: "20px",
          margin: "10px",
          border: "1px solid #dcf0fd"
        }}
      >
        Work
      </Link>
      <Link
        to="/contact"
        style={{
          padding: "20px",
          margin: "10px",
          border: "1px solid #dcf0fd"
        }}
      >
        Contact
      </Link>
    </div>
  </nav>
);

export default Navbar;
