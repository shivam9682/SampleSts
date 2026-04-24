import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllBooks.css";

const API = "https://examplereact-backend-11.onrender.com/api/books";

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, branchFilter, books]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API);
      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let updatedBooks = [...books];

    // Filter by book name
    if (searchQuery.trim() !== "") {
      updatedBooks = updatedBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by branch
    if (branchFilter.trim() !== "") {
      updatedBooks = updatedBooks.filter(
        (book) =>
          book.libraryBranch &&
          book.libraryBranch.toLowerCase().includes(branchFilter.toLowerCase())
      );
    }

    setFilteredBooks(updatedBooks);
  };

  if (loading) {
    return <h2 className="loading-text">📚 Loading Books...</h2>;
  }

  // Extract unique branches for filter dropdown
  const uniqueBranches = Array.from(
    new Set(books.map((book) => book.libraryBranch).filter(Boolean))
  );

  return (
    <div className="all-books-container">
      <div className="all-books-header">
        <h2>📚 All Books</h2>
        <p>Total Books: {filteredBooks.length}</p>

        {/* Search and Filter Section */}
        <div className="search-filter-container">
          <input
            type="text"
            placeholder="Search by book name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
          >
            <option value="">All Branches</option>
            {uniqueBranches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              {book.imagePath && (
                <img
                  src={`https://examplereact-backend-11.onrender.com/uploads/${book.imagePath}`}
                  alt={book.title}
                  className="book-image"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>
                  <strong>Status:</strong> {book.status}
                </p>
                <p>
                  <strong>Branch:</strong> {book.libraryBranch || "N/A"}
                </p>
                <p>
                  <strong>Semester:</strong> {book.semester || "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-books">No books found</p>
        )}
      </div>
    </div>
  );
}