import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentList.css";

export default function Studentmain() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "" });
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

  // Filter students based on search query
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

  // Start editing a student
  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditData({ name: student.name });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ name: "" });
  };

  // Save edited student
  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:8081/api/students/${id}`, editData);
      fetchStudents(); // Refresh list
      cancelEdit();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input change in edit mode
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="list-container">
      <h2>All Students</h2>

      {/* Search input */}
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
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>
                    {editingId === student.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                      />
                    ) : (
                      student.name
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
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