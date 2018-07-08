import React from "react";
import PropTypes from "prop-types";
import GLink from "gatsby-link";
import styled, { injectGlobal } from "styled-components";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ContentWrapper from "../components/ContentWrapper";

const Link = styled(GLink)`
  color: #2469f6;
  ${props => props.small && `font-size: 12px;`};
  :hover {
    padding: 10px;
    color: white;
    background-color: #2469f6;
  }
`;

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <section style={{ padding: "3rem 1.5rem" }}>
        <Container>
          <ContentWrapper>
            <Heading>Latest</Heading>
          </ContentWrapper>
          {posts.map(({ node: post }) => (
            <ContentWrapper
              style={{ border: "1px solid #dcf0fd", padding: "2em 4em" }}
              key={post.id}
            >
              <p>
                <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                <span> &bull; </span>
                <small>{post.frontmatter.date}</small>
              </p>
              <p>
                {post.excerpt}
                <br />
                <br />
                <Link to={post.fields.slug} small>
                  Keep Reading →
                </Link>
              </p>
            </ContentWrapper>
          ))}
        </Container>
      </section>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
