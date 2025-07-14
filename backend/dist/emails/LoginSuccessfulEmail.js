// emails/LoginSuccessfulEmail.jsx
import React from "react";
import { Html, Head, Body, Container, Section, Text, Heading, Link } from "@react-email/components";
import { jsx, jsxs } from "react/jsx-runtime";
function LoginSuccessfulEmail() {
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsx(Body, { style: { backgroundColor: "#f4f4f7", fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif" }, children: /* @__PURE__ */ jsxs(Container, { style: { maxWidth: "600px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }, children: [
      /* @__PURE__ */ jsx(Section, { style: { backgroundColor: "#4f46e5", padding: "20px", textAlign: "center" }, children: /* @__PURE__ */ jsx(Heading, { as: "h1", style: { color: "#ffffff", fontSize: "24px", margin: 0 }, children: "Product Story" }) }),
      /* @__PURE__ */ jsxs(Section, { style: { padding: "30px 40px", color: "#333333" }, children: [
        /* @__PURE__ */ jsx(Heading, { as: "h2", style: { fontSize: "22px", marginTop: 0 }, children: "Login Successful" }),
        /* @__PURE__ */ jsx(Text, { children: "Hello," }),
        /* @__PURE__ */ jsx(Text, { children: "We noticed a successful login to your Product Story account. If this was you, there\u2019s nothing else you need to do." }),
        /* @__PURE__ */ jsxs(Text, { children: [
          "If you didn\u2019t login or suspect any unauthorized access, please ",
          /* @__PURE__ */ jsx(Link, { href: "https://productstory.com/security", style: { color: "#4f46e5", textDecoration: "none" }, children: "secure your account immediately" }),
          "."
        ] }),
        /* @__PURE__ */ jsx(Text, { style: { fontSize: "14px", color: "#999999", marginTop: "40px" }, children: "\u2014 The Product Story Team" })
      ] }),
      /* @__PURE__ */ jsx(Section, { style: { backgroundColor: "#f4f4f7", padding: "15px", fontSize: "12px", color: "#999999", textAlign: "center" }, children: "\xA9 2025 Product Story. All rights reserved." })
    ] }) })
  ] });
}
export {
  LoginSuccessfulEmail as default
};
//# sourceMappingURL=LoginSuccessfulEmail.js.map
