import styled from "styled-components";

const ContentWrapper = styled.div`
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
    margin: 42px 0 24px 0;
    color: #5287f2;
  }

  a {
    color: #2469f6;
    :hover {
      padding: 10px;
      color: white;
      background-color: #2469f6;
    }
  }
`;

export default ContentWrapper;
