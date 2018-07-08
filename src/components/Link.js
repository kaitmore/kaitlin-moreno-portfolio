import GLink from "gatsby-link";
import styled from "styled-components";

const Link = styled(GLink)`
  color: #2469f6;
  ${props => props.small && `font-size: 12px;`};
  :hover {
    padding: 10px;
    color: white;
    background-color: #2469f6;
  }
`;

export default Link;
