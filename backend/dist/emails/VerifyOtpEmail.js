// emails/VerifyOtpEmail.jsx
import React from "react";
import { Html, Head, Body, Container, Section, Text, Heading } from "@react-email/components";
import { jsx, jsxs } from "react/jsx-runtime";
function VerifyOtpEmail({ otp }) {
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsx(Body, { style: { backgroundColor: "#f4f4f7", fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif" }, children: /* @__PURE__ */ jsxs(Container, { style: { maxWidth: "600px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }, children: [
      /* @__PURE__ */ jsx(Section, { style: { backgroundColor: "#4f46e5", padding: "20px", textAlign: "center" }, children: /* @__PURE__ */ jsx(Heading, { as: "h1", style: { color: "#ffffff", fontSize: "24px", margin: 0 }, children: "Product Story" }) }),
      /* @__PURE__ */ jsxs(Section, { style: { padding: "30px 40px", color: "#333333" }, children: [
        /* @__PURE__ */ jsx(Heading, { as: "h2", style: { fontSize: "22px", marginTop: 0 }, children: "Verify your email" }),
        /* @__PURE__ */ jsx(Text, { children: "Thank you for signing up! To complete your registration, please enter the following verification code:" }),
        /* @__PURE__ */ jsx("div", { style: { margin: "30px 0", textAlign: "center" }, children: /* @__PURE__ */ jsx("span", { style: { display: "inline-block", backgroundColor: "#f4f4f7", padding: "15px 25px", fontSize: "24px", fontWeight: "bold", letterSpacing: "2px", borderRadius: "6px", border: "1px solid #dddddd" }, children: otp }) }),
        /* @__PURE__ */ jsx(Text, { style: { fontSize: "14px", color: "#555555" }, children: "This code will expire in 10 minutes. If you didn't request this, you can safely ignore this email." }),
        /* @__PURE__ */ jsx(Text, { style: { fontSize: "14px", color: "#999999", marginTop: "40px" }, children: "\u2014 The Product Story Team" })
      ] }),
      /* @__PURE__ */ jsx(Section, { style: { backgroundColor: "#f4f4f7", padding: "15px", fontSize: "12px", color: "#999999", textAlign: "center" }, children: "\xA9 2025 Product Story. All rights reserved." })
    ] }) })
  ] });
}
export {
  VerifyOtpEmail as default
};
//# sourceMappingURL=VerifyOtpEmail.js.map
