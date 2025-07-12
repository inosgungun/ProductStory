"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthCard() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast.success("OTP sent to your email!");
        setStep("otp");
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (err) {
      toast.error("Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (res.ok) {
        toast.success("Login successful!");
        window.location.href = "/dashboard";
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      toast.error("Error verifying OTP");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        {step === "email" ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleSendOtp}
              className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-700"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-700"
            >
              Login
            </button>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
