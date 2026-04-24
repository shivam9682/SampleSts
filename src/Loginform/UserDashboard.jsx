import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser?.email) fetchUserHistory(storedUser.email);
  }, []);

  const fetchUserHistory = async (email) => {
    try {
      const res = await axios.get(`https://examplereact-backend-11.onrender.com/api/books/history?email=${email}`);
      setHistory(res.data || []);
    } catch (err) {
      console.error("Failed to fetch user history:", err);
    }
  };

  // Summary calculations
  const totalBorrowed = history.length;
  const currentlyBorrowed = history.filter(h => h.status?.toLowerCase() === "borrowed").length;
  const returnedBooks = history.filter(h => h.status?.toLowerCase() === "returned").length;
  const totalFine = history.reduce((sum, h) => sum + (h.fine || 0), 0);
  const pendingReturns = history.filter(h => h.status?.toLowerCase() === "borrowed" && new Date(h.expectedReturnDate) < new Date()).length;

  // Favorite genre
  const favoriteGenre = useMemo(() => {
    const genreCount = {};
    history.forEach(h => {
      if (h.genre) genreCount[h.genre] = (genreCount[h.genre] || 0) + 1;
    });
    return Object.keys(genreCount).reduce((a, b) => (genreCount[a] > genreCount[b] ? a : b), "") || "-";
  }, [history]);

  // Chart data
  const borrowTrends = useMemo(() => {
    const trends = {};
    history.forEach(h => {
      if (h.issueDate) {
        const month = h.issueDate.slice(0, 7); // YYYY-MM
        if (!trends[month]) trends[month] = { month, borrowed: 0, fines: 0 };
        trends[month].borrowed += 1;
        trends[month].fines += h.fine || 0;
      }
    });
    return Object.values(trends).sort((a, b) => a.month.localeCompare(b.month));
  }, [history]);

  // Filtered history for table
  const filteredHistory = useMemo(() => {
    let data = [...history];
    if (search) {
      data = data.filter(h => (h.title || "").toLowerCase().includes(search.toLowerCase()) || (h.libraryBranch || "").toLowerCase().includes(search.toLowerCase()));
    }
    return data;
  }, [history, search]);

  return (
    <div className="user-dashboard">
      <h1>📊 My Library Report</h1>
      {user && <h2>Welcome, {user.name}</h2>}

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">Total Borrowed: {totalBorrowed}</div>
        <div className="card borrowed">Currently Borrowed: {currentlyBorrowed}</div>
        <div className="card returned">Returned: {returnedBooks}</div>
        <div className="card pending">Pending Returns: {pendingReturns}</div>
        <div className="card fine">Total Fine: ₹{totalFine}</div>
        <div className="card genre">Favorite Genre: {favoriteGenre}</div>
      </div>

      {/* Charts */}
      <h3>Borrow Trends & Fines Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={borrowTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="borrowed" stroke="#8884d8" name="Books Borrowed" />
          <Line type="monotone" dataKey="fines" stroke="#82ca9d" name="Fines Paid" />
        </LineChart>
      </ResponsiveContainer>

      <h3>Books Borrowed Per Month</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={borrowTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="borrowed" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Search and Table */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by book title or branch"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

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
            {filteredHistory.map(h => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.title}</td>
                <td>{h.libraryBranch}</td>
                <td>{h.issueDate || "-"}</td>
                <td>{h.expectedReturnDate || "-"}</td>
                <td>{h.actualReturnDate || "-"}</td>
                <td>₹{h.fine || 0}</td>
                <td>{h.status || "Unknown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredHistory.length === 0 && <p>No borrow history found.</p>}
      </div>
    </div>
  );
}