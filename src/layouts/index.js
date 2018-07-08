import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled, { injectGlobal } from "styled-components";

import Navbar from "../components/Navbar";
import "./all.sass";

injectGlobal`
  body {
    font-family: Andale Mono !important;
    margin: 0;
    border-top: 14px solid #2469f6;
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
