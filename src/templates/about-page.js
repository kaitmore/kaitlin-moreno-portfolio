import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import Content, { HTMLContent } from "../components/Content";
import Container from "../components/Container";

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
          <BioImg src={image} alt="bio" />
        </BioWrapper>
        <SocialLink href="https://github.com/kaitmore">
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
            alt="github"
          />
        </SocialLink>
        <SocialLink href="https://twitter.com/kaitlinjane">
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/twitter.svg"
            alt="twitter"
          />
        </SocialLink>
        <SocialLink href="https://www.youtube.com/channel/UC7oFV8FKK9Htj-BMQoJ6roA/videos">
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/youtube.svg"
            alt="youtube"
          />
        </SocialLink>
      </Container>
    </Layout>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const SocialLink = styled.a.attrs(() => ({
  id: "social",
  target: "_blank",
  rel: "noopener noreferrer"
}))`
  img {
    filter: invert(55%) sepia(40%) saturate(4973%) hue-rotate(202deg)
      brightness(97%) contrast(96%);
    height: 32px;
    width: 32px;
  }

  &:hover {
    background-color: unset !important;
    img {
      filter: invert(40%) sepia(100%) saturate(4314%) hue-rotate(213deg)
        brightness(98%) contrast(96%);
    }
  }

  :not(:first-of-type) {
    padding-left: 16px;
  }
`;

const BioImg = styled.img`
  position: relative;
  margin: 72px auto;
  display: block;
  border-radius: 50%;
  flex: 1 0 auto;
  margin-left: 50px;
  width: 250px;
  height: 250px;
  object-fit: cover;
  overflow: hidden;
`;

const BioWrapper = styled.div`
  display: flex;
  > .content {
    min-width: 300px;
  }

  @media only screen and (max-width: 900px) {
    flex-direction: column-reverse;
    > img {
      margin: 0 auto;
    }
  }
`;

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
