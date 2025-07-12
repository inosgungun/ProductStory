import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const otpStore = {}; 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  await transporter.sendMail({
    from: '"Product Story" <no-reply@productstory.com>',
    to: email,
    subject: "Verify your Email",
    html: `<div style="font-family:sans-serif;text-align:center;">
             <h2>Verify your email</h2>
             <p>We just need to verify your email address. Enter the following code below to complete the verification process:</p>
             <p style="font-size:24px;font-weight:bold;">${otp}</p>
             <p>The code will expire in 10 minutes.</p>
           </div>`,
  });

  res.send({ message: "OTP sent" });
});

app.post("/api/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email];

    await transporter.sendMail({
      from: '"Product Story" <no-reply@productstory.com>',
      to: email,
      subject: "Login Successful",
      html: `<div style="font-family:sans-serif;text-align:center;">
               <h2>Welcome to Product Story!</h2>
               <p>Your login was successful.</p>
             </div>`,
    });

    res.send({ success: true });
  } else {
    res.status(400).send({ success: false, message: "Invalid OTP" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
