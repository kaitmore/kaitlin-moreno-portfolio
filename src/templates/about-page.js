import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import Container from "../components/Container";
import ContentWrapper from "../components/ContentWrapper";

export const AboutPageTemplate = ({ image, title, content, contentComponent, data }) => {
  const PageContent = contentComponent || Content;
  return (
    <section style={{ padding: "3rem 1.5rem" }}>
      <Container>
        <ContentWrapper>
          <div className="section">
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {title}
            </h2>
            <div style={{display: "flex"}}>
            <PageContent className="content" content={content} />
            <img src={image} style={{borderRadius: "50%",flex: "1 0 auto", marginLeft:"50px",   width: "200px",  height: "200px",  objectFit: "cover", overflow: "hidden" }}/>
            </div>
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
        title,
        image
      }
    }
  }
`;
