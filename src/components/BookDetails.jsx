// src/components/BookDetails.js
import React, { useState, useEffect } from "react";
import BookService from "../services/BookService";

function BookDetails({ bookId, setEditing, setCurrentBookId }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        try {
          const response = await BookService.getBookById(bookId);
          setBook(response.data);
        } catch (error) {
          console.log("Error fetching book details:", error);
          // Optionally, navigate back to list or show error message
        }
      };
      fetchBook();
    }
  }, [bookId]);

  return (
    <div>
      {book ? (
        <div>
          <h2>Book Details</h2>
          <p>
            <strong>Title:</strong> {book.title}
          </p>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <button onClick={() => setEditing(true)}>Edit Book</button>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
}

export default BookDetails;