


import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      setMessage("Please enter email");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://examplereact-backend-11.onrender.com/api/auth/send-otp",
        { email }
      );

      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://examplereact-backend-11.onrender.com/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      setMessage(res.data.message);

      if (res.data.status === "success") {
        setStep(3);
      }
    } catch (err) {
      setMessage("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!newPassword) {
      setMessage("Please enter new password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://examplereact-backend-11.onrender.com/api/auth/reset-password",
        {
          email,
          newPassword,
        }
      );

      setMessage(res.data.message);

      if (res.data.status === "success") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      setMessage("Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Forgot Password</h2>

        {message && <p className="message">{message}</p>}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={sendOtp} disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={verifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button onClick={resetPassword} disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
