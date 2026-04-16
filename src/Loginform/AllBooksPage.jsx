
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8081/api/books";

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE);
      setBooks(response.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading books...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h1 style={styles.heading}>Library Books</h1>
        <p style={styles.subHeading}>Explore all available books in the library</p>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.bookGrid}>
        {books.map((book) => (
          <div key={book.id} style={styles.bookCard}>
            <div style={styles.imageWrapper}>
              <img
                src={
                  book.imagePath
                    ? `http://localhost:8081/uploads/${book.imagePath}`
                    : "https://dummyimage.com/300x200/cccccc/000000&text=No+Image"
                }
                alt={book.title}
                style={styles.bookImage}
                onError={(e) => {
                  e.target.src =
                    "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";
                }}
              />
            </div>

            <div style={styles.cardContent}>
              <h2 style={styles.bookTitle}>{book.title}</h2>
              <p style={styles.bookAuthor}>by {book.author}</p>

              <div style={styles.infoSection}>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Status:</strong> {book.status}</p>
                <p><strong>Branch:</strong> {book.libraryBranch || "N/A"}</p>
                <p><strong>Semester:</strong> {book.semester || "N/A"}</p>
                <p><strong>Department:</strong> {book.department || "N/A"}</p>
              </div>

              <div style={styles.quantitySection}>
                <div style={styles.quantityBox}>
                  <span style={styles.quantityLabel}>Total</span>
                  <span style={styles.quantityValue}>{book.totalQuantity}</span>
                </div>

                <div style={styles.quantityBox}>
                  <span style={styles.quantityLabel}>Available</span>
                  <span style={styles.quantityValue}>{book.availableQuantity}</span>
                </div>

                <div style={styles.quantityBox}>
                  <span style={styles.quantityLabel}>Reserved</span>
                  <span style={styles.quantityValue}>{book.reservedQuantity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  headerSection: {
    textAlign: "center",
    marginBottom: "35px",
  },

  heading: {
    fontSize: "36px",
    color: "#1f2937",
    marginBottom: "10px",
  },

  subHeading: {
    color: "#6b7280",
    fontSize: "16px",
  },

  error: {
    color: "#dc2626",
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "20px",
    fontWeight: "bold",
  },

  bookGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px",
  },

  bookCard: {
    background: "#ffffff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "0.3s ease",
    cursor: "pointer",
  },

  imageWrapper: {
    width: "100%",
    height: "220px",
    overflow: "hidden",
  },

  bookImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  cardContent: {
    padding: "18px",
  },

  bookTitle: {
    fontSize: "22px",
    color: "#111827",
    marginBottom: "6px",
  },

  bookAuthor: {
    color: "#6b7280",
    marginBottom: "14px",
    fontSize: "15px",
  },

  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "14px",
    color: "#374151",
    marginBottom: "18px",
  },

  quantitySection: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },

  quantityBox: {
    background: "#eff6ff",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center",
  },

  quantityLabel: {
    display: "block",
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "4px",
  },

  quantityValue: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2563eb",
  },
};

export default AllBooksPage;

