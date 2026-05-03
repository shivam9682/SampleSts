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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return; // 🔥 prevent multiple clicks

    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key]) {
          formData.append(key === "class" ? "studentClass" : key, data[key]);
        }
      });

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
      console.error(err);
      alert(err.response?.data?.message || "Error registering ❌");
    } finally {
      setLoading(false);
    }
  };

  const classOptions = [
    
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

            <label>
    Full Name <span className="required">*</span>
  </label>
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
             <label>
                   Email <span className="required">*</span>
                    </label>
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
            <label>
              Class <span className="required">*</span>
            </label>
            <Select
              options={classOptions}
              placeholder="Select Class"
              onChange={(val) => handleSelectChange("class", val)}
            />
          </div>

          <div className="input-group">
            <label>
              Gender <span className="required">*</span>
            </label>
            <Select
              options={genderOptions}
              placeholder="Select Gender"
              onChange={(val) => handleSelectChange("gender", val)}
            />
          </div>

          <div className="input-group">
            <label>
              Department <span className="required">*</span>
            </label>
            <Select
              options={departmentOptions}
              placeholder="Select Department"
              onChange={(val) => handleSelectChange("department", val)}
            />
          </div>

          <div className="input-group">
            <label>
              Semester <span className="required">*</span>
            </label>
            <Select
              options={semesterOptions}
              placeholder="Select Semester"
              onChange={(val) => handleSelectChange("semester", val)}
            />
          </div>

          <div className="input-group">
            <label>
              Branch <span className="required">*</span>
            </label>
            <Select
              options={branchOptions}
              placeholder="Select Branch"
              onChange={(val) => handleSelectChange("branchName", val)}
            />
          </div>

          <div className="input-group">
            <label>
              Address <span className="required">*</span>
            </label>
            <textarea
  name="address"
  placeholder="Address"
  value={data.address}
  onChange={handleChange}
  required
  rows="6"
  style={{ width: "400px" }}
/>
          </div>

          <div className="input-group">
            <label>
              Photo <span className="required">*</span>
            </label>
            <input type="file" name="photo" onChange={handleChange} />
          </div>

          <div className="input-group password-group">
            <label>
              Password <span className="required">*</span>
            </label>
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

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-toggle">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
