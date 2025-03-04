// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import BookService from '../services/BookService';

function BookForm({ bookId, setEditing }) {
    const initialBookState = { id: null, title: '', author: '' };
    const [book, setBook] = useState(initialBookState);

    useEffect(() => {
        if (bookId) {
            const fetchBook = async () => {
                const response = await BookService.getBookById(bookId);
                setBook(response.data);
            };
            fetchBook();
        }
    }, [bookId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (book.title && book.author) {
            if (bookId) {
                await BookService.updateBook(bookId, book);
            } else {
                await BookService.createBook(book);
            }
            setBook(initialBookState);
            setEditing(false); // If you're implementing editing functionality
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleInputChange}
            />
            <label>Author</label>
            <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleInputChange}
            />
            <button>{bookId ? 'Update' : 'Add'}</button>
        </form>
    );
}

export default BookForm;