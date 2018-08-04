import GLink from "gatsby-link";
import styled from "styled-components";

const Button = styled.button`
  color: #2469f6;
  padding: 20px;
  border: 1px solid #dcf0fd;
  font-size: 16px;
  color: #2469f6;
  cursor: pointer;
  ${props => props.small && `font-size: 12px;`};
  :hover {
    color: white;
    background-color: #2469f6;
  }
`;

export default Button;
