import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    setLoading(false);
  }, []);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8081/api/users/delete/${user.id}`);

      alert("Account deleted successfully");

      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("isAuth");

      navigate("/register");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete account");
    }
  };

  const getProfileImage = () => {
    if (!user?.photo) {
      return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }

    if (user.photo.startsWith("http")) {
      return user.photo;
    }

    if (user.photo.startsWith("uploads/")) {
      return `http://localhost:8081/${user.photo}`;
    }

    return `http://localhost:8081/uploads/${user.photo}`;
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h2>;
  }

  if (!user) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>No User Found</h2>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <img
            src={getProfileImage()}
            alt="Profile"
            className="profile-image"
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            }}
          />

          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>

        <div className="profile-details-grid">
          <div className="profile-box">
            <h4>Student Class</h4>
            <p>{user.studentClass || "N/A"}</p>
          </div>

          <div className="profile-box">
            <h4>Gender</h4>
            <p>{user.gender || "N/A"}</p>
          </div>

          <div className="profile-box">
            <h4>Department</h4>
            <p>{user.department || "N/A"}</p>
          </div>

          <div className="profile-box">
            <h4>Semester</h4>
            <p>{user.semester || "N/A"}</p>
          </div>

          <div className="profile-box">
            <h4>Branch</h4>
            <p>{user.branchName || "N/A"}</p>
          </div>

          <div className="profile-box">
            <h4>Membership Card</h4>
            <p>{user.membershipCardNumber || "N/A"}</p>
          </div>

          <div className="profile-box full-width">
            <h4>Address</h4>
            <p>{user.address || "N/A"}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="edit-btn"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>

          <button
            className="delete-btn"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
