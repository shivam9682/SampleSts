import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ReservedBooks.css";

const API = "https://examplereact-backend-11.onrender.com/api/reserved-books";

export default function ReservedBooks() {
  const [reservedBooks, setReservedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchReservedBooks = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        setReservedBooks([]);
        return;
      }

      const response = await axios.get(
        `${API}/user/${encodeURIComponent(userEmail)}`
      );

      if (Array.isArray(response.data)) {
        setReservedBooks(response.data);
      } else {
        setReservedBooks([]);
      }
    } catch (error) {
      console.error("Error fetching reserved books:", error);
      setReservedBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservedBooks();
  }, []);

  const handleRemoveReservation = async (reservationId) => {
    try {
      const response = await axios.delete(
        `https://examplereact-backend-11.onrender.com/api/reserved-books/remove/${reservationId}`
      );

      alert(response.data);
      fetchReservedBooks();
    } catch (error) {
      console.error("Error removing reservation:", error);
      alert(error.response?.data || "Failed to remove reservation");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2 className="loading-text">Loading Reserved Books...</h2>
      </div>
    );
  }

  return (
    <div className="reserved-books-container">
      <div className="top-section">
        <h2>My Reserved Books</h2>

        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="reserved-books-grid">
        {reservedBooks.length > 0 ? (
          reservedBooks.map((item) => (
            <div className="reserved-book-card" key={item.id}>
              <div className="image-wrapper">
                {item.book?.imagePath ? (
                  <img
                    src={`https://examplereact-backend-11.onrender.com/uploads/${item.book.imagePath}`}
                    alt={item.book?.title}
                    className="reserved-book-image"
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>

              <div className="reserved-book-details">
                <h3>{item.book?.title || "No Title"}</h3>

                <p>
                  <strong>Author:</strong> {item.book?.author || "N/A"}
                </p>

                <p>
                  <strong>Genre:</strong> {item.book?.genre || "N/A"}
                </p>

                <p>
                  <strong>Reservation Date:</strong>{" "}
                  {item.reservationDate
                    ? new Date(item.reservationDate).toLocaleString()
                    : "N/A"}
                </p>

                {item.status === "ALLOTTED" && (
                  <p>
                    <strong>Allotted On:</strong>{" "}
                    {item.allottedDate
                      ? new Date(item.allottedDate).toLocaleString()
                      : "N/A"}
                  </p>
                )}

                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${item.status?.toLowerCase()}`}>
                    {item.status}
                  </span>
                </p>

                <button
                  className="remove-btn"
                  onClick={() => handleRemoveReservation(item.id)}
                >
                  Remove Reservation
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-books-box">
            <p>No Reserved Books Found</p>
          </div>
        )}
      </div>
    </div>
  );
}