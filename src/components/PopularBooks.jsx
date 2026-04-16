import React from "react";
import { Link } from "react-router-dom";
import "./PopularBooks.css";

const PopularBooks = () => {
  const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      img: "https://covers.openlibrary.org/b/id/12577001-L.jpg"
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      img: "https://covers.openlibrary.org/b/id/8231996-L.jpg"
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      img: "https://covers.openlibrary.org/b/id/8091016-L.jpg"
    },
    {
      title: "Ikigai",
      author: "Héctor García",
      img: "https://covers.openlibrary.org/b/id/9251996-L.jpg"
    },
    {
      title: "Do Epic Shit",
      author: "Ankur Warikoo",
      img: "https://covers.openlibrary.org/b/id/12650963-L.jpg"
    }
  ];

  return (
    <section className="books-preview">
      

        <div className="section-header">
          <h2>📚 Popular Picks</h2>
          <p>Most borrowed books this month</p>
        </div>

        {/* 🔥 FLEXBOX */}
        <div className="books-flex">
          {books.map((book, index) => (
            <div className="book-card" key={index}>
              <div className="book-img">
                <img src={book.img} alt={book.title} />
              </div>

              <h4>{book.title}</h4>
              <p>{book.author}</p>

              <Link to="/login">
                <button className="btn-small">Reserve</button>
              </Link>
            </div>
          ))}
        </div>

    </section>
  );
};

export default PopularBooks;