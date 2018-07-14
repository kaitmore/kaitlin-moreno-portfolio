import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled, { injectGlobal } from "styled-components";
require("prismjs/themes/prism-tomorrow.css");
import Navbar from "../components/Navbar";


injectGlobal`
  body {
    font-family: 'Helvetica' !important;
    margin: 0;
    font-size: 18px;
    border-top: 14px solid #2469f6;
    
    a {
      text-decoration: none;
    }
  }
`;

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Kaitlin Moreno: Software Developer" />
    <Navbar />
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
