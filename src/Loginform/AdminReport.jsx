import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./AdminReport.css";

const API = "https://examplereact-backend-11.onrender.com/api/books";

const AdminReport = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortType, setSortType] = useState("latest");

  // Fetch all borrow history
  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/history/all`);
      setHistory(res.data || []);
    } catch (err) {
      console.error("Failed to fetch borrowed books:", err);
    }
  };

  useEffect(() => {
    fetchHistory();

    const interval = setInterval(fetchHistory, 5000); // auto-refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  // Map history: branch is dynamic, fallback to N/A
  const mappedHistory = useMemo(() => {
    return history.map((item) => ({
      ...item,
      libraryBranch:
        item.libraryBranch || item.book?.libraryBranch || item.book?.library_branch || "N/A",
      title: item.title || item.book?.title || "Untitled",
    }));
  }, [history]);

  // Filter + Sort
  const filteredHistory = useMemo(() => {
    let data = [...mappedHistory];

    if (search) {
      data = data.filter(
        (item) =>
          (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
          (item.userEmail || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      data = data.filter(
        (item) => (item.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (sortType === "fineHigh") {
      data.sort((a, b) => (b.fine || 0) - (a.fine || 0));
    } else if (sortType === "fineLow") {
      data.sort((a, b) => (a.fine || 0) - (b.fine || 0));
    } else if (sortType === "title") {
      data.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else {
      data.sort((a, b) => b.id - a.id);
    }

    return data;
  }, [mappedHistory, search, statusFilter, sortType]);

  // Group by student
  const studentBorrowMap = useMemo(() => {
    const map = {};
    filteredHistory.forEach((item) => {
      const student = item.userEmail || "Unknown";
      if (!map[student]) map[student] = [];
      map[student].push(item);
    });
    return map;
  }, [filteredHistory]);

  // Summary stats
  const totalBooks = history.length;
  const totalBorrowedBooks = history.filter(
    (item) => item.status?.toLowerCase() === "borrowed"
  ).length;
  const totalReturnedBooks = history.filter(
    (item) => item.status?.toLowerCase() === "returned"
  ).length;
  const totalFine = history.reduce((sum, item) => sum + (item.fine || 0), 0);
  const totalStudents = new Set(
    history.map((item) => item.userEmail).filter(Boolean)
  ).size;

  return (
    <div className="admin-container">
      <h2>📊 Admin Report Dashboard</h2>

      {/* Summary Cards */}
      <div className="report-cards">
        <div className="report-card">
          <h3>Total History Records</h3>
          <p>{totalBooks}</p>
        </div>
        <div className="report-card borrowed">
          <h3>Total Borrowed Books</h3>
          <p>{totalBorrowedBooks}</p>
        </div>
        <div className="report-card returned">
          <h3>Total Returned Books</h3>
          <p>{totalReturnedBooks}</p>
        </div>
        <div className="report-card students">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>
        <div className="report-card fine">
          <h3>Total Fine</h3>
          <p>₹{totalFine}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by book title or student email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Borrowed">Borrowed</option>
          <option value="Returned">Returned</option>
        </select>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="fineHigh">Fine High to Low</option>
          <option value="fineLow">Fine Low to High</option>
          <option value="title">Book Title A-Z</option>
        </select>
      </div>

      {/* Student Tables */}
      {Object.keys(studentBorrowMap).map((student) => (
        <div key={student} className="student-section">
          <h3>
            Student: {student} | Total Books: {studentBorrowMap[student].length}
          </h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Book Title</th>
                  <th>Branch</th>
                  <th>Issue Date</th>
                  <th>Expected Return</th>
                  <th>Actual Return</th>
                  <th>Fine</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentBorrowMap[student].map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.libraryBranch}</td>
                    <td>{item.issueDate || "-"}</td>
                    <td>{item.expectedReturnDate || "-"}</td>
                    <td>{item.actualReturnDate || "-"}</td>
                    <td>₹{item.fine || 0}</td>
                    <td>
                      <span className={`status-badge ${item.status?.toLowerCase()}`}>
                        {item.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {filteredHistory.length === 0 && <p className="no-data">No borrow history found.</p>}
    </div>
  );
};

export default AdminReport;