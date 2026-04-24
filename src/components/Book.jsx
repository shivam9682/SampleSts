import React, { useState, useEffect } from "react";
import axios from "axios";
import "./booklist.css";
const API_BASE = "https://examplereact-backend-11.onrender.com/api/books";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state for adding/editing
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null); // null = adding, object = editing
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    status: "",
    imagePath: "",
  });

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE);
      setBooks(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch books. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddForm = () => {
    setEditingBook(null);
    setFormData({ title: "", author: "", status: "", imagePath: "" });
    setShowForm(true);
  };

  const openEditForm = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      status: book.status,
      imagePath: book.imagePath || "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBook(null);
    setFormData({ title: "", author: "", status: "", imagePath: "" });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        // Update existing book
        await axios.put(`${API_BASE}/${editingBook.id}`, formData);
      } else {
        // Add new book
        await axios.post(API_BASE, formData);
      }
      // Refresh the list after successful operation
      await fetchBooks();
      closeForm();
    } catch (err) {
      console.error("Save failed:", err);
      setError("Failed to save book. Please try again.");
    }
  };

 

  if (loading && books.length === 0) return <div>Loading books...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Book List</h2>
    
      {showForm && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "20px 0",
            borderRadius: "5px",
          }}
        >
          <h3>{editingBook ? "Edit Book" : "Add New Book"}</h3>
          <form onSubmit={submitForm}>
            <div>
              <label>Title: </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Author: </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Status: </label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Image Path: </label>
              <input
                type=""
                name="imagePath"
                value={formData.imagePath}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={closeForm}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              width: "250px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {book.imagePath && (
  <img
  src={`https://examplereact-backend-11.onrender.com/uploads/${book.imagePath}`}
  alt={book.title}
  style={{
    width: "100%",
    height: "150px",
    objectFit: "cover"
  }}
  onError={(e) => {
    e.target.src = "https://dummyimage.com/150x200/cccccc/000000&text=No+Image";
  }}
/>
)}
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Status: {book.status}</p>
            <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;