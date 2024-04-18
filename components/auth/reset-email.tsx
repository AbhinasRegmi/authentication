import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  export const ResetEmail = ({
    name, link, imageUrl
  }: {name: string, link: string, imageUrl: string}) => (
    <Html>
      <Head />
      <Preview>
        The authentication service that you need.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={imageUrl}
            width="170"
            height="50"
            alt="Logo"
            style={logo}
          />
          <Text
          style={paragraph}
          >
          </Text>
          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            Welcome to Authentication, a simple authentication application.
            Click the link below to reset your password.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={link}>
              Reset your password
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The Authentication Team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            This reset link will expire in 1 hour. Please ignore this email if you do not want to reset your password.
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
    
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };
  