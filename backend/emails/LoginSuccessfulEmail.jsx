// emails/LoginSuccessfulEmail.js
import React from "react";
import { Html, Head, Body, Container, Section, Text, Heading, Link } from "@react-email/components";

export default function LoginSuccessfulEmail() {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f4f4f7", fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Section style={{ backgroundColor: "#4f46e5", padding: "20px", textAlign: "center" }}>
            <Heading as="h1" style={{ color: "#ffffff", fontSize: "24px", margin: 0 }}>Product Story</Heading>
          </Section>
          <Section style={{ padding: "30px 40px", color: "#333333" }}>
            <Heading as="h2" style={{ fontSize: "22px", marginTop: 0 }}>Login Successful</Heading>
            <Text>Hello,</Text>
            <Text>We noticed a successful login to your Product Story account. If this was you, there’s nothing else you need to do.</Text>
            <Text>If you didn’t login or suspect any unauthorized access, please <Link href="https://productstory.com/security" style={{ color: "#4f46e5", textDecoration: "none" }}>secure your account immediately</Link>.</Text>
            <Text style={{ fontSize: "14px", color: "#999999", marginTop: "40px" }}>— The Product Story Team</Text>
          </Section>
          <Section style={{ backgroundColor: "#f4f4f7", padding: "15px", fontSize: "12px", color: "#999999", textAlign: "center" }}>
            © 2025 Product Story. All rights reserved.
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
