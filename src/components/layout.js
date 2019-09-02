import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { createGlobalStyle } from "styled-components";

import Navbar from "./Navbar";

const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after  {
    box-sizing: border-box;
  }

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
`;

const TemplateWrapper = ({ children }) => (
  <div style={{ height: "100vh" }}>
    <GlobalStyle />
    <Helmet
      title="Kaitlin Moreno: Software Developer"
      meta={[
        {
          name: "description",
          content:
            "The personal portfolio of Washington, D.C. based software engineer Kaitlin Moreno."
        },
        {
          name: "keywords",
          content:
            "software, engineer, tech, technology, javascript, frontend, front-end, backend, coder, coding, job, jobs, technology, end to end testing, testing, apps, web app, programming, programmer, washington dc, software jobs, software careers, react, react engineer, reactjs, node, css, html, dc, district of columbia, dc"
        },
        {
          name: "robots",
          content: "index, follow"
        },
        { name: "language", content: "English" }
      ]}
    >
      <html lang="en" />
    </Helmet>
    <Navbar />
    <div>{children}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
