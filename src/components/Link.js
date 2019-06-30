import GLink from "gatsby-link";
import styled from "styled-components";

export const InternalLink = styled(GLink)`
  color: #2469f6;
  padding: 20px;
  margin: 10px;
  border: 1px solid #dcf0fd;
  ${props => props.small && `font-size: 12px;`};
  :hover {
    color: white;
    background-color: #2469f6;
  }
`;

export const ExternalLink = InternalLink.withComponent("a");
