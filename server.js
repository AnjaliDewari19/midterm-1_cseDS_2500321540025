const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to accept JSON request body
app.use(express.json());

// Temporary book data
let books = [
    {
        id: 1,
        title: "Atmoic Habit",
        author: "Anjali Dewari",
        category: "Fiction"
    },
    {
        id: 2,
        title: "C++ programming",
        author: "RK Sharma",
        category: "Programming"
    }
];

// 1. READ - Get all books
app.get('/books', (req, res) => {
    res.status(200).json({
        message: "All books fetched successfully",
        books: books
    });
});

// 2. CREATE - Add a new book
app.post('/books', (req, res) => {
    const { title, author, category } = req.body;

    if (!title || !author || !category) {
        return res.status(400).json({
            message: "Please provide title, author and category"
        });
    }

    const newBook = {
        id: books.length > 0
            ? Math.max(...books.map(b => b.id)) + 1
            : 1,
        title: title,
        author: author,
        category: category
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

// 3. UPDATE - Update book details
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, category } = req.body;

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (category !== undefined) book.category = category;

    res.status(200).json({
        message: "Book updated successfully",
        book: book
    });
});

// 4. DELETE - Delete a book
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

// 404 - Route not found
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
