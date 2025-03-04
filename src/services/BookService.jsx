// src/services/BookService.js
import axios from 'axios';

const API_URL = 'http://node41091-noderest.proen.app.ruk-com.cloud/books';

class BookService {
    getAllBooks() {
        return axios.get(API_URL);
    }

    getBookById(bookId) {
        return axios.get(`${API_URL}/${bookId}`);
    }

    createBook(book) {
        return axios.post(API_URL, book);
    }

    updateBook(bookId, book) {
        return axios.put(`${API_URL}/${bookId}`, book);
    }

    deleteBook(bookId) {
        return axios.delete(`${API_URL}/${bookId}`);
    }
}

export default new BookService();