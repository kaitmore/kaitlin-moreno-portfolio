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
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "60px",
      flex: "1 1 auto"
    }}
  >
    <img
      src={logo}
      alt="Kaldi"
      style={{ height: "350px", padding: "0 60px" }}
    />
    <div>
      <Heading style={{ color: "#2469f6" }}>Kaitlin Moreno</Heading>
      <Heading style={{ fontSize: "25px" }}>Software Developer</Heading>

      <div style={{ marginTop: "40px" }}>
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
          to="/about"
          style={{
            padding: "20px",
            margin: "10px",
            border: "1px solid #dcf0fd"
          }}
        >
          Work
        </Link>
        <Link
          to="/about"
          style={{
            padding: "20px",
            margin: "10px",
            border: "1px solid #dcf0fd"
          }}
        >
          Contact
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
