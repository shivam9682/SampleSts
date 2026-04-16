import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

export function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    studentClass: "",
    gender: "",
    department: "",
    semester: "",
    branchName: "",
    address: "",
    photo: null
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
 if (storedUser) {
      setFormData({
        id: storedUser.id || "",
        name: storedUser.name || "",
        email: storedUser.email || "",
        studentClass: storedUser.studentClass || "",
        gender: storedUser.gender || "",
        department: storedUser.department || "",
        semester: storedUser.semester || "",
        branchName: storedUser.branchName || "",
        address: storedUser.address || "",
        photo: null
      });

      if (storedUser.photo) {
        setPreview(
          storedUser.photo.startsWith("http")
            ? storedUser.photo
            : `http://localhost:8081/${storedUser.photo}`
        );
      }
    }
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      photo: file
    });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
submitData.append("id", formData.id);
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("studentClass", formData.studentClass);
      submitData.append("gender", formData.gender);
      submitData.append("department", formData.department);
      submitData.append("semester", formData.semester);
      submitData.append("branchName", formData.branchName);
      submitData.append("address", formData.address);

      if (formData.photo) {
        submitData.append("photo", formData.photo);
      }

      const res = await axios.put(
        "http://localhost:8081/api/auth/update-profile",
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      const updatedUser = res.data;

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...updatedUser,
          photo: updatedUser.photo
            ? `uploads/${updatedUser.photo}`
            : ""
        })
      );

      alert("Profile Updated Successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="edit-profile-page">
      <form className="edit-profile-card" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <div className="photo-section">
          <img
            src={preview || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="Preview"
            className="edit-profile-image"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>

        <div className="edit-grid">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input type="text" name="studentClass" value={formData.studentClass} onChange={handleChange} placeholder="Class" />
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
          <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
          <input type="text" name="semester" value={formData.semester} onChange={handleChange} placeholder="Semester" />
          <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} placeholder="Branch" />
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address"></textarea>
        </div>
        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}