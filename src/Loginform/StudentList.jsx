import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentList.css";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
    address: ""
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    applySearch();
  }, [searchQuery, students]);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/students/all");
      setStudents(res.data);
      setFilteredStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter students based on search
  const applySearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`http://localhost:8081/api/students/delete/${id}`);
      setStudents(students.filter((s) => s.id !== id));
      alert("Student deleted successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to delete student ❌");
    }
  };

  // Start editing student
  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditData({
      name: student.name,
      email: student.email,
      course: student.course,
      phone: student.phone,
      address: student.address
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ name: "", email: "", course: "", phone: "", address: "" });
  };

  // Handle input change for edit
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save updated student
  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8081/api/students/update/${id}`,
        editData
      );
      setStudents(students.map((s) => (s.id === id ? res.data : s)));
      cancelEdit();
      alert("Student updated successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to update student ❌");
    }
  };

  return (
    <div className="list-container">
      <h2>All Students</h2>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>

                  {editingId === student.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="course"
                          value={editData.course}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="phone"
                          value={editData.phone}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="address"
                          value={editData.address}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <button onClick={() => handleUpdate(student.id)}>💾 Save</button>
                        <button onClick={cancelEdit}>❌ Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.course}</td>
                      <td>{student.phone}</td>
                      <td>{student.address}</td>
                      <td>
                        <button onClick={() => handleEdit(student)}>✏️ Edit</button>
                        <button onClick={() => handleDelete(student.id)}>🗑️ Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}