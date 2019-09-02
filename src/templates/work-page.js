import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import Container from "../components/Container";

export const WorkPageTemplate = ({ title, items }) => {
  return (
    <Layout>
      <Container>
        <h2>{title}</h2>
        <ProjectWrapper>
          {items.map(project => {
            return (
              <ProjectBox key={project.title}>
                <ProjectHeader>
                  <p>
                    <a
                      href={project.deployed_url}
                      style={{ fontSize: "24px", whiteSpace: "nowrap" }}
                      target="_blank"
                      rel="noopener noreferrer"
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
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code →
                    </a>
                  )}
                </ProjectHeader>
                {project.thumbnail && (
                  <ProjectThumnail
                    src={project.thumbnail}
                    alt={project.title}
                  />
                )}
                {project.video && (
                  <VideoWrap>
                    <iframe
                      width="100%"
                      height="auto"
                      src={project.video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={project.title}
                    />
                  </VideoWrap>
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

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const VideoWrap = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;

  iframe {
    padding-bottom: 14px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const SubTitle = styled.small`
  display: block;
  font-style: italic;
  padding-left: 4px;
`;

const ProjectThumnail = styled.img`
  max-width: 100%;
  display: block;
  margin: 20px 0;
`;

const ProjectBox = styled.div`
  border: 1px solid #dcf0fd;
  padding: 1em 2em;
  overflow: auto;
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
  const {
    frontmatter: { title, projects, talks }
  } = data.markdownRemark;
  const items = title.toLowerCase() === "projects" ? projects : talks;
  return <WorkPageTemplate title={title} items={items} />;
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
        }
        talks {
          title
          subtitle
          deployed_url
          description
          video
        }
      }
    }
  }
`;
