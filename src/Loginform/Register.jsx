import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    class: "",
    gender: "",
    address: "",
    password: "",
    department: "",
    semester: "",
    branchName: "",
    photo: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  // 🔥 handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // file size validation
    if (files && files[0]) {
      if (files[0].size > 2 * 1024 * 1024) {
        alert("Image must be less than 2MB ❌");
        return;
      }
    }

    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // 🔥 react-select handler
  const handleSelectChange = (name, selectedOption) => {
    setData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  // 🔥 VALIDATION FUNCTION
  const validate = () => {
    if (!data.name.trim()) {
      alert("Name is required ❌");
      return false;
    }

    if (!data.email.trim()) {
      alert("Email is required ❌");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Invalid email ❌");
      return false;
    }

    if (!data.class) {
      alert("Class is required ❌");
      return false;
    }

    if (!data.gender) {
      alert("Gender is required ❌");
      return false;
    }

    if (!data.address.trim()) {
      alert("Address is required ❌");
      return false;
    }

    if (!data.password) {
      alert("Password is required ❌");
      return false;
    }

    if (data.password.length < 6) {
      alert("Password must be at least 6 characters ❌");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // 🔥 VALIDATION CALL
    if (!validate()) return;

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("studentClass", data.class);
      formData.append("gender", data.gender);
      formData.append("address", data.address);
      formData.append("password", data.password);
      formData.append("department", data.department);
      formData.append("semester", data.semester);
      formData.append("branchName", data.branchName);

      if (data.photo) {
        formData.append("photo", data.photo);
      }

      await axios.post(
        "https://examplereact-backend-11.onrender.com/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Registered Successfully ✅");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data || "Error registering ❌");
    }
  };

  // 🔥 options
  const classOptions = [
    { value: "10th", label: "10th" },
    { value: "11th", label: "11th" },
    { value: "12th", label: "12th" },
    { value: "B.Tech", label: "B.Tech" },
    { value: "M.Tech", label: "M.Tech" },
    { value: "B.Sc", label: "B.Sc" },
    { value: "M.Sc", label: "M.Sc" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const departmentOptions = [
    { value: "Engineering", label: "Engineering" },
    { value: "Science", label: "Science" },
    { value: "Arts", label: "Arts" },
    { value: "Commerce", label: "Commerce" },
  ];

  const semesterOptions = [
    { value: "1", label: "1st" },
    { value: "2", label: "2nd" },
    { value: "3", label: "3rd" },
    { value: "4", label: "4th" },
    { value: "5", label: "5th" },
    { value: "6", label: "6th" },
    { value: "7", label: "7th" },
    { value: "8", label: "8th" },
  ];

  const branchOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Mechanical", label: "Mechanical" },
    { value: "Civil", label: "Civil" },
    { value: "Electrical", label: "Electrical" },
    { value: "Electronics", label: "Electronics" },
    { value: "Chemical", label: "Chemical" },
  ];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us today!</p>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="input-group">
            <Select
              options={classOptions}
              placeholder="Select Class"
              onChange={(val) => handleSelectChange("class", val)}
            />
          </div>

          <div className="input-group">
            <Select
              options={genderOptions}
              placeholder="Select Gender"
              onChange={(val) => handleSelectChange("gender", val)}
            />
          </div>

          <div className="input-group">
            <textarea
              name="address"
              placeholder="Address"
              value={data.address}
              onChange={handleChange}
              required
              rows="3"
              className="textarea-input"
            />
          </div>

          <div className="input-group">
            <label>Profile Photo</label>
            <input type="file" name="photo" onChange={handleChange} />
          </div>

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
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>

        <p className="auth-toggle">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
