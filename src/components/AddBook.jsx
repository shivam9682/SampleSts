import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    status: "",
    libraryBranch: "",
    semester: "",
    department: "",
    totalQuantity: "",
    description: "",
  });

  

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [previewImages, setPreviewImages] = useState([]);
  const [previewImagesPreview, setPreviewImagesPreview] = useState([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Biography",
    "Romance",
    "Thriller",
  ];

  const statuses = ["Available", "Borrowed", "Reserved"];

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
    setSuccess("");
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeMainImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);
  };

  const handlePreviewImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    const updatedImages = [...previewImages, ...files];
    setPreviewImages(updatedImages);

    const updatedPreviewUrls = [
      ...previewImagesPreview,
      ...files.map((file) => URL.createObjectURL(file)),
    ];

    setPreviewImagesPreview(updatedPreviewUrls);
  };

  const removePreviewImage = (indexToRemove) => {
    const updatedImages = previewImages.filter(
      (_, index) => index !== indexToRemove
    );

    const updatedPreviewUrls = previewImagesPreview.filter(
      (_, index) => index !== indexToRemove
    );

    URL.revokeObjectURL(previewImagesPreview[indexToRemove]);

    setPreviewImages(updatedImages);
    setPreviewImagesPreview(updatedPreviewUrls);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      previewImagesPreview.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [preview, previewImagesPreview]);

  const validate = () => {
    if (!book.title.trim()) return "Title is required";
    if (!book.author.trim()) return "Author is required";
    if (!book.genre) return "Please select a genre";
    if (!book.status) return "Please select a status";
    if (!book.description.trim()) return "Description is required";

    if (!book.totalQuantity || Number(book.totalQuantity) <= 0) {
      return "Please enter valid quantity";
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const formData = new FormData();

      formData.append("title", book.title);
      formData.append("author", book.author);
      formData.append("genre", book.genre);
      formData.append("status", book.status);
      formData.append("libraryBranch", book.libraryBranch || "");
      formData.append("semester", book.semester || "");
      formData.append("department", book.department || "");
      formData.append("totalQuantity", book.totalQuantity);
      formData.append("description", book.description);

      if (image) {
        formData.append("image", image);
      }

      previewImages.forEach((img) => {
        formData.append("previewImages", img);
      });

      await axios.post("https://examplereact-backend-11.onrender.com/api/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("✨ Book added successfully!");

      setBook({
        title: "",
        author: "",
        genre: "",
        status: "",
        libraryBranch: "",
        semester: "",
        department: "",
        totalQuantity: "",
        description: "",
      });

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      previewImagesPreview.forEach((img) => URL.revokeObjectURL(img));

      setImage(null);
      setPreview(null);
      setPreviewImages([]);
      setPreviewImagesPreview([]);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please check console.");
    } finally {
      setLoading(false);
    }
  };
    
  const genreOptions = genres.map((g) => ({ value: g, label: g }));
const statusOptions = statuses.map((s) => ({ value: s, label: s }));

const branchOptions = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Mechanical", label: "Mechanical" },
  { value: "Civil", label: "Civil" },
  { value: "Electrical", label: "Electrical" },
  { value: "Electronics", label: "Electronics" },
  { value: "Chemical", label: "Chemical" },
];
  

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>📚 Add a New Book</h1>
        <p style={styles.subtitle}>Fill in the details below</p>

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter book title"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter author name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Genre</label>
            <Select
  options={genreOptions}
  value={genreOptions.find((g) => g.value === book.genre) || null}
  onChange={(option) =>
    setBook({ ...book, genre: option ? option.value : "" })
  }
/>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Status</label>
            <Select
  options={statusOptions}
  value={statusOptions.find((s) => s.value === book.status) || null}
  onChange={(option) =>
    setBook({ ...book, status: option ? option.value : "" })
  }
/>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Book Quantity</label>
            <input
              type="number"
              name="totalQuantity"
              value={book.totalQuantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              min="1"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Branch</label>
            <Select
  options={branchOptions}
  value={
    branchOptions.find((b) => b.value === book.libraryBranch) || null
  }
  onChange={(option) =>
    setBook({ ...book, libraryBranch: option ? option.value : "" })
  }
/>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Semester</label>
            <input
              type="text"
              name="semester"
              value={book.semester}
              onChange={handleChange}
              placeholder="e.g. 5th"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Department</label>
            <input
              type="text"
              name="department"
              value={book.department}
              onChange={handleChange}
              placeholder="e.g. Computer Science"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              placeholder="Enter book description"
              style={styles.textarea}
              rows="5"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Main Book Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.input}
            />
          </div>

          {preview && (
            <div style={styles.previewWrapper}>
              <div style={styles.imageBox}>
                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={removeMainImage}
                >
                  ×
                </button>
                <img src={preview} alt="Preview" style={styles.previewImage} />
              </div>
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Book Preview Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePreviewImagesChange}
              style={styles.input}
            />
          </div>

          {previewImagesPreview.length > 0 && (
            <div style={styles.multiPreviewContainer}>
              {previewImagesPreview.map((img, index) => (
                <div key={index} style={styles.multiImageBox}>
                  <button
                    type="button"
                    style={styles.removeButton}
                    onClick={() => removePreviewImage(index)}
                  >
                    ×
                  </button>

                  <img
                    src={img}
                    alt={`Preview ${index}`}
                    style={styles.multiPreviewImage}
                  />
                </div>
              ))}
            </div>
          )}

          {error && <div style={styles.errorMessage}>{error}</div>}
          {success && <div style={styles.successMessage}>{success}</div>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={
              loading
                ? { ...styles.button, ...styles.buttonDisabled }
                : styles.button
            }
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    padding: "30px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f2937",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#6b7280",
    fontSize: "14px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    marginBottom: "6px",
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
  },

  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
  },

  textarea: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    minHeight: "120px",
  },

  previewWrapper: {
    display: "flex",
    justifyContent: "center",
  },

  imageBox: {
    position: "relative",
    width: "140px",
    height: "180px",
  },

  previewImage: {
    width: "140px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  multiPreviewContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "10px",
  },

  multiImageBox: {
    position: "relative",
    width: "90px",
    height: "120px",
  },

  multiPreviewImage: {
    width: "90px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  removeButton: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },

  button: {
    marginTop: "10px",
    padding: "14px",
    border: "none",
    borderRadius: "30px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "0.3s",
  },

  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  errorMessage: {
    color: "#dc2626",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
  },

  successMessage: {
    color: "#16a34a",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
  },
};

export default AddBook;