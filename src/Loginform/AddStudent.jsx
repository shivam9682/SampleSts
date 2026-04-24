import React, { useState } from "react";
import axios from "axios";
import "./AddStudent.css";

export default function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // POST request to backend
      const response = await axios.post(
        "https://examplereact-backend-11.onrender.com/api/students/add",
        student, // send the whole object
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log(response.data);

      setMessage("✅ Student Added Successfully");
      
      // Reset form
      setStudent({
        name: "",
        email: "",
        course: "",
        phone: "",
        address: ""
      });
    } catch (error) {
      console.error(error);

      if (error.response) {
        // Server responded with a status code outside 2xx
        setMessage(`❌ ${error.response.data.message || error.response.data}`);
      } else if (error.request) {
        // Request made but no response received
        setMessage("❌ No response from server. Check backend.");
      } else {
        setMessage(`❌ Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-container">
      <div className="student-card">
        <h2>Add Student</h2>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={student.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Student Email"
            value={student.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={student.course}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={student.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={student.address}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
}