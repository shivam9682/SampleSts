
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8081/api/books";

const AdminLibraryPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (!admin) {
      navigate("/adminLogin");
    }
  }, [navigate]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const totalBooks = books.length;

  const availableBooks = books.filter(
    (book) =>
      book.status && book.status.toLowerCase() === "available"
  ).length;

  const borrowedBooks = books.filter(
    (book) =>
      book.status && book.status.toLowerCase() === "borrowed"
  ).length;

  const reservedBooks = books.filter(
    (book) =>
      book.status && book.status.toLowerCase() === "reserved"
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/adminLogin");
  };

  const handleAddBook = () => navigate("/addbook");
  const handleEditBook = () => navigate("/booklist");
  const handleAddStudent = () => navigate("/addstudent");
  const handleReportStudent = () => navigate("/adminreport");
  const handleAllStudents = () => navigate("/studentlist");
  const handleShowBooks = () => navigate("/allbooksapage");

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="topbar">
          <div>
            <h2>Welcome Admin 👋</h2>
            <p>Manage books, students and reports easily</p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="action-buttons">
          <button className="btn add" onClick={handleAddBook}>
            ➕ Add Book
          </button>

          <button className="btn edit" onClick={handleEditBook}>
            ✏️ Edit Book
          </button>

          <button className="btn student" onClick={handleAddStudent}>
            👨‍🎓 Add Student
          </button>

          <button className="btn report" onClick={handleReportStudent}>
            📊 User Report
          </button>

          <button className="btn add" onClick={handleAllStudents}>
            📋 Show All Students
          </button>

          <button className="btn books" onClick={handleShowBooks}>
            📚 Show All Books
          </button>
        </div>

        <div className="cards">
          <div className="card total-card">
            <h3>Total Books</h3>
            <p>{totalBooks}</p>
          </div>

          <div className="card available-card">
            <h3>Available Books</h3>
            <p>{availableBooks}</p>
          </div>

          <div className="card borrowed-card">
            <h3>Borrowed Books</h3>
            <p>{borrowedBooks}</p>
          </div>

          <div className="card reserved-card">
            <h3>Reserved Books</h3>
            <p>{reservedBooks}</p>
          </div>
        </div>

        <div className="table-section">
          <div className="table-header">
            <h3>Recent Books</h3>
            <button className="view-all-btn" onClick={handleShowBooks}>
              View All
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Branch</th>
                  <th>Status</th>
                  <th>Available Qty</th>
                </tr>
              </thead>

              <tbody>
                {books.slice(0, 5).map((book) => (
                  <tr key={book.id}>
                    <td>
                      <img
                        src={
                          book.imagePath
                            ? `http://localhost:8081/uploads/${book.imagePath}`
                            : "https://dummyimage.com/80x100/cccccc/000000&text=No+Image"
                        }
                        alt={book.title}
                        className="book-thumbnail"
                        onError={(e) => {
                          e.target.src =
                            "https://dummyimage.com/80x100/cccccc/000000&text=No+Image";
                        }}
                      />
                    </td>

                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.libraryBranch || "Unknown"}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          book.status
                            ? book.status.toLowerCase()
                            : "unknown"
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>
                    <td>{book.availableQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLibraryPage;
