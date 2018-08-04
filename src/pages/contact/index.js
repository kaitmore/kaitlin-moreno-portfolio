import React from "react";
import styled from "styled-components";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Container from "../../components/Container";
const Input = styled.input`
  padding: 20px;
  border: 1px solid #dcf0fd;
  width: 100%;
  color: #2469f6;
  font-size: 16px;
  :focus {
    outline: 2px solid #2469f6;
    background-color: #2469f6;
    color: white;
    ::placeholder {
      color: white;
    }
  }
  ::placeholder {
    color: #2469f6;
  }
`;

const Textarea = styled.textarea`
  padding: 20px;
  border: 1px solid #dcf0fd;
  width: 100%;
  :focus {
    outline: 2px solid #2469f6;
    background-color: #2469f6;
    color: white;
    ::placeholder {
      color: white;
    }
  }
  ::placeholder {
    font-size: 16px;
    color: #2469f6;
  }
`;

export default function ContactForm() {
  return (
    <Container>
      <Heading>Say Hi!</Heading>
      <form
        style={{
          width: "50%"
        }}
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <Input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            <Input type="text" name="name" placeholder="Name" />
          </label>
        </p>
        <p>
          <label>
            <Input type="email" name="email" placeholder="Email" />
          </label>
        </p>
        <p>
          <label>
            <Textarea name="message" placeholder="Message" />
          </label>
        </p>
        <p>
          <Button type="submit">Send</Button>
        </p>
      </form>
    </Container>
  );
}
