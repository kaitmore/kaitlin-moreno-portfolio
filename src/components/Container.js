import styled from "styled-components";

const Container = styled.div`
  margin: 56px;
  position: relative;
  line-height: 32px;

  a {
    color: #2469f6;
    padding: 5px;
    :hover {
      color: white;
      background-color: #2469f6;
    }
  }

  h1 {
    color: #2469f6;
  }

  h2,
  h3 {
    color: #5287f2;
  }

  @media only screen and (max-width: 900px) {
    h1 {
      text-align: center;
    }

    h1 {
      white-space: nowrap;
      font-size: 2em;
    }

    h2 {
      white-space: nowrap;
      font-size: 1.5em;
      h3 {
        font-size: 1.25em;
      }
    }
  }

  @media only screen and (max-width: 650px) {
    margin: 24px;
  }
`;

export default Container;
