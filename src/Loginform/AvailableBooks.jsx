import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AvailableBooks.css";

const API = "http://localhost:8081/api/books";

export default function AvailableBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    const email = localStorage.getItem("userEmail");

    if (!isAuth || !email) {
      window.location.href = "/login";
      return;
    }

    setUserEmail(email);
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const userBranch = localStorage.getItem("userBranch");

      if (!userBranch) {
        alert("Branch info missing. Please login again.");
        window.location.href = "/login";
        return;
      }

      const res = await axios.get(`${API}/branch/${userBranch}`);
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      const response = await axios.put(
        `${API}/borrow/${bookId}?user=${userEmail}`
      );

      alert(response.data || "Book Borrowed Successfully");
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to borrow book");
    }
  };

  const handleReserve = async (bookId) => {
    try {
      const response = await axios.post(
        `${API}/reserve/${bookId}?user=${userEmail}`
      );

      alert(response.data || "Book Reserved Successfully");
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to reserve book");
    }
  };

  const getBookStatus = (book) => {
    if (book.availableQuantity > 0) return "Available";

    if (book.availableQuantity === 0 && book.reservedQuantity > 0) {
      return "Reserved";
    }

    return "Out Of Stock";
  };

  const hasUserBorrowed = (book) => {
    if (!userEmail || !book.userBorrowed) return false;

    return book.userBorrowed
      .split(",")
      .map((email) => email.trim())
      .includes(userEmail);
  };

  const hasUserReserved = (book) => {
    if (!userEmail || !book.userReserved) return false;

    return book.userReserved
      .split(",")
      .map((email) => email.trim())
      .includes(userEmail);
  };

  const openBookDetails = (book) => {
    navigate(`/book-details/${book.id}`, {
      state: { book }
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2 className="loading-text">Loading books...</h2>
      </div>
    );
  }

  return (
    <div className="books-container">
      <div className="top-buttons">
        <button onClick={() => (window.location.href = "/borrowedBook")}>
          Borrowed Report
        </button>

        <button onClick={() => (window.location.href = "/userhistory")}>
          History
        </button>

        <button onClick={() => (window.location.href = "/reservedbooks")}>
          Reserved Report
        </button>
      </div>

      <h2 className="page-title">Available Books</h2>

      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="book-card" key={book.id}>
              {book.imagePath ? (
                <img
                  src={`http://localhost:8081/uploads/${book.imagePath}`}
                  alt={book.title}
                  className="book-image"
                />
              ) : (
                <div className="no-image">No Image</div>
              )}

              <div className="book-details">
                <h3>{book.title}</h3>

                <p>
                  <strong>Status:</strong>
                  <span
                    className={`book-status ${getBookStatus(book)
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {getBookStatus(book)}
                  </span>
                </p>

                <p>
                  <strong>Author:</strong> {book.author}
                </p>

                <p>
                  <strong>Available Quantity:</strong>
                  <span
                    className={
                      book.availableQuantity > 0
                        ? "available-count"
                        : "not-available-count"
                    }
                  >
                    {book.availableQuantity}
                  </span>
                </p>

                <div className="book-actions">
                  <button
                    className="details-btn"
                    onClick={() => openBookDetails(book)}
                  >
                    More Info
                  </button>

                  {!hasUserBorrowed(book) &&
                    !hasUserReserved(book) &&
                    book.availableQuantity > 0 && (
                      <button
                        className="borrow-btn"
                        onClick={() => handleBorrow(book.id)}
                      >
                        Borrow Book
                      </button>
                    )}

                  {!hasUserBorrowed(book) &&
                    !hasUserReserved(book) &&
                    book.availableQuantity === 0 && (
                      <button
                        className="reserve-btn"
                        onClick={() => handleReserve(book.id)}
                      >
                        Reserve Book
                      </button>
                    )}

                  {hasUserBorrowed(book) && (
                    <button className="already-btn" disabled>
                      Already Borrowed
                    </button>
                  )}

                  {hasUserReserved(book) && (
                    <button className="already-btn" disabled>
                      Already Reserved
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-books-box">
            <p className="no-books">
              No books available for your branch
            </p>
          </div>
        )}
      </div>
    </div>
  );
}