import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserBookHistry.css";

export default function UserHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const email = localStorage.getItem("userEmail");

      console.log("Stored Email:", email);

      if (!email || email === "null" || email === "undefined") {
        console.log("Email not found in localStorage");
        setHistory([]);
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `https://examplereact-backend-11.onrender.com/api/books/history?email=${email}`
      );

      console.log("History Response:", response.data);

      setHistory(response.data || []);
    } catch (error) {
      console.error("History Error:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this history?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`https://examplereact-backend-11.onrender.com/api/books/history/${id}`);

      const updatedHistory = history.filter((item) => item.id !== id);
      setHistory(updatedHistory);

      alert("History removed successfully");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to remove history");
    }
  };

  return (
    <div className="books-container">
      <h2>📖 My Borrow History</h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : history.length === 0 ? (
        <p className="empty-text">No history found</p>
      ) : (
        <div className="history-grid">
          {history.map((item, index) => (
            <div className="book-card" key={item.id || index}>
              <h3>{item.title}</h3>

              <p>
                <b>Issue Date:</b> {item.issueDate}
              </p>

              <p>
                <b>Expected Return:</b> {item.expectedReturnDate}
              </p>

              <p>
                <b>Actual Return:</b>{" "}
                {item.actualReturnDate
                  ? item.actualReturnDate
                  : "Not Returned Yet"}
              </p>

              <p>
                <b>Fine:</b> ₹{item.fine}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    item.status === "Returned"
                      ? "status-returned"
                      : item.status === "Borrowed"
                      ? "status-borrowed"
                      : "status-late"
                  }
                >
                  {item.status}
                </span>
              </p>

              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}