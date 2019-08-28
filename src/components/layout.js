import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { createGlobalStyle } from "styled-components";
import Navbar from "./Navbar";

const GlobalStyle = createGlobalStyle`

  body {
border-top: 4px solid #5287f2;
    font-family: 'Helvetica';
    margin: 0;
    padding: 0;
    font-size: 18px;
    a {
      text-decoration: none;
    }
  }
  *,
  *:before,
  *:after  {
  box-sizing: border-box;
  }
`;

const TemplateWrapper = ({ children }) => (
  <div style={{ height: "100vh" }}>
    <GlobalStyle />
    <Helmet title="Kaitlin Moreno: Software Developer" />
    <Navbar />
    <div>{children}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
