import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled, { injectGlobal } from "styled-components";
import "prismjs/themes/prism-coy.css";
import Navbar from "../components/Navbar";

injectGlobal`
  body {
    font-family: 'Helvetica';
    margin: 0;
    padding: 0;
    font-size: 18px;
    a {
      text-decoration: none;
    }
  }
`;

const TemplateWrapper = ({ children }) => (
  <div style={{ height: "100vh" }}>
    <Helmet title="Kaitlin Moreno: Software Developer" />
    <Navbar />
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
