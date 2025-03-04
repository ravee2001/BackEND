// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import BookService from '../services/BookService';

function BookList({ setCurrentBookId, setCurrentView }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await BookService.getAllBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await BookService.deleteBook(bookId);
      fetchBooks(); // Refresh the list after deletion
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const handleCreateNew = () => {
    setCurrentBookId(null); // Reset or clear the current book ID
    setCurrentView('edit'); // Change view to show the form for adding a new book
  };

  return (
    <div>
      <h2>Books List</h2>
      <button onClick={handleCreateNew}>Create New Book</button>
      {books.length > 0 ? (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              {book.title} by {book.author}
              <button onClick={() => { setCurrentBookId(book.id); setCurrentView('details'); }}>View</button>
              <button onClick={() => { setCurrentBookId(book.id); setCurrentView('edit'); }}>Edit</button>
              <button onClick={() => deleteBook(book.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}

export default BookList;