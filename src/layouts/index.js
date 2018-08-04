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
    border-left: 14px solid #2469f6;
    border-right: 14px solid #2469f6;  
    a {
      text-decoration: none;
    }
    &:before, &:after {
      content: "";
      position: fixed;
      background: #2469f6;
      left: 0;
      right: 0;
      height: 14px;
      z-index:1000;
    }
    &:before {
        top: 0;
    }
    &:after {
        bottom: 0;
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
