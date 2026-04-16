import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 LOGIN FUNCTION (JWT READY)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8081/api/auth/login",
        data
      );

      const response = res.data;

      if (response.status === "SUCCESS") {
        
        // ❌ validation
        if (!response.branchName) {
          alert("Branch info missing. Please try again.");
          setLoading(false);
          return;
        }

        // 🔐 STORE TOKENS (IMPORTANT)
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);

        // 👤 USER DATA
        const userData = {
          id: response.id,
          name: response.name || "User",
          email: response.email,
          photo: response.photo || "",
          studentClass: response.studentClass || "",
          gender: response.gender || "",
          department: response.department || "",
          semester: response.semester || "",
          branchName: response.branchName,
          address: response.address || "",
          membershipCardNumber: response.membershipCardNumber || "",
        };

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userEmail", response.email);
        localStorage.setItem("userBranch", response.branchName);
        localStorage.setItem("isAuth", "true");

        console.log("✅ Logged User:", userData);

        alert("Login Successful ✅");

        // 🔥 replace prevents back to login page
        navigate("/availablebooks", { replace: true });

      } else {
        alert(response.message || "Invalid Credentials ❌");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please try again ❌");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login to continue</p>

        <form onSubmit={handleLogin}>
          
          {/* EMAIL */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="auth-toggle">
          Don't have an account?{" "}
          <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}