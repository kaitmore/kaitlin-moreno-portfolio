import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import Container from "../components/Container";
import ContentWrapper from "../components/ContentWrapper";
import Heading from "../components/Heading";
import { ExternalLink } from "../components/Link";

export const AboutPageTemplate = ({
  image,
  title,
  content,
  contentComponent,
  data
}) => {
  const PageContent = contentComponent || Content;
  return (
    <section style={{ padding: "3rem 1.5rem" }}>
      <Container>
        <ContentWrapper>
          <div className="section">
            <Heading>{title}</Heading>
            <div style={{ display: "flex" }}>
              <PageContent className="content" content={content} />
              <img src={image} id="bio" />
            </div>

            <a href="https://github.com/kaitmore" id="social" target="_blank">
              <img
                height="32"
                width="32"
                src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
              />
            </a>
            <a
              href="https://twitter.com/kaitlinjane"
              id="social"
              target="_blank"
            >
              <img
                height="32"
                width="32"
                src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/twitter.svg"
              />
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UC7oFV8FKK9Htj-BMQoJ6roA/videos"
              id="social"
            >
              <img
                height="32"
                width="32"
                src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/youtube.svg"
              />
            </a>
          </div>
        </ContentWrapper>
      </Container>
    </section>
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
