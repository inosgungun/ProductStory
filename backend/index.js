import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import connectDB from "./lib/db.js";
import User from "./models/user.js";


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

  if (otpStore[email] !== otp) {
    return res.status(400).send({ success: false, message: "Invalid OTP" });
  }

  try {
    delete otpStore[email]; 

    await transporter.sendMail({
      from: '"Product Story" <no-reply@productstory.com>',
      to: email,
      subject: "Login Successful",
      html: `<div style="font-family:sans-serif;text-align:center;">
               <h2>Welcome to Product Story!</h2>
               <p>Your login was successful.</p>
             </div>`
    });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: email.split("@")[0],
        email,
        contact: "",
        address: "",
        wishlist: [],
        cart: [],
        orderHistory: []
      });
    }

    res.send({ success: true, user }); 
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).send({ success: false, message: "Server error, try again" });
  }
});


app.post("/api/update-profile", async (req, res) => {
  const { email, name, contact, address } = req.body;

  if (!email) {
    return res.status(400).send({ success: false, message: "Email is required" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, contact, address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    res.send({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

app.get("/api/get-profile", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send({ success: false, message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    console.error("Fetch profile error:", err);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });