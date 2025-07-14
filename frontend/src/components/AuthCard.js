"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthCard() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0); // cooldown seconds
  const router = useRouter();

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
        startCooldown(); // start cooldown after sending OTP
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
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Error verifying OTP");
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return; // prevent resending if cooldown active
    setIsResending(true);
    await handleSendOtp();
    setIsResending(false);
  };

  const startCooldown = () => {
    setCooldown(30); // set cooldown seconds
    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
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
              className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-700 mb-2"
            >
              Login
            </button>
            <button
              onClick={handleResendOtp}
              disabled={isResending || cooldown > 0}
              className={`w-full py-2 rounded border ${
                isResending || cooldown > 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
            >
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
            </button>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
