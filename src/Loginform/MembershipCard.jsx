import { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./MembershipCard.css";

export default function StudentProfileCard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `https://examplereact-backend-11.onrender.com/api/auth/profile?email=${userEmail}`
        );

        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchStudent();
    }
  }, [userEmail]);

  const downloadCard = () => {
    const card = document.getElementById("student-profile-card");

    if (!card) return;

   html2canvas(card, {
  scale: 2,
  useCORS: true,
  backgroundColor: "#ffffff"
}).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("landscape", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
      pdf.save(`${student.name}-Library-ID-Card.pdf`);
    });
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <h2>Loading Student Profile...</h2>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="loading-screen">
        <h2>Student data not found</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div id="student-profile-card" className="modern-card">
        <div className="card-left">
          <div className="card-overlay"></div>

          <div className="profile-image-wrapper">
            <img
              src={
                student.photo
                  ? `https://examplereact-backend-11.onrender.com/uploads/${student.photo}`
                  : "https://via.placeholder.com/150"
              }
              alt={student.name}
              className="profile-image"
            />
          </div>

          <h2 className="student-name">{student.name}</h2>
          <p className="member-role">Premium Library Member</p>

          <div className="member-id-box">
            <span>Membership ID</span>
            <h3>{student.membershipCardNumber || "N/A"}</h3>
          </div>

          <div className="qr-box">
            {student.membershipCardNumber ? (
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${student.membershipCardNumber}`}
                alt="QR Code"
                className="qr-image"
              />
            ) : (
              <p>No QR Available</p>
            )}
          </div>
        </div>

        <div className="card-right">
          <div className="top-bar">
            <div>
              <p className="card-subtitle">Student Profile</p>
              <h1>Library Identity Card</h1>
            </div>

            <div className="status-badge">Active</div>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <span>Full Name</span>
              <h3>{student.name || "N/A"}</h3>
            </div>

            <div className="info-card">
              <span>Course</span>
              <h3>{student.studentClass || "N/A"}</h3>
            </div>

            <div className="info-card">
              <span>Branch</span>
              <h3>{student.branchName || "N/A"}</h3>
            </div>

            <div className="info-card">
              <span>Semester</span>
              <h3>{student.semester || "N/A"}</h3>
            </div>

            <div className="info-card">
              <span>Email</span>
              <h3>{student.email || "N/A"}</h3>
            </div>

            <div className="info-card">
              <span>Address</span>
              <h3>{student.address || "N/A"}</h3>
            </div>
          </div>

          <div className="button-group">
          

            <button onClick={downloadCard} className="edit-btn">
              Download ID Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}