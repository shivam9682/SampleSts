import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookDetails.css";

export default function BookDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const book = location.state?.book;

  if (!book) {
    return (
      <div className="book-details-page">
        <h2>No Book Data Found</h2>
        <button onClick={() => navigate("/available-books")}>Back</button>
      </div>
    );
  }

  const previewImages = book.previewImages
    ? book.previewImages.split(",")
    : [];

  return (
    <div className="book-details-page">
      <div className="details-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>

        <div className="details-top">
          {book.imagePath ? (
            <img
              src={`http://localhost:8081/uploads/${book.imagePath}`}
              alt={book.title}
              className="details-image"
            />
          ) : (
            <div className="details-no-image">No Image</div>
          )}

          <div className="details-info">
            <h1>{book.title}</h1>

            <p>
              <strong>Author:</strong> {book.author}
            </p>

            <p>
              <strong>Genre:</strong> {book.genre}
            </p>

            <p>
              <strong>Total Quantity:</strong> {book.totalQuantity}
            </p>

            <p>
              <strong>Available Quantity:</strong> {book.availableQuantity}
            </p>

            <p>
              <strong>Reserved Quantity:</strong>{" "}
              {book.reservedQuantity || 0}
            </p>

          

          

            

            <p>
              <strong>Branch:</strong>{" "}
              {book.libraryBranch || "Not Available"}
            </p>

            <p>
              <strong>Semester:</strong> {book.semester || "Not Available"}
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {book.department || "Not Available"}
            </p>
          </div>
        </div>

        <div className="description-section">
          <h3>Description</h3>
          <p>{book.description || "No description available"}</p>
        </div>

        {previewImages.length > 0 && (
          <div className="preview-images-section">
            <h3>Book Preview Images</h3>

            <div className="preview-images-grid">
              {previewImages.map((img, index) => (
                <div className="preview-image-card" key={index}>
                  <img
                    src={`http://localhost:8081/uploads/${img}`}
                    alt={`Preview ${index + 1}`}
                    className="preview-book-image"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}