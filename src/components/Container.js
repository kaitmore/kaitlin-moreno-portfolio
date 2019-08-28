import styled from "styled-components";

const Container = styled.div`
  margin: 56px;
  position: relative;
  line-height: 32px;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  p:not(:last-child),
  dl:not(:last-child),
  ol:not(:last-child),
  ul:not(:last-child),
  blockquote:not(:last-child),
  pre:not(:last-child),
  table:not(:last-child) {
    margin-bottom: 1em;
  }

  ul,
  ol {
    margin-left: 4em;
  }

  h2 {
    font-size: 24px;
    color: #5287f2;
  }
  h2:not(:first-child) {
    margin: 42px 0 24px 0;
  }

  a {
    color: #2469f6;
    padding: 5px;
    :hover {
      color: white;
      background-color: #2469f6;
    }
    &#social {
      background-color: unset;
      img {
        filter: invert(55%) sepia(40%) saturate(4973%) hue-rotate(202deg)
          brightness(97%) contrast(96%);
        &:hover {
          filter: invert(40%) sepia(100%) saturate(4314%) hue-rotate(213deg)
            brightness(98%) contrast(96%);
        }
      }
    }
  }

  img#bio {
    position: relative;
    margin: 72px auto;
    display: block;
    border-radius: 50%;
    flex: 1 0 auto;
    margin-left: 50px;
    width: 200px;
    height: 200px;
    object-fit: cover;
    overflow: hidden;
  }

  @media only screen and (max-width: 900px) {
    margin: 16px;
    h1 {
      text-align: center;
    }
  }

  h1 {
    color: #2469f6;
    white-space: nowrap;
    font-size: 2em;
  }

  h2 {
    color: #5287f2;
    white-space: nowrap;
    font-size: 1.5em;
    h3 {
      font-size: 1.25em;
    }
  }
`;

export default Container;
