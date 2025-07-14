import React from "react";
import { Html, Head, Body, Container, Section, Text, Heading } from "@react-email/components";

export default function VerifyOtpEmail({ otp }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f4f4f7", fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Section style={{ backgroundColor: "#4f46e5", padding: "20px", textAlign: "center" }}>
            <Heading as="h1" style={{ color: "#ffffff", fontSize: "24px", margin: 0 }}>Product Story</Heading>
          </Section>
          <Section style={{ padding: "30px 40px", color: "#333333" }}>
            <Heading as="h2" style={{ fontSize: "22px", marginTop: 0 }}>Verify your email</Heading>
            <Text>Thank you for signing up! To complete your registration, please enter the following verification code:</Text>
            <div style={{ margin: "30px 0", textAlign: "center" }}>
              <span style={{ display: "inline-block", backgroundColor: "#f4f4f7", padding: "15px 25px", fontSize: "24px", fontWeight: "bold", letterSpacing: "2px", borderRadius: "6px", border: "1px solid #dddddd" }}>
                {otp}
              </span>
            </div>
            <Text style={{ fontSize: "14px", color: "#555555" }}>This code will expire in 10 minutes. If you didn't request this, you can safely ignore this email.</Text>
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
