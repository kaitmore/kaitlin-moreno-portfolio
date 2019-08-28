import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import Content, { HTMLContent } from "../components/Content";
import Container from "../components/Container";
import Heading from "../components/Heading";

const BioWrapper = styled.div`
  display: flex;
  > .content {
    min-width: 300px;
  }

  @media only screen and (max-width: 900px) {
    flex-direction: column-reverse;
    > img#bio {
      margin: 0 auto;
    }
  }
`;

export const AboutPageTemplate = ({
  image,
  title,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;
  return (
    <Layout>
      <Container>
        <h2>{title}</h2>
        <BioWrapper>
          <PageContent className="content" content={content} />

          <img src={image} id="bio" alt="bio" />
        </BioWrapper>

        <a
          href="https://github.com/kaitmore"
          id="social"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="32"
            width="32"
            src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
            alt="github"
          />
        </a>
        <a
          href="https://twitter.com/kaitlinjane"
          id="social"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="32"
            width="32"
            src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/twitter.svg"
            alt="twitter"
          />
        </a>
        <a
          target="_blank"
          href="https://www.youtube.com/channel/UC7oFV8FKK9Htj-BMQoJ6roA/videos"
          id="social"
          rel="noopener noreferrer"
        >
          <img
            height="32"
            width="32"
            src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/youtube.svg"
            alt="youtube"
          />
        </a>
      </Container>
    </Layout>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      image={post.frontmatter.image}
      content={post.html}
    />
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image
      }
    }
  }
`;
