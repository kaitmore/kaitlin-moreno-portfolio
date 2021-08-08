import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";
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
      <Container
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginTop: "64px" }}>{title}</h2>
        <BioWrapper>
          <BioImg fluid={image.childImageSharp.fluid} alt="bio" />
          <PageContent className="content" content={content} />
          <ResumeLink href="/technical_resume_moreno.pdf">
            Check out my resume 👩‍💻
          </ResumeLink>
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

const ResumeLink = styled.a`
  width: fit-content;
  margin: 56px auto;
  display: inline-block;
  padding: 16px !important;
  border: 1px solid #b6d7ed;

  :hover {
    color: white;
    background-color: #2469f6;
  }
`;

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

const BioImg = styled(Img)`
  position: relative;
  margin: 32px auto;
  display: block;
  border-radius: 50%;
  flex: 1 0 auto;
  margin-left: auto;
  width: 350px;
  height: 350px;
  object-fit: cover;
  overflow: hidden;
`;

const BioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  margin: 0 auto;
  > .content {
    min-width: 300px;
  }

  @media only screen and (max-width: 1200px) {
    width: 50%;
    > ${BioImg} {
      width: 250px;
      height: 250px;
    }
  }
`;

const AboutPage = ({ data }) => {
  const { markdownRemark: post, image } = data;
  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      image={image}
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
    image: file(relativePath: { eq: "bio.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
