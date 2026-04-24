import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Enter valid email');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('https://examplereact-backend-11.onrender.com/api/admin/login', {
        email,
        password
      });

      if (res.data.status === "success") {
        alert("✅ Login Successful");

        // Purana user/admin data remove
        localStorage.removeItem("user");
        localStorage.removeItem("admin");

        // Sirf successful login ke baad admin save hoga
        const adminData = {
          email: email,
          role: "ADMIN"
        };

        localStorage.setItem("admin", JSON.stringify(adminData));
        localStorage.setItem("isAuth", "true");

        window.location.href = "/adminlibrarypage";
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Admin Login</h2>
          <p>Access the admin dashboard</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              disabled={loading}
            />
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <Link to="/admin-forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Only Admin can login</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;