import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AvailableBooks.css";

const API = "http://localhost:8081/api/books";
const LATE_FEE_PER_DAY = 10;

export default function BorrowedBooks() {
  const [books, setBooks] = useState([]);
  const [paidFines, setPaidFines] = useState({});

  const fetchBorrowedBooks = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const res = await axios.get(`${API}/history?email=${email}`);

      const borrowedOnly = res.data.filter(
        (item) => item.status === "Borrowed"
      );

      setBooks(borrowedOnly);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const calculateLateFee = (expectedReturnDate) => {
    if (!expectedReturnDate) return 0;

    const today = new Date();
    const returnDt = new Date(expectedReturnDate);

    const diffTime = today - returnDt;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays * LATE_FEE_PER_DAY : 0;
  };

  const handlePayFine = (bookId, lateFee) => {
    alert(`Fine of ₹${lateFee} paid successfully`);

    setPaidFines((prev) => ({
      ...prev,
      [bookId]: true,
    }));
  };

  const handleReturn = async (historyId, lateFee) => {
    try {
      if (lateFee > 0 && !paidFines[historyId]) {
        alert("Please pay the fine first before returning the book");
        return;
      }

      await axios.put(`${API}/return/${historyId}`);

      alert("Book Returned Successfully");

      fetchBorrowedBooks();
    } catch (err) {
      console.error(err);
      alert("Error returning book");
    }
  };

  return (
    <div className="books-container">
      <h2>My Borrowed Books</h2>

      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => {
            const lateFee = calculateLateFee(book.expectedReturnDate);
            const isFinePaid = paidFines[book.id];

            return (
              <div className="book-card" key={book.id}>
                <h3>{book.title}</h3>

                <p>Issue Date: {book.issueDate}</p>
                <p>Return Date: {book.expectedReturnDate}</p>

                {lateFee > 0 ? (
                  <>
                    <p className="late-fee">Late Fee: ₹{lateFee}</p>

                    {!isFinePaid ? (
                      <button
                        className="pay-btn"
                        onClick={() => handlePayFine(book.id, lateFee)}
                      >
                        Pay Fine Now
                      </button>
                    ) : (
                      <p className="fine-paid">Fine Paid ✅</p>
                    )}
                  </>
                ) : (
                  <p className="no-fee">No Fine</p>
                )}

                <button
                  className="return-btn"
                  onClick={() => handleReturn(book.id, lateFee)}
                >
                  Return Book
                </button>
              </div>
            );
          })
        ) : (
          <p>No borrowed books</p>
        )}
      </div>
    </div>
  );
}