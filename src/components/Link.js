import GLink from "gatsby-link";
import styled from "styled-components";

export const InternalLink = styled(GLink)`
  color: #2469f6;
  display: inline-block;
  padding: 16px;
  border: 1px solid #b6d7ed;
  :hover {
    color: white;
    background-color: #2469f6;
  }
`;

export const ExternalLink = InternalLink.withComponent("a");
