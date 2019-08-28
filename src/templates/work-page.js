import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import Container from "../components/Container";

export const WorkPageTemplate = ({ title, projects, talks }) => {
  return (
    <Layout>
      <Container>
        <h2>{title}</h2>
        <ProjectWrapper>
          {projects.map(project => {
            return (
              <ProjectBox key={project.title}>
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
                    <SubTitle>{project.subtitle}</SubTitle>
                  </p>
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      style={{
                        fontSize: "14px",
                        margin: "14px",
                        height: "fit-content"
                      }}
                    >
                      View Code →
                    </a>
                  )}
                </div>
                {project.thumbnail && (
                  <ProjectThumnail
                    src={project.thumbnail}
                    alt={project.title}
                  />
                )}
                {project.video && (
                  <iframe
                    width="560"
                    height="315"
                    src={project.video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={project.title}
                  />
                )}
                <p style={{ margin: 0 }}>{project.description}</p>
              </ProjectBox>
            );
          })}
        </ProjectWrapper>
      </Container>
    </Layout>
  );
};

const SubTitle = styled.small`
  display: block;
  font-style: italic;
  padding-left: 4px;
`;

const ProjectThumnail = styled.img`
  max-width: 100%;
  display: block;
  margin: 20px 0;
  object-fit: cover;
`;

const ProjectBox = styled.div`
  border: 1px solid #dcf0fd;
  padding: 1em 2em;
  overflow: scroll;
`;

const ProjectWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, fit-content);
  grid-column-gap: 8px;
  grid-row-gap: 8px;

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

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
