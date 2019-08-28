import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ContentWrapper from "../components/ContentWrapper";

export const WorkPageTemplate = ({ title, projects, talks }) => {
  return (
    <Container>
      <Heading>{title}</Heading>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        {projects.map(project => {
          console.log("project.video", project.video);
          return (
            <ContentWrapper
              style={{
                border: "1px solid #dcf0fd",
                padding: "1em 2em",
                flex: "1 1 400px",
                margin: "1.5em",
                overflow: "scroll"
              }}
              key={project.title}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "nowrap"
                }}
              >
                <p>
                  <a
                    href={project.deployed_url}
                    style={{ fontSize: "24px", whiteSpace: "nowrap" }}
                  >
                    {project.title}
                  </a>
                  <small style={{ display: "block", fontStyle: "italic" }}>
                    {project.subtitle}
                  </small>
                </p>
                {project.github_url && (
                  <p>
                    <a href={project.github_url} style={{ fontSize: "14px" }}>
                      View Code →
                    </a>
                  </p>
                )}
              </div>
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  style={{
                    maxWidth: "100%",
                    height: "",
                    display: "block",
                    margin: "20px 0",
                    objectFit: "cover"
                  }}
                  alt={project.title}
                />
              )}
              {project.video && (
                <iframe
                  width="560"
                  height="315"
                  src={project.video}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  title={project.title}
                />
              )}
              <p style={{ margin: 0 }}>{project.description}</p>
            </ContentWrapper>
          );
        })}
      </div>
    </Container>
  );
};

WorkPageTemplate.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.object,
    image2: PropTypes.object,
    image3: PropTypes.object
  }),
  testimonials: PropTypes.array,
  fullImage: PropTypes.string,
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    plans: PropTypes.array
  })
};

const WorkPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  console.log(data);
  return (
    <WorkPageTemplate
      title={frontmatter.title}
      projects={frontmatter.projects}
      talks={frontmatter.talks}
    />
  );
};

WorkPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default WorkPage;

export const workPageQuery = graphql`
  query WorkPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        projects {
          title
          thumbnail
          subtitle
          deployed_url
          github_url
          description
          video
        }
      }
    }
  }
`;
