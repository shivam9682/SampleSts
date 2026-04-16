import React, { useState, useEffect } from "react";
import axios from "axios";
import "./booklist.css";

const API_BASE = "http://localhost:8081/api/books";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    status: "",
    libraryBranch: "",
    semester: "",
    department: "",
    image: null,
  });

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

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      genre: "",
      status: "",
      libraryBranch: "",
      semester: "",
      department: "",
      image: null,
    });
  };

  const openAddForm = () => {
    setEditingBook(null);
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title || "",
      author: book.author || "",
      genre: book.genre || "",
      status: book.status || "",
      libraryBranch: book.libraryBranch || "",
      semester: book.semester || "",
      department: book.department || "",
      image: null,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBook(null);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("genre", formData.genre);
      data.append("status", formData.status);
      data.append("libraryBranch", formData.libraryBranch);
      data.append("semester", formData.semester);
      data.append("department", formData.department);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingBook) {
        await axios.put(`${API_BASE}/${editingBook.id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(API_BASE, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await fetchBooks();
      closeForm();
    } catch (err) {
      console.error("Save failed:", err);
      setError("Failed to save book. Please try again.");
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== id)
      );
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete book. Please try again.");
    }
  };

  if (loading && books.length === 0) {
    return <div className="loading">Loading books...</div>;
  }

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h2>Book List</h2>

        <button className="add-book-btn" onClick={openAddForm}>
          {showForm ? "Close Form" : "Add New Book"}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <div className="edit-form-container">
          <h3 className="edit-form-title">
            {editingBook ? "Edit Book" : "Add New Book"}
          </h3>

          <form className="edit-book-form" onSubmit={submitForm}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter title"
                required
              />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter author"
                required
              />
            </div>

            <div className="form-group">
              <label>Genre</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                placeholder="Enter genre"
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                placeholder="Available / Issued"
                required
              />
            </div>

            <div className="form-group">
              <label>Library Branch</label>
              <input
                type="text"
                name="libraryBranch"
                value={formData.libraryBranch}
                onChange={handleInputChange}
                placeholder="Enter branch"
              />
            </div>

            <div className="form-group">
              <label>Semester</label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                placeholder="Enter semester"
              />
            </div>

            <div className="form-group full-width">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Enter department"
              />
            </div>

            <div className="form-group full-width">
              <label>Book Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />
            </div>

            <div className="edit-form-buttons">
              <button type="submit" className="save-btn">
                {editingBook ? "Update Book" : "Save Book"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={closeForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img
              className="book-image"
              src={
                book.imagePath
                  ? `http://localhost:8081/uploads/${book.imagePath}`
                  : "https://dummyimage.com/400x220/cccccc/000000&text=No+Image"
              }
              alt={book.title}
              onError={(e) => {
                e.target.src =
                  "https://dummyimage.com/400x220/cccccc/000000&text=No+Image";
              }}
            />

            <div className="book-details">
              <h3 className="book-title">{book.title}</h3>

              <p className="book-author">
                <strong>Author:</strong> {book.author}
              </p>

              <p className="book-author">
                <strong>Genre:</strong> {book.genre}
              </p>

              <p className="book-status">
                <strong>Status:</strong> {book.status}
              </p>

              <p className="book-author">
                <strong>Branch:</strong> {book.libraryBranch || "N/A"}
              </p>

              <p className="book-author">
                <strong>Semester:</strong> {book.semester || "N/A"}
              </p>

              <p className="book-author">
                <strong>Department:</strong> {book.department || "N/A"}
              </p>

              <div className="card-buttons">
                <button
                  className="edit-btn"
                  onClick={() => openEditForm(book)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;